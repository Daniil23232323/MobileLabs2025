import LoginStatusBlock from "./LoginStatusBlock";
import {Container, ThemeText} from "../styles/style";
import styled from "styled-components/native";
import NavigationButton from "./NavigationButton";

const PrimaryThemeText = styled(ThemeText)`
    color: ${props => props.theme['PRIMARY_COLOR']};
`
const TextContainer = styled.View`
    padding: 14px 20px 0;
    gap: 14px;
`

const ButtonContainer = styled.View`
    width: 90%;
    justify-content: center;
    align-self: center;
    margin-top: 24px;
`
export default function GuardScreen() {
    return (
        <Container>
            <LoginStatusBlock code="N5KCV" progress={0.8}/>
            <TextContainer>
                <ThemeText style={{fontSize: 14}}>
                    You’ll enter your code each time you enter your
                    password to sign in to your Steam account.
                </ThemeText>
                <PrimaryThemeText style={{fontSize: 14}}>
                    Tip: If you don't share your PC, you can select "Remember my password" when you sign in to the PC
                    client to enter your password and authenticator code less often.
                </PrimaryThemeText>
            </TextContainer>
            <ButtonContainer>
                <NavigationButton title="Remove Authenticator" isFirst/>
                <NavigationButton title="My Recovery Code"/>
                <NavigationButton title="Help" isLast/>
            </ButtonContainer>
        </Container>
    )
}