import { createContext, useCallback, useEffect, useState } from "react";
import { Professional, Service } from "@barba/core";
import { DateUtils } from "@barba/core";
import useUser from "../hooks/useUser";
import useAPI from "../hooks/useAPI";

interface SchedulingContextProps {
  professional: Professional | null;
  services: Service[];
  dateTime: Date;
  busyTimes: string[];
  totalDuration(): string;
  totalPrice(): number;
  numberSlots(): number;
  selectProfessional(professional: Professional): void;
  selectServices(services: Service[]): void;
  selectDate(date: Date): void;
  schedule(): Promise<void>;
}

export const SchedulingContext = createContext({} as SchedulingContextProps);

export function SchedulingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [date, setDate] = useState<Date>(DateUtils.today());

  const { user } = useUser();
  const [busyTimes, setBusyTimes] = useState<string[]>([]);
  const { httpGet, httpPost } = useAPI();

  function selectProfessional(professional: Professional) {
    setProfessional(professional);
  }

  function selectServices(services: Service[]) {
    setServices(services);
  }

  function totalDuration() {
    const duration = services.reduce((acc, current) => {
      return (acc += current.slots * 15);
    }, 0);

    return `${Math.trunc(duration / 60)}h ${duration % 60}m`;
  }

  function totalPrice() {
    return services.reduce((acc, current) => {
      return (acc += current.price);
    }, 0);
  }

  const selectDate = useCallback(function (hour: Date) {
    setDate(hour);
  }, []);

  function numberSlots() {
    const total = services.reduce((acc, service) => {
      return (acc += service.slots);
    }, 0);

    return total;
  }

  async function schedule() {
    if (!user?.email) return;

    await httpPost("scheduling", {
      costumerEmail: user.email,
      date: date!,
      professional: professional!,
      services: services,
    });

    clean();
  }

  function clean() {
    setDate(DateUtils.today());
    setBusyTimes([]);
    setProfessional(null);
    setServices([]);
  }

  const getBusyTimes = useCallback(
    async function (date: Date, professional: Professional): Promise<string[]> {
      try {
        if (!date || !professional) return [];
        const dtString = date.toISOString().slice(0, 10);
        const busyTimes = await httpGet(
          `scheduling/busy-times/${professional!.id}/${dtString}`
        );
        return busyTimes ?? [];
      } catch (e) {
        return [];
      }
    },
    [httpGet]
  );

  useEffect(() => {
    if (!date || !professional) return;
    getBusyTimes(date, professional).then(setBusyTimes);
  }, [date, professional, getBusyTimes]);

  return (
    <SchedulingContext.Provider
      value={{
        dateTime: date,
        professional,
        services,
        busyTimes,
        totalDuration,
        totalPrice,
        selectDate,
        selectProfessional,
        numberSlots,
        selectServices,
        schedule,
      }}
    >
      {children}
    </SchedulingContext.Provider>
  );
}
