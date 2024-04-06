import { BlockData } from "../page";

const SubblockContainer = ({ data }: { data: BlockData | null }) => {
  if (!data) {
    return null;
  }
  return (
    <div className="my-4 w-full h-full mx-8 border border-black">
      <h1 className=" text-center font-semibold text-2xl">{data.name}</h1>
      <div></div>
    </div>
  );
};

export default SubblockContainer;
