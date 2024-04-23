import { BlockData } from "../../../block/[blockId]/page";

interface TestContainerProps {
  block: BlockData;
}

const TestContainer = ({ block }: TestContainerProps) => {
  return <div>test</div>;
};

export default TestContainer;
