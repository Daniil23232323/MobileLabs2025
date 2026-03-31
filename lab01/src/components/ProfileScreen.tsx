import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FormDataType, UserType } from "../types/userTypes";

export default function ProfileScreen() {
    const [user, setUser] = useState<UserType | null>(null);
    const [formData, setFormData] = useState<FormDataType>({
        email: "",
        password: "",
        confirmPassword: "",
        lastName: "",
        firstName: "",
    });

    const isUserSet = (user: UserType | null): boolean => {
        return !!(user && user.email.trim() && user.lastName.trim() && user.firstName.trim());
    };

    const handleChange = (field: keyof FormDataType, value: string): void => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (): void => {
        for (const key in formData) {
            if (!formData[key as keyof FormDataType]?.trim()) {
                alert("Будь ласка, заповніть всі поля!");
                return;
            }
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Паролі не співпадають!");
            return;
        }

        setUser({
            email: formData.email,
            lastName: formData.lastName,
            firstName: formData.firstName,
        });
    };

    const handleLogout = (): void => {
        setUser(null);
        setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            lastName: "",
            firstName: "",
        });
    };

    if (isUserSet(user)) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Профіль</Text>
                <Text>Повне ім'я: {user?.lastName} {user?.firstName}</Text>
                <Text>Email: {user?.email}</Text>
                <Button title="Вийти" onPress={handleLogout} color="#FF3B30"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Реєстрація</Text>
            <TextInput
                style={styles.input}
                placeholder="Електронна пошта"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль (ще раз)"
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Прізвище"
                value={formData.lastName}
                onChangeText={(text) => handleChange("lastName", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Ім'я"
                value={formData.firstName}
                onChangeText={(text) => handleChange("firstName", text)}
            />
            <Button title="Зареєструватися" onPress={handleSubmit} color="#007AFF"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
});