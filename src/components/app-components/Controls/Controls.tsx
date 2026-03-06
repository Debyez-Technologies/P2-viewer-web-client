import FloatingNotes from "../annotation/FloatingNotes";
import PopUpTool from "../annotation/PopUpTool";
import BookmarkList from "../Bookmark/BookmarkList";
import BookmarkForm from "../Bookmark/BookmarkForm";
// Validation disabled
// import { ValidationModals } from "../validation/ValidationModals";
import { useUIStore } from "../../../store/ui-store";
import { useAnnotationStore } from "../../../store/annotation-store";
import RelatedSections from "../related-sections/RelatedSections";
import { useAuthStore } from "@/store/auth";
import { useBookmarkStore } from "@/store/bookmark-store";
import { usePublicationStore } from "@/store/publication-store";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getCurrentPublicationId } from "@/lib/utils";

interface BookmarkListProps {
    isOpen: boolean
    handleOpen: () => void
}

const BookmarkListWrapper = ({
    isOpen,
    handleOpen
}: BookmarkListProps) => {
    const { bookmarkListState, toggleBookmarList } = useUIStore();
    const currentUser = useAuthStore(s => s.currentUser)

    const { bookmarkList, fetchBookmarks, deleteBookmark } = useBookmarkStore();
    const { setCurrentKey, currentKey } = usePublicationStore();
    const [loading, setLoading] = useState(true);
    const pubid = getCurrentPublicationId(currentUser.id)

    useEffect(() => {
        if (bookmarkListState && loading) {
            const loadBookmarks = async () => {
                await fetchBookmarks(currentUser.id, pubid);
                setLoading(false);
            };
            loadBookmarks();
        } else if (!bookmarkListState) {
            setLoading(true);
        }
    }, [bookmarkListState, loading, fetchBookmarks]);

    const handleNavigation = (dmcode: string) => {
        if (currentKey !== dmcode) {
            setCurrentKey(dmcode);
            toggleBookmarList();
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBookmark(id, currentUser.id);
            await fetchBookmarks(currentUser.id, pubid);
        } catch (error) {
            console.error(error);
        }
    };

    return <Dialog open={isOpen} onOpenChange={handleOpen}>
        <DialogContent className="p-5 w-full">
            <DialogHeader>
                <DialogTitle className="font-normal">
                    Bookmarks
                </DialogTitle>
            </DialogHeader>
            {
                bookmarkList ? <BookmarkList bookmarks={bookmarkList} handleNavigation={handleNavigation} handleDelete={handleDelete} /> : <div className="w-full flex justify-center">
                    <span className="text-gray-400 text-center">No bookmarks have been added yet</span>
                </div>
            }
        </DialogContent>
    </Dialog >
}

const Controls = () => {
    const { bookmarkListState, bookmarkFormState, isOpenRelatedSection, toggleBookmarList } = useUIStore()
    const { annotationVisible } = useAnnotationStore()
    const { noteWindowState } = useUIStore()

    return <>
        <PopUpTool />
        {noteWindowState && annotationVisible ? <FloatingNotes isOpen={noteWindowState} /> : <></>}
        <BookmarkListWrapper isOpen={bookmarkListState} handleOpen={toggleBookmarList} />
        {bookmarkFormState ? <BookmarkForm /> : <></>}
        {isOpenRelatedSection ? <RelatedSections projectPath={""} /> : null}
    </>
}

export default Controls;