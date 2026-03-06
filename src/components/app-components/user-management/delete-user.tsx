import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UserForm } from "./user-form";
import { useUserStore } from "@/store/user-store";
import { UserFormValues } from "@/types/user";
import { SquarePen, Trash } from 'lucide-react';

interface DeleteUserProps {
    id: string
    open: boolean;
    setOpen: (flag: boolean) => void;

}


export default function DeleteUser({
    id, open, setOpen
}: DeleteUserProps) {
    const deleteUser = useUserStore(state => state.deleteUser)
    const fetchUser = useUserStore(state => state.getUsersList)

    const handleDelete = async () => {
        try {
            await deleteUser(id)
            await fetchUser()
        } catch (error) {
            console.error("Error deleting user!")
        }
    }
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button
                variant="tableEdit"
            >
                <Trash className="text-red-600" />
            </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Do you want to Delete this user?</DialogTitle>
            </DialogHeader>
            <div className="flex flex-row w-full justify-end gap-3">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </div>
        </DialogContent>
    </Dialog>
}