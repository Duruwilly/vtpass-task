import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { airtimeResponseDetails } from "../redux/responseSlice";


export function useExamplePost() {
    const dispatch = useDispatch()

const sendPurchaseRequest = async (request_id, serviceID, amount, phone, plan, variation_code, billersCode, subscription_type) => {
    try {
        const res = await fetch("https://sandbox.vtpass.com/api/pay", {
            method: "POST",
            body: JSON.stringify(request_id, serviceID, amount, phone, plan, variation_code, billersCode, subscription_type),
            headers: {
                "Content-Type": "application/json",
            "api-key": "5c791f5d732ba000633c7c0a4cfba0f9",
            "secret-key": "SK_96453f5da025f3a9899fd5ad2b074ca89f777de1625",
            },
        });
        const data = await res.json();

          dispatch(airtimeResponseDetails({ ...data }))
        } catch (error) {
            console.log(error);
        }
    };

    return { sendPurchaseRequest  }
}
