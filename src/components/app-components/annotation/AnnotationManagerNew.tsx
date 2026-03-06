import { useEffect, useState } from "react";
import { useAnnotationContext } from "../../../../providers/AnnotationProvider";
import { useAnnotationStore } from "../../../store/annotation-store";
import { usePublicationStore } from "../../../store/publication-store"; // Imported for navigation
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Trash, MoveUpRight, MessageSquareText } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { Annotation } from "@/types/annotations";

// 1. Separate List Component (Similar to BookmarkList)
interface AnnotationListProps {
  annotations: Annotation[];
  handleDelete: (id: string, highlight_id: string) => void;
  handleNavigation: (dmcode: string) => void;
}

const AnnotationList = ({ annotations, handleDelete, handleNavigation }: AnnotationListProps) => {
  return (
    <div className="w-full border rounded-lg">
      <div className="flex flex-col w-full overflow-auto max-h-[60vh]">
        {annotations?.map((annotation) => (
          <div
            key={annotation.id}
            className="border-b p-4 hover:bg-gray-50 transition-colors flex justify-between items-start gap-4"
          >
            {/* Left Side: Content */}
            <div className="flex flex-col gap-1">
              {/* The User's Note */}
              <div className="font-medium text-slate-800 flex items-center gap-2">
                <MessageSquareText size={16} className="text-emerald-600" />
                {annotation.note || "No note added"}
              </div>

              {/* The Highlighted Text (Context) */}
              <div className="text-sm text-gray-500 italic border-l-2 border-gray-300 pl-2 mt-1 line-clamp-2">
                "{annotation.annotationData}"
              </div>
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-red-500 hover:bg-red-50"
                onClick={() => handleDelete(annotation.id, annotation.highlightID)}
                title="Delete Annotation"
              >
                <Trash size={18} />
              </Button>

              {/* <Button
                variant="ghost"
                size="icon"
                className="hover:text-emerald-600 hover:bg-emerald-50"
                // Assuming 'dm_code' or similar exists in your annotation object. 
                // If it's named differently (e.g., content_id), change it here.
                onClick={() => handleNavigation(annotation.dm_code || annotation.content_id)} 
                title="Go to Annotation"
              >
                <MoveUpRight size={18} />
              </Button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Main Manager Component
const AnnotationManagerNew = () => {
  const navigate = useNavigate();
  const currentUser = useAuthStore(s => s.currentUser)
  // Contexts & Stores
  const { deleteAnnotation } = useAnnotationContext(); // DOM/Provider removal
  const { getAnnotationList, annotationList, deleteAnnotationById } = useAnnotationStore(); // Backend/Store removal
  const { navigateToKey, currentKey } = usePublicationStore(); // Navigation logic

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Logic
  useEffect(() => {
    async function fetchAnnotationsWithNotes() {
      try {
        setLoading(true);
        setError(null);
        await getAnnotationList();
      } catch (error) {
        console.error("Error fetching annotations:", error);
        setError("Failed to load annotations. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchAnnotationsWithNotes();
  }, [getAnnotationList]);

  // Handle Navigation (Jump to View)
  const handleNavigation = async (dmcode: string) => {
    if (!dmcode) {
      console.warn("No DM Code associated with this annotation.");
      return;
    }

    try {
      await navigate('/ietm/view');
      // Only trigger key change if we are not already on that DM
      if (currentKey !== dmcode) {
        navigateToKey(dmcode);
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id: string, highlight_id: string) => {
    console.log("deleteing", highlight_id)
    try {
      // 1. Remove from Context (Visual/DOM)
      if (highlight_id) {
        deleteAnnotation(highlight_id);
      }
      // 2. Remove from DB/Store
      await deleteAnnotationById(id, currentUser.id);

      // 3. Refresh List
      await getAnnotationList();
    } catch (error) {
      console.error("Error deleting annotation:", error);
      setError("Failed to delete annotation. Please try again.");
    }
  };

  // --- Render States ---

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600 animate-pulse">Loading annotations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!annotationList || annotationList.length === 0) {
    return (
      <div className="flex flex-col p-12 text-center">
        <div className="text-gray-400 text-lg mb-2">No annotations found</div>
        <p className="text-gray-500 text-sm">
          Highlight text in the viewer to create annotations.
        </p>
      </div>
    );
  }

  console.log(annotationList, "annotations in manager")
  return (
    <div className="p-4 w-10/12 mx-auto">
      <div className="mb-6">
        <h1 className="text-center text-xl font-medium">Your Annotations</h1>
      </div>

      <div className="space-y-4">
        <AnnotationList
          annotations={annotationList}
          handleDelete={handleDelete}
          handleNavigation={handleNavigation}
        />
      </div>
    </div>
  );
};

export default AnnotationManagerNew;