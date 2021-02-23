import styled from "styled-components";

export interface PillContainerProps {
    isValid: boolean;
}

export const PillContainer = styled.div<PillContainerProps>`
    padding: 5px 8px;
    margin: 4px 6px;
    font-size: 14px;
    font-weight: bold;
    line-height: 18px;
    letter-spacing: -0.32px;
    border-radius: 6px;
    background: ${props => props.isValid ? 'transparent' : '#F3B7BD'};
    display: flex;
    align-items: center;
    :hover {
        ${props => props.isValid && 'background: #EDEDED;'}
        .hideOnHover {
            display: none;
        }
        .showOnHover {
            position: revert;
            z-index: revert;
        }
    }
    .showOnHover {
        position: absolute;
        z-index: -1;
    }
`;
