import {
  AssignBlockGroup,
  AssignBlockUsers,
  Block,
  LearningOutcome,
} from "@prisma/client";
import StudyingBlockItem from "./studying-block-item";

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
        <div className="flex">
          {blocks.map((block) => (
            <StudyingBlockItem key={block.block_id} block={block} />
          ))}
        </div>
      )}
    </>
  );
};

export default StudyingBlockContainer;
