import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import {Image} from "react-native";
import {useTheme} from "styled-components";

export default function BottomNavigation({screens}) {
    const theme = useTheme()
    const screenOptions = {
        tabBarStyle: {
            backgroundColor: theme["SURFACE_COLOR"],
            borderTopWidth: 0,
            elevation: 0,
            height: 56,
        },
        tabBarItemStyle: {
            alignItems: 'center',
            flexDirection: "row"
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme["NEUTRAL_COLOR"],
        tabBarInactiveTintColor: theme["SECONDARY_COLOR"],
        sceneStyle: {
            backgroundColor: theme["BACKGROUND_COLOR"]
        },
    }

    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator id="bottom-tab" screenOptions={screenOptions}>
                {screens.map((screen, index) => (
                    <Tab.Screen
                        key={index}
                        name={screen.name}
                        component={screen.component}
                        options={{
                            tabBarIcon: ({color}) => (
                                screen.imageSource ? (
                                    <Image
                                        source={screen.imageSource}
                                        style={{width: 24, height: 24, objectFit: "cover", borderRadius: 12}}
                                    />
                                ) : (
                                    <Ionicons name={screen.iconName} size={24} color={color}/>
                                )
                            ),
                        }}
                    />
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
}