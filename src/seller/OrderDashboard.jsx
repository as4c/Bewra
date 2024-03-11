import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/actions/sellerActions';
import Layout from '../homepage/Layout';
import { filterOrder } from '../features/actions/orderActions';
import DisplayOrderList from '../helper/DisplayOrderList';
import FilterPage from '../helper/FilterPage';
import Loading from '../helper/Loading';

const OrderDashboard = () => {
    const dispatch = useDispatch();
    const { loading, orders } = useSelector((state) => state.seller);
    // const { delivery_boy_loading } = useSelector((state) => state.deliveryBoy);
    const [type, setType] = useState('')
    const [value, setValues] = useState('')
    
    useEffect(() => {
        document.title = 'Seller order dashboard';
    }, []);
    useEffect(() => {
        const filterData = (type, value) => {
            if (value === "") {
                dispatch(getOrders());
            } else {
                dispatch(filterOrder({ type: type, value: value }));
            }
        };
        filterData(type, value);
    }, [dispatch, type, value])



    if (!orders || loading) {
        return (
            <Loading />
        );
    }
    

    return (
        <Layout>
            <div className="bg-white">
                <div className="pb-3 mb-5">
                    <h1 className="text-center align-center text-3xl font-bold text-gray-800">Orders</h1>
                </div>
                <hr />
                <FilterPage  setType= {setType} setValues={setValues}/>
                
                {
                    orders.orders && orders.orders.length > 0 ? (
                        <DisplayOrderList data={orders.orders} />
                    )
                        :
                        (
                            <div className="pb-3 mb-5 min-h-screen">
                                <h1 className="text-center align-center text-3xl font-bold text-gray-800">Order Not found</h1>
                            </div>
                        )
                }
            </div>
        </Layout >

    )
}

export default OrderDashboard;