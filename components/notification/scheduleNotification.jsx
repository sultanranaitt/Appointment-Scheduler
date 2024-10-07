import PushNotification from 'react-native-push-notification';
import moment from 'moment';

export const scheduleNotification = (appointmentDateTime) => {
  const notificationDate = new Date(appointmentDateTime);

  // Ensure date is in the future
  const currentDate = new Date();
  if (notificationDate <= currentDate) {
    console.log('Cannot schedule notification for the past. Current time:', currentDate);
    return;
  }

  console.log('Scheduling notification for:', moment(notificationDate).format('MMMM Do YYYY, h:mm A'));

  PushNotification.localNotificationSchedule({
    channelId: 'appointment-channel',
    message: 'You have an upcoming appointment',
    date: notificationDate, 
    allowWhileIdle: true,
    importance: 4,
    visibility: 'public',
  });
};


export const createNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'appointment-channel', // Required
      channelName: 'Appointment Notifications', // Required
      importance: 4,
    },
    (created) => console.log(`Notification channel created: ${created}`) // Logs whether channel was created
  );
};

export const triggerImmediateNotification = () => {
  console.log('Triggering immediate notification');
  PushNotification.localNotification({
    channelId: 'appointment-channel',
    message: 'This is a test notification!', // Test message
    importance: 4,
    visibility: 'public',
  });
};

// Call this function inside your App.js or on some screen where you can trigger a notification immediately.
export const scheduleTestNotification = () => {
    const notificationDate = new Date(Date.now() + 5000); // 5 seconds from now
  
    console.log('Scheduling test notification for:', notificationDate);
    PushNotification.localNotificationSchedule({
      channelId: 'appointment-channel',
      message: 'Test notification scheduled!', // Test message
      date: notificationDate,
      allowWhileIdle: true,
      importance: 4,
      visibility: 'public',
    });
};
  