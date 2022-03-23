import React from 'react';

import { SearchIcon } from '@heroicons/react/solid';

export default function Search({ id, label, defaultValue, onSubmit }) {
  return (
    <div>
      <label htmlFor="search" className="block text-xs text-gray-800">{label}</label>
      <form onSubmit={onSubmit} className="flex">
        <input type="search" name={id} id={id} defaultValue={defaultValue}
          className="border-gray-300 text-xs py-1.5 rounded-l" />
        <button type="submit" className="py-1.5 px-3 text-white text-sm border border-blue-500 rounded-r bg-blue-500">
          <SearchIcon className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}