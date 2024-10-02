import { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import useScheduling from '../data/hooks/useScheduling'
import ServicesInput from '../components/scheduling/ServicesInput'
import ProfessionalInput from '../components/scheduling/ProfessionalInput'
import Steps from '../components/scheduling/Steps'
import DateInput from '../components/scheduling/DateInput'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type Props = {
  navigation: NativeStackNavigationProp<{ Summary: undefined }, 'Summary'>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Scheduling({ navigation }: Props) {
  const [nextStepAllowed, setNextStepAllowed] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState(0)

  const { professional, services, dateTime, selectProfessional, selectServices, selectDate, numberSlots } =
    useScheduling()

  useEffect(() => {
    if (currentStep === 0) {
      setNextStepAllowed(!!professional)
      return
    }
    if (currentStep === 1) {
      setNextStepAllowed(!!services.length)
      return
    }
    const hasDate = dateTime
    const validTime = dateTime.getHours() >= 8 && dateTime.getHours() <= 21
    setNextStepAllowed(hasDate && validTime)
  }, [services, professional, dateTime, currentStep])

  // function onProfessionalChange(professional: Professional) {
  //   selectProfessional(professional);
  //   setNextStepAllowed(!!professional);
  // }

  // function onServicesChange(services: Service[]) {
  //   selectServices(services);
  //   setNextStepAllowed(services.length > 0);
  // }

  // function onDateChange(date: Date) {
  //   selectDate(date);

  //   const hasDate = date;
  //   const validTime = date.getHours() >= 8 && date.getHours() <= 21;
  //   setNextStepAllowed(hasDate && validTime);
  // }

  return (
    <SafeAreaView style={{ ...styles.areaView }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Schedule your time</Text>
          <Steps
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            nextStepAllowed={nextStepAllowed}
            onNextStepAllowedChange={setNextStepAllowed}
            finish={() => navigation.navigate('Summary')}
            labels={['Professional', 'Services', 'Time']}
          >
            <ProfessionalInput professional={professional} onProfessionalChange={selectProfessional} />
            <ServicesInput services={services} onServicesChange={selectServices} />
            <DateInput date={dateTime} onDateChange={selectDate} numberSlots={numberSlots()} />
          </Steps>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  areaView: {
    display: 'flex',
    flex: 1,
    gap: 12,
    width: '100%',
    backgroundColor: 'black',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100%',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
})
