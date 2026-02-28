import { FlatList, View } from "react-native";
import { useState } from "react";
import ChatItem from "./ChatItem";

const INITIAL_DATA_COUNT = 20;
const LOAD_MORE_COUNT = 10;

const names = ["Mark Dyson", "Player123", "Batman", "Player", "Catwoman", "Ironman", "Superman", "Flash", "Spiderman", "Robin"];
const messages = [
    "Hello!",
    "I'm already starting to play",
    "You there?",
    "Ok",
    "Sure thing",
    "I'll join in 5",
    "Sounds good!",
    "Let's go",
    "Haha, yep!",
    "See you soon"
];

const avatars = [
    require("../assets/images/avatar2.png"),
    require("../assets/images/avatar3.png"),
    require("../assets/images/avatar4.png"),
    require("../assets/images/avatar5.png"),
];

function getStatus(index) {
    if (index % 3 === 0) return "online";
    if (index % 3 === 1) return "inactive";
    return "offline";
}

function generateMockItem(index) {
    const name = names[index % names.length];
    const message = messages[index % messages.length];
    const isOwn = index % 3 === 0;
    const unreadCount = index % 4 === 0 ? index % 5 : 0;
    const isUnreadByRecipient = index % 5 === 0;
    const date = `14 Jun`;
    const avatar = avatars[index % avatars.length];
    const status = getStatus(index);

    return {
        id: `chat-${index}`,
        title: name,
        message: message,
        messageDate: date,
        isOwnMessage: isOwn,
        unreadCount,
        isUnreadByRecipient,
        imageSource: avatar,
        status
    };
}

export default function ChatList() {
    const [data, setData] = useState(Array.from({ length: INITIAL_DATA_COUNT }, (_, i) => generateMockItem(i)));
    const [loadedCount, setLoadedCount] = useState(INITIAL_DATA_COUNT);

    const loadMore = () => {
        const nextItems = [];

        for (let i = loadedCount; i < loadedCount + LOAD_MORE_COUNT; i++) {
            const item = i >= names.length * messages.length
                ? generateMockItem(i % (names.length * messages.length))
                : generateMockItem(i);
            nextItems.push(item);
        }

        setData([...data, ...nextItems]);
        setLoadedCount(loadedCount + LOAD_MORE_COUNT);
    };

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatItem {...item} />}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
        />
    );
}
