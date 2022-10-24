import React from 'react'
import { useSelector } from 'react-redux'
import { PaystackButton } from "react-paystack";
import { useDispatch } from "react-redux";
import { referenceID } from "../redux/userSlice";
import { airtimePost } from '../servicesPost/airtimePost';
import { useNavigate } from 'react-router-dom';
import { useExamplePost } from '../servicesPost/useExamplePost';
import { v4 as uuidv4 } from "uuid";

const Confirmation = () => {
  const inputStyle = "py-2 px-3 bg-black/50 w-full text-white border-none"
  const { userDetails, airtimeSelection } = useSelector((state) => state.user)
  const { responseDetails } = useSelector((state) => state.response)
  const { phone, email, airtimeAmount, plan, variation_code, billersCode, subscription_type, type } = userDetails
  const { serviceID, airtimeProviderImg, name } = airtimeSelection

  const { sendPurchaseRequest } = useExamplePost()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  var request_id = new Date()
 let dd = String(request_id.getDate()).padStart(2, '0')
 var month = String(request_id.getMonth() + 1).padStart(2, '0')
 let year = String(request_id.getFullYear())
 let hour = String(request_id.getHours()).padStart(2, '0')
 let minute = String(request_id.getMinutes())
 let randomLetters = uuidv4()

 request_id = year+month+dd+hour+minute+randomLetters
 console.log(request_id);

  const publicKey = "pk_test_d3b867f10827c681b46919ca699c6bbbbe65ae80";

  let amountProp = 100 * airtimeAmount
  const amount = airtimeAmount;

  const componentProps = {
    email,
    amount: amountProp,
    publicKey,
    text: "Confirm",
    onSuccess: () => {
      sendPurchaseRequest({ request_id, serviceID, amount, phone, plan, variation_code, billersCode, subscription_type, type })
      dispatch(referenceID({ request_id }))
      navigate("/successfull");
    },
    onClose: () => alert("are you sure you want to leave?"),
  };

  return (
    <section className="flex justify-center items-center">
      <div className="w-full max-w-screen-sm h-screen px-4 mt-7">
        <h2 className="py-2">confirm purchase for</h2>
        <img src={airtimeProviderImg} alt="" className="h-10 object-cover" />
          <div className='flex justify-between py-4'>
            <p>Product</p>
            <p>{name}</p>
            </div>
            <div className='flex justify-between py-4'>
              <p>Phone</p>
              <p>{phone}</p>
            </div>
            <div className='flex justify-between py-4'>
              <p>Email</p>
              <p>{email}</p>
            </div>
            { responseDetails?.content?.Customer_Name !== undefined && <div className='flex justify-between py-4'>
              <p>User Name</p>
              <p>
              {responseDetails?.content?.Customer_Name}
              </p>
              </div>}
            {
              plan !== undefined && (

            <div className='flex justify-between py-4'>
              <p>Plan</p>
              <p>{plan}</p>
            </div>
              )
            }
            {
              type !== undefined && (

            <div className='flex justify-between py-4'>
              <p>Meter Type</p>
              <p>{type}</p>
            </div>
              )
            }
            <div className='flex justify-between py-4'>
              <p>Total amount payable</p>
              <p>₦ {[airtimeAmount].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
            <div className='flex justify-between py-4'>
              <p>Status</p>
              <p>initiated</p>
            </div>
        <PaystackButton {...componentProps} className='paystack-button' />
      </div>
    </section>
  );
}

export default Confirmation