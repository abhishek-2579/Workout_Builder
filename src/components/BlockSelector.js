// src/components/BlockSelector.js
import React from 'react';
import { BLOCK_TYPES } from './WorkoutBuilder';

const BlockOption = ({ type, onAdd }) => {
  const block = BLOCK_TYPES[type];
  return (
    <button
      onClick={() => onAdd(block)}  // Adds block to workout
      className={`p-4 rounded cursor-pointer ${block.color}`}
    >
      {block.title}
    </button>
  );
};

export default BlockOption;
