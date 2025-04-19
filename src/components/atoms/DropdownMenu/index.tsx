"use client";
 
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface Props {
    content?: React.ReactNode;
    children: React.ReactNode;
    align?: "start" | "center" | "end";
}
const Index = ({ children, content, align }: Props) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className=" z-[9999999] bg-transparent rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                    align={align}
                >
                    {content}
                    {/* <DropdownMenu.Arrow className="fill-white" /> */}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default Index;