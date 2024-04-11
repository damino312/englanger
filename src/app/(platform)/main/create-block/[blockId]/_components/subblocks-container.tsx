import { BlockData } from "../page";
import SubblockTest from "./subblock-test";

const SubblockContainer = ({ data }: { data: BlockData | null }) => {

  if (!data) {
    return null;
  }

  return (
    <div className="my-4  h-full mx-8 border border-black">
      <h1 className=" text-center font-semibold text-2xl">{data.name}</h1>
      {data &&
        data.subblock_orders.map((subblock) => {
          if (subblock.subblock_test_id) {
            return <SubblockTest key={subblock.subblock_test_id} subblock={subblock} blockId={data.block_id}/>
          }
        })}
    </div>
  );
};

export default SubblockContainer;
