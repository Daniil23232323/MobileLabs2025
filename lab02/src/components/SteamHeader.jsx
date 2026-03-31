import {Container, ThemeText} from "../styles/style";
import styled from "styled-components/native";
import SteamLogoSVG from "./SteamLogoSVG";
import {useTheme} from "styled-components";
import {Ionicons} from "@expo/vector-icons";

const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 28px 20px 18px;
`

const TitleContainer = styled.View`
    flex-direction: row;
    align-items: flex-end;
    gap: 6px;
`
export default function SteamHeader({withSearch, title}) {
    const theme = useTheme();
    return (
        <HeaderContainer>
            <TitleContainer>
                <SteamLogoSVG fill={theme["NEUTRAL_COLOR"]} size={36}/>
                <ThemeText style={{fontSize: 28}}>{title}</ThemeText>
            </TitleContainer>
            {withSearch &&
                <Ionicons name="search" size={24} color={theme["SECONDARY_COLOR"]}/>
            }
        </HeaderContainer>
    )
}