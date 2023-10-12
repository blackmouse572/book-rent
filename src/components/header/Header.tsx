import React from 'react';
import '@/components/header/header.css';


export default function Header() {
  return (
        <div className="flex h-screen items-center">
        <header className="bg-white-500 flex h-24 w-full items-center justify-around">
            <div className="logo">
                <h1 className="text-black-100 cursor-pointer text-3xl font-extrabold xs:text-2xl">BRental</h1>
            </div>
            <nav className="w-1/2 xs:hidden">
                <div className="flex items-center justify-evenly">
                    <a href="#" className="active">Home</a>
                    <a href="#">Category</a>
                    <a href="#">About Us</a>
                </div>
            </nav>
            <form>
                <label htmlFor="default-search" className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-12 pr-60 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Search by Keywords" required />
                </div>
            </form>
            <svg className="w-6 h-6 text-gray-800 dark:text-white mr-20 ml-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
            </svg>  
        </header>
        </div>
  );
}
