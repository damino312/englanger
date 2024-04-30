"use client";
import { AssignBlockGroup, Group } from "@prisma/client";
import ModalComponent from "./modal";
import { Input } from "@/app/_components/ui/input";
import { useState } from "react";
import AssignPopover from "./assign-popover";

interface AssignBlockModalProps {
  blockId: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  groups: Group[];
  assignments: AssignBlockGroup[] | null | undefined;
}

const AssingBlockModal = ({
  blockId,
  isOpen,
  setIsOpen,
  groups,
  assignments,
}: AssignBlockModalProps) => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="absolute">
      <ModalComponent
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Список групп"
      >
        <Input
          placeholder="Поиск по группе"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="mt-2"
        />
        <div className="ml-2 py-2">
          {groups
            ?.filter((group) =>
              group.name.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((group) => (
              <div key={group.group_id}>
                <AssignPopover
                  blockId={blockId}
                  group={group}
                  assignment={
                    assignments?.find((a) => a.group_id === group.group_id) ||
                    null
                  }
                />
              </div>
            ))}
        </div>
      </ModalComponent>
    </div>
  );
};

export default AssingBlockModal;
