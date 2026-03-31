import React from "react";
import styled from "styled-components/native";
import {ThemeMutedText} from "../styles/style";
import {useTheme} from "styled-components";

const Container = styled.ImageBackground`
    padding: 32px 16px;
    align-items: center;
    justify-content: center;
`;

const SubText = styled(ThemeMutedText)`
    color: ${props => props.theme["SECONDARY_TEXT_COLOR"]};
    margin-bottom: 8px;
`;

const CodeText = styled.Text`
    color: ${props => props.theme["NEUTRAL_COLOR"]};
    font-size: 54px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 24px;
`;

const ProgressBarContainer = styled.View`
    width: 50%;
    height: 7px;
    background-color: ${props => props.theme["BACKGROUND_COLOR"]};
    border-radius: 5px;
    overflow: hidden;
`;


export default function LoginStatusBlock({code, progress = 0.7}) {
    const ProgressFill = styled.View `
        width: ${progress * 100}%;
        height: 100%;
        background-color: ${props => props.theme["PRIMARY_COLOR"]};
    `;
    const theme = useTheme();
    return (
        <Container source={theme["GUARD_BACKGROUND"]}>
            <SubText>Logged in as player</SubText>
            <CodeText>{code}</CodeText>
            <ProgressBarContainer>
                <ProgressFill/>
            </ProgressBarContainer>
        </Container>
    );
}
