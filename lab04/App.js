import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import AppHeader from './src/components/AppHeader';
import { LoginScreen } from './src/components/LoginScreen';
import { TaskForm } from './src/components/TaskForm';
import { TaskList } from './src/components/TaskList';
import {useTasks} from "./src/hooks/useTasks";
import {useNickname} from "./src/hooks/useNickname";
import {useEffect} from "react";
import {initOneSignal} from "./src/services/oneSignalService";
import {Ionicons} from "@expo/vector-icons";

export default function App() {
    const {nickname, loading, login, logout} = useNickname();
    const {tasks, addTask, deleteTask, markTask} = useTasks(nickname);

    useEffect(() => {
        if (nickname) {
            initOneSignal(nickname, event => {
                const id = event.notification.notificationId;
                markTask(id);
            });
        }
    }, [nickname]);

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Завантаження...</Text>
            </View>
        );
    }

    if (!nickname) return <LoginScreen onLogin={login}/>;

    return (
        <View style={styles.container}>
            <AppHeader/>
            <View style={styles.headerRow}>
                <View style={styles.userBadge}>
                    <Ionicons name="person" size={16} color="#007AFF"/>
                    <Text style={styles.nickname}>{nickname}</Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Ionicons name="log-out-outline" size={16} color="#FF3B30"/>
                    <Text style={styles.logoutText}>Вийти</Text>
                </TouchableOpacity>
            </View>

            <TaskForm onAdd={addTask}/>
            <TaskList tasks={tasks} onDelete={deleteTask}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    userBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 6,
        paddingHorizontal: 12,
        gap: 6
    },
    nickname: {
        fontSize: 14,
        color: '#333'
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#FF3B30',
        backgroundColor: '#fff',
        gap: 6
    },
    logoutText: {
        color: '#FF3B30',
        fontSize: 14
    }
});