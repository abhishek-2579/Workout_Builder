import React from 'react';
import './App.css';
import WorkoutBuilder from './components/WorkoutBuilder';  // Import the WorkoutBuilder component

function App() {
  return (
    <div className="App">
      {/* Center the header using Tailwind CSS */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        Workout Builder
      </h1>
      <WorkoutBuilder />
    </div>
  );
}

export default App;
