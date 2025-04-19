"use client";

import { useState } from "react";
import Popup from "@/components/atoms/Popup";
import { Clock, FileText, Loader2, X } from "lucide-react";
import { recordTypes } from "../create-medical-record";
import { useGlobarVar } from "@/base/store/useGlobalVar";
import { useAccessControlProgram } from "@/components/healthId/healthId-data-access";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";

interface Props {
    open?: boolean;
    onChange: (e?: boolean) => void;
}

const timeOptions = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' },
    { value: 240, label: '4 hours' },
    { value: 480, label: '8 hours' },
    { value: 1440, label: '24 hours' }
];

// Function to get the record type discriminant
export function getRecordTypeDiscriminant(recordTypeValue: string): number {
    switch (recordTypeValue.toLowerCase()) {
        case "medicalhistory":
            return 0; // Make sure this matches your Rust enum order
        case "medication":
            return 1;
        case "labResults":
            return 2;
        case "imaging":
            return 3;
        case "insurance":
            return 4;
        default:
            return 0;
    }
}


export function GrantAccessPopup({ onChange, open }: Props) {
    const { recordId } = useGlobarVar(state => state);
    const { publicKey } = useWallet();
    const { useGrantAccess } = useAccessControlProgram();
    const [selectedType, setSelectedType] = useState('');
    const [selectedTime, setSelectedTime] = useState('30');
    const [loading, setLoading] = useState(false);
    const onBack = () => onChange();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedType || !selectedTime) return;

        try {
            setLoading(true);

            const recordType = selectedType;
            const recordTypeDiscriminant = getRecordTypeDiscriminant(selectedType);
            const accessDuration = +selectedTime;
            const pubKey = publicKey!;

            // console.log({
            //     recordType, recordTypeDiscriminant, accessDuration, providerPublicKey: pubKey
            // });

            await useGrantAccess.mutateAsync({
                recordType, recordTypeDiscriminant, accessDuration, providerPublicKey: pubKey
            });
        } catch (err: any) {
            console.log(err, "error message")
            toast.error(err?.message);
            return;
        } finally {
            setLoading(false);
        }

        onBack();
    };
    return (
        <Popup title="Create Medical record" className="!max-w-[40%]" open={open} onChangeState={onChange}>
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onBack}
                    className="absolute top-[-2rem] right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Record Type
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                required
                            >
                                <option value="">Select a record type</option>
                                {recordTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Access Duration
                        </label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                required
                            >
                                {timeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>



                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={(!selectedType && !selectedTime) || loading}
                            className="w-full flex items-center justify-center px-4 py-2 bg-[#0A344f] text-white rounded-lg hover:bg-[#0a354fd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    <span>Uploading...</span>
                                </>
                            ) : (
                                'Grant Access'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Popup>
    );
}