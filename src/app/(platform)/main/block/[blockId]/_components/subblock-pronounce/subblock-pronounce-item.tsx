"use client";

import { useRef, useState } from "react";
import { FormInput } from "@/app/_components/form/form-input";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { updatePronounceItem } from "@/actions/update-pronounce-item";
import { FormErrors } from "@/app/_components/form/form-errors";
import { createPronounceItem } from "@/actions/create-pronounce-item";
import { deletePronounceItem } from "@/actions/delete-pronounce-item";

interface SubblockPronounceProps {
  pronounceItemId: number;
  subblockPronounceId: number;
  name: string;
  value: string;
  index: number;
}

const SubblockPronounceItem = ({
  subblockPronounceId,
  pronounceItemId,
  name,
  value,
  index,
}: SubblockPronounceProps) => {
  const [isValueEditing, setIsValueEditing] = useState(false);
  const valueRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(valueRef, onDisableChangeValue);
  useEventListener("keydown", onKeyDown);

  const { execute: executeUpdatePronounceItem, fieldErrors } = useAction(
    updatePronounceItem,
    {
      onSuccess: () => {
        onDisableChangeValue();
        toast.success("Имя сохранено");
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeletePronounceItem } = useAction(
    deletePronounceItem,
    {
      onSuccess: () => {
        toast.success("Пункт удален");
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  function onChangeValue() {
    setIsValueEditing(true);
    setTimeout(() => {
      valueRef.current?.focus();
    });
  }

  function onDisableChangeValue() {
    setIsValueEditing(false);
    valueRef.current?.blur();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onDisableChangeValue();
    }
  }

  function handleUpdateValue(formData: FormData) {
    const value = formData.get("pronounceValue");
    executeUpdatePronounceItem({
      pronounce_item_id: pronounceItemId,
      value: String(value),
      name: name,
    });
  }

  function handleDeletePronounceItem() {
    executeDeletePronounceItem({
      pronounce_item_id: pronounceItemId,
    });
  }

  return (
    <>
      {/* <div>
        <span>Описание:</span> {name || "Название"}
      </div> */}

      {isValueEditing ? (
        <form action={handleUpdateValue}>
          <FormInput
            ref={valueRef}
            id="name"
            name="pronounceValue"
            defaultValue={value}
            errors={fieldErrors}
          />
        </form>
      ) : (
        <div className="flex items-center gap-4 ">
          <p onClick={onChangeValue}>
            <span className="font-semibold" title="Для произношения учеником">
              Слово или фраза:{" "}
            </span>
            {value || "Слово"}
          </p>
          <form action={handleDeletePronounceItem}>
            <button className="group p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 group-hover:stroke-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SubblockPronounceItem;

// const SubblockPronounce = ({ blockId, subblock }: SubblockPronounceProps) => {
//   const pronounceSubblock = subblock.subblock_pronounce;

//   const nameRef = useRef<HTMLInputElement>(null);
//   const valueRef = useRef<HTMLInputElement>(null);

//   const [isNameEditing, setIsNameEditing] = useState(false);
//   const [isWordEditing, setIsWordEditing] = useState(false);
//   const { execute: executeUpdateSubblockPronounce } = useAction(
//     updateSubblockPronounce,
//     {
//       onSuccess: () => {
//         setIsNameEditing(false);
//         toast.success("Имя сохранено");
//         disableEditing();
//       },
//       onError: (error) => {
//         toast.error(error);
//       },
//     }
//   );

//   useOnClickOutside(nameRef, disableEditing);
//   useOnClickOutside(valueRef, disableEditing);
//   useEventListener("keydown", onKeyDown);

//   function updateName(formData: FormData) {
//     const name = formData.get("pronounceName");
//     executeUpdateSubblockPronounce({
//       name: String(name),
//       subblock_pronounce_id: pronounceSubblock!.subblock_pronounce_id, // using ! operator
//       description: "",
//       value: pronounceSubblock!.value, // using ! operator
//     });
//   }

//   function updateValue(formData: FormData) {
//     const value = formData.get("pronounceValue");
//     executeUpdateSubblockPronounce({
//       name: pronounceSubblock!.name,
//       subblock_pronounce_id: pronounceSubblock!.subblock_pronounce_id, // using ! operator
//       description: "",
//       value: String(value),
//     });
//   }

//   function onKeyDown(e: KeyboardEvent) {
//     if (e.key === "Escape") {
//       disableEditing();
//     }
//   }

//   function disableEditing() {
//     setIsNameEditing(false);
//     setIsWordEditing(false);
//   }

//   return (
//     <div className="mx-2 p-4 border border-black rounded-xl mb-8 ">
//       <div className="flex justify-between">
//         <>
//           {isNameEditing ? (
//             <form action={updateName}>
//               <FormInput
//                 ref={nameRef}
//                 id="pronounceName"
//                 name="pronounceName"
//                 defaultValue={pronounceSubblock?.name}
//               />
//             </form>
//           ) : (
//             <p
//               className="text-xl font-bold text-center"
//               role="button"
//               onClick={() => setIsNameEditing(true)}
//             >
//               {pronounceSubblock?.name}
//             </p>
//           )}
//         </>
//         <>
//           {isWordEditing ? (
//             <form action={updateValue}>
//               <FormInput
//                 ref={valueRef}
//                 id="pronounceValue"
//                 name="pronounceValue"
//                 defaultValue={pronounceSubblock?.value}
//               />
//             </form>
//           ) : (
//             <p
//               className="text-xl font-bold text-center"
//               role="button"
//               onClick={() => setIsWordEditing(true)}
//             >
//               {pronounceSubblock?.value}
//             </p>
//           )}
//         </>
//         <SubblockDeleteForm
//           subblockId={pronounceSubblock?.subblock_pronounce_id as number}
//           type={2}
//         />
//       </div>
//     </div>
//   );
// };
// export default SubblockPronounce;
