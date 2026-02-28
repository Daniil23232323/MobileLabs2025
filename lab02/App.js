import {StatusBar} from 'expo-status-bar';
import {ThemeProvider} from "styled-components";
import {createContext, useEffect, useState} from "react";
import {darkTheme, lightTheme} from "./src/styles/theme";
import {SafeContainer} from "./src/styles/style";
import {View, Text} from "react-native";
import * as Font from "expo-font";
import BottomNavigation from "./src/components/BottomNavigation";
import AccountStackScreen from "./src/components/AccountStackScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatScreen from "./src/components/ChatScreen";
import SafetyScreen from "./src/components/SafetyScreen";
import StoreScreen from "./src/components/StoreScreen";
import CommunityScreen from "./src/components/CommunityScreen";

export const ThemeContext = createContext();

export default function App() {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        getTheme();
    }, []);
    const getTheme = async () => {
        try {
            const themeValue = await AsyncStorage.getItem('@theme');
            if (themeValue) setTheme(themeValue);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleTheme = async () => {
        const themeValue = theme === 'dark' ? 'light' : 'dark';
        try {
            await AsyncStorage.setItem('@theme', themeValue);
            setTheme(themeValue);
        } catch (error) {
            console.log(error);
        }
    };

    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'ABeeZee-Regular': require('./src/assets/fonts/ABeeZee-Regular.ttf')
            });
            setFontsLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return <View><Text>Завантаження шрифтів...</Text></View>
    }

    const screens = [
        {name: 'Store', component: StoreScreen, iconName: 'bag-outline'},
        {name: 'Community', component: CommunityScreen, iconName: 'person-outline'},
        {name: 'Chat', component: ChatScreen, iconName: 'chatbubble-outline'},
        {name: 'Safety', component: SafetyScreen, iconName: 'shield-outline'},
        {name: 'Account', component: AccountStackScreen, imageSource: require('./src/assets/images/avatar.png')},
    ];

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
                <SafeContainer>
                    <BottomNavigation screens={screens}/>
                    <StatusBar style={theme === 'dark' ? 'light' : 'dark'}/>
                </SafeContainer>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}