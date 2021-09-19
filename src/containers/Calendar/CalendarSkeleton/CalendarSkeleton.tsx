import React from 'react';
import './CalendarSkeleton.css';

const CalendarSkeleton: React.FC = () => {
  const hourlyDayTimes = Array(24).fill(1);
  return (
    <>
      {
        hourlyDayTimes.map((time, index) => (
          <div key={`time${index}`} className="time">{index}:00</div>    
        ))
      }
      <div className="calendar-margin"></div>
      {
        hourlyDayTimes.map((time, index) => (
          <div key={`time${index}`} className="slot" style={{ 'gridRow': index + 1 }}></div>    
        ))
      }
    </>
  )
}

export default CalendarSkeleton;