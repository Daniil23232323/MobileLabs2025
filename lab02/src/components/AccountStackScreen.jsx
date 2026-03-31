import {createStackNavigator} from "@react-navigation/stack";
import AccountScreen from "./AccountScreen";
import AccountSettingsScreen from "./AccountSettingsScreen";
import {useTheme} from "styled-components";
import {Container, ThemeText} from "../styles/style";

const AccountStack = createStackNavigator();
export default function AccountStackScreen({onThemeChange}) {
    const theme = useTheme()
    return (
        <AccountStack.Navigator id="account-stack" screenOptions={{
            headerStyle: {
                backgroundColor: theme["BACKGROUND_COLOR"],
                borderBottomWidth: 0,
                elevation: 0,
            },
            headerTitleStyle: {
                color: theme["NEUTRAL_COLOR"],
            },
            cardStyle: {
                backgroundColor: theme["BACKGROUND_COLOR"],
            },
            headerTintColor: theme["NEUTRAL_COLOR"],
        }}>
            <AccountStack.Screen options={{
                headerShown: false
            }} name="Account" component={AccountScreen}/>
            <AccountStack.Screen name="Settings" component={AccountSettingsScreen}/>
            <AccountStack.Screen name="Logout" component={() =>
                <Container style={{padding: 20}}>
                    <ThemeText>Logout implementation...</ThemeText>
                </Container>}/>
        </AccountStack.Navigator>
    );
}