import React from "react";
import { EmailInputItem } from "../EmailInput";
import { PillContainer } from "./PillContainer";
import { DeleteIconButton } from "./DeleteIconButton";
import { ErrorIcon } from "./ErrorIcon";

export interface PillProps {
    value: EmailInputItem;
    onDeleteClick: () => void;
}

export function Pill({
    value,
    onDeleteClick,
}: PillProps) {
    return (
        <PillContainer isValid={value.isValid}>
            {value.value}
            {
                !value.isValid && 
                (
                    <ErrorIcon className="hideOnHover" />
                )
            }
            <DeleteIconButton
                className="showOnHover"
                onClick={onDeleteClick}
            />
        </PillContainer>
    )
}