
import { Button } from "@/components/ui/button";
import { MoveUpRight, Trash } from "lucide-react";
import { Bookmark } from "@/types/bookmark";


interface BookmarkListProps {
  bookmarks: any,
  handleDelete?: (bookmark: any) => void
  handleNavigation: (dmcode: string) => void
}

const BookmarkList = ({ bookmarks, handleDelete, handleNavigation }: BookmarkListProps) => {
  console.log(bookmarks,"bookmarks")
  return <div className="w-full border rounded-lg">
    <div className="flex flex-col w-full overflow-auto max-h-56">
      {bookmarks?.map(bookmark => (
        <div key={bookmark?.id} className="border-b p-3 hover:cursor-pointer flex justify-between">
          <div>
            {bookmark?.title}
          </div>
          <div className="flex justify-end flex-1">
            {handleDelete && <Button variant="ghost" className="hover:text-red-500" onClick={() => handleDelete(bookmark.id)}>
              <Trash />
            </Button>}
            <Button variant="ghost" className="hover:text-viewer-core" onClick={() => handleNavigation(bookmark.content.DmName)}>
              <MoveUpRight />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
}

export default BookmarkList;



