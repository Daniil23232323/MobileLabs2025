import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AppHeader from './AppHeader';

export const LoginScreen = ({ onLogin }) => {
    const [tempNick, setTempNick] = useState('');

    return (
        <View style={styles.container}>
            <AppHeader />
            <View style={styles.loginBox}>
                <Text style={styles.header}>Увійти</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Введіть нікнейм"
                    value={tempNick}
                    onChangeText={setTempNick}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogin(tempNick.trim())}
                >
                    <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f2f2f2' },
    loginBox: { backgroundColor: '#fff', borderRadius: 12, padding: 24, elevation: 3 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 },
    button: { backgroundColor: '#007AFF', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});