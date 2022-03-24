import React, { useState } from 'react';

import { Head } from '@inertiajs/inertia-react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import Card from '@/Components/Card';
import Authenticated from '@/Layouts/Authenticated';
import { classNames } from '@/Utils/Functions';
// import scrapeWebsite from '@/Utils/Scraper/Index';

export default function Dashboard(props) {
  const [data, setData] = useState();
  const [processing, setProcessing] = useState();
  const { register, handleSubmit } = useForm();

  // const onSubmit = async (data) => await scrapeWebsite(data.url);
  const onSubmit = (data) => {
    setProcessing(true);
    axios.post('/scrape', data)
      .then((res) => setData(res))
      .finally(() => setProcessing(false));
  };
  
  return (
    <Authenticated  
      auth={props.auth}
      errors={props.errors}
      header="Dashboard"
    >
      <Head title="Dashboard" />

      <div className="py-12 mx-auto max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
          <input type="search" className="border-gray-300 text-sm py-3 rounded-l w-full" {...register('url')} />
          <button type="submit" disabled={processing} 
            className={classNames(processing ? 'cursor-not-allowed border-blue-300 bg-blue-300' : 'border-blue-500 bg-blue-500', 'px-6 text-white border rounded-r')}>
            {processing ? 'Loading...' : 'Scrape'}
          </button>
        </form>
      </div>

      {data && (
        <div className="pb-12">
          <Card className="text-sm">
            <pre><code>{JSON.stringify(data.data, null, 4)}</code></pre>
          </Card>
        </div>
      )}
    </Authenticated>
  );
}
