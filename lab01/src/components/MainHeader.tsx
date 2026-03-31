import { StyleSheet, Image, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MainHeaderProps } from "../types/headerTypes";

export default function MainHeader({ logoSource, title }: MainHeaderProps) {
    return (
        <View style={styles.header}>
            <StatusBar style="auto"/>
            <View style={styles.container}>
                <Image source={logoSource} style={styles.logo} resizeMode="contain"/>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        backgroundColor: "white",
    },
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
    },
    logo: {
        flex: 0.3,
        maxHeight: 50,
    },
    title: {
        flex: 0.7,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    }
});
