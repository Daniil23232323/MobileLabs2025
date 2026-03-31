import SteamHeader from "./SteamHeader";
import TopTabs from "./TopTabs";
import {Container, ThemeText} from "../styles/style";
import ChatList from "./ChatList";

export default function ChatScreen() {
    const tabs = [
        {
            key: 'Chat',
            title: 'Open chats',
            content: <ChatList/>,
        },
        {
            key: 'Friends',
            title: 'My friends',
            content: <Container><ThemeText>Some implementation of friends...</ThemeText></Container>,
        },
    ];
    return (
        <Container>
            <SteamHeader title="Chat" withSearch/>
            <TopTabs tabs={tabs}/>
        </Container>
    )
}