import { AssignBlockGroup, AssignBlockUsers, Block } from "@prisma/client";
import StudyingBlockItem from "./studying-block-item";

interface StudyingBlockContainerProps {
  blocks: ExtendedBlock[];
}

export interface ExtendedBlock extends Block {
  assign_block_groups: ExtendedAssignBlockGroup[];
}

interface ExtendedAssignBlockGroup extends AssignBlockGroup {
  assign_block_users: AssignBlockUsers[];
}

const StudyingBlockContainer = ({ blocks }: StudyingBlockContainerProps) => {
  return (
    <div>
      {blocks.map((block) => (
        <StudyingBlockItem key={block.block_id} block={block} />
      ))}
    </div>
  );
};

export default StudyingBlockContainer;
