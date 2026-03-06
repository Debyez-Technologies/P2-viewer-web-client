import { useEffect } from "react";
import { usePublicationStore } from "../store/publication-store";
import DataModuleRenderer from "./DataModuleRenderer";

function PublicationLayout() {
    const { setCurrentDmData, currentKey, setCurrentDMInfo } =
        usePublicationStore();

    useEffect(() => {
        setCurrentDmData();
        setCurrentDMInfo(currentKey);
    }, [currentKey]);

    return <DataModuleRenderer />;
}

export default PublicationLayout;
