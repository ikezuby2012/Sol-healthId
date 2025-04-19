"use client";

import Link from "next/link";
import { MoreVertical } from "lucide-react"

import DropDown from "@/components/atoms/DropdownMenu";
import { useAccessControlProgram } from "@/components/healthId/healthId-data-access";
import { getRecordTypeDiscriminant } from "../grant-access";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";

interface Props {
    recordType: string;
}
export default function RevokeAcessMenu({ recordType }: Props) {
    const { useRevokeAccess } = useAccessControlProgram();
    const { publicKey } = useWallet();


    const handle = async (arg: string) => {
        console.log(arg, "hello guy");

        try {
            const recordTypeDiscriminant = getRecordTypeDiscriminant(recordType);

            console.log(recordTypeDiscriminant);

           await useRevokeAccess.mutateAsync({ recordTypeDiscriminant, providerPublicKey: publicKey! });
        } catch (err: any) {
            console.log(err, "error message")
           // toast.error(err?.message);
            return;
        }
    }

    const RevokeAccess = () => {
        return (
            <div className="rounded-md flex flex-col gap-1 text-black  text-xs w-32">
                <button
                    onClick={() => handle("hello")}
                    className="hover:text-black hover:bg-stone-100 px-2 py-3 hover:w-full text-xs w-full capitalize text-left"
                >
                    revoke Access
                </button>
            </div>
        )
    }

    return (
        <div>
            <DropDown align="start" content={<RevokeAccess />}>
                <Link href={"#"}>
                    <MoreVertical size={20} className="cursor-pointer" />
                </Link>
            </DropDown>
        </div>
    )
}