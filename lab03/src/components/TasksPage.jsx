import React, {useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {TasksContext} from './TasksProvider';
import TaskItem from './TaskItem';
import Ionicons from '@expo/vector-icons/Ionicons';

const TasksScreen = () => {
    const {tasks} = useContext(TasksContext);

    const renderItem = ({item}) => {
        const isCompleted = item.checkComplete(item);
        let icon = item.icon ?? <Ionicons name="ios-checkmark-circle-outline" size={24}/>
        let color = item.color ?? "#007bff";
        let completedCount = 0;
        let totalCount = 0;
        if (item.currentCount !== undefined && item.targetCount !== undefined) {
            completedCount = item.currentCount;
            totalCount = item.targetCount;
        } else if (item.heldDuration !== undefined && item.targetDuration !== undefined) {
            completedCount = item.heldDuration;
            totalCount = item.targetDuration;
        } else if (item.currentPoints !== undefined && item.targetPoints !== undefined) {
            completedCount = item.currentPoints;
            totalCount = item.targetPoints;
        }
        else {
            completedCount = item.currentCount;
            totalCount = item.targetCount;
        }

        return (
            <TaskItem
                icon={icon}
                title={item.title}
                description={item.description}
                isCompleted={isCompleted}
                completedCount={completedCount}
                totalCount={totalCount}
                color={color}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    listContainer: {
        padding: 16,
    },
});

export default TasksScreen;
