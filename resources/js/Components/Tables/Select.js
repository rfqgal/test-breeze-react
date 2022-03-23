import React from 'react';

export default function Select({ id, label, onChange, value, children }) {
  return (
    <div key={id}>
      <label htmlFor={id} className="block text-xs text-gray-800">{label}</label>
      <select name={id} id={id} className="text-xs border-gray-300 rounded text-gray-700"
        onChange={onChange} value={value}
      >
        {children}
      </select>
    </div>
  );
}