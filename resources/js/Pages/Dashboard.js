import React, { useState } from 'react';

import { Head } from '@inertiajs/inertia-react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import Card from '@/Components/Card';
import Authenticated from '@/Layouts/Authenticated';
// import scrapeWebsite from '@/Utils/Scraper/Index';

export default function Dashboard(props) {
  const [data, setData] = useState();
  const { register, handleSubmit } = useForm();

  // const onSubmit = async (data) => await scrapeWebsite(data.url);
  const onSubmit = (data) => {
    // console.log(data.url);

    axios.post('/scrape', data).then((res) => setData(res));
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
          <button type="submit" className="px-6 text-white border border-blue-500 rounded-r bg-blue-500">
            Scrape
          </button>
        </form>
      </div>

      {data && (
        <div className="pb-12">
          <Card>
            <pre><code>{JSON.stringify(data.data, null, 4)}</code></pre>
          </Card>
        </div>
      )}
    </Authenticated>
  );
}
