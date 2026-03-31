import React from "react";
import styled from "styled-components/native";
import {Ionicons} from "@expo/vector-icons";
import {ThemeMutedText, ThemeText} from "../styles/style";

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    padding: 10px 20px;
    margin: 4px 0;
`;

const ImageContainer = styled.View`
    width: 72px;
    aspect-ratio: 1.5;
    border-radius: 8px;
    overflow: hidden;
`;

const GameImage = styled.Image`
    width: 100%;
    height: 100%;
`;

const InfoContainer = styled.View`
    flex: 1;
    margin-left: 10px;
`;

const PlatformsRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 4px;
`;

const PlatformIcon = styled(Ionicons)`
    color: ${props => props.theme["SECONDARY_TEXT_COLOR"]};
    margin-right: 4px;
`;

const PriceContainer = styled.View`
    align-items: flex-end;
    margin-left: auto;
`;

const OldPrice = styled(ThemeMutedText)`
    text-decoration: line-through;
    font-size: 12px;
`;

const NewPrice = styled(ThemeText)`
    font-size: 18px;
    margin: 2px 5px 2px 0;
    opacity: 0.8;
`;

const DiscountBadge = styled.View`
    background-color: ${props => props.theme["POSITIVE_COLOR"]}50;
    border-radius: 4px;
    padding: 4px;
    margin-top: 2px;
`;

const DiscountText = styled(ThemeMutedText)`
    font-size: 12px;
`;

const PriceRow = styled.View`
    flex-direction: row;
    align-items: baseline;
    gap: 5px;
`;

export default function StoreItem({
                                      imageSource,
                                      title,
                                      platforms = [],
                                      price = 0,
                                      discount = 0
                                  }) {
    const platformNames = [];
    if (platforms.includes("windows")) platformNames.push("Windows");
    if (platforms.includes("macos")) platformNames.push("Mac");
    const oldPrice = price;
    const newPrice = (price - (price * discount) / 100).toFixed(0);

    return (
        <Container activeOpacity={0.8}>
            <ImageContainer>
                <GameImage source={imageSource}/>
            </ImageContainer>

            <InfoContainer>
                <ThemeText numberOfLines={1} ellipsizeMode="tail">
                    {title}
                </ThemeText>
                <PlatformsRow>
                    {platforms.includes("windows") && (
                        <PlatformIcon name="logo-windows" size={14}/>
                    )}
                    {platforms.includes("macos") && (
                        <PlatformIcon name="logo-apple" size={14}/>
                    )}
                    <ThemeMutedText numberOfLines={1} ellipsizeMode={"tail"}>{platformNames.join(", ")}</ThemeMutedText>
                </PlatformsRow>
            </InfoContainer>

            <PriceContainer>
                <PriceRow>
                    {oldPrice > newPrice && <OldPrice>${oldPrice}</OldPrice>}
                    <NewPrice>{newPrice > 0 ? `\$${newPrice}` : 'Free'}</NewPrice>
                </PriceRow>
                {discount > 0 && oldPrice > 0 && (
                    <DiscountBadge>
                        <DiscountText>-{discount}%</DiscountText>
                    </DiscountBadge>
                )}
            </PriceContainer>
        </Container>
    );
}
