import { LOCALE, Schedule } from "@barba/core";
import { StyleSheet, Text, View } from "react-native";

interface ScheduleItemProps {
  schedule: Schedule;
}

export default function ScheduleItem(props: ScheduleItemProps) {
  const cor =
    new Date(props.schedule.date).getTime() > Date.now()
      ? "#007aff"
      : "#AAAAAA";

  function formatDate(time: Date) {
    if (!(time instanceof Date) || isNaN(time.getTime())) {
      return "";
    }

    return time.toLocaleDateString(LOCALE, {
      dateStyle: "long",
    });
  }

  function formatTime(time: Date) {
    if (!(time instanceof Date) || isNaN(time.getTime())) {
      return "";
    }
    return ` às ${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}h`;
  }

  function sumTotalServices() {
    return props.schedule.services.reduce(
      (acc, service) => acc + service.price,
      0
    );
  }

  function renderServices() {
    return props.schedule.services.reduce((acc, service, index) => {
      return `${acc}${index + 1}. ${service.name}${index < props.schedule.services.length - 1 ? ", " : ""}`;
    }, "");
  }

  return (
    <View style={{ ...styles.card, borderColor: cor }}>
      <Text style={{ ...styles.professionalName }}>
        {props.schedule.professional.name
          ? props.schedule.professional.name
          : "Não informado"}
      </Text>
      <Text style={{ ...styles.time, color: cor }}>
        {props.schedule.date && formatDate(new Date(props.schedule.date))}
        {props.schedule.date && formatTime(new Date(props.schedule.date))}
      </Text>
      <Text style={styles.services}>{renderServices()}</Text>
      <Text style={styles.price}>{`R$ ${sumTotalServices()},00`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    paddingLeft: 35,
    borderRadius: 8,
    margin: 8,
    borderWidth: 0.5,
    borderRightWidth: 10,
    minWidth: "90%",
  },
  professionalName: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 4,
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  services: {
    fontSize: 12,
    color: "#ffffff",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
