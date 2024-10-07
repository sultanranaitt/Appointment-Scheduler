import React  from 'react';
import {SafeAreaView, StyleSheet, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/home';
import AppointmentForm from './screens/appointmentForm';
import UserHome from './screens/home/user';
import AdminHome from './screens/home/admin';
import ThankYou from './screens/thankyou';

function App() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.main}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: '',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="user"
            component={UserHome}
            options={{
              headerTitle: '',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="admin"
            component={AdminHome}
            options={{
              headerTitle: '',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="appointment"
            component={AppointmentForm}
          />
          <Stack.Screen
            options={{
              headerTitle: '',
              headerShadowVisible: false,
            }}
            name="thankyou"
            component={ThankYou}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
});
