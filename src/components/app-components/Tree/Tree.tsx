import { usePublicationStore } from "../../../store/publication-store";
import ArticleIcon from "../../../assets/icons/article.svg"
import { MdOutlineArticle } from "react-icons/md";
import { useEffect, useState } from "react";
import { TreeData } from "@/types/publication";
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";

interface TreeNodeProps {
    node: TreeData
    depth?: number,
    autoExpandDepth: number
}

// const TreeNode = ({ node, depth = 0, autoExpandDepth }: TreeNodeProps) => {

//     const hasChildren = node.children && node.children.length > 0 ? true : false;
//     const { setCurrentKey, currentKey, activeKey } = usePublicationStore(); // Get currentKey for active state
//     const isClickable = node.key?.length > 0 ? true : false;

//     const isSelected = activeKey === node.key; // Determine if this node is selected
//     const isChapterSelected = node.key && node.key.startsWith(currentKey);
//     const isFragmentSelected = activeKey === node.key;

//     // State to manage the open/close state of details, controlled by autoExpandDepth initially
//     const [isOpen, setIsOpen] = useState(depth < autoExpandDepth);

//     // Effect to update isOpen if autoExpandDepth changes or on initial render
//     useEffect(() => {
//         setIsOpen(depth < autoExpandDepth);
//     }, [depth, autoExpandDepth]);

//     const handleClick = (event) => {
//         event.stopPropagation();
//         if (isClickable) setCurrentKey(node.key);
//         // Toggle open state only if it has children
//         if (hasChildren) {
//             setIsOpen(!isOpen);
//         }
//     };

//     // Calculate indentation
//     const indentationClass = `pl-${depth * 0.5}`; // Tailwind's pl-4, pl-8, pl-12, etc.

//     const trimTitle = (title, limit) => {
//         if (title.length > 25)
//             return title.substring(0, limit) + "..."
//         else
//             return title
//     }

//     const rowHighlight = isFragmentSelected
//         ? "bg-purple-100 text-purple-700 font-medium"
//         : isChapterSelected
//             ? "bg-blue-50"
//             : "hover:bg-gray-100";

//     // Indentation for the content inside the row
//     const contentIndent = { paddingLeft: `${depth * 16 + 8}px` };

//     const rowClass = `flex items-center gap-2 cursor-pointer w-full py-1 px-2 rounded-md transition-colors ${rowHighlight}`;



//     const selectedBgClass = isFragmentSelected ? 'bg-blue-200 rounded-md' : isChapterSelected ? 'bg-blue-100' : '';

//     if (hasChildren) {
//         return (
//             <li className="list-none">
//                 <div className={rowClass} style={contentIndent} onClick={handleClick}>
//                     {/* 4. The `open` attribute is now conditional */}

//                     <details open={depth < autoExpandDepth}>
//                         <summary className={`py-1 rounded w-full list-none flex flex-row gap-3 items-center hover:bg-blue-300 hover:bg-opacity-65 ${isSelected ? 'bg-blue-300' : ''}`}>
//                             <span className="text-[10]">{trimTitle(node.title, 25)}</span>
//                         </summary>
//                         <div className="flex flex-row">
//                             <ul className="list-none">
//                                 {node.children.map(
//                                     (childNode) => (
//                                         <TreeNode
//                                             node={childNode}
//                                             depth={depth + 1}
//                                             autoExpandDepth={autoExpandDepth}
//                                         />
//                                     )
//                                 )}
//                             </ul>
//                         </div>
//                     </details>
//                 </div>
//             </li>
//         );
//     }

//     // Leaf node (no children)
//     return (
//         <li className={`flex flex-row w-full items-center list-none cursor-pointer ${selectedBgClass}`} onClick={handleClick}>
//             <div
//                 //  className="flex flex-row items-center p-1 gap-3  hover:bg-gray-300 hover:bg-opacity-65"
//                 className={rowClass} style={contentIndent}
//             >
//                 <MdOutlineArticle />
//                 <span className="text-[10]">
//                     {trimTitle(node.title, 25)}
//                 </span>
//             </div>
//         </li>
//     );
// };

// const Tree = () => {
//     const filteredTree = usePublicationStore((state) => state.getFilteredTree());

//     return (
//         <div>
//             <ul className="list-none overflow-y-auto">
//                 {filteredTree?.map(
//                     (node) => (
//                         <TreeNode
//                             node={node}
//                             autoExpandDepth={1}
//                         />
//                     )
//                 )}
//             </ul>
//         </div>
//     );
// };


const TreeNode = ({ node, depth = 0, autoExpandDepth }: TreeNodeProps) => {
    const hasChildren = node.children && node.children.length > 0 ? true : false;
    const { setCurrentKey, currentKey, activeKey } = usePublicationStore();
    const isClickable = node.key?.length > 0 ? true : false;
    const isChapterSelected = node.key && node.key.startsWith(currentKey);
    const isFragmentSelected = activeKey === node.key;
    const [isOpen, setIsOpen] = useState(depth < autoExpandDepth);

    useEffect(() => {
        setIsOpen(depth < autoExpandDepth);
    }, [depth, autoExpandDepth]);

    const handleClick = (event) => {
        event.stopPropagation();
        if (isClickable) setCurrentKey(node.key);
        if (hasChildren) {
            setIsOpen(!isOpen);
        }
    };

    const trimTitle = (title, limit) => {
        if (title.length > 25) return title.substring(0, limit) + "...";
        else return title;
    };

    // The highlight spans full width via negative margin + matching padding
    const rowHighlight = isFragmentSelected
        ? "bg-purple-100 text-purple-700 font-medium border-l-3"
        : isChapterSelected
            ? "bg-blue-50"
            : "hover:bg-gray-100";

    // Indentation for the content inside the row
    const contentIndent = { paddingLeft: `${depth * 16 + 8}px` };

    const rowClass = `flex items-center gap-2 cursor-pointer w-full py-1 px-2 transition-colors ${rowHighlight}`;

    if (hasChildren) {
        return (
            <div className="w-full">
                {/* Row - full width highlight, content indented via paddingLeft style */}
                <div
                    className={rowClass}
                    style={contentIndent}
                    onClick={handleClick}
                >
                    {/* Chevron */}
                    <span className="shrink-0 text-gray-400">
                        {isOpen ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </span>
                    {/* Folder icon */}
                    {!isOpen ? <Folder className="shrink-0 text-gray-500" size={16} /> : <FolderOpen className="shrink-0 text-gray-500" size={16} />}
                    <span className="truncate text-sm">{trimTitle(node.title, 30)}</span>
                </div>

                {/* Children - no additional indentation wrapper, each child handles its own */}
                {isOpen && (
                    <div className="w-full">
                        {node.children.map((childNode) => (
                            <TreeNode
                                key={childNode.key}
                                node={childNode}
                                depth={depth + 1}
                                autoExpandDepth={autoExpandDepth}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Leaf node
    return (
        <div
            className={rowClass}
            style={contentIndent}
            onClick={handleClick}
        >
            <img src={ArticleIcon}
                className={`shrink-0 w-[16] has-[]:16] ${isFragmentSelected ? "text-purple-600" : "text-gray-400"}`}
            />
            <span className="truncate text-sm">{trimTitle(node.title, 25)}</span>
        </div>
    );
};

const Tree = () => {
    const filteredTree = usePublicationStore((state) => state.getFilteredTree());
    return (
        <div className="w-full overflow-y-auto">
            {filteredTree?.map((node) => (
                <TreeNode key={node.key} node={node} autoExpandDepth={1} />
            ))}
        </div>
    );
};


export default Tree;