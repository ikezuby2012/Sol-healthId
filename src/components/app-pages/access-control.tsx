"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockAccessControls } from "@/base/utils/dummy-data";
import filterDataUsingSearchQuery from "@/base/helper/Fetch_data_using_search_query";
import Table from "../molecules/app/table";
import { AccessControlColumn } from "../molecules/app/access-control/columns";
import { ShieldPlus } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAccessControlProgram } from "../healthId/healthId-data-access";
import { IAccessControlData } from "@/base/types";

const tabs = ['All'];

export default function AccessControlPages() {
    const { publicKey } = useWallet();
    const { accounts } = useAccessControlProgram();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState("");

    type filterKeys = keyof IAccessControlData;

    const [filterValue, setFilterValue] = useState<filterKeys | null>(null);

    const rawAccounts = accounts?.data as unknown as { account: IAccessControlData }[];

    const data: IAccessControlData[] = rawAccounts?.map((entry) => entry.account) ?? [];

    const filteredData = filterDataUsingSearchQuery({
        data: data ?? [],
        key: filterValue ?? "bump",
        query: searchQuery,
    });

    console.log(accounts, filteredData, "filtered data");
    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Access Records</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage and monitor access permissions for healthcare providers
                    </p>
                </div>

                {/* <button
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0A344f] hover:bg-[#0a354fd8] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    onClick={() => console.log('Create access control clicked')}
                >
                    <ShieldPlus className="h-5 w-5 mr-2" />
                    Create Access Control
                </button> */}
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

            <Table pageCount={50} data={data ?? []} columns={AccessControlColumn} />
        </div>
    )
}