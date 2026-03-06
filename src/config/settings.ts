import { IconType } from "react-icons";


import {
    House,
    User2Icon,
    BookOpen,
    Users,
    Settings,
    NotebookPen,
    Bookmark,
    LibraryBig,
} from "lucide-react";

export type SidebarButtons = {
    id: string;
    text: string;
    icon?: IconType;
    toolTipText?: string;
    path?: string;
    children?: SidebarButtons[];
};

// const API_BASE_URL = 'http://44.222.115.153';
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
console.log(API_BASE_URL,"base url")


const AdminSidebarbuttons: SidebarButtons[] = [
    {
        id: "dashboard",
        text: "Dashboard",
        path: "/",
        icon: House,
        toolTipText: "Home",
    },
    {
        id: "publications",
        text: "Publications",
        path: "/publications",
        icon: BookOpen,
        toolTipText: "Publications",
    },
    {
        id: "project",
        text: "Publication Management",
        icon: LibraryBig,
        path: "/manage",
    },
    {
        id: "user-management",
        text: "User management",
        toolTipText: "Manage Users",
        icon: Users,
        path: "/users",
    },
    {
        id: "roles",
        text: "Manage roles",
        path: "/roles",
        icon: User2Icon,
        toolTipText: "Manage Roles and Permission",
    },
    {
        id: "settings",
        text: "Settings",
        path: "/settings",
        icon: Settings,
        toolTipText: "Settings",
    },
    // {
    //     id: "help",
    //     text: "Help",
    //     path: "/help",
    //     icon: RiQuestionLine,
    //     toolTipText: "Help",
    // },
];

const publicationViewSidebar: SidebarButtons[] = [
    {
        id: "back",
        text: "go back",
        path: "/",
        icon: House,
        toolTipText: "Home",
    },
    {
        id: "publications",
        text: "Publications",
        path: "/publications/catalog",
        icon: BookOpen,
        toolTipText: "Publications",
    },
    {
        id: "annotations",
        text: "Annotations",
        path: "/publications/annotations",
        icon: NotebookPen,
        toolTipText: "Annotations",
    },
    {
        id: "bookmarks",
        text: "Bookmarks",
        path: "/publications/bookmarks",
        icon: Bookmark,
        toolTipText: "Bookmarks",
    },
    // {
    //     id: "help",
    //     text: "Help",
    //     path: "/publications/help",
    //     icon: RiQuestionLine,
    //     toolTipText: "Help",
    // },
];

const publicationViewSidebarNormal: SidebarButtons[] = [
    {
        id: "publications",
        text: "Publications",
        path: "/",
        icon: House,
        toolTipText: "Publications",
    },
    {
        id: "annotations",
        text: "Annotations",
        path: "/publications/annotations",
        icon: NotebookPen,
        toolTipText: "Annotations",
    },
    {
        id: "bookmarks",
        text: "Bookmarks",
        path: "/publications/bookmarks",
        icon: Bookmark,
        toolTipText: "Bookmarks",
    },
    {
        id: "settings",
        text: "Settings",
        path: "/publications/settings",
        icon: Settings,
        toolTipText: "Settings",
    },
    // {
    //     id: "help",
    //     text: "Help",
    //     path: "/publications/help",
    //     icon: RiQuestionLine,
    //     toolTipText: "Help",
    // },
];

export {
    publicationViewSidebar,
    AdminSidebarbuttons,
    API_BASE_URL,
    publicationViewSidebarNormal,
};
