import {StyleSheet} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import MainPage from "./src/components/MainPage";
import TasksPage from "./src/components/TasksPage";
import {TasksProvider} from "./src/components/TasksProvider";
import BottomNavigation from "./src/components/BottomNavigation";

export default function App() {
    const screens = [
        {name: 'Main', component: MainPage, iconName: 'game-controller-outline'},
        {name: 'Tasks', component: TasksPage, iconName: 'list-outline'},
    ];

    return (
        <SafeAreaView style={styles.container}>
            <TasksProvider>
                <BottomNavigation screens={screens}/>
            </TasksProvider>
        </SafeAreaView>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
