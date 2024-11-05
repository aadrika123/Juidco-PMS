import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import FileButton from "@/Components/Common/FileButtonUpload/FileButton";
import ImageDisplay from "@/Components/Common/FileButtonUpload/ImageDisplay";
import ApiHeader2 from "@/Components/api/ApiHeader2";

const SearchInvtById = () => {
  const { api_getInventoryList,api_postServiceRequestInvt } = ProjectApiList();

  const inputFileRef = useRef();

  let buttonStyle =
    " mr-1 pb-3 pl-6 pr-6 pt-3 border border-indigo-500 text-indigo-800 text-md leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl";

  const [basicDetailData, setBasicDetailData] = useState();
  const [preview, setPreview] = useState();
  const [imageDoc, setImageDoc] = useState();
  const [fetchedData, setFetchedData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [remark, setRemark] = useState("");
  const [quantity, setQuantity] = useState("");
  const [invtDetails, setInvtDetails] = useState({
    id: "",
    serial_no: "",
    quantity: "",
    action_type: "",
  });

  // console.log(fetchedData?.id,"fetchedData")

  const id = useParams();
  //   console.log(id.id)

  const getInvtById = () => {
    AxiosInterceptors.get(`${api_getInventoryList}/${id?.id}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status === true) {
          setFetchedData(response?.data?.data);
          // notify(response?.data?.message, "success");
        } else {
          notify(response?.data?.message, "error");
        }
      })
      .catch(function (res) {
        notify("Error in fetching sub category");
      });
  };

  const submitAction = () => {
    console.log(
      invtDetails?.serial_no,
      "Serial No,",
      invtDetails?.id,
      "Id,",
      quantity,
      "QTY,",
      remark,
      "Remark,",
      imageDoc,
      "img",
      invtDetails?.action_type,
      "service"
    );

    let formData = new FormData();
    formData.append("product", invtDetails?.serial_no);
    formData.append("quantity", quantity);
    formData.append("service", invtDetails?.action_type);
    formData.append("inventoryId", fetchedData?.id);
    formData.append("remark", remark);
    formData.append("doc", imageDoc);

    AxiosInterceptors.post(`${api_postServiceRequestInvt}`, formData, ApiHeader2())
      .then(function (response) {
        if (response?.data?.status == true) {
          toast.success(response?.data?.message, "success");
          setShowModal(false)
        } else {
          toast(response, "error");
        }
      })
      .catch(function (error) {
        console.log("errorrr.... ", error);
        toast.error(
          error?.response?.data?.error ||
          "Error in submitting form. Please try again"
        );
      })
      .finally(() => {
        // setisLoading(false);
      });
  };

  useEffect(() => {
    getInvtById();
  }, []);

  return (
    <>
      <div className="mt-6">
        <div className="py-6 mt-2 bg-white rounded-lg shadow-xl p-4 space-y-5 border border-blue-500">
          <div className="">
            <h2 className="font-semibold text-2xl pl-7 pt-2 pb-2 flex justify-start bg-[#4338ca] text-white rounded-md">
              View Inventory Details{" "}
            </h2>
          </div>

          <div className="flex flex-col space-y-5">
            <div className="flex justify-between">
              <div className="pl-8 text-[1rem] text-black flex justify-between w-full">
                <h1 className="">
                  Category <span className="text-black">:</span>
                  <span className="font-bold">
                    {fetchedData?.category?.name}
                  </span>
                </h1>
              </div>

              <div className="pl-8 text-[1rem] text-black flex justify-between w-full">
                <h1 className="">
                  Sub Category <span className="text-black">:</span>
                  <span className="font-bold">
                    {fetchedData?.subcategory?.name}
                  </span>
                </h1>
              </div>

              <div className="pl-8 text-[1rem] text-black flex justify-between w-full">
                <h1 className="">
                  Quantity <span className="text-black">:</span>
                  <span className="font-bold">
                    {fetchedData?.quantity}
                    {fetchedData?.unit?.abbreviation}
                  </span>
                </h1>
              </div>
            </div>
            <div className="pl-8 text-[1rem] text-black flex justify-between w-full">
              <h1 className="">
                Description <span className="text-black">:</span>
                <span className="font-bold">
                  {fetchedData?.quantity}
                  {fetchedData?.description}
                </span>
              </h1>
            </div>
          </div>

          <>
            <div>
              <p className="text-xs pl-5 underline">Products:</p>
            </div>

            {/* Table */}

            <div className="relative overflow-x-auto m-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Procurement no
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Brand
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Serial No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      opening Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {fetchedData?.products?.map((data) => (
                  <tbody>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4">{data?.procurement_no}</td>
                      <td className="px-6 py-4">{data?.brand}</td>
                      <td className="px-6 py-4">{data?.serial_no}</td>
                      <td className="px-6 py-4">{data?.quantity}</td>
                      <td className="px-6 py-4">{data?.opening_quantity}</td>
                      <td className="px-6 py-4">
                        {data?.createdat.split("T")[0]}
                      </td>
                      <td className="">
                        <div className="flex space-x-4">
                          <button
                            className={`bg-[#d52f29] hover:bg-[#932a26] px-2 py-1 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                            onClick={() => {
                              setShowModal(true);
                              setInvtDetails({
                                id: data?.id,
                                serial_no: data?.serial_no,
                                quantity: data?.quantity,
                                action_type: "dead",
                              });
                            }}
                          >
                            Dead Stock
                          </button>

                          <button
                            className={`bg-[#21b031] hover:bg-[#1e6727] px-2 py-1 text-white font-semibold rounded leading-5 shadow-lg float-right `}
                            onClick={() => {
                              setShowModal(true);
                              setInvtDetails({
                                id: data?.id,
                                serial_no: data?.serial_no,
                                quantity: data?.quantity,
                                action_type: "warranty",
                              });
                            }}
                          >
                            Warranty Claim
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>

            {/* Table */}
          </>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[5000]">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="bg-white w-1/3 mx-auto flex flex-col max-sm:w-full z-10  rounded">
            <div className="relative overflow-hidden mt-10">
              <div className="absolute inset-0 hover:bg-white opacity-0 transition duration-700 hover:opacity-10"></div>
            </div>
            <div className="  ">
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl  text-center  text-blue-900 font-openSans pb-5">
                  <span className="font-bold">
                    {invtDetails?.action_type}
                  </span>{" "}
                  <br />
                  <span className="text-lg">
                    {" "}
                    Serial No:- {invtDetails?.serial_no} <br />
                    Total Quantity:- {invtDetails?.quantity}{" "}
                  </span>
                </h3>

                {invtDetails?.action_type == "dead" && (
                  <div className="py-3 flex flex-col space-y-4 items-center">
                    <input
                      type="text"
                      className="border border-black w-60 h-10 text-center"
                      onChange={(e) => {
                        let values = e.target.value;
                        if (values > invtDetails?.quantity) {
                          toast.error(
                            "Quantity Cannot be greater then Total Quantity"
                          );
                        } else {
                          setQuantity(values);
                        }
                      }}
                      placeholder=" Enter Quantity"
                    />

                    <FileButton
                      bg={"[#4338CA]"}
                      hoverBg={"bg-indigo-300"}
                      btnLabel={"Upload Reference Document"}
                      imgRef={inputFileRef}
                      setImageDoc={setImageDoc}
                      setPreview={setPreview}
                      textColor={"white"}
                    />

                    <ImageDisplay
                      url={basicDetailData?.doc[0]?.docUrl}
                      preview={preview}
                      imageDoc={imageDoc}
                      alt={"uploaded document"}
                      showPreview={"hidden"}
                      width={"[50px]"}
                    />
                  </div>
                )}
                <textarea
                  className="border w-[60%]"
                  placeholder=" enter remark.."
                  onChange={(e) => setRemark(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col m-8">
              <div className="flex justify-center space-x-5">
                <div className="flex space-x-5">
                  <button
                    className={`bg-[#4338CA] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`bg-[#4338CA] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`}
                    onClick={() =>
                      submitAction(
                        invtDetails?.serial_no,
                        invtDetails?.id,
                        quantity,
                        imageDoc,
                        invtDetails?.action_type,
                      )
                    }
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
    </>
  );
};

export default SearchInvtById;
