import { SafeAreaView, StyleSheet, View } from 'react-native'
import Profile from '../components/profile'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type Props = {
  navigation: NativeStackNavigationProp<{ Register: undefined }, 'Register'>
}

export default function User({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingTop: 15 }}>
        <Profile navigation={navigation} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 12,
    width: '100%',
    backgroundColor: 'black',
  },
})
