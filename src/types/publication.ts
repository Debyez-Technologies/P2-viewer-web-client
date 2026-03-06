type PublicationMeta = {
    id: string;
    name: string;
    companyDetails: string;
    isConfigured: boolean;
    isEmbedded: boolean;
    companyLogoMimeType?: string;
    productImageMimeType?: string;
};

// building blocks of json converted
// from xml
type ComponentProp = {
    [key: string]: string
}

type RenderableUnit = {
    id: string,
    component: string
    props: ComponentProp
    text: string
    childern: RenderableUnit[]

}

type PublicationDataEntry = {
    file: string
    content: RenderableUnit
}

type PublicationDataItem = {
    key: string
    value: PublicationDataEntry
}

type TreeData = {
    key?: string
    title: string
    children?: TreeData[]
}

type Group = {
    id: string
    firstDmKey: string
    moduleKeys: string[]
    name: string
}


interface AppStore {
    projects: PublicationMeta[]
    project: PublicationMeta
    assignedProjects: PublicationMeta[]
    projectPath: string
    // publicationID: string
    currentProjectInfo: PublicationMeta
    isDeleteModalOpen: boolean
    projectToDelete: PublicationMeta
    importStep: string
    currentProject: PublicationMeta
    server: {
        connected: boolean,
        message: string
    }

    fetchUserProjects: (userID: string) => Promise<void>;
    fetchProjects: () => Promise<void>;
    fetchProjectById: (id: string) => Promise<void>;
    setProjectPath: (path: string) => void
    // setPublicationID: (id: string) => void
    setCurrentProjectInfo: (project: PublicationMeta) => void
    openDeleteConfirmation: (project: PublicationMeta) => void
    closeDeleteConfirmation: () => void
    confirmDeleteProject: () => void
    setCurrentProject: (projectData: PublicationMeta) => void
    resetStore: () => void
}

interface PublicationStore {
    publicationId: string
    publicationData: PublicationDataItem[]
    treeData: TreeData[]
    textNodes: any
    status: "idle" | "loading" | "succeeded" | "failed" | "reset"
    error: string
    currentKey: string
    activeKey: string,
    currentTitle: string
    scrollToID: string
    chapterFilter: any
    lastChapterFilter: any
    filteredTreeData: TreeData[]
    projectGroup: string
    resourceList: string[]
    currentDmData: PublicationDataItem
    currentDMInfo: any
    groups: Group[]

    getPublicationData: (projectID: string) => Promise<void>;
    resetPublicationData: () => void;

    clearScrolltoID: () => void;

    setCurrentKey: (key: string) => void;

    setChapterFilter: (group: Group | null) => void;
    clearChapterFilter: () => void;

    getFilteredTree: () => TreeData[];

    getOrderedKeys: () => string[];
    getFilteredOrderedKeys: () => string[];

    setProjectGroup: (title: string) => void;

    navigateToKey: (key: string) => void;

    setCurrentTitle: (key: string) => void;

    getContentMap: () => Record<string, RenderableUnit>;

    searchContent: (query: string, flag?: "global" | string) => void;
    resetTextNodes: () => void;

    setCurrentDmData: () => void;
    setCurrentDMInfo: (dm: string) => Promise<void>;

    setPublicationIDinPublicationStore: (id: string) => void;

    getSignedUrlForProductImage: (
        publicationId: string,
        userId: string
    ) => Promise<string | null | undefined>;

    resetStore:()=>void

}

export {
    PublicationMeta,
    AppStore,
    PublicationDataItem,
    PublicationStore,
    TreeData,
};
