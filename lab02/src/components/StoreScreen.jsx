import React, {useState, useEffect} from "react";
import {View, FlatList, Dimensions, ActivityIndicator} from "react-native";
import SteamHeader from "./SteamHeader";
import StoreMainItem from "./StoreMainItem";
import StoreItem from "./StoreItem";
import CategoryList from "./CategoryList";
import {Container} from "../styles/style";
import {GAMES_DATA} from "../data";

const INITIAL_GAMES = GAMES_DATA

export default function StoreScreen() {
    const screenWidth = Dimensions.get("window").width;
    const itemWidth = screenWidth * 0.9;
    const sidePadding = 16;
    const categories = ["Top Sellers", "Free to Play", "Early Access", "New Releases"];

    const [allGames, setAllGames] = useState(INITIAL_GAMES);
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [isLoading, setIsLoading] = useState(false);

    const [topGames, setTopGames] = useState([]);
    const [bottomGames, setBottomGames] = useState([]);

    useEffect(() => {
        let games = [...allGames];
        switch (activeCategory) {
            case "Top Sellers":
                games.sort((a, b) => b.sales - a.sales);
                break;
            case "Free to Play":
                games = games.filter(game => game.price === 0);
                break;
            case "Early Access":
                games = games.filter(game => game.isEarlyAccess);
                break;
            case "New Releases":
                games.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                break;
            default:
                break;
        }
        const top = games.slice(0, 3);
        const bottom = games.slice(3);
        setTopGames(top);
        setBottomGames(bottom);

        if (bottom.length === 0) {
            loadMoreGames();
        }
    }, [activeCategory, allGames]);


    const loadMoreGames = () => {
        if (isLoading) return;
        setIsLoading(true);

        setTimeout(() => {
            const newGames = Array.from({length: 7}, (_, index) => {
                const newId = `${Date.now()}-${index}`;
                let newGame = {
                    id: newId,
                    title: `New Game ${newId}`,
                    imageSource: require('../assets/images/default-game.png'),
                    platforms: (allGames.length + index) % 2 === 0 ? ["windows", "macos"] : ["windows"],
                    price: Math.floor(Math.random() * 50) + 10,
                    discount: Math.floor(Math.random() * 51),
                    sales: Math.floor(Math.random() * 1000000),
                    releaseDate: new Date().toISOString(),
                    isEarlyAccess: false
                };

                if (activeCategory === "Free to Play") {
                    newGame.price = 0;
                }
                if (activeCategory === "Early Access") {
                    newGame.isEarlyAccess = true;
                }
                return newGame;
            });

            setAllGames(prev => [...prev, ...newGames]);
            setIsLoading(false);
        }, 5000);
    };

    return (
        <Container>
            <SteamHeader title="Store" withSearch/>
            <View>
                <FlatList
                    data={topGames}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{paddingLeft: sidePadding, paddingRight: sidePadding / 2}}
                    snapToAlignment="start"
                    snapToInterval={itemWidth + sidePadding / 2}
                    decelerationRate="fast"
                    renderItem={({item}) => (
                        <View style={{width: itemWidth, marginRight: sidePadding / 2}}>
                            <StoreMainItem {...item} />
                        </View>
                    )}
                />
            </View>

            <View>
                <CategoryList
                    padding={20}
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
            </View>

            <View style={{flex: 1}}>
                <FlatList
                    data={bottomGames}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <StoreItem
                            imageSource={item.imageSource}
                            title={item.title}
                            platforms={item.platforms}
                            price={item.price}
                            discount={item.discount}
                        />
                    )}
                    onEndReached={loadMoreGames}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#888"/> : null}
                />
            </View>
        </Container>
    );
}
