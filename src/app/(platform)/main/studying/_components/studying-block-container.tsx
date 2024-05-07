import {
  AssignBlockGroup,
  AssignBlockUsers,
  Block,
  LearningOutcome,
} from "@prisma/client";
import StudyingHoverCard from "./studying-hover-card";

interface StudyingBlockContainerProps {
  blocks: ExtendedBlock[];
  roleId: number;
}

export interface ExtendedBlock extends Block {
  assign_block_groups: ExtendedAssignBlockGroup[];
  learning_outcomes?: LearningOutcome[];
}

interface ExtendedAssignBlockGroup extends AssignBlockGroup {
  assign_block_users?: AssignBlockUsers[];
}

const StudyingBlockContainer = ({
  blocks,
  roleId,
}: StudyingBlockContainerProps) => {
  return (
    <>
      {roleId === 1 && (
        <div className="flex w-full h-full gap-4">
          {blocks.map((block) => (
            <StudyingHoverCard block={block} key={block.block_id} />
          ))}
        </div>
      )}
    </>
  );
};

export default StudyingBlockContainer;
