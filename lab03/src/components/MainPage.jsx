import React, {useState, useContext} from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {
    Directions,
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {StyleSheet, View, Text} from 'react-native';
import PopupNumber from "./PopupNumber";
import {TasksContext} from "./TasksProvider";

const circleSize = 120;

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

export default function MainPage() {
    const {setTasks} = useContext(TasksContext);

    const handleGesture = (gestureType, points, extraData) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.checkComplete(task))
                    return task;
                if (task.gestureType === gestureType) {
                    return task.execute(task, extraData);
                }
                if (task.gestureType === 'points' && points != undefined) {
                    return task.execute(task, points);
                }
                return task;
            })
        );
    };

    const [points, setPoints] = useState(0);
    const [popups, setPopups] = useState([]);

    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);
    const scale = useSharedValue(1);
    const containerDimensions = useSharedValue({width: 0, height: 0});

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            {translateX: translationX.value},
            {translateY: translationY.value},
            {scale: scale.value},
        ],
    }));

    const changePoints = (delta) => {
        setPoints((prev) => prev + delta);
        const id = Date.now().toString() + Math.random().toString();
        setPopups((prev) => [...prev, {id, value: delta}]);
    };

    const removePopup = (id) => {
        setPopups((prev) => prev.filter((popup) => popup.id !== id));
    };

    const pan = Gesture.Pan()
        .maxPointers(1)
        .minPointers(1)
        .minDistance(1)
        .onUpdate((event) => {
            const {width, height} = containerDimensions.value;
            const maxTranslateX = width ? width / 2 - (circleSize / 2 * scale.value) : 0;
            const maxTranslateY = height ? height / 2 - (circleSize / 2 * scale.value) : 0;

            translationX.value = clamp(
                prevTranslationX.value + event.translationX,
                -maxTranslateX,
                maxTranslateX
            );
            translationY.value = clamp(
                prevTranslationY.value + event.translationY,
                -maxTranslateY,
                maxTranslateY
            );
        })
        .onEnd(() => {
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
            handleGesture('pan')
        })
        .runOnJS(true);

    const tapGesture = Gesture.Tap()
        .numberOfTaps(1)
        .onStart(() => {
            changePoints(1)
            handleGesture('tap', 1)
        })
        .runOnJS(true);

    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            changePoints(2);
            handleGesture('double-tap', 2)
        })
        .runOnJS(true);

    const combinedTapGesture = Gesture.Exclusive(doubleTapGesture, tapGesture);

    const longPressGesture = Gesture.LongPress()
        .minDuration(500)
        .onEnd((event) => {
            changePoints(5);
            handleGesture('long', 5, event.duration)
        })
        .runOnJS(true);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
        })
        .onEnd(() => {
            handleGesture('pinch')
        })
        .runOnJS(true);

    const getFlingGesture = (direction, type) => {
        return Gesture.Fling()
            .direction(direction)
            .numberOfPointers(1)
            .onStart(() => {
                const bonus = Math.floor(Math.random() * 20) - 5;
                changePoints(bonus);
                handleGesture(type, bonus);
            })
            .runOnJS(true);
    }

    const flingRightGesture = getFlingGesture(Directions.RIGHT, 'flingRight')
    const flingLeftGesture = getFlingGesture(Directions.LEFT, 'flingLeft')
    const flingUpGesture = getFlingGesture(Directions.UP, 'flingUp')
    const flingDownGesture = getFlingGesture(Directions.DOWN, 'flingDown')

    const flingGesture = Gesture.Simultaneous(
        flingRightGesture, flingLeftGesture, flingUpGesture, flingDownGesture
    )

    const combinedTransformGesture = Gesture.Simultaneous(
        pan,
        flingGesture,
        pinchGesture,
    )

    const composedGesture = Gesture.Exclusive(
        combinedTapGesture,
        longPressGesture,
        combinedTransformGesture,
    );

    return (
        <GestureHandlerRootView style={styles.root}>
            <View style={styles.header}>
                <Text style={styles.pointsText}>Очки: {points}</Text>
            </View>
            <View
                style={styles.container}
                onLayout={(event) => {
                    const {width, height} = event.nativeEvent.layout;
                    containerDimensions.value = {width, height};
                }}
            >
                <GestureDetector gesture={composedGesture}>
                    <Animated.View style={[animatedStyles, styles.circle]}>
                        <Text style={styles.circleText}>Тицяй :)</Text>
                        {popups.map((popup) => (
                            <PopupNumber key={popup.id} id={popup.id} value={popup.value} onFinish={removePopup}/>
                        ))}
                    </Animated.View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    pointsText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: '#ADD8E6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    circleText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
    },
});
