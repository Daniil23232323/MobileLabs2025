import { View, Text, StyleSheet } from "react-native";

export default function MainFooter() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Волинець Андрій Сергійович, ІПЗ-23-4</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgray"
    },
    text: {
        color: "gray",
        textAlign: "center",
    }
})