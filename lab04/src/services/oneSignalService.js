import { LogLevel, OneSignal } from 'react-native-onesignal';
import Constants from 'expo-constants';

const APP_ID = Constants.expoConfig.extra.oneSignalAppId;
const API_KEY = Constants.expoConfig.extra.apiKey;

export const initOneSignal = (externalUserId, onForegroundNotification) => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(APP_ID);
    OneSignal.Notifications.requestPermission(true);

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
        event.preventDefault();
        if (typeof onForegroundNotification === 'function') {
            onForegroundNotification(event);
        }
    });

    if (externalUserId) {
        OneSignal.login(externalUserId);
        OneSignal.User.pushSubscription.optIn();
    }
};

export const logoutOneSignal = () => {
    OneSignal.logout()
}

export const scheduleNotification = async (task, userId) => {
    const payload = {
        app_id: APP_ID,
        include_external_user_ids: [userId],
        send_after: task.time.toISOString(),
        headings: { en: task.name },
        contents: { en: task.description }
    };

    try {
        const res = await fetch('https://onesignal.com/api/v1/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${API_KEY}`
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        return data.id;
    } catch (error) {
        console.error('Error scheduling notification:', error);
        return null;
    }
};

export const cancelNotification = async notificationId => {
    if (!notificationId) return;
    try {
        await fetch(
            `https://onesignal.com/api/v1/notifications/${notificationId}?app_id=${APP_ID}`,
            { method: 'DELETE', headers: { Authorization: `Basic ${API_KEY}` } }
        );
    } catch (error) {
        console.error('Error cancelling notification:', error);
    }
};