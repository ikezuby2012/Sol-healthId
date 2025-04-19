"use client";

import DropDown from "@/components/atoms/DropdownMenu";
import Link from "next/link";
import { MoreVertical } from "lucide-react"
import { useShowPopup } from "@/base/store/useShowPopup";
import { useGlobarVar } from "@/base/store/useGlobalVar";

export default function Index({recordId}: {recordId: string}) {
    const { setShowPopup } = useShowPopup(state => state);
    const {setRecordId} = useGlobarVar(state => state);

    const handleId = (type: string) => {
        setShowPopup("grant-access");
        setRecordId(type);
    }

    const EditMenu = () => {
        return (
            <div className="rounded-md flex flex-col gap-1 text-black  text-xs w-32">
                <button
                    onClick={() => handleId(recordId)}
                    className="hover:text-black hover:bg-stone-100 px-2 py-3 hover:w-full text-xs w-full capitalize text-left"
                >
                    Grant Access
                </button>
                {/* {mode === "active" ? <button
                            onClick={() => handleId("del")}
                            className="hover:text-black hover:bg-stone-100 px-2 py-3 hover:w-full text-xs w-full capitalize text-left"
                        >
                            deactivate
                        </button> : <button
                            onClick={() => handleId("del")}
                            className="hover:text-black hover:bg-stone-100 px-2 py-3 hover:w-full text-xs w-full capitalize text-left"
                        >
                            activate
                        </button>} */}
            </div>
        );
    };

    return (
        <div>
            <DropDown align="start" content={<EditMenu />}>
                <Link href={"#"}>
                    <MoreVertical size={20} className="cursor-pointer" />
                </Link>
            </DropDown>
        </div>
    );
}