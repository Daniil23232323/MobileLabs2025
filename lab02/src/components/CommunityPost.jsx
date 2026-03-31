import React from 'react';
import styled from 'styled-components/native';
import {Feather, Ionicons} from '@expo/vector-icons';
import {ThemeMutedText, ThemeText} from "../styles/style";

const CardContainer = styled.View`
    background-color: ${({theme}) => theme["BACKGROUND_COLOR"]};
    border-radius: 8px;
    padding: 20px;
`;

const RowLeft = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ProfileIcon = styled.Image`
    width: 34px;
    height: 34px;
    border-radius: 17px;
    margin-right: 12px;
`;

const SourceName = styled(ThemeText)`
    margin-right: 8px;
`;

const Badge = styled.View`
    background-color: ${props => props.theme["PRIMARY_COLOR"]};
    border-radius: 4px;
    padding: 2px 6px;
`;

const BadgeText = styled(ThemeText)`
    font-size: 8px;
`;

const CardImage = styled.Image`
    width: 100%;
    height: 180px;
    border-radius: 6px;
    margin-bottom: 12px;
`;

const Title = styled(ThemeText)`
    margin-bottom: 6px;
`;

const Subtitle = styled(ThemeMutedText)`
    margin-bottom: 12px;
`;

const Footer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
`;

const IconRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

const IconWithText = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: 16px;
`;

const LikeIconText = styled.Text`
    font-size: 14px;
    color: ${props => props.theme["POSITIVE_COLOR"]};
    font-weight: 500;
    margin-left: 4px;
`;

const CommentIconText = styled(ThemeMutedText)`
    color: ${props => props.theme["SECONDARY_COLOR"]};
    font-weight: 500;
    margin-left: 4px;
`;

const HeaderContainer = styled.View`
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 10px 0;
    `;
const Column = styled.View`
        flex-direction: column;
    `;

const RowTop = styled.View`
        flex-direction: row;
        align-items: center;
    `;

const Timestamp = styled(ThemeMutedText)`
        font-size: 12px;
        margin-top: 2px;
    `;

const Separator = styled.View`
    height: 1px;
    margin: 8px 0;
    background: ${props => props.theme["SECONDARY_COLOR"]};
`

const MutedFeatherIcon = styled(Feather)`
    color: ${props => props.theme["SECONDARY_COLOR"]};
`

const MutedIonicIcon = styled(Ionicons)`
    color: ${props => props.theme["SECONDARY_COLOR"]};
`

const PositiveIcon = styled(Feather)`
    color: ${props => props.theme["POSITIVE_COLOR"]};
`

function getTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffSeconds = (now - date) / 1000;

    if (diffSeconds < 0) {
        return 'In future';
    } else if (diffSeconds < 60) {
        return 'Just now';
    } else if (diffSeconds < 3600) {
        const minutes = Math.floor(diffSeconds / 60);
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else if (diffSeconds < 86400) {
        const hours = Math.floor(diffSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(diffSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
}

export default function CommunityPost({
                                          sourceName,
                                          publishedAt,
                                          title,
                                          subtitle,
                                          imageSource,
                                          likesCount,
                                          commentCount,
                                          badgeText,
                                          iconSource
                                      }) {
    const timeLabel = getTimeAgo(publishedAt);

    return (
        <CardContainer>
            <HeaderContainer>
                <RowLeft>
                    <ProfileIcon source={iconSource}/>

                    <Column>
                        <RowTop>
                            <SourceName>{sourceName}</SourceName>
                            {badgeText ? (
                                <Badge>
                                    <BadgeText>{badgeText}</BadgeText>
                                </Badge>
                            ) : null}
                        </RowTop>

                        <Timestamp>{timeLabel}</Timestamp>
                    </Column>
                </RowLeft>

                <MutedFeatherIcon name={"more-horizontal"} size={16}/>
            </HeaderContainer>


            {imageSource ? (
                <CardImage source={imageSource} resizeMode="cover"/>
            ) : null}

            <Title>{title}</Title>

            {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}

            <Separator />

            <Footer>
                <IconRow>
                    <PositiveIcon name="thumbs-up" size={16}/>
                    <LikeIconText>{likesCount}</LikeIconText>

                    <IconWithText>
                        <MutedFeatherIcon name="message-square" size={16}/>
                        <CommentIconText>{commentCount}</CommentIconText>
                    </IconWithText>
                </IconRow>

                <IconRow>
                    <IconWithText>
                        <MutedIonicIcon name="arrow-redo-outline" size={20}/>
                    </IconWithText>
                </IconRow>
            </Footer>
        </CardContainer>
    );
}
