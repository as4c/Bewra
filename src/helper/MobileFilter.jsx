import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { filterProduct } from '../features/actions/productActions';

const MobileFilter = () => {
    const [sorted, setSorted] = useState('');
    const [price_range, setPriceRange] = useState('');
    const [date, setDate] = useState('');
    const dispatch = useDispatch();

    const applyFilter = () => {
        dispatch(filterProduct({ sorted, price_range, date }));
    }
    return (    
        <div className="flex flex-col items-center justify-center px-4 py-2">
        {/* Sort By */}
      
        <hr className="w-full my-2" /> 

        {/* Price */}
        <div className="my-2 w-full">
            <label htmlFor="effective_price" className="text-sm font-semibold text-gray-600">
            By Price
            </label>
            <select
                name="effective_price"
                id="effective_price"
                className="w-full px-4 py-2 mt-1 focus:outline-none focus:shadow-outline border border-gray-300 rounded-md"
                onChange={(e) => setSorted(e.target.value)}
            >
                <option value=""></option>
                <option value="lth">Low to high</option>
                <option value="htl">High to low</option>
            </select>
        </div>

        {/* Price Range */}
        <div className="my-2 w-full">
            <label htmlFor="effective_price-range" className="text-sm font-semibold text-gray-600">
                By Price Range
            </label>
            <select
                name="effective_price-range"
                id="effective_price-range"
                className="w-full px-4 py-2 mt-1 focus:outline-none focus:shadow-outline border border-gray-300 rounded-md"
                onChange={(e) => setPriceRange(e.target.value)}
            >        <option value="" className='text-green-500 text-xl font-semibold'> </option>
                <option value="100t500" className=''> Under 500</option>
                <option value="500t1000" className=''>Under 1000</option>
                <option value="1000t1500" className=''>Under 1500</option>
                <option value="1500t2000" className=''>Under 2000</option>
                <option value="2000t3000" className=''>Under 3000</option>
                <option value="3000t4000" className=''>Under 4000</option>
                <option value="4000t5000" className=''>under 5000</option>
                <option value=">5000" className=''> more than 5000</option>
            </select>
        </div>

        <div className="my-2 w-full">
            <label htmlFor="date" className="text-sm font-semibold text-gray-600">By Added Date
            </label>
            <select
                name="date"
                id="date"
                className="w-full px-4 py-2 mt-1 focus:outline-none focus:shadow-outline border border-gray-300 rounded-md"
                onChange={(e) => setDate(e.target.value)}
            >
                <option value="" className='text-green-500 font-bold'></option>
                <option value="na">Newly added</option>
                <option value="op">Older product</option>
            </select>
        </div>
        <div className='my-2'>
            <button onClick={applyFilter}
                className='px-2 py-1 bg-emerald-600 hover:bg-emerald-500 mx-2 rounded-lg'
            >Apply filter</button>
        </div>
    </div>


    )
}

export default MobileFilter