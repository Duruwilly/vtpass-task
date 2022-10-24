import { useGlobalContext } from "../context/ServicesContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ServicesTab = () => {
  const { handleTab, selectedTab } = useGlobalContext();

  const columns = [
    { name: "Airtime Recharge", path: "airtime" },
    { name: "Data Services", path: "data" },
    { name: "Tv Subscription", path: "tv-subscription" },
    { name: "Electricity Bill", path: "electricity-bill" },
    { name: "Education", path: "education" },
    // { name: "Funds", path: "funds" },
    // { name: "Other Merchants/Services", path: "other-services"},
    // { name: "Insurance", path: "insurance"}
  ];

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <section>
      <ul className="servicesTab">
        {columns.map((tab) => (
          <li
            onClick={() => {handleTab(tab.name, tab.path); if(window.location.pathname === '/successfull' || '/confirmation') {
                navigate('/')
            }}}
            key={tab.name}
            className={tab.name === selectedTab ? 'tab-active' : 'liStyle'}
          >
            {tab.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesTab;