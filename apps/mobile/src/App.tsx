import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserProvider } from './data/contexts/UserContext'
import { SchedulingProvider } from './data/contexts/SchedulingContext'
import { NavigationContainer } from '@react-navigation/native'
import Register from './screens/Register'
import Main from './screens/Main'
import Summary from './screens/Summary'
import React from 'react'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <UserProvider>
      <SchedulingProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Summary"
              component={Summary}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SchedulingProvider>
    </UserProvider>
  )
}
