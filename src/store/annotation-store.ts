import axios from "."
import { create } from "zustand";
import { useAuthStore } from "./auth";
import { AnnoationStore, Annotation, AnnotationPayload, NotesPayload } from "@/types/annotations";
import { getCurrentPublicationId } from "@/lib/utils";
import { API_BASE_URL } from "@/config/settings";

const useAnnotationStore = create<AnnoationStore>((set, get) => ({
    annotationVisible: false,
    selectedAnnotation: null,

    annotationList: [],

    toggleAnnotationVisible: () =>
        set({
            annotationVisible: !get().annotationVisible,
        }),

    setSelectedAnnotation: (data: Annotation) => {
        console.log(data, "selected Annotation Data")
        if (data === null) {
            set({
                selectedAnnotation: null
            })
            return
        }
        const annotation = useAnnotationStore.getState().annotationList.find(ann => ann.highlightID === data.highlightID)
        set({
            selectedAnnotation: annotation,
        });
    },

    createAnnotation: async (data: AnnotationPayload) => {
        try {
            console.log(data.userID, "annotation data user data");
            const annotation = {
                highlight_id: data.highlighID,
                dm_id: data.dmID,
                annotation_data: data.text,
            };

            console.log(annotation,"post annotate")
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/annotations/${data.userID}`,
                annotation,
            );
        } catch (error) {
            console.error("Error creating annotations:", error);

        }
    },

    getAnnotationList: async () => {
        try {
            const userId = useAuthStore.getState().currentUser.id;
            const pmID = getCurrentPublicationId(userId)
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/annotations/${userId}/${pmID}`,
            );

            const data = Array.isArray(response.data) ? response.data : []

            const proccessedData = data.map(d => ({
                id: d?.id,
                highlightID: d?.highlight_id,
                dmID: d?.dm_id,
                dmName: d?.content?.DmName,
                annotationData: d?.annotation_data,
                note: d?.note
            }))

            console.log(response.data, "The response data");
            set({
                annotationList: proccessedData
            })

        } catch (error) {
            console.error("Error fetching bookmarks:", error);
        }
    },

    addAnnotationNote: async (data: NotesPayload) => {
        try {
            const user_id = useAuthStore.getState().currentUser.id;
            const response = await axios.patch(
                `${API_BASE_URL}/api/v1/annotations/${user_id}`,
                {
                    highlight_id: data.highlightID,
                    dm_id: data.dmID,
                    user_id: data.userID,
                    annotation_data: data.annotationData,
                    note: data.note,
                },
            );

            await get().getAnnotationList();
        } catch (error) {
            console.error("Error updating annotation note:", error);
        }
    },

    deleteAnnotationById: async (id: string, userID: string) => {
        try {
            console.log("highlight delete", id);

            const response = await axios.delete(
                `${API_BASE_URL}/api/v1/annotations/${id}/${userID}`,
            );
            await useAnnotationStore.getState().getAnnotationList()
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
        }
    },

    resetStore: () => set({ selectedAnnotation: null, annotationList: [], annotationVisible: false })
}));

export { useAnnotationStore };
