'use client';

import { Formik } from "formik";
import { CreatePersonIdentitySchema } from "@/base/helper/form_validation_schema";
import Input from "../atoms/Input/Index";

interface Props {
    onNextClick?(): void;
    updatePayload: (payload: CreatePersonIdentityFormCredentials) => void;
}

export function CreatePersonIdentity({ onNextClick, updatePayload }: Props) {

    const handleForm = async (values: CreatePersonIdentityFormCredentials) => {
        updatePayload(values);
        onNextClick?.();
    };

    return (
        <Formik initialValues={{ firstName: "", lastName: "", email: "", phoneNumber: "", DD: "", MM: "", YYYY: "" }} validationSchema={CreatePersonIdentitySchema} onSubmit={handleForm}>
            {({
                handleSubmit,
                handleChange,
                values,
                handleBlur,
                errors,
                touched,
            }) => (
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <Input
                            onBlur={handleBlur}
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            placeholder="First name"
                            hint={
                                touched.firstName && errors.firstName
                                  ? errors.firstName
                                  : ""
                              }
                              isError={!!(touched.firstName && errors.firstName)}
                            className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            onBlur={handleBlur}
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            placeholder="Last name"
                            hint={
                                touched.lastName && errors.lastName
                                  ? errors.lastName
                                  : ""
                              }
                              isError={!!(touched.lastName && errors.lastName)}
                            className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <Input
                            type="text"
                            name="DD"
                            value={values.DD}
                            maxLength={2}
                            minLength={2}
                            onChange={handleChange}
                            placeholder="DD"
                            onBlur={handleBlur}
                            hint={
                                touched.DD && errors.DD
                                  ? errors.DD
                                  : ""
                              }
                              isError={!!(touched.DD && errors.DD)}
                            className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Input
                            type="text"
                            name="MM"
                            maxLength={2}
                            minLength={2}
                            value={values.MM}
                            onChange={handleChange}
                            placeholder="MM"
                            onBlur={handleBlur}
                            hint={
                                touched.MM && errors.MM
                                  ? errors.MM
                                  : ""
                              }
                              isError={!!(touched.MM && errors.MM)}
                            className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Input
                            type="text"
                            name="YYYY"
                            value={values.YYYY}
                            maxLength={4}
                            minLength={4}
                            onChange={handleChange}
                            placeholder="YYYY"
                            onBlur={handleBlur}
                            hint={
                                touched.YYYY && errors.YYYY
                                  ? errors.YYYY
                                  : ""
                              }
                              isError={!!(touched.YYYY && errors.YYYY)}
                            className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Email"
                            onBlur={handleBlur}
                            hint={
                                touched.email && errors.email
                                  ? errors.email
                                  : ""
                              }
                              isError={!!(touched.email && errors.email)}
                            className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Input
                            type="tel"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone number"
                            onBlur={handleBlur}
                            hint={
                                touched.phoneNumber && errors.phoneNumber
                                  ? errors.phoneNumber
                                  : ""
                              }
                              isError={!!(touched.phoneNumber && errors.phoneNumber)}
                            className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        //onClick={() => setStep(prev => Math.min(prev + 1, totalSteps))}
                        className="w-full px-4 py-2 bg-[#0A344f]  text-white rounded-lg hover:bg-[#0a354fd6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue
                    </button>
                </form>
            )}
        </Formik>

    );
}