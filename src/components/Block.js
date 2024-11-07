// Block.js
import React from 'react';
import { Resizable } from 're-resizable';

const WorkoutSection = ({ section, totalDistance, sectionDistance, color }) => {
  const widthPercentage = (sectionDistance / totalDistance) * 100;

  return (
    <Resizable
      defaultSize={{
        width: `${widthPercentage}%`,
        height: 100
      }}
      enable={{ right: true }}
      className={`${color} p-4 m-1 rounded flex flex-col justify-between`}
    >
      <div className="font-bold">{section.name}</div>
      <div>{section.distance} km</div>
      <input
        type="range"
        min="1"
        max="10"
        value={section.distance}
        onChange={(e) => section.setDistance(Number(e.target.value))}
        className="mt-2"
      />
    </Resizable>
  );
};

export default WorkoutSection;
