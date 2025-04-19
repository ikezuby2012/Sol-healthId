"use client";

import { useState, useRef, useEffect } from "react";
import { Fingerprint, Scan } from 'lucide-react';
import toast from "react-hot-toast";

interface Props {
    onNextClick?(): void;
}

export default function BiometricPage({ onNextClick }: Props) {
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const startCamera = async () => {
        console.log("start camera")
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }, // 'user' selects the front camera
            });
            setVideoStream(stream);
            // if (videoRef.current) {
            //     console.log("it hit here from video")
            //     videoRef.current.srcObject = stream;
            // }
        } catch (error) {
            console.error('Error accessing the camera:', error);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0);
                // Here you can handle the captured image data
                // canvas.toDataURL() will give you the image as base64
                const imageData = canvas.toDataURL('image/png'); // Base64 image data
                setPhoto(imageData);
                toast.success('Photo captured successfully');
                stopCamera();
            }
        }
    };

    // Step 3: Stop the camera stream
    const stopCamera = () => {
        if (videoStream) {
            videoStream.getTracks().forEach((track) => track.stop());
            setVideoStream(null);
        }
    };

    useEffect(() => {
        if (videoStream && videoRef.current) {
            videoRef.current.srcObject = videoStream;
        }
    }, [videoStream]);


    const [formData, setFormData] = useState({
        biometricMethod: '' as '' | 'fingerprint' | 'facial'
    });

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900">Biometric Registration</h2>
            <p className="mt-2 text-gray-600">
                Add a biometric to your device to make it easier to access your healthcare identity in the future.
            </p>

            <div className="mt-8 space-y-4">
                <button
                    onClick={() => {
                        setFormData(prev => ({ ...prev, biometricMethod: 'fingerprint' }));
                        toast.error("No device Connected!")
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 border ${formData.biometricMethod === 'fingerprint'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                        } rounded-lg transition-colors`}
                >
                    <div className="flex items-center space-x-3">
                        <Fingerprint className={`h-6 w-6 ${formData.biometricMethod === 'fingerprint' ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className={`font-medium ${formData.biometricMethod === 'fingerprint' ? 'text-blue-700' : 'text-gray-700'}`}>
                            Fingerprint
                        </span>
                    </div>
                    {formData.biometricMethod === 'fingerprint' && (
                        <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                    )}
                </button>

                <button
                    onClick={() => {
                        setFormData(prev => ({ ...prev, biometricMethod: 'facial' }));
                        startCamera();
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 border ${formData.biometricMethod === 'facial'
                        ? 'border-[#0A344f] bg-blue-50'
                        : 'border-gray-300 hover:border-[#0A344f] hover:bg-blue-50'
                        } rounded-lg transition-colors`}
                >
                    <div className="flex items-center space-x-3">
                        <Scan className={`h-6 w-6 ${formData.biometricMethod === 'facial' ? 'text-[#0A344f]' : 'text-gray-400'}`} />
                        <span className={`font-medium ${formData.biometricMethod === 'facial' ? 'text-[#0A344f]' : 'text-gray-700'}`}>
                            Facial recognition
                        </span>
                    </div>
                    {formData.biometricMethod === 'facial' && (
                        <div className="h-4 w-4 rounded-full bg-[#0A344f]"></div>
                    )}
                </button>

                {videoStream && (
                    <div className="mt-6 space-y-4">
                        <div className="relative rounded-lg overflow-hidden border-2 border-[#0A344f]">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={capturePhoto}
                                className="flex-1 px-4 py-2 bg-[#0A344f] text-white rounded-lg hover:bg-[#0a354fd8] transition-colors"
                            >
                                Capture Photo
                            </button>
                            <button
                                onClick={stopCamera}
                                className="flex-1 px-4 py-2 border border-[#0A344f] text-[#0A344f] rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Stop Camera
                            </button>
                        </div>
                    </div>
                )}

                {photo && (
                    <div>
                        <h2>Captured Photo</h2>
                        <img src={photo} alt="Captured" style={{ width: '100%', maxWidth: '400px' }} />
                    </div>
                )}
            </div>

            <p className="mt-6 text-sm text-gray-500">
                You'll need to do this every time you create a new secure key.
            </p>

            <div className="mt-8">
                <button
                    type="button"
                    disabled={!photo}
                    onClick={onNextClick}
                    className="w-full px-4 py-2 bg-[#0A344f] text-white rounded-lg hover:bg-[#0a354fde] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>
        </>
    )
}