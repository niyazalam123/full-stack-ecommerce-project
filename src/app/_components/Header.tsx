"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const Header = () => {
  const data = useSelector((data: any) => data.cartData.cartData);
  const [searchValue, setSearchValue] = useState("");
  const route = useRouter();

  // change function

  function handleChange(e: any) {
    const text = e.target.value;
    setSearchValue(text);
  }

  // handle click

  function handleSubmit(e: any) {
    e.preventDefault();
    // Navigate to the product page with the search query parameter
    route.push(`/filterproducts?search=${encodeURIComponent(searchValue)}`);
    // my search should work for category aur title thats it
  }

  return (
    <>
      <div className='_alpha1'>
        <ul className='_alpha2'>
          <li>HOME</li>
          <li>MOBILE</li>
          <li>groceries</li>
        </ul>
        <div className='_filter1'>
          <form className='_filter2' onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Product Name...' className='_filter3' name="search" value={searchValue} onChange={handleChange} />
            <button type='submit' className='_filter4'>Search</button>
          </form>
        </div>
        <div className='_alpha3'>
          <span className='_alpha4'>Cart</span>
          <span className='_alpha5'>{data.length}</span>
        </div>
      </div>
    </>
  )
}

export default Header