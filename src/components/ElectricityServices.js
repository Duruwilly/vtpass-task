import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/ServicesContext";
import { userSelect } from "../redux/userSlice";
import { useTvConfirmation } from "../servicesPost/useTvConfirmation";

const ElectricityServices = () => {
    const { userDetails, airtimeSelection } = useSelector((state) => state.user)
    const { smartCardConfirmation } = useTvConfirmation()
    const { data, dataLoading, dataResponse } = useGlobalContext();
    const { serviceID } = airtimeSelection
  const inputStyle =
    "py-2 px-3 bg-black/50 w-full focus:text-black border-none focus:border focus:border-none focus:border-gray-200 focus:bg-transparent block placeholder:text-white";

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const [variationCode, setVariationCode] = useState('')
   
  const [inputData, setInputData] = useState({
    phone: "",
    email: "",
    type: "",
    airtimeAmount: '',
    billersCode: "",
    type: "",
  });

  const onChangeInput = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const { phone, email, airtimeAmount, billersCode, type } = inputData;
  const variation_code = variationCode

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(userSelect({ ...inputData, variation_code }));
    smartCardConfirmation({billersCode, phone, serviceID, type})
    navigate("/confirm");
  };

useEffect(() => {

    const selectedService = dataResponse?.find(service => service.name === type);
    setVariationCode(selectedService?.variation_code)
    
    },[type, dataResponse])

  return (
    <form action="" className="space-y-2 mt-4" onSubmit={onSubmit}>
        {dataLoading ? ( <div className='flex justify-center items-center'><CircularProgress /></div>) : (
      <select
        className={inputStyle}
        id="type"
        name="type"
        value={type}
        onChange={onChangeInput}
        required
      >
        <option value='' selected disabled>Select Your Disco</option>
        {dataResponse?.map((services, index) => (
        <option value={services.name} key={index}>{services.name}</option>    
        ))}
      </select>
        )}
       
      <input
        placeholder="Enter Meter Number"
        id="billersCode"
        type="text"
        className={inputStyle}
        value={billersCode}
        onChange={onChangeInput}
        required
      />
      <input
        placeholder="Enter Phone Number"
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
      placeholder="Enter Amount"
      id="airtimeAmount"
        type="number"
        className={inputStyle}
        value={airtimeAmount}
        onChange={onChangeInput}
        required
      />
      <button className="w-full border-none bg-red-600 py-2 text-white font-bold text-xl rounded-sm">
        continue
      </button>
    </form>
  );
}

export default ElectricityServices