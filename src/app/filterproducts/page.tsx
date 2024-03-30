"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AddCart } from '../redux/Slice';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation'

const page = () => {
  const [data, setData] = useState<any>([]);
  const route = useRouter();
  const dispatch = useDispatch();
  const reduxData = useSelector((item: any) => item.cartData.cartData);
  const searchParams = useSearchParams();
  const [filterApi, setFilterApi] = useState([]);

  // filter to our api
  useEffect(() => {
    // Get the search parameter
    const search = searchParams.get('search');

    // Check if search parameter is present
    if (search !== null) {
      // Filter the data based on the search parameter
      const filteredData = data.filter((item: any) => {
        const searchTerm = search.toLowerCase(); // Convert search term to lowercase
        // Check if the item's title or category includes the search term
        return item.title.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm);
      });
      setFilterApi(filteredData);
    } else {
      // If no search query, set the filter to the entire data array
      setFilterApi(data);
    }
  }, [searchParams.get('search'), data]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch("https://dummyjson.com/products?limit=100");
        const result = await resp.json();
        setData(result.products);
      } catch (error) {
        throw new Error("unable to fetch data!!")
      }
    }
    fetchData();
  }, []);

  // item sending in localstorage
  function handleClick(products: any) {
    const dataExist = reduxData.find((items: any) => items.id === products.id);
    if (!dataExist) {
      dispatch(AddCart(products));
      alert("cart added")
    }
    else {
      route.push("/cart");
      alert("item exist")
    }
  }

  // buy now button handle
  function handleBuyNow(products: any) {
    const dataExist = reduxData.find((items: any) => items.id === products.id);
    if (!dataExist) {
      dispatch(AddCart(products));
      route.push("/cart");
      alert("cart added")
    }
    else {
      route.push("/cart");
      alert("item exist")
    }
  }

  return (
    <>
      <section className='_filter-part1'>
        <aside className='_filter-part2  '>
          <ul>
            <li>
              <h3>Filter by category</h3>
              <ul>
                <li>
                  <input type="che" />
                </li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </li>
          </ul>
          <h3>filter by category</h3>
        </aside>
        <main className='_filter-part3'>
          <ul>
            {
              filterApi.map((items: any) => (
                <li className="_one13" key={items.id}>
                  <Link href={`/productDetails/${items.id}`}>
                    <div className="_one14">
                      <Image
                        src={items.thumbnail ? items.thumbnail : "/static-assest.png"}
                        fill
                        alt="Picture of the author"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="_one15">
                      <h3 className="_one16">{items.title.length > 25 ? items.title.slice(0, 22) + "..." : items.title}</h3>
                      <p className="_one17">{items.description.length > 40 ? items.description.slice(0, 37) + "..." : items.description}</p>
                      <div className="_one18">
                        <span>{items.rating}</span>
                        <span>{items.price}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="_one19">
                    <button onClick={() => handleClick(items)}>Add To Cart</button>
                    <button onClick={() => handleBuyNow(items)}>Buy Now</button>
                  </div>
                </li>
              ))
            }
          </ul>
        </main>
      </section>
    </>
  )
}

export default page

