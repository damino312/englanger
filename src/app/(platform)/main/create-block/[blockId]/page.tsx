"use client";

import { useState } from "react";

const CreateBlockPage = () => {
  const [showSelectMenu, setShowSelectMenu] = useState<boolean>(false);
  const showSubblockMenu = () => {};
  return (
    <div className="w-full flex justify-center px-10">
      <form action="">
        <div></div>
        <div
          className="w-[420px] border-b border-x rounded-b-md  shadow-xl  flex justify-center py-3  bg-slate-100 hover:bg-slate-200 hover:border-slate-200  transition-background cursor-pointer   "
          onClick={() => setShowSelectMenu(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-14 h-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </form>
    </div>
  );
};

export default CreateBlockPage;
