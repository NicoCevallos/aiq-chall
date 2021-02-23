import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import { EmailInputContainer } from "./EmailInputContainer";
import { Input } from "./Input";
import { InputContainer } from "./InputContainer";
import { Pill } from "./Pill/Pill";
import { SuggestionList } from "./SuggestionList/SuggestionList";

export interface EmailInputItem {
    value: string;
    isValid: boolean;
}

export interface EmailInputProps {
    placeholder: string;
    values?: EmailInputItem[];
    onChange: (inputValue: string) => void;
    suggestions?: string[];
    onInput: (values: EmailInputItem[]) => void;
}

// As per the HTML5 Specification
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export function EmailInput({
    placeholder,
    values,
    onChange,
    suggestions,
    onInput
}: EmailInputProps) {
    const [inputValue, setInputValue] = useState("");
    const [selectedSuggestion, setSelectedSuggestion] = useState(-1);

    useEffect(() => {
        setSelectedSuggestion(-1);
    }, [suggestions])

    const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newInputValue = event.target.value;

        onChange(newInputValue);
        setInputValue(newInputValue);
    }, [onChange])

    const addValue = useCallback((value: string) => {
        const isValid = emailRegExp.test(value);

        onInput([
            ...(values ?? []),
            {
                value,
                isValid,
            }
        ]);

        setInputValue("");
        onChange("");
    }, [onChange, onInput, values])

    const removeValue = useCallback((index: number) => {
        if (values) {
            onInput([
                ...values.slice(0, index),
                ...values.slice(index + 1, values.length)
            ])
        }
    }, [onInput, values])

    const onInputKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        console.log("event.key", event.key)
        if (event.key === "Backspace" && !inputValue && values?.length) {
            removeValue(values?.length - 1);
        } else if (["Enter", "Tab"].includes(event.key)) {
            event.preventDefault();
            
            const value = selectedSuggestion !== -1 && suggestions?.length
                ? suggestions[selectedSuggestion]
                : inputValue;
            
            if (value) {
                addValue(value);
            }
        } else if (suggestions?.length) {
            if (event.key === "ArrowUp") {
                setSelectedSuggestion(
                    selectedSuggestion !== -1
                        ? selectedSuggestion -1
                        : suggestions?.length -1
                );
            } else if (event.key === "ArrowDown") {
                setSelectedSuggestion(
                    selectedSuggestion === suggestions?.length -1
                    ? -1
                    : selectedSuggestion +1
                );
            }
        } 
    }, [addValue, inputValue, removeValue, selectedSuggestion, suggestions, values?.length])

    const onSuggestionClick = useCallback((value: string) => {
        addValue(value);
    }, [addValue])

    return (
        <EmailInputContainer>
            {
                values?.map((value, index) => (
                    <Pill
                        key={index}
                        value={value}
                        onDeleteClick={() => removeValue(index)}
                    />
                ))
            }
            <InputContainer>
                <Input
                    placeholder={values?.length ? undefined : placeholder}
                    value={inputValue}
                    onChange={onInputChange}
                    onKeyDown={onInputKeyDown}
                />
                {
                    !!suggestions?.length &&
                    (
                        <SuggestionList
                            suggestions={suggestions}
                            selectedSuggestion={selectedSuggestion}
                            onSuggestionClick={onSuggestionClick}
                        />
                    )
                }
            </InputContainer>
        </EmailInputContainer>
    )
}