import {NavigationContainer} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import {Image} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

export default function BottomNavigation({screens}) {
    const screenOptions = {
        tabBarStyle: {
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
    }

    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
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