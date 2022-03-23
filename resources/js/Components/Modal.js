import React from 'react';

export default function Modal({ id, children }) {
  return (
    <div id={id} tabIndex="-1" aria-hidden="true" 
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {children}
      </div>
    </div>
  );
}