import { create } from "zustand";
import axios from ".";
import { BookmarkStoreState } from "@/types/bookmark";
import { API_BASE_URL } from "@/config/settings";

const useBookmarkStore = create<BookmarkStoreState>((set, get) => ({
    bookmarkList: [],
    isBookmarked: false,

    fetchBookmarks: async (userid: string, pmid: string) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/bookmarks/${userid}/${pmid}`,
            );
            set({
                bookmarkList: response.data,
            });
        } catch (error) {
            console.error("Error fetching bookmarks:", error);
            set({ bookmarkList: [] });
        }
    },

    setBookmarkList: async (bookmark, userid) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/bookmarks/${userid}`,
                bookmark,
            );
            return response.status;
        } catch (error) {
            console.error("Error creating bookmark:", error);
            set({ bookmarkList: [] });
        }
    },

    deleteBookmark: async (id, userid) => {
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/api/v1/bookmarks/${id}/${userid}`,
            );
            console.log(response, "The delete data");
        } catch (error) {
            console.error("Error deleting bookmarks:", error);
        }
    },
    resetStore: () => {
        set({
            bookmarkList: [],
            isBookmarked: false
        })
    }
}));

export { useBookmarkStore };
