import React, { useEffect } from 'react';
import SelectList from '../components/SelectList';
import TextField from '../components/TextField';
import '../styles/NewSchedulePicker.scss';

const NewSchedulePicker = ({ daysOfWeek, firstDay, firstTime, secondDay, secondTime, setFirstDay, setFirstTime, setSecondDay, setSecondTime }) => {
  const chooseDate = localStorage.getItem('chooseDate');
  useEffect(() => {
    localStorage.removeItem('chooseDate')
  }, [chooseDate]);
  return (
    <div className="schedule-picker">
      <SelectList
        label="Primeiro Dia"
        options={daysOfWeek}
        value={firstDay}
        onChange={(e) => setFirstDay(e.target.value)}
      />

      <TextField
        label="Horário do Primeiro Dia"
        type="time"
        value={firstTime}
        onChange={(e) => setFirstTime(e.target.value)}
        style={{ width: '100%' }}
      />

      <SelectList
        label="Segundo Dia"
        options={daysOfWeek}
        value={secondDay}
        onChange={(e) => setSecondDay(e.target.value)}
      />

      <TextField
        label="Horário do Segundo Dia"
        type="time"
        value={secondTime}
        onChange={(e) => setSecondTime(e.target.value)}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default NewSchedulePicker;
