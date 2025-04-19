"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import AppTable from "../molecules/app/table";
import filterDataUsingSearchQuery from "@/base/helper/Fetch_data_using_search_query";
import { MedicalRecordColumn } from "../molecules/app/table/Column";
import { NotebookPen } from "lucide-react";
import { CreateMedicalRecordProps } from "../molecules/app/create-medical-record";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMedicalRecordProgram } from "../healthId/healthId-data-access";
import { IMedicalRecord } from "@/base/types";
import { useShowPopup } from "@/base/store/useShowPopup";
import { GrantAccessPopup } from "../molecules/app/grant-access";

const tabs = ['All'];

export default function AppPages() {
    const { publicKey } = useWallet();
    const { accounts } = useMedicalRecordProgram();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState("");

    const { showPopup, setShowPopup } = useShowPopup(state => state);

    type filterKeys = keyof IMedicalRecord;

    const [filterValue, setFilterValue] = useState<filterKeys | null>(null);

    const rawAccounts = accounts?.data as unknown as { account: IMedicalRecord }[];

    const data: IMedicalRecord[] = rawAccounts?.map((entry) => entry.account) ?? [];

    const filteredData = filterDataUsingSearchQuery({
        data: data ?? [],
        key: filterValue ?? "recordId",
        query: searchQuery,
    });

    return (
        <div className="space-y-6">

            {showPopup === "create-medical-record" && (
                <CreateMedicalRecordProps
                    open={showPopup == "create-medical-record"}
                    onChange={() => setShowPopup(null)}
                    publicKey={publicKey}
                />
            )}

            {showPopup === "grant-access" && (
                <GrantAccessPopup open={showPopup === "grant-access"} onChange={() => setShowPopup(null)} />
            )}

            <div className="flex items-center justify-between">
                <div className="">
                    <h1 className="text-2xl font-semibold text-gray-900">Access Records</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage and monitor Medical Records
                    </p>
                </div>

                <button
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0A344f] hover:bg-[#0a354fd8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    onClick={() => setShowPopup("create-medical-record")}
                >
                    <NotebookPen className="h-5 w-5 mr-2" />
                    Create Medical record
                </button>
            </div>
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
                  `}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <AppTable pageCount={100} data={filteredData} columns={MedicalRecordColumn} />
        </div>
    )
}