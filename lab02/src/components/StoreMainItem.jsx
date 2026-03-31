import styled from "styled-components/native";
import {View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {ThemeMutedText, ThemeText} from "../styles/style";
import {LinearGradient} from "expo-linear-gradient";
import {useTheme} from "styled-components";

const Container = styled(View)`
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 1.5;
`;

const GameBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
    justify-content: flex-end;
`;

const Overlay = styled(LinearGradient)`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const Content = styled(View)`
    padding: 12px;
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const Title = styled(ThemeText)`
    font-size: 20px;
    font-weight: bold;
`;

const Description = styled(ThemeMutedText)`
    margin-bottom: 4px;
`;

const BottomContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const PriceContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.theme["SURFACE_COLOR"]}cc;
    border-radius: 6px;
    overflow: hidden;
`;

const DiscountText = styled(ThemeMutedText)`
    background-color: ${props => props.theme["POSITIVE_COLOR"]}50;
    font-weight: bold;
    padding: 4px 6px;
    margin-right: 6px;
`;

const PriceText = styled(ThemeMutedText)`
    text-decoration: line-through;
    opacity: 0.8;
`;

const NewPriceText = styled(ThemeMutedText)`
    padding-right: 6px;
    padding-left: 6px;
`;

const PlatformsContainer = styled(View)`
    flex-direction: row;
    gap: 6px;
`;

const Logo = styled(Ionicons)`
    color: ${props => props.theme["NEUTRAL_COLOR"]}aa;
`;

export default function StoreMainItem({title, description, price = 0, discount = 0, imageSource, platforms = []}) {
    const discountedPrice = (price - (price * discount) / 100).toFixed(0);
    const theme = useTheme();
    const gradientColor = theme["TRANSLUCENT_OVERLAY"];

    return (
        <Container>
            <GameBackground source={imageSource}>
                <Overlay colors={["transparent", gradientColor]}/>
                <Content>
                    <Title>{title}</Title>
                    <Description numberOfLines={1} ellipsizeMode="tail">
                        {description}
                    </Description>
                    <BottomContainer>
                        <PriceContainer>
                            {discount > 0 && price > 0 && (<>
                                <DiscountText>-{discount}%</DiscountText>
                                <PriceText>${price}</PriceText>
                            </>)}
                            <NewPriceText>{discountedPrice > 0 ? `\$${discountedPrice}` : 'Free'}</NewPriceText>
                        </PriceContainer>
                        <PlatformsContainer>
                            {platforms.includes("windows") && <Logo name="logo-windows" size={18}/>}
                            {platforms.includes("macos") && <Logo name="logo-apple" size={18}/>}
                        </PlatformsContainer>
                    </BottomContainer>
                </Content>
            </GameBackground>
        </Container>
    );
}
