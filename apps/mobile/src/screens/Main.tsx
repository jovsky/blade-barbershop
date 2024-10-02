import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, View } from 'react-native'
import Home from './Home'
import Scheduling from './Scheduling'
import User from './User'
import Icon from '../components/shared/Icon'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type Props = {
  navigation: NativeStackNavigationProp<{ Main: undefined }, 'Main'>
}

const Tab = createBottomTabNavigator()

export default function Main({ navigation }: Props) {
  function tab(name: string, component: any, label: string, icon: string) {
    return (
      <Tab.Screen
        name={name}
        component={component}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabScreen}>
              <Icon name={icon as any} size={24} color={focused ? '#29A7EA' : '#9DA2AE'} />
              <Text
                style={{
                  ...styles.tabScreenText,
                  color: focused ? '#29A7EA' : '#9DA2AE',
                }}
              >
                {label}
              </Text>
            </View>
          ),
        }}
      />
    )
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: '#222',
        tabBarInactiveBackgroundColor: '#222',
        tabBarStyle: {
          backgroundColor: '#222',
        },
      }}
    >
      {tab('Home', Home, 'Home', 'home-outline')}
      {tab('Scheduling', Scheduling, 'Scheduling', 'calendar-outline')}
      {tab('User', User, 'User', 'person-outline')}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabScreenText: {
    fontSize: 10,
  },
})
