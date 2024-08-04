import { StyleSheet, Text, View, Image } from "react-native";
import { Schedule } from "@barba/core";
import useAPI from "../../data/hooks/useAPI";
import React, { useEffect, useState } from "react";
import ScheduleItem from "./ScheduleItem";
import useUser from "@/src/data/hooks/useUser";

export default function LastSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>();
  const { httpGet } = useAPI();
  const { user } = useUser();

  useEffect(() => {
    loadSchedules();
  }, [user]);

  async function loadSchedules() {
    if (!user?.email) return;
    const schedules = await httpGet(`scheduling/${user?.email}`);
    setSchedules(schedules);
  }

  function renderContent() {
    if (schedules && schedules?.length > 0) {
      return (
        <View>
          <Text style={styles.subtitle}>Here are your last schedules:</Text>
          {schedules
            ?.reverse()
            .map((s: Schedule) => <ScheduleItem schedule={s} key={s.id} />)}
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.subtitle}>You don't have any schedules yet.</Text>
          <Text style={styles.subtitle}>Shall we schedule a new service?</Text>
          <Image
            source={require("../../../assets/home/cover-boy.png")}
            style={styles.coverBoy}
          />
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/home/barbers-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Hey, {user?.name}!</Text>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 30,
    color: "#e4e4e7",
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#e4e4e7",
  },
  scheduleItemContainer: {
    backgroundColor: "#09090b",
    borderRadius: 10,
    height: 144,
  },
  scheduleItemContent: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  scheduleItemText: {
    fontSize: 16,
    color: "white",
  },
  scheduleTitle: {
    fontSize: 40,
    color: "white",
  },
  scheduleTime: {
    fontSize: 25,
    color: "white",
  },
  logo: {
    marginTop: 20,
  },
  coverBoy: {
    marginBottom: 20,
    marginTop: 20,
  },
});
