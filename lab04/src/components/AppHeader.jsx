import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function AppHeader() {
    return (
        <View style={styles.appTitleContainer}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#333" style={{ marginRight: 8 }} />
            <Text style={styles.appTitle}>To-Do Reminder</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    appTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
});