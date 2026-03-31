import MainHeader from "./src/components/MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNavigation from "./src/components/TopNavigation";
import HomeScreen from "./src/components/HomeScreen";
import PhotoGalleryScreen from "./src/components/PhotoGalleryScreen";
import ProfileScreen from "./src/components/ProfileScreen";
import MainFooter from "./src/components/MainFooter";
import {ScreenProps} from "./src/types/navigationTypes";

const screens: ScreenProps[] = [
    { name: 'Головна', component: HomeScreen, iconName: 'home' },
    { name: 'Фотогалерея', component: PhotoGalleryScreen, iconName: 'images' },
    { name: 'Профіль', component: ProfileScreen, iconName: 'person' },
];

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MainHeader title="FirstMobileApp" logoSource={require('./src/assets/ztu.png')}/>
            <TopNavigation screens={screens}/>
            <MainFooter/>
        </SafeAreaView>
    );
}