import ProjectInfoPanel from "@/components/app-components/assignment/ProjectInfoPanel"
import AssignedMembers from "@/components/app-components/publication-management/assigned-members"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/app-store"
import { useEffect } from "react"
import { useParams } from "react-router"

export function PublicationSettings() {
    const params = useParams()
    const { fetchProjectById, project } = useAppStore()

    const publicationId = params.id;

    if (publicationId.length <= 0 || publicationId === null) {
        return <div>
            Error Fetching data, Please reload you're application
        </div>
    }

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                await fetchProjectById(publicationId)
            } catch (error) {
                console.log("error catching publications")
            }
        }

        fetchPublication()
    }, [publicationId])

    return <div className="flex flex-col w-full h-full flex-1 gap-5">
        <h1 className="text-center text-xl font-medium">Assign users</h1>
        <AssignedMembers publicationId={publicationId} />
    </div>
}
