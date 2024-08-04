import { ScheduleUtils, DateUtils } from "@barba/core";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useScheduling from "../../data/hooks/useScheduling";

interface TimeInputProps {
  dateTime: Date;
  numberSlots: number;
  onDateChange(data: Date): void;
}

export default function TimeInput(props: TimeInputProps) {
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const { busyTimes } = useScheduling();
  const { morning, afternoon, night } = ScheduleUtils.dayHours();

  const timeSelected = DateUtils.getLocaleFormattedTime(props.dateTime);

  function getPeriod(time: string | null, qty: number) {
    if (!time) return [];
    const times = morning.includes(time)
      ? morning
      : afternoon.includes(time)
        ? afternoon
        : night;
    const index = times.findIndex((h) => time == h);
    return times.slice(index, index + qty);
  }

  function renderTime(time: string) {
    const period = getPeriod(currentTime, props.numberSlots);
    const hasTime = period.length === props.numberSlots;

    const selectedPeriod = getPeriod(timeSelected, props.numberSlots);

    const selected =
      selectedPeriod.length === props.numberSlots &&
      selectedPeriod.includes(time);

    const blockedPeriod = period.some((h) =>
      busyTimes.some((busy) => busy === h)
    );

    const unavailableTime = selectedPeriod.includes(time);
    const busy = busyTimes.includes(time);

    const getButtonProps = () => {
      if (selected && !blockedPeriod && !busy) {
        return {
          background: "#22c55e",
          disabled: false,
        };
      } else if (blockedPeriod && !busy && unavailableTime) {
        return {
          background: "#ef4444",
          disabled: true,
        };
      } else if (!hasTime && !busy && selectedPeriod.includes(time)) {
        return {
          background: "#ef4444",
          disabled: true,
        };
      } else if (busy) {
        return {
          background: "#09090b",
          disabled: true,
        };
      } else {
        return {
          background: "#18181b",
          disabled: false,
        };
      }
    };

    return (
      <Pressable
        key={time}
        onPress={() => {
          setCurrentTime(time);
          if (getButtonProps().disabled) return;
          props.onDateChange(DateUtils.applyTime(props.dateTime, time));
        }}
        style={{
          ...styles.timeContainer,
          backgroundColor: getButtonProps().background,
        }}
      >
        {getButtonProps().disabled ? (
          <View style={styles.timeContent}>
            <Text style={{ color: "#e4e4e7" }}>X</Text>
          </View>
        ) : (
          <View style={styles.timeContent}>
            <Text style={{ color: "#e4e4e7" }}>{time}</Text>
          </View>
        )}
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textTimes}>Morning</Text>
        <View style={styles.timesContent}>{morning.map(renderTime)}</View>
      </View>
      <View>
        <Text style={styles.textTimes}>Afternoon</Text>
        <View style={styles.timesContent}>{afternoon.map(renderTime)}</View>
      </View>
      <View>
        <Text style={styles.textTimes}>Night</Text>
        <View style={styles.timesContent}>{night.map(renderTime)}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
  },
  textTimes: {
    color: "#e4e4e7",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  timesContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "center",
  },
  timeContent: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  timeContainer: {
    borderWidth: 1,
    borderColor: "#27272a",
    padding: 10,
    borderRadius: 6,
    width: 90,
  },
});
