import React, { useState } from 'react';

import { CloudDownloadIcon } from '@heroicons/react/solid';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/inertia-react';

import Edit from './Edit';
import Card from '@/Components/Card';
import Modal from '@/Components/Modal';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Tables/Search';
import Select from '@/Components/Tables/Select';
import Authenticated from '@/Layouts/Authenticated';
import { addUrlParam, urlParamFinder } from '@/Utils/Functions';

export default function Index(props) {  
  const [merchant, setMerchant] = useState();
  const { props: { merchants, filter, searched }, url } = usePage();
  
  const setPerPage = (data) => {
    const param = 'per_page';
    
    if (url.includes(param)) {
      data = param + '=' + data;
      Inertia.get(url.replace(urlParamFinder(url, param), data));
    }
    else {
      Inertia.get(url.includes('?')
        ? `${url}&${param}=${data}`
        : `${url}?${param}=${data}`
      );
    }
  };

  const setDigitalPlatform = (data) => Inertia.get(addUrlParam(url, 'digital_platform', data));
  const setStatus = (data) => Inertia.get(addUrlParam(url, 'status', data));
  const searchName = (data) => Inertia.get(addUrlParam(url, 'name', data));
  
  console.log(url);

  return (
    <>
      <Authenticated
        auth={props.auth}
        errors={props.errors}
        header="Merchant"
      >
        <Head title="Merchant" />

        <div className="py-8">
          <Card>
            <div className="flex">
              <div className="flex space-x-6">
                <Select id="perPage" label="Per Halaman" 
                  value={merchants.per_page} onChange={(e) => setPerPage(e.target.value)}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </Select>
                <Select id="digitalPlatform" label="Digital Platform" value={filter.digital_platform}
                  onChange={(e) => setDigitalPlatform(e.target.value)}>
                  <option value="semua">Tampilkan Semua</option>
                  <option value="beberapa">Tampilkan Beberapa</option>
                </Select>
                <Select id="status" label="Status" value={filter.status}
                  onChange={(e) => setStatus(e.target.value)}>
                  <option value="semua">Tampilkan Semua</option>
                  <option value="beberapa">Tampilkan Beberapa</option>
                </Select>
                <Search id="name" label="Cari Merchant" defaultValue={searched} onSubmit={(e) => searchName(e.target.value)} />
              </div>
              <div className="ml-auto mt-auto">
                <button type="submit" className="inline-flex py-1.5 px-3 text-white text-sm border border-blue-500 rounded bg-blue-500">
                  <CloudDownloadIcon className="mr-2 mt-0.5 h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <div className="mt-6">
              <table className="w-full table-auto text-sm text-gray-700">
                <thead className="border-b border-gray-200 bg-gray-100">
                  <tr>
                    <th className="py-2 px-6 text-left">No</th>
                    <th className="py-2 px-6 text-left">ID</th>
                    <th className="py-2 px-6 text-left">Nama Merchant</th>
                    <th className="py-2 px-6 text-left">Tipe</th>
                    <th className="py-2 px-6 text-left">Alokasi Voucher</th>
                    <th className="py-2 px-6 text-left">Progress</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {merchants.data.map((item, itemIdx) => (
                    <tr key={item.id} className={itemIdx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                      <td className="py-2 px-6">{itemIdx+1}</td>
                      <td className="py-2 px-6 font-semibold">{item.id}</td>
                      <td className="py-2 px-6 font-semibold">{item.name}</td>
                      <td className="py-2 px-6">{item.platform}</td>
                      <td className="py-2 px-6">{item.allocation} / 500</td>
                      <td className="py-2 px-6">{item.progress}</td>
                      <td className="py-2 px-6 text-right">
                        <button type="button" className="text-blue-600" data-modal-toggle="editModal" 
                          onClick={() => setMerchant(item)}
                        >
                          Edit
                        </button>
                        <span className="ml-3 cursor-pointer text-red-600">Delete</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={merchants} />
            </div>
          </Card>
          <Modal id="editModal">
            <Edit merchant={merchant} modalId="editModal" />
          </Modal>
        </div>
      </Authenticated>
    </>
  );
}
