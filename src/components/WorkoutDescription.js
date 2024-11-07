import React from 'react';

const WorkoutDescription = ({ block }) => {
  if (!block) return null;

  return (
    <div className="mt-4">
      <h3>Workout Description</h3>
      <p><strong>{block.title}</strong></p>
      <p>Distance: {block.distance} km</p> {/* Show the workout distance */}
      <p>{block.description}</p>
    </div>
  );
};

export default WorkoutDescription;
