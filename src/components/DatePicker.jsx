import React, { useState } from 'react';

const DatePicker = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState('');

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date); 
    onDateChange(date);    
  
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setIsCalendarVisible(!isCalendarVisible)} 
      >
        {selectedDate ? selectedDate : 'Pick a date'
        
        }
      </button>
      
      {isCalendarVisible && (
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}  // Update selected date when user picks a date
        />
      )}
    </div>
  );
};

export default DatePicker;
