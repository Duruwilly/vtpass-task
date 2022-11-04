import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const TransactionConfirmed = () => {
  const { userDetails, airtimeSelection } = useSelector((state) => state.user)
  
  const { phone, email, airtimeAmount } = userDetails
  const { serviceID, airtimeProviderImg, name } = airtimeSelection
  const { responseDetails } = useSelector((state) => state.response)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  setTimeout(() => {
    setIsLoading(false)
  }, 2000)

  if(isLoading) return <div className='flex justify-center items-center w-full h-screen'><CircularProgress /></div>
  return (
    <section className="flex justify-center items-center">
      <div className="w-full max-w-screen-sm h-screen px-4 mt-7">
        <h1 className='font-bold text-xl py-2'>Transaction Details</h1>
       <table>
        {responseDetails?.purchased_code !== '' && <tr>
          <td className='text-red-700 text-2xl font-semibold text-center' colSpan='2'>{responseDetails?.purchased_code}</td>
        </tr>}
        <tr>
          <td>Payment Method</td>
          <td>Wallet</td>
        </tr>
        <tr>
          <td>Response Description</td>
          <td>{responseDetails?.response_description}</td>
        </tr>
        <tr>
          <td>Service</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{phone}</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>₦ ({[responseDetails?.content?.transactions?.amount].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})</td>
        </tr>
        <tr>
          <td>RequestId</td>
          <td>{responseDetails?.requestId}</td>
        </tr>
        <tr>
          <td>TransactionId</td>
          <td>{responseDetails?.content?.transactions?.transactionId}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{responseDetails?.content?.transactions?.status}</td>
        </tr>
        <tr>
          <td>Transaction Date</td>
          <td>{responseDetails?.transaction_date?.date}</td>
        </tr>
       </table>
      </div>
    </section>
  );
}

export default TransactionConfirmed