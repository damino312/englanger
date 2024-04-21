import React, { forwardRef } from "react";
import { FormInput } from "@/app/_components/form/form-input";
import { useOnClickOutside } from "usehooks-ts";

interface SubblockRenameFormProps {
  subblock_id: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  disableRenaming: () => void;
}

const SubblockRenameForm = forwardRef<
  HTMLInputElement,
  SubblockRenameFormProps
>(({ subblock_id, disableRenaming, inputRef }, ref) => {
  useOnClickOutside(inputRef, () => {
    disableRenaming();
  });
  return (
    <>
      <form action="">
        <FormInput id="subblock_id" name="subblock_name" ref={ref} />
        <input type="hidden" name="subblock_id" value={subblock_id} />
      </form>
    </>
  );
});
export default SubblockRenameForm;
SubblockRenameForm.displayName = "SubblockRenameForm";
