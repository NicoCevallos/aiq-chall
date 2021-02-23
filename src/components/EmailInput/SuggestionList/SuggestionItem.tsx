import styled from "styled-components";

export interface SuggestionItemProps {
    selected: boolean;
}
export const SuggestionItem = styled.div<SuggestionItemProps>`
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.4px;
    margin-bottom: 4px;
    padding: 7px 21px;
    :hover {
        background: #EFF5F9;
    }
    ${props => props.selected && 'background: #EFF5F9;'}
`;