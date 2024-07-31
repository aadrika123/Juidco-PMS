import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
// import { TbCircleLetterNFilled } from "react-icons/tb";

const BiddingType = () => {
  const numberOfBidders = [
    { bidderHeading: `B1`, compName: `Raju Pvt Ltd.` },
    { bidderHeading: `B2`, compName: `Farhan Pvt Ltd.` },
    { bidderHeading: `B3`, compName: `Rancho Pvt Ltd.` },
    { bidderHeading: `B3`, compName: `Rancho Pvt Ltd.` },
    { bidderHeading: `B3`, compName: `Rancho Pvt Ltd.` },
    { bidderHeading: `B3`, compName: `Rancho Pvt Ltd.` },
  ];

  const creteria = [
    {
      creteria: "creteria 01",
      desc: "Description For creteria 1",
      input: `creteria01`,
    },
    {
      creteria: "creteria 02",
      desc: "Description For creteria 2",
      input: `creteria02`,
    },
    {
      creteria: "creteria 03",
      desc: "Description For creteria 3",
      input: `creteria03`,
    },
    {
      creteria: "creteria 03",
      desc: "Description For creteria 3",
      input: `creteria03`,
    },
    {
      creteria: "creteria 03",
      desc: "Description For creteria 3",
      input: `creteria03`,
    },
  ];

  return (
    <>
      <div className="ml-32 mr-32">
        <div className="flex justify-between">
          <button className="bg-[#4338ca] text-white py-2 px-8 rounded-md">
            Least Cost Based Selection
          </button>
          <button className="bg-gray-200 text-[#4338ca] py-2 px-8 rounded-md">
            Quality and Cost Based Selection{" "}
          </button>
          <button className="bg-gray-200 text-[#4338ca] py-2 px-8 rounded-md">
            Rate Contract Based Selection{" "}
          </button>
          <button className="bg-gray-200 text-[#4338ca] py-2 px-4 rounded-md ">
            <FaCircleCheck className="text-lg" />
            {/* <h1 className="font-bold">N</h1> */}
          </button>
        </div>
      </div>

      <div className="">
        <div className="flex m-6">
          <div className="bg-white w-[25rem] ">
            <div className="p-8 border border-gray-00">
              <h1>Criteria Details </h1>
              <p className="text-sm text-gray-400">
                Criteria For Technical Quality Comparison{" "}
              </p>
            </div>

            {creteria?.map((data) => (
              <div className="pl-8 pt-4 pb-4 border border-gray-00">
                <h1>{data?.creteria} </h1>
                <p className="text-sm text-gray-400">{data?.desc}</p>
              </div>
            ))}
          </div>
          <div className="w-[80%] overflow-x-auto flex">
            {numberOfBidders?.map((data) => (
              <div className="bg-white w-full">
                <div className="p-7 border-b border-t border-gray-100 text-center w-[10rem]">
                  <h1 className="text-2xl font-bold">{data?.bidderHeading} </h1>
                  <p className="text-sm text-gray-400">{data?.compName} </p>
                </div>

                {creteria?.map((data) => (
                  <div className="pl-8 pr-8 pt-5 pb-6 border-b border-gray-200">
                    <input
                      type="text"
                      name={data?.input}
                      className="border text-center border-blue-400 rounded w-full h-8 outline-blue-300"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BiddingType;
