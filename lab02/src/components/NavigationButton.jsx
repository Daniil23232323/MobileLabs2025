import styled from 'styled-components/native';
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {ThemeText} from "../styles/style";

const NavigationButtonContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme['ACCENT_BACKGROUND_COLOR']};
    padding: 16px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme['BACKGROUND_COLOR']};
    ${({isFirst}) => isFirst && `
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  `}
    ${({isLast}) => isLast && `
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border-bottom-width: 0;
  `}
`;

const NavigationButtonIcon = styled(Ionicons)`
    color: ${props => props.theme['SECONDARY_COLOR']};
`

export default function NavigationButton({title, isFirst, isLast, onPress}) {
    return (
        <NavigationButtonContainer isFirst={isFirst} isLast={isLast} onPress={onPress}>
            <ThemeText>{title}</ThemeText>
            <NavigationButtonIcon name="chevron-forward" size={16}/>
        </NavigationButtonContainer>
    )
}