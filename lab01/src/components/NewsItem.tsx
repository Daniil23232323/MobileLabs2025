import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { NewsItemProps } from "../types/newsTypes";

export default function NewsItem({ title, date, description, imageSource }: NewsItemProps) {
    return (
        <View style={styles.newsItem}>
            <Image source={imageSource} style={styles.image} resizeMode="cover"/>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    newsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#f8f8f8',
        padding: 10,
        borderRadius: 8,
    },
    image: {
        width: 75,
        height: 75,
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        color: 'gray',
    },
    description: {
        fontSize: 14,
        color: '#333',
    },
});
