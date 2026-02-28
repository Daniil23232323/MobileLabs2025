import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scheduleNotification, cancelNotification} from '../services/oneSignalService';

export const useTasks = (nickname) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (!nickname) return;
        AsyncStorage.getItem(`tasks_${nickname}`)
            .then(json => {
                const loadedTasks = json ? JSON.parse(json) : [];
                const sorted = sortTasks(loadedTasks);
                setTasks(sorted);
            })
            .catch(() => setTasks([]));
    }, [nickname]);

    useEffect(() => {
        if (!nickname) return;
        AsyncStorage.setItem(`tasks_${nickname}`, JSON.stringify(tasks))
            .catch(e => console.error('Error saving tasks', e));
    }, [tasks]);

    const addTask = async ({name, description, time}) => {
        const id = Date.now().toString();
        const task = {id, name, description, time, notificationId: null, marked: false};
        task.notificationId = await scheduleNotification(task, nickname);

        setTasks(prev => sortTasks([...prev, task]));
    };

    const deleteTask = async (id) => {
        const task = tasks.find(t => t.id === id);
        await cancelNotification(task?.notificationId);
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const markTask = (taskId) => {
        setTasks(prev =>
            sortTasks(prev.map(t =>
                t.id === taskId ? {...t, marked: true} : t
            ))
        );
    };

    return {tasks, addTask, deleteTask, markTask};
};

const sortTasks = (tasks) => {
    const now = new Date();
    const upcoming = tasks
        .filter(t => new Date(t.time) > now)
        .sort((a, b) => new Date(a.time) - new Date(b.time));
    const expired = tasks
        .filter(t => new Date(t.time) <= now)
        .sort((a, b) => new Date(a.time) - new Date(b.time));

    return [...upcoming, ...expired];
};
