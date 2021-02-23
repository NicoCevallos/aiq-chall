import React from "react";
import { LinearGradient } from "./LinearGradient";
import { SuggestionItem } from "./SuggestionItem";
import { SuggestionItemsContainer } from "./SuggestionItemsContainer";
import { SuggestionsContainer } from "./SuggestionsContainer";

export interface SuggestionListProps {
    suggestions?: string[];
    selectedSuggestion: number;
    onSuggestionClick: (value: string) => void;
}

export function SuggestionList({
    suggestions,
    selectedSuggestion,
    onSuggestionClick,
}: SuggestionListProps) {
    return (
        <SuggestionsContainer>
            <SuggestionItemsContainer>
                {
                    suggestions?.map((value, index) => (
                        <SuggestionItem
                            key={index}
                            selected={index === selectedSuggestion}
                            onClick={() => onSuggestionClick(value)}
                        >
                            {value}
                        </SuggestionItem>
                    ))
                }
            </SuggestionItemsContainer>
            <LinearGradient />
        </SuggestionsContainer>
    )
}