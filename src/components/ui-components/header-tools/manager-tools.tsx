import { useAuthStore } from "@/store/auth";
import { useLocation } from "react-router";
import PublicationSwitcher from "./publication-switcher";

export default function ManagerTool() {

    const { currentUser } = useAuthStore();
    const location = useLocation()
    const pubregx = /\bpublications\b/;

    return <>
        {location.pathname.match(pubregx) ||
            !(
                currentUser?.roles?.some((role) => role.isAdmin === true) ||
                false
            ) ? <PublicationSwitcher currentUserId={currentUser.id} /> : <></>
        }</>

}