import React, { useEffect, useState, useRef } from "react";
import FloatingWindow from "../../ui-components/FloatingWindow";
import { useAnnotationStore } from "../../../store/annotation-store";
import { useUIStore } from "../../../store/ui-store";
import { useAnnotationContext } from "../../../../providers/AnnotationProvider";
import { usePublicationStore } from "../../../store/publication-store";
import { useAuthStore } from "@/store/auth";
import { NotesPayload } from "@/types/annotations";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";

const FloatingNotes = ({ isOpen }) => {
    const [note, setNote] = useState("");
    const [showBlink, setShowBlink] = useState(false);

    const {
        selectedAnnotation,
        addAnnotationNote,
        deleteAnnotationById,
    } = useAnnotationStore();

    const { toggleNoteWindowState } = useUIStore();
    const { deleteAnnotation, highlights } = useAnnotationContext();
    const { currentDMInfo } = usePublicationStore();
    const { currentUser } = useAuthStore();

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    /** Load note when annotation changes */
    useEffect(() => {
        if (!selectedAnnotation?.id) {
            setNote("");

            return;
        }

        const highlight = highlights.find(
            (h) => h.annotationId === selectedAnnotation.id,
        );

        console.log("highlight found", highlight)

        if (highlight) {
            setNote(highlight.note ?? "");
        } else {
            setNote("");
        }
        textareaRef.current?.focus();
    }, [selectedAnnotation, highlights]);

    const handleSubmit = async () => {
        console.log("Selected Annotation", selectedAnnotation, "dm info", currentDMInfo)
        if (
            !selectedAnnotation?.id ||
            !selectedAnnotation?.annotationData ||
            !currentDMInfo?.id
        ) {
            console.log(selectedAnnotation, "value")
            console.warn("Invalid annotation state");
            return;
        }
        try {

            const payload: NotesPayload = {
                highlightID: selectedAnnotation.highlightID,
                dmID: currentDMInfo.id,
                userID: currentUser.id,
                annotationID: selectedAnnotation.id,
                note: note,
                annotationData: selectedAnnotation.annotationData
            };

            await addAnnotationNote(payload);

            setShowBlink(true);
            setTimeout(() => setShowBlink(false), 800);
            toggleNoteWindowState();
        } catch (error) {
            console.error(error, "Error occured adding note!")
        }
    };

    const handleDelete = async () => {
        if (!selectedAnnotation.id) {

            console.warn("Selected Annotation missing!", selectedAnnotation)
            return;
        };

        try {
            const annotation = useAnnotationStore.getState().annotationList.find(ann => ann.highlightID === selectedAnnotation.highlightID)
            if (annotation.id) {
                await deleteAnnotationById(annotation.id, currentUser.id);
            }

            deleteAnnotation(selectedAnnotation.highlightID);
            toggleNoteWindowState();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };


    return (
        <FloatingWindow title="Notes" isOpen={isOpen}>
            <div className="flex flex-col">
                <textarea
                    ref={textareaRef}
                    value={note}
                    placeholder="Add your note here..."
                    onChange={(e) => setNote(e.target.value)}
                    className={[
                        "p-2 border-2 rounded-md resize-none",
                        showBlink ? "border-green-600" : "border-gray-300",
                        "focus:outline-none focus:ring-2 focus:ring-viewer-core",
                    ].join(" ")}
                    style={{ width: 256, height: 140 }}
                />

                <div className="flex justify-end gap-3 w-full">
                    <Button
                    variant="outline"
                        disabled={!selectedAnnotation}
                        onClick={handleSubmit}
                        className="  text-viewer-core p-2 rounded-md mt-2 hover:text-purple-500 disabled:opacity-50"
                    >
                        <Check />
                    </Button>

                    <Button
                        disabled={!selectedAnnotation}
                        onClick={handleDelete}
                        variant="outline"
                        className="text-red-500 p-2 rounded-md mt-2 hover:text-red-700 disabled:opacity-50"
                    >
                        <Trash2 />
                    </Button>
                </div>
            </div>
        </FloatingWindow>
    );
};

export default FloatingNotes;
