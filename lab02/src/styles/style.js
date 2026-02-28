import styled from "styled-components/native";
import {SafeAreaView} from "react-native-safe-area-context";

export const SafeContainer = styled(SafeAreaView)`
    flex: 1;
    background-color: ${props => props.theme['BACKGROUND_COLOR']};
`

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme['BACKGROUND_COLOR']};
`

export const ThemeText = styled.Text`
    color: ${props => props.theme['NEUTRAL_COLOR']};
    font-family: 'ABeeZee-Regular';
    font-size: 16px;
`

export const ThemeMutedText = styled (ThemeText)`
    color: ${props => props.theme['SECONDARY_TEXT_COLOR']};
    font-size: 14px;
`