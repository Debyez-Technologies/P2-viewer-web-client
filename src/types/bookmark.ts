interface Bookmark {
  id?: string;
  dmID?: string;
  userID?: string;
  title: string
  content: {
    dmName: string
  }
}

interface BookmarkStoreState {
  bookmarkList: Bookmark[];
  isBookmarked: boolean;

  fetchBookmarks: (userid: string, pmid: string) => Promise<void>;
  setBookmarkList: (bookmark: {
    title: string,
    dm_id: string,
    user_id: string,
    pm_id: string
  }, userid: string) => Promise<number | undefined>;
  deleteBookmark: (id: string, userid: string) => Promise<void>;
  resetStore: () => void
}

export { Bookmark, BookmarkStoreState }