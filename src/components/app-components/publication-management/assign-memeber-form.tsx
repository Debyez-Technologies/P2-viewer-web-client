import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, User as UserIcon } from 'lucide-react';
import { useUserStore } from '@/store/user-store';
import { User } from '@/types/user';
import { useAssignmentStore } from '@/store/assignment-store';
import { useParams } from 'react-router';

interface AssignMemberFormProps {
  onUsersAdd?: (users: User[]) => void;
}

export default function AssignMemberForm({ onUsersAdd }: AssignMemberFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const assignUser = useAssignmentStore(state => state.assignUser)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();

  const users = useUserStore(state => state.usersList)
  const fetchUsers = useUserStore(state => state.getUsersList)
  // Toggle selection logic
  const handleToggleUser = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Handle the "Add" button click
  const handleConfirm = async () => {
    // Start loading
    setIsSubmitting(true);

    const selectedUserData = users.filter((user) =>
      selectedUserIds.includes(user.id)
    );

    try {
      // 2. Use Promise.all to run requests in parallel and WAIT for them
      await Promise.all(
        selectedUserData.map((user) => assignUser(params.id, user.id))
      );

      console.log("All users assigned successfully");

      // Only run these if the API calls succeeded
      if (onUsersAdd) {
        onUsersAdd(selectedUserData);
      }

      // Reset and close
      setIsOpen(false);
      setSelectedUserIds([]);

    } catch (error) {
      // Handle error (e.g., show a toast notification)
      console.error("Failed to assign one or more users:", error);
      // Do NOT close the dialog here so the user can try again
    } finally {
      // Stop loading regardless of success or failure
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ Assign</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Users</DialogTitle>
          <DialogDescription>
            Select team members to assign to this publication.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable User List */}
        <div className="flex flex-col gap-2 mt-4 max-h-[400px] overflow-y-auto pr-2">
          {users.map((user) => {
            const isSelected = selectedUserIds.includes(user.id);

            return (
              <div
                key={user.id}
                onClick={() => handleToggleUser(user.id)}
                className={`
                  relative flex items-center p-3 rounded-lg border cursor-pointer transition-all
                  hover:bg-accent
                  ${isSelected ? 'border-primary bg-accent/50 ring-1 ring-primary' : 'border-border'}
                `}
              >
                {/* Avatar Section */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground mr-4">
                  <UserIcon className="h-5 w-5" />
                </div>

                {/* Text Info */}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold leading-none">{user.profile.fullName}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                </div>

                {/* Checkbox Indicator */}
                {isSelected && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={selectedUserIds.length === 0 || isSubmitting}>
            {isSubmitting ? "Assigning..." : "Add Members"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}