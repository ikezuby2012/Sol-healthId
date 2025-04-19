"use client";

import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/base/utils";

interface Props {
    title?: string;
    children: React.ReactNode;
    className?: string;
    open?: boolean;
    onChangeState?: (e?: boolean) => void;
}


const Popup = ({ title, children, open, onChangeState, className }: Props) => {
    useEffect(() => {
        if (open) {
            document.getElementById("dashlayout")?.classList.add("opacity-[0.4]");
        }

        return () => {
            document.getElementById("dashlayout")?.classList.remove("opacity-[0.4]");
        };
    }, [open]);

    return (
        <Dialog.Root open={open} onOpenChange={onChangeState}>
            <Dialog.Portal>
                <Dialog.Overlay
                    className={cn(
                        "bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0"
                    )}
                />
                <Dialog.Content
                    className={cn(
                        className,
                        "data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-[99999999] max-h-[89vh] w-[90vw] max-w-[50rem] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                    )}
                >
                    {title && (
                        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                            {title}
                        </Dialog.Title>
                    )}
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Popup;