import React, { useState } from 'react';

import { ChevronDownIcon, CogIcon, DocumentReportIcon, HeartIcon } from '@heroicons/react/solid';
import { Link } from '@inertiajs/inertia-react';

import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Authenticated({ auth, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              
              <div className="mx-2 sm:mx-6 shrink-0 flex items-center">
                <Link href="/">
                  {header}
                </Link>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="ml-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        Helpdesk

                        {/* Chat Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                        </svg>
                        
                        <svg
                          className="ml-2 -mr-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href="#">
                      Whatsapp
                    </Dropdown.Link>
                    <Dropdown.Link href="#">
                      Email
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
              <div className="ml-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        {auth.user.name}

                        <svg xmlns="http://www.w3.org/2000/svg" className="-mt-0.5 ml-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>

                        <svg
                          className="ml-2 -mr-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route('logout')} method="post" as="button">
                      <span className="inline-flex">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg> */}
                        Log out
                      </span>
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
              Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('merchant')} active={route().current('merchant')}>
              Merchant
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
              <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink method="post" href={route('logout')} as="button">
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="hidden bg-gray-50 shadow sm:block">
          <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
            <div className="mx-5 space-x-6 flex">
              <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                <span className="inline-flex py-2 pr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 -mt-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  Dashboard
                </span>
              </NavLink>
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-transparent hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                      <HeartIcon className="mr-2 -mt-0.5 h-5 w-5" />
                      Layanan
                      <ChevronDownIcon className="ml-2 -mr-0.5 h-4 w-4" />
                    </button>
                  </span>
                </Dropdown.Trigger>
                <Dropdown.Content align="left">
                  <Dropdown.Link href={route('merchant')} method="get">
                    Daftar Merchant
                  </Dropdown.Link>
                  <Dropdown.Link href="#">
                    Realokasi dan Update Produk
                  </Dropdown.Link>
                  <Dropdown.Link href="#">
                    Seleksi Merchant
                  </Dropdown.Link>
                  <Dropdown.Link href="#">
                    SKPPK & Voucher
                  </Dropdown.Link>
                  <Dropdown.Link href="#">
                    Entri Data Belanja
                  </Dropdown.Link>
                  <Dropdown.Link href="#">
                    Penagihan Stimulus
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-transparent hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                      <DocumentReportIcon className="mr-2 -mt-0.5 h-5 w-5" />
                      Laporan
                      <ChevronDownIcon className="ml-2 -mr-0.5 h-4 w-4" />
                    </button>
                  </span>
                </Dropdown.Trigger>
                <Dropdown.Content align="left">
                  <Dropdown.Link href={route('merchant')} method="get">
                    Merchant
                  </Dropdown.Link>
                  <Dropdown.Link href="#">
                    Produk
                  </Dropdown.Link>
                  <Dropdown.Link href="#">
                    Voucher
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>

              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-transparent hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                      <CogIcon className="mr-2 -mt-0.5 h-5 w-5" />                      
                      Pengaturan
                      <ChevronDownIcon className="ml-2 -mr-0.5 h-4 w-4" />
                    </button>
                  </span>
                </Dropdown.Trigger>
                <Dropdown.Content align="left">
                  <Dropdown.Link href="#">
                    Akun Saya
                  </Dropdown.Link>
                  <Dropdown.Link href="#">
                    Notifikasi
                  </Dropdown.Link>
                  <Dropdown.Link href="#">
                    Pengaturan Umum
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>
          {/* <div className="hidden space-x-6 sm:-my-px sm:flex">
            
          </div> */}
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
