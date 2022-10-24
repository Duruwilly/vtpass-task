import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userSelect } from '../redux/userSlice'

const AirtimeServices = () => {
    const inputStyle = "py-2 px-3 bg-black/50 w-full focus:text-black border-none focus:border focus:border-none focus:border-gray-200 focus:bg-transparent block placeholder:text-white"

 const dispatch = useDispatch()
 const navigate = useNavigate()

    const [inputData, setInputData] = useState({
        phone: "",
        email: "",
        airtimeAmount: ""
      });
     
      const onChangeInput = (e) => {
        setInputData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
      };

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(userSelect({ ...inputData }))
          navigate('/confirm')
       }
      
       const { phone, email, airtimeAmount } = inputData;

  return (
    <form action="" className="space-y-2 mt-4" onSubmit={onSubmit}>
          <input
            placeholder="Enter phone Number"
            id="phone"
            type="tel"
            maxLength="11"
            minLength="9"
            className={inputStyle}
            value={phone}
            onChange={onChangeInput}
            required
          />
          <input
            placeholder="Email address"
            id="email"
            type="email"
            className={inputStyle}
            value={email}
            onChange={onChangeInput}
            required
          />
          <input
            placeholder="Amount"
            id="airtimeAmount"
            type="number"
            min="50"
            max="8000"
            className={inputStyle}
            value={airtimeAmount}
            onChange={onChangeInput}
            required
          />
          <button className="w-full border-none bg-red-600 py-2 text-white font-bold text-xl rounded-sm">
            continue
          </button>
        </form>
  )
}

export default AirtimeServices