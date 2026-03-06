import { useNavigate } from "react-router";
import { usePublicationStore } from "../store/publication-store";
import { useEffect } from "react";
import { Bookmark, BookText, MoveUpRight, Notebook } from 'lucide-react';
import SearchBar from "../components/app-components/topbar/SearchBar";
import { useAppStore } from "../store/app-store";
import IntroBox from "@/components/ui-components/intro-box";


interface ChapterListProps {
    publicationName: string
    groups: any,
    handleClick: (group: any) => void
}


const ChapterList = ({ publicationName, groups, handleClick }: ChapterListProps) => {
    return <div className="w-full border rounded-lg">
        <div className="w-full p-4 border-b flex justify-start space-x-3">
            <BookText />
            <div>{publicationName}</div>
        </div>
        <div className="flex flex-col w-full overflow-auto max-h-56">
            {groups?.map(group => (
                <div onClick={() => handleClick(group)} key={group?.id} className="border-b p-3 hover:cursor-pointer flex justify-between">
                    <div>
                        {group?.name}
                    </div>
                    <MoveUpRight />
                </div>
            ))}
        </div>
    </div>
}

const BookmarkList = ({ publicationName, groups, handleClick }: ChapterListProps) => {
    return <div className="w-full border rounded-lg">
        <div className="w-full p-4 border-b flex justify-start space-x-3">
            <Bookmark />
            Bookmarks
        </div>
        <div className="flex flex-col w-full overflow-auto max-h-56">
            {groups?.map(group => (
                <div onClick={() => handleClick(group)} key={group?.id} className="border-b p-3 hover:cursor-pointer flex justify-between">
                    <div>
                        {group?.name}
                    </div>
                    <MoveUpRight />
                </div>
            ))}
        </div>
    </div>
}

const AnnotationList = ({ publicationName, groups, handleClick }: ChapterListProps) => {
    return <div className="w-full border rounded-lg">
        <div className="w-full p-4 border-b flex justify-start space-x-3">
            <Notebook />
            Annotations
        </div>
        <div className="flex flex-col w-full overflow-auto max-h-56">
            {groups?.map(group => (
                <div onClick={() => handleClick(group)} key={group?.id} className="border-b p-3 hover:cursor-pointer flex justify-between">
                    <div>
                        {group?.name}
                    </div>
                    <MoveUpRight />
                </div>
            ))}
        </div>
    </div>
}


const PublicationDashboard = () => {

    const navigate = useNavigate();

    const publicationInfo = useAppStore(state => state.currentProjectInfo)

    const getPublicationData = usePublicationStore(
        (state) => state.getPublicationData,
    );
    const setCurrentKey = usePublicationStore((state) => state.setCurrentKey);
    const setChapterFilter = usePublicationStore(
        (state) => state.setChapterFilter,
    );
    const setProjectGroup = usePublicationStore(
        (state) => state.setProjectGroup,
    );
    const status = usePublicationStore((state) => state.status);
    const groups = usePublicationStore((state) => state.groups);

    useEffect(() => {
        // if (publicationInfo)
        const fetchData = async () => {
            try {
                if(publicationInfo?.id === undefined || publicationInfo === null){
                    navigate('/publications')
                }
                await getPublicationData(publicationInfo?.id);
            } catch (error) {
                console.error("Error in publication data")
            }
        }
        fetchData()
    }, [getPublicationData]); // infinte

    const handleGroupClick = (group) => {
        setChapterFilter(group);
        setProjectGroup(group.name);
        setCurrentKey(group.firstDmKey);
        navigate(`/ietm/view`);
    };

    if (status === "loading" || status === "idle") {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading Publication...
            </div>
        );
    }

    // // If parsing succeeded and there are no groups, go directly to the viewer
    // if (status === 'succeeded' && (!groups || groups.length === 0)) {
    //     navigate(`/publication/view`)
    //     return null;
    // }
    return (
        <div className="flex space-y-3 flex-col p-2 w-full h-full">
            <IntroBox />
            <SearchBar type={"global"} />
            <ChapterList groups={groups} handleClick={handleGroupClick} publicationName={publicationInfo?.name} />
            {/* <div className="flex flex-row space-x-3">
                <BookmarkList groups={groups} handleClick={handleGroupClick} publicationName={publicationInfo.projectName} />
                <AnnotationList groups={groups} handleClick={handleGroupClick} publicationName={publicationInfo.projectName} />
            </div> */}
        </div>
    );
};

export default PublicationDashboard;


