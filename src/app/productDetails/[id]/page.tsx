"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AddCart } from '@/app/redux/Slice';
import Link from 'next/link';

const page = ({ params }: any) => {
    const [data, setData] = useState([]);
    const [product, setProduct] = useState<any>({});
    const id = params.id;
    const dispatch = useDispatch();
    const route = useRouter();
    const reduxData = useSelector((data: any) => data.cartData.cartData);


    function matchProducts() {
        const result = data.filter((items: any) => items.category === product.category && items._id !== product._id);
        return result;
    }

    useEffect(() => {
        async function filterData() {
            try {
                const resp = await fetch(`/api/allProducts`);
                const result = await resp.json();
                const filterResp = result.products;
                setData(filterResp);
                const final = filterResp.find((product: any) => product._id === id);
                setProduct(final);
            } catch (error) {
                throw new Error("unable to filter data");
            }
        };
        filterData();
    }, []);

    // item sending in localstorage
    function handleClick(products: any) {
        const dataExist = reduxData.find((items: any) => items._id === products._id);
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
        const dataExist = reduxData.find((items: any) => items._id === products._id);
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
            <div>
                <div className='_oner1'>
                    <div className='_oner2'>
                        <Image
                            src={product.thumbnail ? product.thumbnail : "/static-assest.png"}
                            width={300}
                            height={300}
                            alt="Picture of the author"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className='_oner3'>
                        <h2 className='_oner4'>{product.title}</h2>
                        <p className='_oner5'>{product.description}</p>
                        <ul className='_oner6'>
                            <li className='_oner7'><span>Brand : </span><span>{product.brand}</span></li>
                            <li className='_oner7'><span>category : </span><span>{product.category}</span></li>
                            <li className='_oner7'><span>discountPercentage : </span><span>{product.discountPercentage}</span></li>
                            <li className='_oner7'><span>price : </span><span>{product.price}</span></li>
                            <li className='_oner7'><span>rating : </span><span>{product.rating}</span></li>
                            <li className='_oner7'><span>stock : </span><span>{product.stock}</span></li>
                        </ul>
                    </div>
                    <div className='_oner8'>
                        <h3 className='_oner9'>IN Stock</h3>
                        <div className='_oneri1'>
                            <button onClick={() => handleClick(product)}>Add To cart</button>
                            <button onClick={() => handleBuyNow(product)}>Buy now</button>
                        </div>
                    </div>
                </div>
                <h3>Related Category</h3>
                <ul className='_slider1'>
                    {
                        matchProducts().map((items:any) => (
                            <li className="_one13" key={items._id}>
                                <Link href={`/productDetails/${items._id}`}>
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
            </div>
        </>
    )
}

export default page