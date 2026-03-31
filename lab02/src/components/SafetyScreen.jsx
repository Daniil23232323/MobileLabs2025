import {Container, ThemeText} from "../styles/style";
import SteamHeader from "./SteamHeader";
import TopTabs from "./TopTabs";
import GuardScreen from "./GuardScreen";

export default function SafetyScreen() {
    const tabs = [
        {
            key: 'Guard',
            title: 'Guard',
            content: <GuardScreen/>,
        },
        {
            key: 'Confirmations',
            title: 'Confirmations',
            content: <Container><ThemeText>Some implementation of Confirmations...</ThemeText></Container>,
        },
    ];
    return (
        <Container>
            <SteamHeader title="Safety"/>
            <TopTabs tabs={tabs}/>
        </Container>
    )
}