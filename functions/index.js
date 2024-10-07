const {onRequest} = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendAppointmentNotification = functions.firestore
  .document('appointments/{appointmentId}')
  .onCreate(async (snapshot, context) => {
    const appointment = snapshot.data();
    const fcmToken = appointment.fcmToken; // Store user's FCM token in the appointment document
    const appointmentTime = appointment.appointmentDate.seconds * 1000; // Convert Firebase Timestamp to milliseconds

    // Time to schedule notification (1 hour before appointment)
    const timeBeforeAppointment = appointmentTime - 60 * 60 * 1000; // 1 hour before the appointment

    const now = Date.now();

    if (timeBeforeAppointment > now) {
      const delay = timeBeforeAppointment - now;

      setTimeout(async () => {
        const payload = {
          notification: {
            title: 'Appointment Reminder',
            body: `Your appointment with ${appointment.doctorName} is at ${appointment.timeSlot}.`,
          },
          token: fcmToken,
        };

        try {
          await admin.messaging().send(payload);
          console.log('Notification sent successfully');
        } catch (error) {
          console.error('Error sending notification:', error);
        }
      }, delay);
    }
});
