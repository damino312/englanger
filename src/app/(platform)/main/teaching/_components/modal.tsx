import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/_components/ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  description?: string;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
}

const ModalComponent = ({
  children,
  isOpen,
  onOpenChange,
  description,
  title,
}: ModalProps) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="h-full max-h-[60%]">
          <DialogHeader>
            <DialogTitle className="flex flex-col gap-1 text-black text-3xl">
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            {children}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalComponent;
