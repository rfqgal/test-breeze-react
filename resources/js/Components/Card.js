import React from 'react';

import { classNames } from '@/Utils/Functions';

export default function Card({ className, children }) {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="bg-white overflow-hidden shadow-sm">
        <div className={classNames('p-6 bg-white border-b border-gray-200', className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
