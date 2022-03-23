import React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from '@inertiajs/inertia-react';

import { classNames } from '@/Utils/Functions';

export default function Pagination({ links }) {
  return (
    <div className="w-full inline-flex mt-6 space-x-3">                
      <Link href={links.prev_page_url} disabled={!links.prev_page_url} className="ml-auto">
        <button
          type="button" 
          className={classNames(links.prev_page_url ? 'bg-white' : 'cursor-not-allowed bg-gray-200 text-gray-500', 
            'inline-flex py-1.5 px-3 text-sm border border-gray-300 rounded'
          )}
          disabled={!links.prev_page_url}
        >
          <ChevronLeftIcon className="mr-2 h-5 w-5" />
          Sebelumnya
        </button>
      </Link>
      <Link href={links.next_page_url} disabled={!links.next_page_url}>
        <button
          type="button"
          className={classNames(links.next_page_url ? 'bg-white' : 'cursor-not-allowed bg-gray-200 text-gray-500', 
            'inline-flex py-1.5 px-3 text-sm border border-gray-300 rounded'
          )}
          disabled={!links.next_page_url}
        >
          Selanjutnya
          <ChevronRightIcon className="ml-2 h-5 w-5" />
        </button>
      </Link>
    </div>
  );
}