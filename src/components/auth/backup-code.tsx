"use client";

import { Formik } from "formik";
import { AlertTriangle } from "lucide-react";
import { BackUpCodeSchema } from "@/base/helper/form_validation_schema";
import Input from "../atoms/Input/Index";
import { Loader2 } from "lucide-react";

interface Props {
    onPrevClick?(): void;
    onNextClick?(): void;
    updatePayload: (x: string, b: string | number | boolean) => void;
    isLoading: boolean
}

interface FormCredentials {
    backUpCode: string;
}
export default function BackUpCodePage({ onNextClick, onPrevClick, updatePayload, isLoading }: Props) {

    const handleForm = async (values: FormCredentials) => {
        updatePayload("backUpCode", values.backUpCode);
        onNextClick?.();
    };

    return (
        <Formik initialValues={{ backUpCode: "" }} validationSchema={BackUpCodeSchema} onSubmit={handleForm}>
            {({
                handleSubmit,
                handleChange,
                values,
                handleBlur,
                errors,
                touched,
            }) => (
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-gray-900">Backup Code</h2>
                    <p className="mt-2 text-gray-600">
                        Write your backup code somewhere safe. This is the only chance you'll get to do it. If you lose your healthcare identity and haven't done this, you won't be able to register again.
                    </p>

                    <div className="mt-8 space-y-6">
                        <div className="relative">
                            <Input
                                type="text"
                                name="backUpCode"
                                value={values.backUpCode}
                                onChange={handleChange}
                                placeholder="Backup code"
                                onBlur={handleBlur}
                                hint={
                                    touched.backUpCode && errors.backUpCode
                                        ? errors.backUpCode
                                        : ""
                                }
                                isError={!!(touched.backUpCode && errors.backUpCode)}
                                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A344f]"
                            />
                        </div>

                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-3">
                            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-800">
                                Make sure to store this backup code in a secure location. You won't be able to see it again after completing registration.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex space-x-4">
                        {isLoading ? <>
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            <span>Processing...</span>
                        </> : (
                            <>
                                <button
                                    type="button"
                                    onClick={onPrevClick}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-[#0A344f] text-white rounded-lg hover:bg-[#0a354fe1] transition-colors"
                                >
                                    Next
                                </button>
                            </>
                        )}
                    </div>
                </form>
            )}
        </Formik>
    )
}