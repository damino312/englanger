"use client";

import SubblockPickerItem from "./subblock-picker-item";

interface SubblockPickerProps {
  setSelectedSubblockId: React.Dispatch<React.SetStateAction<number>>;
}

const SubblockPicker = ({ setSelectedSubblockId }: SubblockPickerProps) => {
  return (
    <div className=" w-[520px] h-[90px] border shadow-2xl my-4">
      <div className="flex h-full gap-4 ">
        <SubblockPickerItem
          handleSelect={() => {
            setSelectedSubblockId(1);
          }}
          subblockId={1}
          subblockName="Тест"
        />
        <SubblockPickerItem
          handleSelect={() => {
            setSelectedSubblockId(2);
          }}
          subblockId={2}
          subblockName="Описание"
        />
        <SubblockPickerItem
          handleSelect={() => {
            setSelectedSubblockId(3);
          }}
          subblockId={3}
          subblockName="Произношение"
        />
      </div>
    </div>
  );
};

export default SubblockPicker;
