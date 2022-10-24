import { useDispatch } from "react-redux";
import { airtimeResponseDetails } from "../redux/responseSlice";
// const dispatch = useDispatch()
export const airtimePost = async (
  request_id,
  serviceID,
  amount,
  phone
) => {
  const sendPurchaseRequest = async () => {
    const res = await fetch("https://sandbox.vtpass.com/api/pay", {
      method: "POST",
      body: JSON.stringify(
        request_id,
        serviceID,
        amount,
        phone
      ),
      headers: {
        'Content-Type': 'application/json',
        "api-key": "5c791f5d732ba000633c7c0a4cfba0f9",
        "secret-key": "SK_96453f5da025f3a9899fd5ad2b074ca89f777de1625",
        
      },
    });
    const data = await res.json();
    console.log(data);
  };
  try {
    await sendPurchaseRequest();
  } catch (error) {
    console.log(error);
  }
};


  const publicKey = "PK_389386021382c14e42eebdd0f6d99fe54f6c209dc89"