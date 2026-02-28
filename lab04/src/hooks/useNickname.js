import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logoutOneSignal} from '../services/oneSignalService';

export const useNickname = () => {
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const saved = await AsyncStorage.getItem('nickname');
                if (saved) setNickname(saved);
            } catch (e) {
                console.error('Error loading nickname', e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = async (newNick) => {
        if (!newNick.trim()) return;
        await AsyncStorage.setItem('nickname', newNick);
        setNickname(newNick);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('nickname');
        logoutOneSignal();
        setNickname('');
    };

    return {nickname, loading, login, logout};
};
