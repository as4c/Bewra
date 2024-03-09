import React from 'react'
import { API } from '../backend';
import Swal from 'sweetalert2';
import axios from 'axios';

const StockNotify = ({ product_id }) => {

  const handleNotifyMe = async () => {
    try {
      const response = await axios.post(`${API}/notify/me/`, {
        product_id: product_id,
      }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `JWT ${localStorage.getItem('access')}`
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Request Successful.',
        text: response.data.message,
      });

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'warning',
        title: 'Request Failed.',
        text: 'An error occurred while processing your request.',
      });
    }
  };


  return (

    <div className="flex items-center space-x-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 px-2 py-2 text-white w-full sm:w-auto">
      <button onClick={handleNotifyMe} className="text-md">Notify Me</button>
    </div>
  );
}

export default StockNotify