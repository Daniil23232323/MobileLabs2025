import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Ionicons } from '@expo/vector-icons';

export const TaskForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(null);
    const [showPicker, setShowPicker] = useState(false);

    const reset = () => {
        setName('');
        setDescription('');
        setDate(null);
    };

    const handleAdd = () => {
        if (!name.trim()) {
            Alert.alert('Помилка валідації', 'Будь ласка, введіть заголовок.');
            return;
        }
        if (!description.trim()) {
            Alert.alert('Помилка валідації', 'Будь ласка, введіть опис.');
            return;
        }
        if (!date) {
            Alert.alert('Помилка валідації', 'Будь ласка, виберіть дату та час.');
            return;
        }
        onAdd({ name, description, time: date });
        reset();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Заголовок"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Опис"
                value={description}
                onChangeText={setDescription}
            />
            <View style={styles.dateContainer}>
                <Text style={[styles.dateText, !date && styles.placeholderText]}>
                    {date ? date.toLocaleString() : 'Оберіть дату'}
                </Text>
                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => {
                        if (!date) setDate(new Date());
                        setShowPicker(true);
                    }}
                >
                    <Ionicons name="calendar" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <DatePicker
                modal
                open={showPicker}
                date={date || new Date()}
                mode="datetime"
                onConfirm={d => {
                    setShowPicker(false);
                    setDate(d);
                }}
                onCancel={() => setShowPicker(false)}
            />
            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>Додати</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        fontSize: 16
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12
    },
    dateText: {
        flex: 1,
        fontSize: 16,
        color: '#333'
    },
    placeholderText: {
        color: '#999'
    },
    dateButton: {
        backgroundColor: '#007AFF',
        padding: 8,
        borderRadius: 8,
        marginLeft: 10
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});