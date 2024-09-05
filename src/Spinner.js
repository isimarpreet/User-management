import React from 'react';
import { BeatLoader } from 'react-spinners';
import './Spinner.css'; // Optional: Add some custom styling

function Spinner() {
  return (
    <div className="spinner-container">
      <BeatLoader color="#007bff" />
    </div>
  );
}

export default Spinner;
