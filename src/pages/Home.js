import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { airtimeSelect, userSelect } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { clearState } from "../redux/responseSlice";
import ServicesTab from "../components/ServicesTab";
import { useGlobalContext } from "../context/ServicesContext";
import AirtimeServices from "../components/AirtimeServices";
import CircularProgress from "@mui/material/CircularProgress";
import ElectricityServices from "../components/ElectricityServices";
import { DataServices } from "../components/DataServices";
import TvPayment from "../components/TvPayment";
import EducationPayment from "../components/EducationPayment";

const Home = () => {
  const {
    servicesData,
    identifier,
    isLoading,
    handleDataClick,
    getServicesData,
  } = useGlobalContext();
  console.log(servicesData);

  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();

  const handleImageClick = (serviceID, airtimeProviderImg, name) => {
    dispatch(airtimeSelect({ serviceID, airtimeProviderImg, name }));
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen ">
        <CircularProgress />
      </div>
    );

    // const testAlgo = (str) => {
    //   // for(let i = 0; i < str.length; i++) {
    //   //   const string = str[i]
    //   //   console.log(string);
    //   // }
    //   str = str.split('')
    //   str = str.splice(1,3)
    //   let string1 = str[0].replace("A", "B");
    //   let string2 = str[2].replace("A", "B");
    //   console.log(str+string1+string2);
    // }

    // testAlgo("ABAB")

    

  return (
    <section className="flex justify-center items-center">
      <div className="w-full max-w-screen-md h-screen px-4 mt-7">
        {identifier === "electricity-bill" ? (
          <h2>Select Your Disco</h2>
        ) : identifier === "education" ? (
          <h2>Select Examination Type</h2>
        ) : identifier === "funds" ? (
          <h2>Select Bank</h2>
        ) : (
          <h2>Select Mobile Operator</h2>
        )}
        <div className="relative">
          <div className="flex items-center gap-5 mt-3">
            {servicesData?.map((services, index) => (
              <div className="relative" key={index}>
                <label className="relative container">
                  <input
                    type="radio"
                    name="radio"
                    className="absolute hidden"
                    onClick={() => {
                      handleImageClick(
                        services.serviceID,
                        services.image,
                        services.name
                      );
                      handleDataClick(services.serviceID);
                    }}
                  />
                  <img
                    src={services?.image}
                    alt=""
                    className="h-10 object-cover"
                  />
                  <p>{services?.name}</p>
                  <span className="checkmark"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
        {identifier === "airtime" ? (
          <AirtimeServices />
        ) : identifier === "data" ? (
          <DataServices />
        ) : identifier === "tv-subscription" ? (
          <TvPayment />
        ) : identifier === "electricity-bill" ? (
          <ElectricityServices />
        ) : identifier === "education" ? (
          <EducationPayment />
        ) : (
          ""
        )}


      </div>
    </section>
  );
};

export default Home;
