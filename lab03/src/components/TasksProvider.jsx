import React, {createContext, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export const TasksContext = createContext();

export const TasksProvider = ({children}) => {
    const [tasks, setTasks] = useState([
        {
            id: 'clicks',
            gestureType: 'tap',
            title: 'Зробити 10 кліків',
            description: "Натиснути на об'єкт 10 разів.",
            currentCount: 0,
            targetCount: 10,
            icon: <Ionicons name="finger-print-outline" size={24}/>,
            color: "#007bff",
            execute: (task) => ({...task, currentCount: task.currentCount + 1}),
            checkComplete: (task) => task.currentCount >= task.targetCount,
        },
        {
            id: 'double-tap',
            gestureType: 'double-tap',
            title: 'Зробити 5 подвійних кліків',
            description: 'Використати TapGestureHandler для 5 подвійних кліків.',
            currentCount: 0,
            targetCount: 5,
            icon: <Ionicons name="copy-outline" size={24}/>,
            color: "#6f42c1",
            execute: (task) => ({...task, currentCount: task.currentCount + 1}),
            checkComplete: (task) => task.currentCount >= task.targetCount,
        },
        {
            id: 'long',
            gestureType: 'long',
            title: 'Утримувати об\'єкт 3 секунди',
            description: 'Використати LongPressGestureHandler для утримування протягом 3 секунд.',
            heldDuration: 0,
            targetDuration: 3000,
            icon: <Ionicons name="time-outline" size={24}/>,
            color: "#dc3545",
            execute: (task, duration) => ({...task, heldDuration: Math.max(task.heldDuration, duration)}),
            checkComplete: (task) => task.heldDuration >= task.targetDuration,
        },
        {
            id: 'pan',
            gestureType: 'pan',
            title: 'Перетягнути об\'єкт',
            description: 'Перемістити об\'єкт по екрану за допомогою PanGestureHandler.',
            executed: false,
            icon: <Ionicons name="move-outline" size={24}/>,
            color: "#28a745",
            execute: (task) => ({...task, executed: true}),
            checkComplete: (task) => task.executed,
        },
        {
            id: 'flingRight',
            gestureType: 'flingRight',
            title: 'Свайп вправо',
            description: 'Зробити швидкий свайп вправо за допомогою FlingGestureHandler.',
            executed: false,
            icon: <Ionicons name="arrow-forward-outline" size={24}/>,
            color: "#ffc107",
            execute: (task) => ({...task, executed: true}),
            checkComplete: (task) => task.executed,
        },
        {
            id: 'flingLeft',
            gestureType: 'flingLeft',
            title: 'Свайп вліво',
            description: 'Зробити швидкий свайп вліво за допомогою FlingGestureHandler.',
            executed: false,
            icon: <Ionicons name="arrow-back-outline" size={24}/>,
            color: "#17a2b8",
            execute: (task) => ({...task, executed: true}),
            checkComplete: (task) => task.executed,
        },
        {
            id: 'pinch',
            gestureType: 'pinch',
            title: 'Змінити розмір об\'єкта',
            description: 'Збільшити або зменшити об\'єкт за допомогою PinchGestureHandler.',
            executed: false,
            icon: <Ionicons name="resize-outline" size={24}/>,
            color: "#20c997",
            execute: (task) => ({...task, executed: true}),
            checkComplete: (task) => task.executed,
        },
        {
            id: 'points',
            gestureType: 'points',
            title: 'Отримати 100 очок',
            description: 'Набрати загалом 100 очок у лічильнику.',
            currentPoints: 0,
            targetPoints: 100,
            icon: <Ionicons name="star-outline" size={24}/>,
            color: "#fd7e14",
            execute: (task, points) => ({...task, currentPoints: task.currentPoints + points}),
            checkComplete: (task) => task.currentPoints >= task.targetPoints,
        },
    ]);

    return (
        <TasksContext.Provider value={{tasks, setTasks}}>
            {children}
        </TasksContext.Provider>
    );
};
