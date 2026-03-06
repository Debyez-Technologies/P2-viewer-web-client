import { useEffect, useState } from "react";
import { useBookmarkStore } from "../../../store/bookmark-store";
import { usePublicationStore } from "../../../store/publication-store";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth";
import BookmarkList from "./BookmarkList";
import { getCurrentPublicationId } from "@/lib/utils";


const BookmarkManager = () => {
  // Loading state
  const { bookmarkList, fetchBookmarks, deleteBookmark } = useBookmarkStore()
  const { navigateToKey, currentKey } = usePublicationStore();
  const currentUser = useAuthStore(s => s.currentUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pmID = getCurrentPublicationId(currentUser.id)
  const navigate = useNavigate()



  useEffect(() => {

    const loadBookmarks = async () => {
      try {
        await fetchBookmarks(currentUser.id, pmID)
        setLoading(false)
      } catch (error) {
        console.error(error.message)
        setError("Error loading bookmarks")
      } finally {
        setLoading(false)
      }
    }
    if (loading)
      loadBookmarks()

    console.log(bookmarkList, "Bookmarks retreived")
  }, [fetchBookmarks])

  const handleNavigation = async (dmcode: string) => {
    try {
      await navigate('/ietm/view')
      if (currentKey !== dmcode) {
        navigateToKey(dmcode);
      }
    } catch (error) {
      console.error(error.message)
    }
  };

  const handleDelete = async (dmcode: string) => {
    try {
      await deleteBookmark(dmcode, currentUser.id);
      fetchBookmarks(currentUser.id, pmID); // Refresh the list after deleting
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    console.log(loading, "loading state")
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading Bookmarks...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (!bookmarkList || bookmarkList.length === 0) {
    return (
      <div className="flex flex-col p-12 text-center">
        <div className="text-gray-400 text-lg mb-2">No bookmarks found</div>
        <p className="text-gray-500 text-sm">
          Start adding bookmarks to manage bookmarks
        </p>
      </div>
    );
  }

  // Main render - Changed to list layout
  return (
    <div className="p-4 w-10/12 mx-auto">
      <div className="mb-6">
        <h1 className="text-center text-xl font-medium">Your Bookmarks</h1>
      </div>

      {/* Changed from grid to vertical list */}
      <div className="space-y-4">
        <div className="space-y-4">
          <BookmarkList bookmarks={bookmarkList} handleDelete={handleDelete} handleNavigation={handleNavigation} />
        </div>
      </div>
    </div>
  );
};

export default BookmarkManager;