// src/components/DayTimePicker.jsx
import React from 'react';

const DayTimePicker = ({ day, time, onDayChange, onTimeChange, daysOfWeek }) => (
  <div className="day-time-group">
    <select value={day} onChange={onDayChange} required>
      <option value="" disabled>Selecione o dia</option>
      {daysOfWeek.map((dayOption) => (
        <option key={dayOption.value} value={dayOption.value}>{dayOption.label}</option>
      ))}
    </select>

    <input type="time" value={time} onChange={onTimeChange} required />
  </div>
);

export default DayTimePicker;
