import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export const TaskList = ({ tasks, onDelete }) => {
    const now = new Date();
    return (
        <FlatList
            data={tasks}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
                const taskDate = new Date(item.time);
                const isPast = taskDate.getTime() < now.getTime() || item.marked;
                let dateStr = '';
                if (
                    taskDate.getDate() !== now.getDate() ||
                    taskDate.getMonth() !== now.getMonth() ||
                    taskDate.getFullYear() !== now.getFullYear()
                ) {
                    const day = taskDate.getDate().toString().padStart(2, '0');
                    const month = (taskDate.getMonth() + 1).toString().padStart(2, '0');
                    dateStr = `${day}.${month}`;
                    let year = taskDate.getFullYear();
                    if(year !== now.getFullYear())
                        dateStr += `.${year}`;
                }

                return (
                    <View style={[styles.taskItem, isPast && styles.completed]}>
                        <View style={styles.leftIcon}>
                            {isPast
                                ? <Ionicons name="checkmark-circle" size={24} color="green" />
                                : <MaterialIcons name="radio-button-unchecked" size={24} color="#888" />
                            }
                        </View>

                        <View style={styles.content}>
                            <Text style={[styles.title, isPast && styles.titleCompleted]}>{item.name}</Text>
                            <Text style={[styles.description, isPast && styles.descriptionCompleted]}>{item.description}</Text>
                            <View style={styles.metaRow}>
                                {dateStr ? <><MaterialIcons name="calendar-today" size={16} color="#555" /><Text style={styles.dateText}>{dateStr}</Text></> : null}
                                <MaterialIcons name="schedule" size={16} color="#555" style={{ marginLeft: dateStr ? 12 : 0 }} />
                                <Text style={styles.dateText}>{taskDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item.id)}>
                            <MaterialIcons name="delete" size={24} color="#c00" />
                        </TouchableOpacity>
                    </View>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        borderRadius: 16,
        backgroundColor: '#fdfdfd',
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    completed: {
        backgroundColor: '#e3f8e5',
    },
    leftIcon: {
        marginRight: 14,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        color: '#333',
    },
    titleCompleted: {
        color: '#777',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    descriptionCompleted: {
        color: '#999',
        fontStyle: 'italic',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    dateText: {
        marginLeft: 4,
        fontSize: 13,
        color: '#444',
    },
    deleteBtn: {
        marginLeft: 12,
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#ffe5e5',
    },
});
