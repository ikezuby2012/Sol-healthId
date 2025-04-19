"use client";

import { cn } from "../../../base/utils";

import React, { useState } from "react";
import { Info } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
    label?: string;
    hint?: string;
    /** errors are considered as being hints, enable hints and errors at the same time
     *  using as standalone, you should have
     * @example
     * ```tsx
     * <Input {...props} hint={error.name} isError={Boolean(error.name)} />
     * ```
     */
    isError?: boolean;
    /** Pass custom icon to hint icon or true to show default icon */
    hintIcon?: React.ReactNode | true;
    labelClass?: string;
    inputClass?: string;
    hintClass?: string;
    parentClass?: string;
    required?: boolean;
    password?: boolean;
    iconcolor?: string;
    iconSize?: number;
    btnClass?: string;
    defaultValue?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const [shouldNotShowPassword, setShouldNotShowPassword] = useState(true);
    const {
        label,
        type = "text",
        name,
        id,
        isError,
        hint,
        className,
        labelClass,
        hintIcon,
        parentClass,
        hintClass,
        required,
        password,
        defaultValue,
        inputClass,
        iconSize,
        ...prop
    } = props;

    return (
        <div className={cn("space-y-2 w-full", parentClass)}>
            <label
                className={cn(
                    "grid grid-cols-1 gap-2 text-sm text-black capitalize",
                    labelClass
                )}
            >
                <p className="font-medium flex items-center align-middle content-center">
                    {label}{" "}
                    {label && required && (
                        <span className="text-red-500 flex content-center">*</span>
                    )}
                </p>
                <span
                    className={cn(
                        "flex justify-between content-center align-middle w-full border-2 border-black rounded-lg p-4 py-3 outline-transparent placeholder:text-pale-black focus-visible:border-primary focus-visible:outline-none sm:py-2",
                        isError && "!border-danger-1",
                        className
                    )}
                >
                    <p className="w-full">
                        <input
                            {...prop}
                            ref={ref}
                            type={shouldNotShowPassword && password ? type : "text"}
                            name={name}
                            className={cn(
                                inputClass,
                                "w-full outline-transparent focus-visible:outline-none bg-transparent"
                            )}
                            id={id ?? name}
                            defaultValue={defaultValue}
                        />
                    </p>
                    {password && (
                        <button
                            aria-label={
                                shouldNotShowPassword ? "Hide Password" : "Show Password"
                            }
                            type="button"
                            onClick={() => setShouldNotShowPassword((c) => !c)}
                            className={cn("text-[#ede6e6]", props.btnClass)}
                        >
                            {shouldNotShowPassword ? (
                                <EyeOff
                                    size={iconSize ?? 20}
                                    className={cn(prop.iconcolor, "text-gray-100")}
                                />
                            ) : (
                                <Eye
                                    size={iconSize ?? 20}
                                    className={cn(prop.iconcolor, "text-gray-100")}
                                />
                            )}
                        </button>
                    )}
                </span>
            </label>
            {hint && (
                <div
                    className={cn(
                        "flex items-start gap-1 text-sm text-pale-black",
                        isError && "text-red-500",
                        hintClass
                    )}
                >
                    {hintIcon
                        ? hintIcon === true && <Info size={20} />
                        : hintIcon}
                    {hint}
                </div>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;