// Grid.js
import React from 'react';

const Grid = ({ data, onEditClick, onDeleteClick }) => (
  <div key={data.id} className="grid-card">
    {Object.keys(data).map((key) => (
      <p key={key}>
        {key.charAt(0).toUpperCase() + key.slice(1)}: {data[key]}
      </p>
    ))}
    <div className="actions">
      <button className="button-orange" onClick={() => onEditClick(data)}>
        Edit
      </button>
      <button className="button-red" onClick={() => onDeleteClick(data.id)}>
        Delete
      </button>
    </div>
  </div>
);

export default Grid;
