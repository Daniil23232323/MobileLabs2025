import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import React, {useEffect} from "react";
import {StyleSheet, Text} from "react-native";

export default function PopupNumber({id, value, onFinish}) {
    const opacity = useSharedValue(1);
    const translateY = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{translateY: translateY.value}],
    }));

    useEffect(() => {
        opacity.value = withTiming(0, {duration: 1000});
        translateY.value = withTiming(-20, {duration: 1000}, (finished) => {
            if (finished) {
                runOnJS(onFinish)(id);
            }
        });
    }, []);

    return (
        <Animated.View style={[styles.popup, animatedStyle]}>
            {value <= 0 && (
                <Text style={[styles.popupText, {color: "red"}]}>{value}</Text>
            )}
            {value > 0 && (
                <Text style={styles.popupText}>{`+${value}`}</Text>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    popup: {
        position: 'absolute',
        top: -30,
        alignSelf: 'center',
    },
    popupText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
    },
});