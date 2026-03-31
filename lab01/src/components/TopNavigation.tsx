import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { CustomNavigationProps } from "../types/navigationTypes";

const Tab = createMaterialTopTabNavigator()
const screenOptions = {
    tabBarIndicatorStyle: {
        backgroundColor: 'transparent',
    },
    tabBarStyle: {
        backgroundColor: 'lightgray'
    },
    tabBarActiveTintColor: 'dodgerblue',
    tabBarInactiveTintColor: 'gray',
    tabBarLabelStyle: {
        fontSize: 12,
        margin: 0
    },
}

export default function TopNavigation({ screens }: CustomNavigationProps) {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
                {screens.map((screen, index) => (
                    <Tab.Screen
                        key={index}
                        name={screen.name}
                        component={screen.component}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Ionicons name={screen.iconName} size={24} color={color}/>
                            ),
                        }}
                    />
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
}