import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

const RemoteNotification = () => {

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'appointment_channel', // Make sure this is unique if testing
        channelName: 'Appointment Notifications',
        channelDescription: 'A channel for appointment notifications',
        importance: 4, // Max importance (IMPORTANCE_HIGH)
        vibrate: true,
      },
      (created) => {
        if (created) {
          console.log('Notification channel created successfully');
        } else {
          console.log('Notification channel already exists or failed to create');
        }
      }
    );

    PushNotification.requestPermissions();

    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification received:', notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return null;
};

export default RemoteNotification;
