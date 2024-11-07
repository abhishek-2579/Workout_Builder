// src/components/WorkoutBuilder.js

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';  // Import the drag-and-drop components
import BlockOption from './BlockSelector';  // Import BlockSelector for selecting workout blocks
import BarGraph from './BarGraph'; // Import BarGraph component for displaying workout progress
import WorkoutDescription from './WorkoutDescription'; // Import WorkoutDescription to show workout details

// Define workout block types and their properties
export const BLOCK_TYPES = {
  WARM_UP: {
    type: 'WARM_UP',
    title: 'Warm Up',
    color: 'bg-yellow-200',
    distance: 3,
    intensity: 50,  // Fixed intensity
    description: 'A gentle warm-up to prepare your body for exercise.',
    sections: [{ name: 'Warm Up', distance: 3 }]
  },
  ACTIVE: {
    type: 'ACTIVE',
    title: 'Active',
    color: 'bg-red-200',
    distance: 3,
    intensity: 100,  // Fixed intensity
    description: 'An active phase to boost heart rate and burn calories.',
    sections: [{ name: 'Active', distance: 3 }]
  },
  COOL_DOWN: {
    type: 'COOL_DOWN',
    title: 'Cool Down',
    color: 'bg-blue-200',
    distance: 3,
    intensity: 75,  // Fixed intensity
    description: 'A cool down to help your body recover after the workout.',
    sections: [{ name: 'Cool Down', distance: 3 }]
  },
  TWO_STEP: {
    type: 'TWO_STEP',
    title: '2 Step Repeat',
    color: 'bg-purple-200',
    distance: 4,
    intensity: 90,  // Fixed intensity
    description: 'A two-step routine alternating between hard and easy steps.',
    sections: [
      { name: 'Hard', distance: 2 },
      { name: 'Easy', distance: 2 }
    ]
  },
  RAMP_UP: {
    type: 'RAMP_UP',
    title: 'Ramp Up',
    color: 'bg-green-200',
    distance: 5,
    intensity: 110,  // Fixed intensity
    description: 'A gradual increase in intensity over several steps.',
    sections: [
      { name: 'Ramp Up 1', distance: 2 },
      { name: 'Ramp Up 2', distance: 1 },
      { name: 'Ramp Up 3', distance: 1 },
      { name: 'Ramp Up 4', distance: 1 }
    ]
  },
  RAMP_DOWN: {
    type: 'RAMP_DOWN',
    title: 'Ramp Down',
    color: 'bg-orange-200',
    distance: 4,
    intensity: 75,  // Fixed intensity
    description: 'A gradual decrease in intensity after a workout.',
    sections: [
      { name: 'Ramp Down 1', distance: 1 },
      { name: 'Ramp Down 2', distance: 1 },
      { name: 'Ramp Down 3', distance: 1 },
      { name: 'Ramp Down 4', distance: 1 }
    ]
  }
};

const WorkoutBuilder = () => {
  const [blocks, setBlocks] = useState([]);  // State for selected workout blocks
  const [totalDistance, setTotalDistance] = useState(0);  // State for total distance

  const addBlock = (block) => {
    setBlocks([...blocks, block]); // Add new block to the list
    setTotalDistance(totalDistance + block.distance);  // Update total distance
  };

  const clearBlocks = () => {
    setBlocks([]);  // Clear the workout blocks
    setTotalDistance(0);  // Reset the total distance
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBlocks(items);  // Update block order and trigger re-render of chart and descriptions
  };

  return (
    <div className="p-8 max-w-6xl mx-auto flex">
      {/* Left Panel: Workout Blocks */}
      <div className="w-1/3 p-4 border-r">
        <h2 className="text-xl mb-4">Available Workouts</h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(BLOCK_TYPES).map((type) => (
            <BlockOption key={type} type={type} onAdd={addBlock} />
          ))}
        </div>

        {/* Clear Blocks Button */}
        <button
          onClick={clearBlocks} // Calls clearBlocks function
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
        >
          Clear All Blocks
        </button>
      </div>

      {/* Right Panel: Bar Graph and Workout Description */}
      <div className="w-2/3 p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="workout-droppable" direction="horizontal">
            {(provided) => (
              <div
                className="flex justify-start items-center"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* Render each block as a Draggable */}
                {blocks.map((block, index) => (
                  <Draggable key={index} draggableId={`block-${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 m-2 rounded cursor-pointer"
                        style={{ backgroundColor: block.color }}
                      >
                        {block.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-4">
          <BarGraph blocks={blocks} totalDistance={totalDistance} />

          {/* Render workout descriptions after adding each block */}
          <div className="mt-4">
            {blocks.map((block, index) => (
              <WorkoutDescription key={index} block={block} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutBuilder;