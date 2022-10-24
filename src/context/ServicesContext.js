import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Airtime Recharge");
  const [identifier, setIdentifier] = useState("airtime");
  const [data, setData] = useState("");
  const [dataLoading, setDataLoading] = useState(true)
  const [dataResponse, setDataResponse] = useState([])

  useEffect(() => {
    getServicesData(identifier);
  }, [identifier]);

  useEffect(() => {
      getServices(data)
     }, [data])


  const getServicesData = async (identifier) => {
    try {
      const res = await axios.get(
        `https://sandbox.vtpass.com/api/services?identifier=${identifier}`
      );
      setServicesData(res.data.content);
      setTimeout(() => {
        setIsLoading(false)
      }, 700)
      
    } catch (error) {
      console.log(error);
    }
  };

  const getServices = async (data) => {
    try {
      const res = await axios.get(
        `https://sandbox.vtpass.com/api/service-variations?serviceID=${data}`
      );
      setDataResponse(res.data.content.varations);
      setTimeout(() => {
        setDataLoading(false)
      }, 700)
     
    } catch (error) {
      console.log(error);
    }
  };


  
  const handleTab = async (tab, path) => {
    setIsLoading(true);
    setSelectedTab(tab);
    setTimeout(() => {
      setIdentifier(path);
    }, 500)
    await getServicesData(identifier);
    setDataResponse([])
  };


  const handleDataClick = async (serviceID) => {
    setDataLoading(true);
    setTimeout(() => {
      setData(serviceID);
    }, 500)
    await getServices(data);
  }


  return (
    <ServicesContext.Provider
      value={{
        servicesData,
        isLoading,
        selectedTab,
        identifier,
        handleTab,
        handleDataClick,
        data,
        dataLoading,
        setDataLoading,
        dataResponse,
        getServicesData
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useGlobalContext = () => useContext(ServicesContext);