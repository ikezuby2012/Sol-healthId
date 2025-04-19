import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import WalletCard from "../molecules/app/provider/wallet-cards";
import { mockProviderRelationship } from "@/base/utils/dummy-data";
import { useAccessControlProgram } from "../healthId/healthId-data-access";
import { IAccessControlData } from "@/base/types";

const viewOptions = ['Table View', 'Card View'];

type TViewOption = 'Table View' | 'Card View';

export default function ProviderPage() {
    const [activeView, setActiveView] = useState<TViewOption>('Card View');
    const { accounts } = useAccessControlProgram();

    type filterKeys = keyof IAccessControlData;

    const [filterValue, setFilterValue] = useState<filterKeys | null>(null);

    const rawAccounts = accounts?.data as unknown as { account: IAccessControlData }[];

    const data: IAccessControlData[] = rawAccounts?.map((entry) => entry.account) ?? [];
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Healthcare Providers</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage provider wallet addresses and their associated access controls
                    </p>
                </div>

                {/* <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0A344f] hover:bg-[#0a354fd8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A344f] transition-colors duration-200"
              onClick={() => console.log('Add provider clicked')}
            >
              <Wallet className="h-5 w-5 mr-2" />
              Add Provider Wallet
            </button> */}
            </div>

            {/* View Toggle */}
            <div className="flex justify-end space-x-2">
                {/* {viewOptions.map((view) => (
                    <button
                        key={view}
                        onClick={() => setActiveView(view as TViewOption)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeView === view
                            ? 'bg-[#0A344f] text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {view}
                    </button>
                ))} */}
            </div>

            {activeView === 'Table View' ? (
                // <ProvidersTable />
                <></>
            ) : (
                <WalletCard data={data ?? []} />
            )}
        </div>
    );
}