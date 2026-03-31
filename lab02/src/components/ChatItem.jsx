import styled from "styled-components/native";
import Avatar from "./Avatar";
import {ThemeMutedText, ThemeText} from "../styles/style";

const ChatItemContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 12px 0;
    justify-content: space-between;
`;

const LeftSection = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    flex: 1;
`;

const ChatContentContainer = styled.View`
    flex-direction: column;
    gap: 4px;
    flex-shrink: 1;
`;

const MessageRow = styled.View`
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
`;

const UnreadBadge = styled.View`
    background-color: ${props => props.theme["PRIMARY_COLOR"]};
    width: 22px;
    height: 22px;
    border-radius: 11px;
    align-items: center;
    justify-content: center;
`;

const UnreadDot = styled.View`
    width: 10px;
    height: 10px;
    background-color: ${props => props.theme["NEUTRAL_COLOR"]};
    border-radius: 5px;
`;

const UnreadBadgeText = styled.Text`
    color: ${props => props.theme['BACKGROUND_COLOR']};
    font-size: 12;
`

export default function ChatItem({
                                     imageSource,
                                     status,
                                     title,
                                     message,
                                     messageDate,
                                     isOwnMessage,
                                     unreadCount,
                                     isUnreadByRecipient
                                 }) {
    const renderStatusRight = () => {
        if (!isOwnMessage && unreadCount > 0) {
            return (
                <UnreadBadge>
                    <UnreadBadgeText>
                        {unreadCount}
                    </UnreadBadgeText>
                </UnreadBadge>
            );
        }
        if (isOwnMessage && isUnreadByRecipient) {
            return <UnreadDot/>;
        }
        return null;
    };

    return (
        <ChatItemContainer>
            <LeftSection>
                <Avatar size={54} status={status} imageSource={imageSource}/>
                <ChatContentContainer>
                    <ThemeText numberOfLines={1} ellipsizeMode="tail">{title}</ThemeText>
                    <MessageRow>
                        {isOwnMessage && <ThemeText style={{fontSize: 14}}>You:</ThemeText>}
                        <ThemeMutedText numberOfLines={1} ellipsizeMode="tail">{message}</ThemeMutedText>
                        <ThemeMutedText>• {messageDate}</ThemeMutedText>
                    </MessageRow>
                </ChatContentContainer>
            </LeftSection>
            {renderStatusRight()}
        </ChatItemContainer>
    );
}
