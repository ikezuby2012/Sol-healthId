import { IAccessControlData } from "@/base/types";
import BN from "bn.js";
import { ExternalLink, Shield } from "lucide-react";
import moment from "moment";
import RevokeAccessMenu from "../../revoke-access-menu";

interface Props {
  data: IAccessControlData[];
}
export default function WalletCard({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[300px] bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">No data found</p>
      </div>
    );
  }

  const convertBNToDate = (timestamp: BN) => {
    const millis = timestamp?.toNumber?.() * 1000; // assuming it's in seconds
    return moment(millis).format("YYYY-MM-DD HH:mm:ss");
  }

  return (
    <div className="grid #grid-cols-1 #md:grid-cols-2 #lg:grid-cols-3 gap-6">
      {data.length > 0 && data?.map((provider, i) => (
        <div
          key={`${provider.patient?.toString()}_${i}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {provider.provider?.toString()}
                </h3>
                <div className="flex items-center space-x-2">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {provider.patient?.toString()}
                  </code>
                  <a
                    href={`https://explorer.solana.com/address/${provider.patient?.toString()}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0A344f] hover:text-[#0a354fd8]"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
             {provider.isActive && <RevokeAccessMenu recordType={Object.keys(provider?.recordType)[0]} />}
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className={`h-4 w-4 ${Object.keys(provider?.recordType)[0] === 'Insurance' ? 'text-green-500' :
                    Object.keys(provider?.recordType)[0] === 'MedicalHistory' ? 'text-yellow-500' :
                      'text-gray-500'
                    }`} />
                  <span className="text-sm text-gray-700">{Object.keys(provider?.recordType)[0]}</span>
                </div>
                <span className="text-sm text-gray-500">
                  status: {provider.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="text-sm text-gray-500">
                {/* Last accessed: {new Date(provider.expires_at).toLocaleString()} */}
                expired at: {convertBNToDate(provider.expiresAt)}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50">
            <button
              className="w-full text-center text-sm font-medium text-[#0A344f] hover:text-[#0a354fd8]"
              onClick={() => console.log('View details clicked')}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}