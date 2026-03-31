import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const TaskItem = ({
                      icon,
                      title,
                      description,
                      isCompleted,
                      completedCount,
                      totalCount,
                      color = '#007bff'
                  }) => {
    const progressPercentage =
        typeof completedCount === 'number' && typeof totalCount === 'number' && totalCount > 0
            ? (completedCount / totalCount) * 100
            : 0;

    const containerStyle = [
        styles.container,
        isCompleted && styles.completedContainer
    ];

    return (
        <View style={containerStyle}>
            <View style={styles.topRow}>
                <View style={styles.iconWrapper}>
                    {React.cloneElement(icon, {color})}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {description && <Text style={styles.description}>{description}</Text>}
                    {typeof completedCount === 'number' && typeof totalCount === 'number' && (
                        <View style={styles.progressWrapper}>
                            <View style={styles.progressContainer}>
                                <View style={[styles.progressBar, {
                                    width: `${progressPercentage}%`,
                                    backgroundColor: color
                                }]}/>
                            </View>
                            <Text style={styles.progressText}>{`${completedCount}/${totalCount}`}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.statusContainer}>
                    {isCompleted ? (
                        <Ionicons name="checkmark-circle" size={24} color="#28a745"/>
                    ) : (
                        <View style={styles.circle}/>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        marginVertical: 6,
        elevation: 1,
    },
    completedContainer: {
        backgroundColor: '#d4edda',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 4,
        color: '#666',
    },
    progressWrapper: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressContainer: {
        flex: 1,
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        overflow: 'hidden',
        marginRight: 8,
    },
    progressBar: {
        height: 6,
    },
    progressText: {
        fontSize: 12,
        color: '#333',
    },
    statusContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
    },
});

export default TaskItem;
