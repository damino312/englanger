"use client";

import { createAssignBlockGroup } from "@/actions/create-assign-block-group";
import { updateAssignBlockGroup } from "@/actions/update-assign-block-group";
import PopoverComponent from "@/app/_components/popover-component";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useAction } from "@/hooks/use-action";
import { cn } from "@/lib/utils";
import { AssignBlockGroup, Group } from "@prisma/client";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface AssignPopoverProps {
  group: Group;
  assignment: AssignBlockGroup | null;
  blockId: number;
}

const AssignPopover = ({ group, assignment, blockId }: AssignPopoverProps) => {
  const { pending } = useFormStatus();
  const { execute: executeCreateAssignBlockGroup } = useAction(
    createAssignBlockGroup,
    {
      onSuccess: () => toast.success("Группа назначена"),
      onError: (error) => toast.error(error),
    }
  );

  const { execute: executeUpdateAssignBlockGroup } = useAction(
    updateAssignBlockGroup,
    {
      onSuccess: () => toast.success("Группа обновлена"),
      onError: (error) => toast.error(error),
    }
  );
  function onCreateAssign(formData: FormData) {
    const deadline = new Date(formData.get("deadline") as string);
    const timeLimit = Number(formData.get("timeLimit"));
    const maxTryCount = Number(formData.get("try"));
    executeCreateAssignBlockGroup({
      block_id: blockId,
      group_id: group.group_id,
      deadline,
      time_limit: timeLimit,
      max_try_count: maxTryCount,
    });
  }
  function onUpdateAssign(formData: FormData) {
    const deadline = new Date(formData.get("deadline") as string);
    const timeLimit = Number(formData.get("timeLimit"));
    const maxTryCount = Number(formData.get("try"));
    const assignBlockId = Number(formData.get("assignBlockId"));
    executeUpdateAssignBlockGroup({
      assign_block_group_id: assignBlockId,
      deadline,
      time_limit: timeLimit,
      max_try_count: maxTryCount,
    });
  }
  function toISOLocal(date: Date) {
    const local = new Date((date as any) - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, -1);
  }
  const myTime = assignment?.deadline;

  return (
    <PopoverComponent
      side="right"
      btnClassName={cn(
        "px-2 rounded-md mb-1 font-semibold transition-colors",
        assignment ? "bg-blue-200 hover:bg-blue-300" : "hover:bg-gray-200"
      )}
      btnName={group.name}
    >
      <form action={assignment ? onUpdateAssign : onCreateAssign}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="deadline">Деадлайн:</Label>
          {assignment?.assign_block_group_id && (
            <input
              type="hidden"
              name="assignBlockId"
              value={assignment?.assign_block_group_id}
            ></input>
          )}
          <input
            name="deadline"
            required
            id="deadline"
            type="datetime-local"
            className="border border-gray-200 px-2 py-2 rounded-lg"
            defaultValue={myTime && toISOLocal(myTime)}
          />
          <Label htmlFor="timeLimit">Продолжительность, мин:</Label>
          <Input
            name="timeLimit"
            id="try"
            type="number"
            placeholder="Продолжительность"
            defaultValue={assignment?.time_limit}
            min="0"
            required
          />
          <Label htmlFor="try">Максимум попыток:</Label>
          <Input
            name="try"
            id="try"
            type="number"
            placeholder="Максимум попыток"
            defaultValue={assignment?.max_try_count}
            min="0"
            required
          />
          <Button className="mt-2" type="submit" disabled={pending}>
            Сохранить
          </Button>
        </div>
      </form>
    </PopoverComponent>
  );
};

export default AssignPopover;
