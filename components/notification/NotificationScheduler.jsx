import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

const NotificationScheduler = ({ appointmentTime, title, message }) => {
  useEffect(() => {
    const scheduleNotification = () => {
      const notificationTime = moment(appointmentTime).subtract(1, 'minutes'); // Schedule 1 minute before the appointment

      PushNotification.localNotificationSchedule({
        id: Math.floor(Date.now() / 1000), // Unique ID for the notification
        channelId: 'appointment_channel', // Ensure this matches the created channel
        title: title,
        message: message,
        date: notificationTime.toDate(), // Convert to JavaScript Date
        allowWhileIdle: true, // Allows notification to trigger even in Doze mode
      });
    };

    scheduleNotification();
  }, [appointmentTime, title, message]);

  return null;
};

export default NotificationScheduler;