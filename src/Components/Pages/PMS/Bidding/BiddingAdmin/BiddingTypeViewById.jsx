import ImageModal from "@/Components/Pages/Others/ImageModal/ImageModal";
import React, { useState } from "react";
import img from '@/Components/assets/banner1.jpg'

const BiddingTypeViewById = () => {

    const [imageModal, setImageModal] = useState(false);

  const creteria = [
    {
      cret: "creteria 1",
    },
    {
      cret: "creteria 2",
    },
    {
      cret: "creteria 3",
    },
    {
      cret: "creteria 4",
    },
    {
      cret: "creteria 5",
    },
    {
      cret: "Rank",
    },
  ];

  const biddingData = [
    {
      name: "Raju Pvt Ltd",
      cret01: "1",
      cret02: "2",
      cret03: "3",
      cret04: "4",
      cret05: "5",
      rank: "L1",
    },
    {
      name: "Raju Pvt Ltd",
      cret01: "1",
      cret02: "2",
      cret03: "3",
      cret04: "4",
      cret05: "5",
      rank: "L1",
    },
    {
      name: "Raju Pvt Ltd",
      cret01: "1",
      cret02: "2",
      cret03: "3",
      cret04: "4",
      cret05: "5",
      rank: "L1",
    },
  ];

  const biddingData2 = [
    {
      sno: "Raju Pvt Ltd",
      tenderRefNo: "1",
      bidderName: "2",
      biddingPrice: "3",
      rank: "4",
      doc: "5",
    },
    {
      sno: "Rancho Pvt Ltd",
      tenderRefNo: "1",
      bidderName: "2",
      biddingPrice: "3",
      rank: "4",
      doc: "5",
    },
    {
      sno: "Farhan Pvt Ltd",
      tenderRefNo: "1",
      bidderName: "2",
      biddingPrice: "3",
      rank: "4",
      doc: "5",
    },
  ];

  if (imageModal) {
    return (
      <>
        <ImageModal
          imageModal={imageModal}
          setImageModal={setImageModal}
          imageUrl={img}
        />
      </>
    );
  }

  return (
    <>
      <div className="">
        <h2 className=" text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md">
          On the Basis of Technical Qualification the Analysis are :-
        </h2>
      </div>

      {/* Bidder details */}
      <div className="">
        <div className="bg-white p-2 mt-5 rounded-md ">
          {/* 1st Info */}
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className=" text-gray-500  bg-gray-200 ">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-5 text-center border-r border-l border-gray-300"
                  >
                    Bidder name
                  </th>

                  {creteria?.map((data) => (
                    <th
                      scope="col"
                      className="px-6 py-5 text-center border-r border-gray-300"
                    >
                      {data?.cret}
                    </th>
                  ))}

                  {/* <th
                    scope="col"
                    className="px-6 py-5 text-center border-r border-gray-300"
                  >
                    Rank
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {biddingData?.map((data) => (
                  <tr className="bg-white ">
                    <th
                      scope="row"
                      className="px-6 py-5 text-center border-r border-l border-gray-300 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {data?.name}
                    </th>
                    <td className="px-6 py-5 text-center border-r border-gray-300">
                      {data?.cret01}
                    </td>
                    <td className="px-6 py-5 text-center border-r border-gray-300">
                      {data?.cret02}
                    </td>
                    <td className="px-6 py-5 text-center border-r border-gray-300">
                      {data?.cret03}
                    </td>
                    <td className="px-6 py-5 text-center border-r border-gray-300">
                      {data?.cret04}
                    </td>
                    <td className="px-6 py-5 text-center border-r border-gray-300">
                      {data?.cret05}
                    </td>
                    <td className="px-6 py-5 text-center border-r border-gray-300">
                      {data?.rank}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900">
                  <th
                    scope="row"
                    className="px-6 py-3 text-center text-base border bg-[#4338ca] text-white border-gray-300"
                  >
                    Total
                  </th>
                  <td className="px-6 py-3 text-center border border-gray-300">
                    3
                  </td>
                  <td className="px-6 py-3 text-center border border-gray-300">
                    3
                  </td>
                  <td className="px-6 py-3 text-center border border-gray-300">
                    3
                  </td>
                  <td className="px-6 py-3 text-center border border-gray-300">
                    3
                  </td>
                  <td className="px-6 py-3 text-center border border-gray-300">
                    3
                  </td>
                  <td className="px-6 py-3 text-center border border-gray-300">
                    3
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* 2nd Info */}
          <div className="mt-14">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="  bg-[#4338ca] text-white ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-5 text-center border-r border-gray-300"
                    >
                      S No.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-5 text-center border-r border-gray-300"
                    >
                      Tender Reference No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-5 text-center border-r border-gray-300"
                    >
                      Bidder Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-5 text-center border-r border-gray-300"
                    >
                      Bidding Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-5 text-center border-r border-gray-300"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-5 text-center border-r border-gray-300"
                    >
                      Uploaded Document
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {biddingData2?.map((data) => (
                    <tr className="bg-white ">
                      <th
                        scope="row"
                        className="px-6 py-5 text-center border-r border-l border-gray-300 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {data?.sno}
                      </th>
                      <td className="px-6 py-5 text-center border-r border-gray-300">
                        {data?.tenderRefNo}
                      </td>
                      <td className="px-6 py-5 text-center border-r border-gray-300">
                        {data?.bidderName}
                      </td>
                      <td className="px-6 py-5 text-center border-r border-gray-300">
                        {data?.biddingPrice}
                      </td>
                      <td className="px-6 py-5 text-center border-r border-gray-300">
                        {data?.rank}
                      </td>
                      <td className="px-6 py-5 text-center border-r border-gray-300 cursor-pointer text-blue-800"
                      onClick={()=>setImageModal(true)}
                      >
                        View
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-gray-900">
                    <th
                      scope="row"
                      className="px-6 py-3 text-center border-b border-l border-r border-gray-300"
                    ></th>
                    <td className="px-6 py-3 text-center border-b border-l border-r border-gray-300"></td>
                    <td className="px-6 py-3 text-center border-b border-l border-r border-gray-300"></td>
                    <td className="px-6 py-3 text-center border-b border-l border-r border-gray-300"></td>
                    <td className="px-6 py-3 text-center border-b border-l border-r border-gray-300"></td>
                    <td className="px-6 py-3 text-center border-b border-l border-r border-gray-300"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-5 mt-8">
        <button className="bg-white  hover:bg-[#4338CA] hover:text-white border border-blue-700 px-10 py-2 rounded flex">
          Cancel
        </button>
        <button className="bg-[#4338CA]  hover:bg-[#5a50c6]  text-white px-10 py-2 rounded flex">
          Confirm
        </button>
      </div>
    </>
  );
};

export default BiddingTypeViewById;
