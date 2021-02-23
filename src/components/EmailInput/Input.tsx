import styled from "styled-components";

export interface InputProps {
    minWidth?: number;
}

export const Input = styled.input<InputProps>`
    border: none;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.4px;
    width: 100%;
    ${props => props.minWidth && 'min-width: 100px;'}
    :focus {
        outline: none;
    }
    ::placeholder {
        color: #BDBDBD;
    }
`;