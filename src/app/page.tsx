"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AddCart } from "@/app/redux/Slice";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch();
  const route = useRouter();
  const reduxData = useSelector((data: any) => data.cartData.cartData);

  // fetch products api
  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch("/api/allProducts");
        const result = await resp.json();
        setData(result.products);
      } catch (error) {
        throw new Error("unable to fetch data");
      }
    };
    fetchData();
  }, []);

  // item sending in localstorage
  function handleClick(products: any) {
    const dataExist = reduxData.find((items: any) => items._id === products._id);
    if (!dataExist){
      dispatch(AddCart(products));
      alert("cart added")
    }
    else{
      route.push("/cart");
      alert("item exist")
    }
  }

  // buy now button handle
  function handleBuyNow(products: any) {
    const dataExist = reduxData.find((items: any) => items._id === products._id);
    if (!dataExist) {
      dispatch(AddCart(products));
      route.push("/cart");
      alert("cart added")
    }
    else{
      route.push("/cart");
      alert("item exist")
    }
  }

  return (
    <>
      <div className="_one11">
        <ul className="_one12">
          {
            data.map((items: any) => (
              <li className="_one13" key={items._id}>
                <Link href={`/productDetails/${items._id}`}>
                  <div className="_one14">
                    <Image
                      src={`${items.thumbnail || 'static-assest.png'}`}
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
      </div>
    </>
  );
}
