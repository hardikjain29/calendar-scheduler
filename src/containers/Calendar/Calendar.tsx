import React, { useEffect, useState } from 'react';
import { CalendarEventsType } from '../../data/events';
import CalendarSkeleton from './CalendarSkeleton';
import Events from './Events/Events';
import './Calendar.css';

interface Props {
  calendarEvents: CalendarEventsType, 
}

const Calendar: React.FC<Props> = ({ calendarEvents }) => {
  const [events, setEvents] = useState<CalendarEventsType>([]);

  useEffect(() => {
    const timeSortedEvents = [...calendarEvents].sort((a,b) => a.fromHour - b.fromHour || b.toHour - a.toHour);
    setEvents(timeSortedEvents);
  }, [calendarEvents]);
  
  const deleteEvent = (deleteIndex: number): void => {
    const modifiedEvents = events.filter((event, currentIndex) => currentIndex !== deleteIndex);
    setEvents(modifiedEvents);
  }

  return (
      <div className="calendar">
        <CalendarSkeleton />
        <Events events={events} deleteEvent={deleteEvent} />
        <div className="current-time">
          <div className="circle" />
        </div>
    </div>
  );
}

export default Calendar;
