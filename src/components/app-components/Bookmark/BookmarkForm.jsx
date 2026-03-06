import { useEffect, useState } from "react";
import { usePublicationStore } from "../../../store/publication-store";
import { useUIStore } from "../../../store/ui-store";
import { useBookmarkStore } from "../../../store/bookmark-store";
import { useAuthStore } from "@/store/auth";
import { getCurrentPublicationId } from "@/lib/utils";

const Form = ({ handleOpen }) => {
    const { currentKey, currentTitle, currentDMInfo } = usePublicationStore();
    const currentUser = useAuthStore(s => s.currentUser);
    const [bookmarkTitle, setBookmarkTitle] = useState("Title");
    const { setBookmarkList, fetchBookmarks } = useBookmarkStore();
    const pmID = getCurrentPublicationId(currentUser.id)

    useEffect(() => {
        // Set bookmarkTitle to currentTitle when currentKey or currentTitle changes
        // Only if currentTitle is not null or undefined
        if (currentTitle) {
            setBookmarkTitle(currentTitle);
        } else {
            // Fallback to currentKey if currentTitle is not available
            setBookmarkTitle(currentKey);
        }
    }, [currentKey, currentTitle]); // Depend on currentKey and currentTitle

    const handleTextInput = (e) => {
        setBookmarkTitle(e.target.value);
    };

    const addBookmark = async () => {
        try {
            const bookmark = {
                title: bookmarkTitle,
                dm_id: currentDMInfo.id,
                user_id: currentUser.id,
                pm_id: pmID
            };

            const res = await setBookmarkList(bookmark, currentUser.id);
            if (res === 201) {
                handleOpen(); // Close the form on successful bookmark
                const res = await fetchBookmarks(currentUser.id, pmID)
            }
        } catch (error) {
            console.error("Error occurred", error);
        }
    };

    console.log(currentDMInfo, "Current DM info")
    return (
        <div className="flex flex-col">
            {/* Always show title input, but pre-fill with currentTitle or currentKey */}
            <label htmlFor="title" className="mb-1 text-gray-700">
                Bookmark title
            </label>
            <input
                type="text"
                name="title"
                id="title"
                className="p-2 mb-4 border rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" // Added more styling
                autoFocus
                onChange={handleTextInput}
                value={bookmarkTitle} // Use value for controlled component
            />
            <label htmlFor="dmCode" className="mb-1 text-gray-700">
                Data Module Code
            </label>
            <input
                type="text"
                name="dmcode"
                id="dmcode"
                className="p-2 mb-6 border rounded-sm bg-gray-100 cursor-not-allowed" // Added styling for read-only look
                value={currentKey}
                readOnly // Make it read-only as it's just displaying the currentKey
            />
            <button
                className="px-4 py-2 mb-2 text-white bg-viewer-core rounded-md hover:bg-purple-600 transition-colors"
                onClick={addBookmark}
            >
                Add bookmark
            </button>
            <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors" // Changed cancel button styling
                onClick={handleOpen}
            >
                Cancel
            </button>
        </div>
    );
};

const BookmarkForm = () => {
    const { bookmarkFormState, toggleBookmarkForm } = useUIStore();

    return (
        <div
            // Use justify-end and items-start on the flex container
            // and add padding to position the dialog from the edges
            className={`fixed inset-0 z-50 ${bookmarkFormState ? "flex" : "hidden"} justify-end items-start pt-5 pr-5`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={toggleBookmarkForm}
            ></div>

            {/* Modal */}
            <dialog
                open={bookmarkFormState}
                // Removed top-4 right-4 as parent container handles positioning
                // Added m-0 to remove default dialog margins
                className="relative top-32 z-10 bg-white rounded-md p-5 shadow-xl w-80 m-0"
            >
                <div className="flex flex-col justify-center h-full">
                    <Form handleOpen={toggleBookmarkForm} />
                </div>
            </dialog>
        </div>
    );
};

export default BookmarkForm;
