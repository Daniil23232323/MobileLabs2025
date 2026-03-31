import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

const generateImageUrl = () => `https://picsum.photos/1080/720?random=${Math.random()}`; // Генерує унікальне зображення

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 2 - 16;

export default function PhotoGalleryScreen() {
    const [photos, setPhotos] = useState<string[]>([]);

    const loadMorePhotos = () => {
        const newPhotos = Array.from({ length: 20 }, generateImageUrl);
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    };

    useEffect(() => {
        loadMorePhotos();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image}/>}
                onEndReached={loadMorePhotos}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    image: {
        margin: 4,
        width: imageSize,
        height: imageSize / 1.4,
        borderRadius: 8,
        elevation: 2,
    },
});