import React from 'react';
import { calendarEvents } from '../../data/events';
import Calendar from '../Calendar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <Calendar calendarEvents={calendarEvents} />
    </div>
  );
}

export default App;
