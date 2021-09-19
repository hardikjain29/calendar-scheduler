export interface CalendarEventType {
  fromHour: number;
  toHour: number;
  title: string;
}

export type CalendarEventsType = Array<CalendarEventType>;

export const calendarEvents: CalendarEventsType = [
  {
    fromHour: 10,
    toHour: 12,
    title: "Work"
  },
  {
    fromHour: 11,
    toHour: 13,
    title:"Meeting"
  },
  {
    fromHour: 14,
    toHour: 15,
    title: "Break"
  },
  {
    fromHour: 13,
    toHour: 15,
    title: "Lunch"
  },
  {
    fromHour: 9,
    toHour: 21,
    title: "OOO"
  }
];