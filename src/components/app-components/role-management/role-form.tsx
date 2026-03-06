import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRoleStore } from "@/store/role-store"
import React, { useEffect } from "react"


type CreateRoleFormProps = {
  formData: {
    role_name: string
    description: string
    admin: boolean
  }
  onChange: (data: CreateRoleFormProps["formData"]) => void
  onSubmit: () => Promise<void>
  onCancel: () => void
}

export function RoleForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
}: CreateRoleFormProps) {

  const { roles, getRoles } = useRoleStore()

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        await getRoles()
      } catch (error) {
        console.error("Error fetching roles!")
      }
    }
    fetchRoles()
  }, [])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-4"
    >
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <Label>Role Name </Label>
          <Input
            required
            value={formData.role_name}
            onChange={(e) =>
              onChange({ ...formData, role_name: e.target.value })
            }
          />
        </div>

        <div className="space-y-1">
          <Label>Description</Label>
          <Input
            type="text"
            value={formData.description}
            onChange={(e) =>
              onChange({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="flex flex-row">
          <Label className="w-full">Admin Privileges</Label>
          <Input type="checkbox"
            checked={formData.admin}
            onChange={(e) =>
              onChange({ ...formData, admin: e.target.checked })
            }
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="addNewBtn" type="submit">Save Role</Button>
        </div>
      </div>
    </form>
  )
}
