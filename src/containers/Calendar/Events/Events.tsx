import React, { ReactElement } from 'react';
import { CalendarEventType, CalendarEventsType } from '../../../data/events';
import './Events.css';

interface Props {
  events: CalendarEventsType;
  deleteEvent: (index: number) => void;
}

type CollisonMap = Record<string, boolean>;

interface GetEventsType {
  isColliding: boolean;
  id: number;
  fromHour: CalendarEventType['fromHour'];
  eventDuration: number;
  title: CalendarEventType['title'];
}

const Events: React.FC<Props> = ({ events, deleteEvent }) => {
  // Since the times will only be in integer, a map will help in faster collision checks.
  // Another approach is to use array of already rendered events, then pass and check for every event if it lies in the previously added events.
  const collisonMap = {} as CollisonMap; // A map of all the colliding time slots. 

  const getEventJsx = ({ isColliding, id, fromHour, eventDuration, title }: GetEventsType): ReactElement => (
    <div
      className={`event ${isColliding ? 'colliding-event' : ''}`}
      onClick={() => deleteEvent(id)}
      key={`${title}${id}`}
      style={{ gridRow: `${fromHour + 2} / span ${eventDuration}`, marginLeft: isColliding ? '50px' : '0px'}}
    >
      {title}
    </div>
  )
  
  return (
    <>
     {
          events.map(({ fromHour, toHour, title}, index) => {
            const eventDuration = toHour - fromHour; // No Absolute, since 24hr format
            const eventJsx = collisonMap[fromHour] ?
              getEventJsx({ isColliding: true, id: index, fromHour, eventDuration, title }) :
              getEventJsx({ isColliding: false, id: index, fromHour, eventDuration, title });

            for (let time = fromHour; time < toHour; time++) {
              collisonMap[time] = true;
            }

            return eventJsx;
          })
        }
    </>
  )
}

export default Events;