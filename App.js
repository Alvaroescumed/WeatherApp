import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SpecificWeather from './components/SpecificWeather';
import LocationInfo from './components/LocationInfo';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Lista'}}
        />
        <Stack.Screen 
          name="Weather"  
          component={SpecificWeather} 
        />
        <Stack.Screen
          name="Info"
          component={LocationInfo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


