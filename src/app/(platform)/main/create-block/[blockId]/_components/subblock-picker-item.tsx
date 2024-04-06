"use cleint";

interface SubblockPickerItemProps {
  subblockId: number;
  subblockName: string;
  handleSelect: () => void;
}

const SubblockPickerItem = ({
  subblockId = 1,
  subblockName,
  handleSelect,
}: SubblockPickerItemProps) => {
  return (
    <button
      className="w-full h-full flex items-center justify-center  transition-background hover:shadow-inner hover:bg-slate-200 "
      onClick={handleSelect}
    >
      <p className="text-center font-semibold">{subblockName}</p>
    </button>
  );
};

export default SubblockPickerItem;
