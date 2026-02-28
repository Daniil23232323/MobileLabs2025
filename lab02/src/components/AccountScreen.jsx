import Avatar from "./Avatar";
import {Container, ThemeText} from "../styles/style";
import styled from "styled-components/native";
import NavigationButton from "./NavigationButton";

const AvatarContainer = styled.View`
    align-items: center;
    gap: 6px;
`

const ButtonContainer = styled.View`
    width: 80%;
`

const MainContainer = styled(Container)`
    align-items: center;
    gap: 32px;
    padding-top: 32px;
`

export default function ({navigation}) {
    return (
        <MainContainer>
            <AvatarContainer>
                <Avatar status="online" imageSource={require('../assets/images/avatar.png')} size={98}/>
                <ThemeText style={{fontSize: 16}}>Andrii Volynets</ThemeText>
                <ThemeText>IPZ-23-4[2]</ThemeText>
            </AvatarContainer>
            <ButtonContainer>
                <NavigationButton title="Settings" onPress={() => navigation.navigate("Settings")} isFirst/>
                <NavigationButton title="Logout" onPress={() => navigation.navigate("Logout")} isLast/>
            </ButtonContainer>
        </MainContainer>
    )
}