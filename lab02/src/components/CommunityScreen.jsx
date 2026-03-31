import React, {useState, useEffect} from "react";
import {View, FlatList, ActivityIndicator} from "react-native";
import {Container, ThemeMutedText} from "../styles/style";
import SteamHeader from "./SteamHeader";
import CategoryList from "./CategoryList";
import CategoryButton from "./CategoryButton";
import {Ionicons} from "@expo/vector-icons";
import styled from "styled-components/native";
import CommunityPost from "./CommunityPost";

const Icon = styled(Ionicons)`
    color: ${props => props.theme["SECONDARY_TEXT_COLOR"]};
`;

const MainContainer = styled.View`
    gap: 20px;
    padding-left: 20px;
    margin-bottom: 15px;
`;

const CategoriesContainer = styled.View`
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
`;

const Separator = styled.View`
    height: 8px;
    background-color: ${props => props.theme["SURFACE_COLOR"]};
`

const INITIAL_POSTS = [
    {
        id: "1",
        title: "Some post",
        category: "News",
        commentCount: 200,
        likesCount: 120,
        imageSource: require("../assets/images/witcher3.png"),
        sourceName: "Andrii",
        subtitle: "Coral something",
        publishedAt: "2025-03-22T14:20:00Z",
        iconSource: require("../assets/images/avatar.png")
    },
    {
        id: "2",
        title: "Amazing Artwork",
        category: "Artwork",
        commentCount: 50,
        likesCount: 30,
        imageSource: require("../assets/images/cyberpunk.png"),
        sourceName: "Olga",
        subtitle: "Beautiful painting",
        publishedAt: "2025-03-21T10:00:00Z",
        iconSource: require("../assets/images/avatar.png")
    },
    {
        id: "3",
        title: "Cool Screenshot",
        category: "Screenshots",
        commentCount: 100,
        likesCount: 80,
        imageSource: require("../assets/images/DeadByDaylight.png"),
        sourceName: "Vlad",
        subtitle: "Epic moment",
        publishedAt: "2025-03-20T18:30:00Z",
        iconSource: require("../assets/images/avatar.png")
    }
];

const randomTitles = [
    "Breaking News",
    "Exciting Update",
    "New Discovery",
    "Hot Topic",
    "Latest Buzz"
];

const randomSubtitles = [
    "Details emerging about the event.",
    "Stay tuned for more updates.",
    "A surprising turn of events!",
    "You won't believe what happened next.",
    "Check out the latest info here."
];

const randomAvatarLinks = [
    require('../assets/images/avatar2.png'),
    require('../assets/images/avatar3.png'),
    require('../assets/images/avatar4.png'),
    require('../assets/images/avatar5.png'),
];

const randomImageLinks = [
    require('../assets/images/stalker.png'),
    require('../assets/images/amongus.png'),
    require('../assets/images/forest.png'),
    require('../assets/images/apex.png'),
    require('../assets/images/satisfactory.png'),
    require('../assets/images/subnautica.png'),
];

export default function CommunityScreen() {
    const categories = ["All", "Screenshots", "Artwork", "News"];
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [filteredPosts, setFilteredPosts] = useState(INITIAL_POSTS);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (activeCategory === "All") {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter(post => post.category === activeCategory));
        }
    }, [activeCategory, posts]);

    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

    const loadMorePosts = () => {
        if (isLoading) return;
        setIsLoading(true);

        setTimeout(() => {
            const newPosts = Array.from({length: 7}, (_, index) => {
                const newId = `${Date.now()}-${index}`;
                const randomCategory = categories[Math.floor(Math.random() * (categories.length - 1)) + 1];

                return {
                    id: newId,
                    title: getRandomItem(randomTitles),
                    category: randomCategory,
                    commentCount: Math.floor(Math.random() * 300),
                    likesCount: Math.floor(Math.random() * 200),
                    imageSource: getRandomItem(randomImageLinks),
                    sourceName: "NewUser",
                    subtitle: getRandomItem(randomSubtitles),
                    publishedAt: new Date().toISOString(),
                    iconSource: getRandomItem(randomAvatarLinks)
                };
            });

            setPosts(prev => [...prev, ...newPosts]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <Container>
            <SteamHeader title="Community"/>
            <MainContainer >
                <ThemeMutedText>
                    Community and official content for all games and software
                </ThemeMutedText>
                <CategoriesContainer>
                    <CategoryButton label={<Icon name={"search"} size={18}/>}/>
                    <CategoryList
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                </CategoriesContainer>
            </MainContainer>
            <Separator/>
            <FlatList
                ItemSeparatorComponent={() => <Separator/>}
                data={filteredPosts}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <CommunityPost
                        title={item.title}
                        badgeText={item.category}
                        commentCount={item.commentCount}
                        likesCount={item.likesCount}
                        imageSource={item.imageSource}
                        sourceName={item.sourceName}
                        subtitle={item.subtitle}
                        publishedAt={item.publishedAt}
                        iconSource={item.iconSource}
                    />
                )}
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#888"/> : null}
            />
        </Container>
    );
}
