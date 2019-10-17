import React from 'react';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('$leppiFCMToken');
    // console.log('====== fcmToken', fcmToken);
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        // console.log('====== fcmToken', fcmToken);
        if (fcmToken) {
            await AsyncStorage.setItem('$leppiFCMToken', fcmToken);
        }
    }
}

export const requestPermission = async () => {
    firebase
        .messaging()
        .requestPermission()
        .then(() => {
            getToken();
        })
        .catch(error => {
            console.warn(`${error} permission rejected`);
        });
}

export const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        getToken();
    } else {
        requestPermission();
    }
};

export const notificationListener = () =>
    firebase.notifications().onNotification(notification => {
        const {
            notifications: {
                Android: {
                    Priority: { Max }
                }
            }
        } = firebase;
        notification.android.setChannelId('TestChannel');
        notification.android.setPriority(Max);
        notification.setData(notification.data);
        firebase.notifications().displayNotification(notification);
    });

export const createChannel = () => {
    const channel = new firebase.notifications.Android.Channel(
        'TestChannel',
        'juancito',
        firebase.notifications.Android.Importance.Max
    ).setDescription('testchannel10');
    firebase.notifications().android.createChannel(channel);
};
