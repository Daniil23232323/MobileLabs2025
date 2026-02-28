import {ThemeText} from "../styles/style";
import styled from "styled-components/native";
import {View} from "react-native";
import {useContext} from "react";
import {ThemeContext} from "../../App";

export const ThemeButton = styled.Pressable`
    padding: 10px;
    border: 1px solid ${(props) => props.theme['NEUTRAL_COLOR']};
`;
export const ThemeButtonText = styled.Text`
    font-size: 16px;
    color: ${(props) => props.theme['NEUTRAL_COLOR']};
`;

export default function AccountSettingsScreen() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20}}>
            <ThemeText>Current mode: </ThemeText>
            <ThemeButton onPress={() => toggleTheme()}>
                <ThemeButtonText>
                    {theme === 'dark' ? 'Dark' : 'Light'} Mode
                </ThemeButtonText>
            </ThemeButton>
        </View>
    )
}