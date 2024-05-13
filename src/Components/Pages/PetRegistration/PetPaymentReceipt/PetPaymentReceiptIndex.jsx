// 👉 Import necessary dependencies from React and external libraries 👈
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiFillPrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import PetRegAPIList from "@/Components/api/PetRegAPIList";
import ulb_data from "@/Components/Common/DynamicData";
import useSetTitle from "@/Components/Common/useSetTitle";

// Functional component for displaying Pet Payment Receipt
const PetPaymentReceiptIndex = () => {

  // State to hold fetched data and loading state
  const [fetchedData, setFetchedData] = useState();
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Custom hook to set the document title
  useSetTitle("Pet Payment Receipt")

  // Extracting transaction number from the route parameters
  const { transNo } = useParams()

  // Ref for the component to be printed
  const componentRef = useRef();

  // React-to-print hook for handling print functionality
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Destructuring API-related data from PetRegAPIList hook
  const { api_petPaymentReceipt, header } = PetRegAPIList();

  // Function to fetch data based on the transaction number
  const fetchData = () => {
    console.log("called........")
    setIsDataLoading(true);

    axios.post(api_petPaymentReceipt, { transactionNo: transNo }, header)
      .then((res) => {
        if (res?.data?.status) {
          setFetchedData(res?.data?.data);
          setIsDataLoading(false);
          console.log("Data Found", res);
        } else {
          setIsDataLoading(false);
          console.log("No Data Found");
        }
      })
      .catch((err) => {
        setIsDataLoading(false);
        console.log("Exception while getting receipt bill", err);
      });
  };

   // Fetch data when the component mounts
  useEffect(() => {
    fetchData()
  }, []);

console.log("data",fetchedData);
  return (
    <>
      <div className="" >
        <div>
          <div className="md:px-0 flex-1 "></div>
          <div className="md:px-0 flex-1 ">
            <button
              onClick={handleprint}
              className="float-right pl-4 pr-6 py-1 bg-sky-400 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-sky-500 hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out"
            >
              <AiFillPrinter className="inline text-lg" />
              print
            </button>
          </div>
        </div>
        <div id="printableArea" className="w-full h-full flex justify-center items-center mx-auto mt-6 " ref={componentRef}>
          <div className="">
            <div className="font-tahoma">
              <div className="border-2 border-dashed border-gray-600  bg-white p-4 w-[250mm] h-auto  md:mx-auto lg:mx-auto  container ">
                <div className="grid grid-col-1 md:grid-col-12 lg:grid-col-12 relative">
                  <div className="">
                    <img src={fetchedData?.ulbDetails?.ulb_logo} className="h-20 mx-auto" />
                  </div>
                  <div className="">
                    <img
                      src={fetchedData?.ulbDetails?.state_logo}
                      alt=""
                      className=" w-[22rem] h-[22rem]  absolute z-10 bg-transparent opacity-20 mt-[16rem] ml-[28%]  rounded-full border bg-center"
                    />
                  </div>
                </div>

                {/* rmc */}
                <div className="grid grid-col-1 md:grid-col-12 lg:grid-col-12 p-1 ">
                  <div className="">
                    <h1 className="font-semibold text-2xl text-center ">
                    {fetchedData?.ulbDetails?.ulb_name}
                    </h1>
                  </div>
                  <div className="space-y-2 mt-1">
                    <h1 className="font-semibold text-1xl text-center text-gray-800 ">
                    {fetchedData?.ulbDetails?.address}
                    </h1>
                    <h1 className="font-semibold text-xs text-center text-gray-800 ">
                    {fetchedData?.ulbDetails?.email}
                    </h1>
                  </div>
                </div>

                {/* holding tax */}
                <div className="grid grid-col-1 md:grid-col-12 lg:grid-col-12 p-1 ">
                  <div className="mx-auto">

                    {/* <h1 className="font-semibold text-1xl text-center text-gray-800 border border-gray-700 w-[12rem] uppercase ">
                      Market Section/
                    </h1> */}

                  </div>
                  <h1 className="font-semibold text-center underline text-2xl mt-2">Pet Registration Receipt</h1>
                </div>


                {/* detail section 1 */}
                <div>
                  <table className="w-full  p-2 mt-2">
                    <tr className="">
                      <td className=" ">
                        <div className="flex p-1 text-1xl">
                          <h1 className="flex text-gray-900  font-semibold">
                            Application No. :
                          </h1>
                          <h1 className="flex   pl-2">{fetchedData?.applicationNo}</h1>
                        </div>
                        <div className="flex p-1 text-1xl">
                          <h1 className="flex text-gray-900  font-semibold">
                           Transaction No. :
                          </h1>
                          <h1 className="flex   pl-2">{fetchedData?.transactionNo || "N/A"}</h1>
                        </div>
                      </td>
                      <td className=" ">
                        <div className="flex justify-end p-1 text-1xl">
                          <h1 className="flex text-gray-900 font-semibold  ">
                            Date :
                          </h1>
                          <h1 className="flex  pl-2 ">{fetchedData?.todayDate}</h1>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>

                {/* detail section 2 */}
                <div>
                  <h1 className="mt-3 ml-1">Received from ,</h1>
                  <h1 className="ml-8 font-semibold flex mt-2">
                    Shri/Smt - &nbsp; <span>{fetchedData?.applicantName}</span>
                  </h1>
                  <h1 className="ml-8  flex mt-2">
                    <span className="font-semibold whitespace-nowrap">Address - &nbsp; </span>  <span>{fetchedData?.address}</span>
                  </h1>

                  <h1 className="ml-8 mt-4 ">
                    A Sum of Rs <span className="font-semibold">{fetchedData?.paidAmount} </span>
                    <span className="font-semibold">(One hundred only/-)</span>
                    <span className="ml-2">
                      {" "}
                      towards <span className="font-semibold">{fetchedData?.toward}</span>{" "}
                    </span>{" "}
                    <span>
                      Vide Cash/Cheque/Demand Draft/Bankers 
                    <h1 className="mt-1"> Payment Mode :   <span className="font-semibold">  {fetchedData?.paymentMode} </span> dated <span className="font-semibold">{fetchedData?.paymentDate}.</span></h1>
                    <h1 className="mt-1"> Type of Animal :   <span className="font-semibold">  {fetchedData?.typeOfAnimal || 'NA'} </span></h1>
                   <h1 className="mt-1"> Type of Breed :   <span className="font-semibold">  {fetchedData?.typeOfBreed || 'NA' } </span></h1>
                    
                    </span>
                    {/* <span>
                        Vide cash
                        dated  <span className="font-semibold">{fetchedData?.paymentDate}</span> 
                       
                      </span> */}



                  </h1>

                  <div className="mt-[20%]">

                    <div className="grid grid-cols-4 p-8">
                      <div className="grid col-span-2">
                        {/* <h1 className="ml-[10%] ">
                          <span> <a href="https://ibb.co/0MPsGmf"><img src="https://i.ibb.co/fpmDxqC/Jon-Kirsch-s-Signature.png" alt="Jon-Kirsch-s-Signature" width="100" height="100" className=' ml-10' border="0" /></a></span>
                        </h1>
                        <h1 className="flex justify-start">
                          Signature of Authorized Officer
                        </h1> */}
                        {/* <h1 className="ml-[10%] ">
                          <span> <a href="https://ibb.co/0MPsGmf"><img src="https://i.ibb.co/fpmDxqC/Jon-Kirsch-s-Signature.png" alt="Jon-Kirsch-s-Signature" width="100" height="100" className=' ml-10' border="0" /></a></span>
                        </h1>
                        <h1 className="flex justify-start">
                          Enterd in Collection Register
                        </h1> */}
                      </div>
                      {/* <div className="grid col-span-2">
                        <h1 className="ml-[40%] ">
                          <span> <a href="https://ibb.co/0MPsGmf"><img src="https://i.ibb.co/fpmDxqC/Jon-Kirsch-s-Signature.png" alt="Jon-Kirsch-s-Signature" width="100" height="100" className=' ml-10' border="0" /></a></span>
                        </h1>
                        <h1 className="flex justify-start ml-[40%]">
                          Signature of Clerk
                        </h1>

                      </div> */}

                    </div>
                    <h1 className="ml-2">N.B Cheque/Draft/Bankers Cheque are subject to realisation</h1>

                  </div>

                  <div className="grid grid-col-1 md:grid-col-12 lg:grid-col-12 p-3 ">
                    <div className="">
                      <img
                        src="https://zeevector.com/wp-content/uploads/LOGO/Swachh-Bharat-Logo-PNG.png"
                        className="w-24 mx-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* holding tax details */}

                {/* swatch bharat logo */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetPaymentReceiptIndex