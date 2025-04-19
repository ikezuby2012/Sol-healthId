'use client';

import React, { useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import Popup from '@/components/atoms/Popup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useMedicalRecordProgram } from '@/components/healthId/healthId-data-access';
import { PublicKey } from '@solana/web3.js';
import Image from "next/image";


interface Props {
    open?: boolean;
    onChange: (e?: boolean) => void;
    publicKey: PublicKey | null;
}

export interface RecordProp {
    name: string; value: string;
}

export const recordTypes: RecordProp[] = [
    { name: "Medical History", value: "MedicalHistory" },
    { name: "Medication", value: "Medication" },
    { name: "Laboratory Results", value: "LabResults" },
    { name: "Imaging Reports", value: "Imaging" },
    { name: "Insurance", value: "Insurance" }
];

export function CreateMedicalRecordProps({ open, onChange, publicKey }: Props) {
    const { createMedicalRecord } = useMedicalRecordProgram();
    const [selectedType, setSelectedType] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const onBack = () => onChange();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);

            // Create preview URL for images
            if (selectedFile.type.startsWith('image/')) {
                const url = URL.createObjectURL(selectedFile);
                setPreviewUrl(url);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedType || !file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = response.data;

            console.log(data.secure_url);

            if (data.secure_url) {
                const url = data.secure_url
                const parts = url.split("https://res.cloudinary.com/");

                const imageUrl = parts[1];
                const recordId =  Math.floor(1000000000 + Math.random() * 9000000000).toString();
                const recordType = selectedType;

                await createMedicalRecord.mutateAsync({
                    recordId, recordType, imageUrl, patientIdentityKey: publicKey
                });
            }
        } catch (err: any) {
            toast.error(err?.message);
            return;
        } finally {
            setIsUploading(false);
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

                {/* <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">upload record</h2> */}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Record Type
                        </label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload File
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-upload"
                                accept="image/*,.pdf,.doc,.docx"
                                required
                            />
                            <label
                                htmlFor="file-upload"
                                className="w-full flex items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                            >
                                {previewUrl ? (
                                    <div className="space-y-4 w-full">
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            className="max-h-48 mx-auto object-contain"
                                        />
                                        <p className="text-sm text-center text-gray-500">
                                            {file?.name}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Images, PDF, or DOC up to 10MB
                                        </p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!selectedType || !file || isUploading}
                        className="w-full flex items-center justify-center px-4 py-2 bg-[#0A344f] text-white rounded-lg hover:bg-[#0a354fd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            'Upload Record'
                        )}
                    </button>
                </form>
            </div>
        </Popup>
    );
}