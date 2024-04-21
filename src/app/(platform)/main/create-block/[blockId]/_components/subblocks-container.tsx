import { BlockData } from "../page";
import SubblockTest from "./subblock-test/subblock-test";

const SubblockContainer = ({ data }: { data: BlockData | null }) => {
  if (!data) {
    return null;
  }

  return (
    <div className=" h-full mx-8">
      <h1 className=" text-center font-semibold text-2xl mb-4">
        Название блока: {data.name}
      </h1>
      {data &&
        data.subblock_orders
          .sort((a, b) => a.order - b.order)
          .map((subblock) => {
            if (subblock.subblock_test_id) {
              return (
                <SubblockTest
                  key={subblock.subblock_test_id}
                  subblock={subblock}
                  blockId={data.block_id}
                />
              );
            }
          })}
    </div>
  );
};

export default SubblockContainer;
