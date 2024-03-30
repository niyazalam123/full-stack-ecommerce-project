"use client";
import React from 'react';
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import {RemoveCart} from "@/app/redux/Slice"

const page = () => {
    const data: any = useSelector((items: any) => items.cartData.cartData);
    const dispatch = useDispatch();
    return (
        <>
            <div className='_cart1'>
                <ul className='_cart2'>
                    <li className='_cart3'>
                        <div>
                            <ul className='_cart4'>
                                <li>Image</li>
                                <li>Title</li>
                                <li>Description</li>
                                <li>Brand</li>
                                <li>Category</li>
                                <li>price</li>
                                <li>Remove</li>
                            </ul>
                        </div>
                    </li>
                    {
                        data.map((items: any) => (
                            <li className='_cart3' key={items.id}>
                                <div className='_cart4'>
                                    <div>
                                        <Image
                                            src={items.thumbnail}
                                            width={100}
                                            height={100}
                                            alt="Picture of the author"
                                        />
                                    </div>
                                    <div>
                                        {items.title}
                                    </div>
                                    <div>{items.description}</div>
                                    <div>{items.brand}</div>
                                    <div>{items.category}</div>
                                    <div>{items.price}</div>
                                    <div onClick={()=>dispatch(RemoveCart(items.id))}>Remove</div>
                                </div>
                            </li>
                        ))
                    }

                </ul>
                <div className='_summ_cart1'>
                    <h3 className='_summ_cart2'>Cart Summary</h3>
                    <ul className='_summ_cart3'>
                        <li className='_summ_cart4'><span>SubTotal (1 items) : </span><span>$200</span></li>
                        <li className='_summ_cart4'><span> Discount: </span><span>10%</span></li>
                        <li className='_summ_cart4'><span> Delivery Charge : </span><span>$200</span></li>
                        <li className='_summ_cart4'><span> Toatl : </span><span>$400</span></li>
                    </ul>
                    <button className='checkout'>Checkout</button>
                </div>
            </div>
        </>
    )
}

export default page