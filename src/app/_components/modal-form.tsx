"use client";
import { createBlock } from "@/actions/create-block";
import { useAction } from "@/hooks/use-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function ModalComponent({
  children,
  isOpen,
  onOpenChange,
  title,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
}) {
  const route = useRouter();
  const { execute } = useAction(createBlock, {
    onSuccess: (data) => {
      toast.success("Блок создан");
      route.push(`/main/create-block/${data.block_id}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;

    execute({ name });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-1 text-black text-3xl">
            {title}
          </DialogTitle>
          <DialogDescription>
            <form action={onSubmit}>{children}</form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
