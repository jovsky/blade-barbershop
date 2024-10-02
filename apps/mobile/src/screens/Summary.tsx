import { StyleSheet, Text, Pressable, View } from 'react-native'
import { CurrencyUtils, DateUtils } from '@barbers-blade/core'
import useScheduling from '../data/hooks/useScheduling'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type Props = {
  navigation: NativeStackNavigationProp<{ Home: undefined }, 'Home'>
}

export default function Summary({ navigation }: Props) {
  const { dateTime: date, professional, services, totalDuration, totalPrice, schedule } = useScheduling()

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Scheduling Summary</Text>
        <Text style={styles.subtitle}>It will be a pleasure to have you here!</Text>

        <Text style={styles.label}>Barber</Text>
        <Text style={styles.value}>{professional?.name}</Text>

        <Text style={styles.label}>SERVICES</Text>
        {services.map((s, index) => (
          <Text key={index} style={styles.service}>
            {index + 1}. {s.name}
          </Text>
        ))}

        <Text style={styles.label}>DURATION</Text>
        <Text style={styles.value}>{totalDuration()}</Text>

        <Text style={styles.label}>TIME</Text>
        <Text style={styles.value}>{date && DateUtils.getLocaleFormattedTime(date)}</Text>

        <Text style={styles.totalValueLabel}>TOTAL VALUE</Text>
        <Text style={styles.totalValue}>{CurrencyUtils.formatCurrency(totalPrice())}</Text>

        <Pressable
          style={styles.button}
          onPress={async () => {
            await schedule()
            navigation.navigate('Home')
          }}
        >
          <Text style={styles.buttonText}>Finish Scheduling</Text>
        </Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    gap: 5,
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 20,
  },
  label: {
    color: '#AAAAAA',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  service: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  totalValueLabel: {
    color: '#AAAAAA',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
