import React, { useEffect, useState } from 'react'
import Layout from '../homepage/Layout'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadProductData, searchProduct } from '../features/actions/productActions'
import { timeAgo } from '../helper'
import Loading from '../helper/Loading'
import { unwrapResult } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { addToCart } from '../features/actions/cartAction';
import RelatedProduct from './RelatedProduct'
import StockNotify from './StockNotify'
import BuyNowButton from './Component/BuyNowButton'
import CartButton from './Component/CartButton'


const GetProduct = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { uid } = useParams();
    useEffect(() => {
        document.title = 'Product Detail';
    }, []);
    useEffect(() => {
        dispatch(loadProductData({ uid }));
    }, [uid]);
    const { product, loading, data } = useSelector((state) => state.product);

    useEffect(() => {

        dispatch(searchProduct(product.category));

    }, [dispatch])


    const AddToCart = (uid) => {
        if (!isAuthenticated) {
            Swal.fire({
                icon: 'error',
                title: 'UnAuthorized!',
                text: "Login first.",
            });
        } else {
            dispatch(addToCart({ uid }))
                .then((res1 => {
                    const res = unwrapResult(res1);
                    if (!res.error) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success.',
                            text: res.msg,
                        });
                    } else {
                        const errorFields = Object.keys(res.errors);
                        const errorMessage = errorFields.map(field => `${field}: ${res.errors[field][0]}`).join('\n');
                        Swal.fire({
                            icon: 'error',
                            title: 'Something went wrong.',
                            text: errorMessage,
                        });
                    }
                }))
        }
    }
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const renderDescription = () => {
        if (!showFullDescription) {
            const shortDescription = product.product_description.split(' ').slice(0, 50).join(' ');

            return (
                <>
                    <p dangerouslySetInnerHTML={{ __html: `${shortDescription}...` }} />
                    <button onClick={toggleDescription} className="text-blue-500 font-semibold cursor-pointer hover:underline">
                        See more...
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <div dangerouslySetInnerHTML={{ __html: product.product_description }} />
                    <button onClick={toggleDescription} className="text-blue-500 font-semibold cursor-pointer hover:underline">
                        See Less
                    </button>
                </>
            );
        }
    };

    if (product.length === 0 || loading) {
        return (
            <Loading />
        )
    }

    return (
        <Layout>
            <div className="pt-10 bg-white pb-3">
                <h1 className="text-center text-3xl font-bold text-gray-800">Product Detail</h1>
            </div>

            <main className='mx-auto flex justify-center items-center py-10 rounded shadow-md bg-white' >
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-5 w-5/6  p-3 shadow-lg'>
                    <div className='mx-5'>
                        <div className="overflow-hidden rounded-xl flex flex-grow">
                            <img src={`${product.image}`} alt="" />
                        </div>
                    </div>
                    <div className='text-indigo-500 mx-5 md:mt-3 pt-4'>
                        <h3 className="uppercase text-black text-2xl font-medium">{product.product_name}
                        </h3>
                        <div className='flex justify-between'>

                            <div className="start inline">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm text-slate-800 inline">4.9</span>
                            </div>
                            <small className='end mr-12'>Brand : {product.brand_name}</small>
                        </div>
                        <div className='flex justify-between'>
                            <div className="start">

                                <del className="text-xl font-semibold mb-1 text-red-700 line-through">Rs. {product.actual_price}</del>
                                <h3 className="text-2xl font-semibold mb-1">Rs. {product.effective_price}</h3>
                                <p className="font-semibold text-base text-gray-70">Discount {product.discount} %</p>
                                <p className='text-gray-500 mb-7'>Vol. {product.volume} ML</p>
                            </div>
                            <div className="end text-gray-500">
                                <small className='end'>{timeAgo(product.created_at)}</small>
                                <p>Vendor : {product.seller}</p>
                                <p>category : {product.category}</p>
                            </div>
                        </div>
                        <div className='text-gray-500 mx-5 md:mt-3 pt-4'>
                            {renderDescription()}
                        </div>
                        {/* <div dangerouslySetInnerHTML={{ __html: product.product_description }} /> */}
                        <div className="flex flex-col items-end justify-between p-2 sm:flex-row ">

                            <CartButton uid={product.uid} />

                            {product.stock > 0 ?

                                <BuyNowButton uid={product.uid} />

                                :
                                <StockNotify product_id={product.uid} />}
                        </div>

                    </div>
                </div>

            </main>
            <RelatedProduct data={data} />
        </Layout>
    )
}

export default GetProduct