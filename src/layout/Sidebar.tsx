import Tree from "../components/app-components/Tree/Tree";
import { usePublicationStore } from "../store/publication-store";

const Sidebar = () => {
  const { projectGroup } = usePublicationStore();
  return (
    <aside className="flex bg-slate-50 flex-col border-r-2 max-w-md h-full relative"> {/* Added 'relative' to the aside */}
      <div className="p-3 border-b-2 text-md sticky top-0 z-10"> {/* Changed 'fixed' to 'sticky' and 'text-[8]' to 'text-xs' */}
        {projectGroup}
      </div>
      <div className="flex-grow overflow-y-auto"> {/* Added a div to make Tree scrollable if needed */}
        <Tree />
      </div>
    </aside>
  );
};

export default Sidebar;