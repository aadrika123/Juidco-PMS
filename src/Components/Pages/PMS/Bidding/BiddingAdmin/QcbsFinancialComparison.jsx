import { useEffect, useState } from "react";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import ProjectApiList from "@/Components/api/ProjectApiList";
import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { indianAmount } from "@/Components/Common/PowerupFunctions";

export default function QcbsFinancialComparison() {
  const { api_financialComp, api_postWinner, api_finalizeWinner } =
    ProjectApiList();
  const { refNo } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [applicationFullData, setapplicationFullData] = useState([]);
  const [selectedBidder, setSelectedBidder] = useState([]);
  const [ratio, setRatio] = useState([]);

  let Columns = [
    { header: "Select winner" },
    { header: "S. No" },
    { header: "Bidders Name" },
    { header: "Bidding Amount" },
    { header: "Technical Score" },
    { header: "Financial Score" },
    { header: "Total Score" },
    { header: "Least Cost" },
  ];

  const selectBidderData = (bidderId) => {
    if (!selectedBidder.includes(bidderId)) {
      setSelectedBidder((prev) => [...prev, bidderId]);
    } else {
      selectedBidder.filter((bidder) => bidder === bidderId);
      setSelectedBidder((prev) => {
        const filtered = prev.filter((data) => data !== bidderId);
        return filtered;
      });
    }
  };

  const getApplicationDetail = () => {
    setIsLoading(true);
    AxiosInterceptors.get(`${api_financialComp}/${refNo}`, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          setapplicationFullData(response?.data?.data?.bidDetails);
          let ratioArr = response?.data?.data?.bidDetails?.comparison_ratio
            ?.slice(1)
            .split("f");
          setRatio(ratioArr);
        } else {
          // toast.error("Error while getting details...");
          // seterroState(true);
        }
      })
      .catch(function (error) {
        console.log("==2 details by id error...", error);
        toast.error(error?.response?.data?.message);
        // seterroState(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const finalizeWinner = async () => {
    setIsLoading(true);
    let payload = { reference_no: refNo };

    AxiosInterceptors.post(api_finalizeWinner, payload, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          toast.success("Winner Finalize Succesfully");
          navigate(`/tendering-admin`);
        } else {
          setIsLoading(false);
          toast.error("Error in selecting winners");
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const decideWinnerApi = () => {
    console.log(selectedBidder, "selectedBidder");
    if (selectedBidder?.length == 0) {
      return toast.error("Please Select at Least One Winner");
    }
    if (
      selectedBidder?.length > 1 &&
      !applicationFullData?.boq?.pre_tendering_details?.is_rate_contract
    ) {
      return toast.error(
        "More than one bidder is selected in case of Rate contract type"
      );
    }
    setIsLoading(true);
    let payload = { reference_no: refNo, winners: selectedBidder };

    AxiosInterceptors.post(api_postWinner, payload, ApiHeader())
      .then(function (response) {
        if (response?.data?.status) {
          finalizeWinner();
        } else {
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        toast.error(
          error?.response?.data?.error || "Error in selection of winner"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getApplicationDetail();
  }, []);

  return (
    <>
      {isLoading && <LoaderApi />}

      <TitleBar titleBarVisibility={true} titleText={"Financial Calculation"} />

      <div className={`${isLoading ? "blur-[2px]" : ""}`}>
        <div className='bg-white p-3 rounded-md'>
          <h3 className='text-lg text-gray-600 font-semibold mb-4'>
            Calculation will be done on the basis of the below given formula-
          </h3>

          <h2 className='text-md text-gray-600 mb-2'>
            - The weightage for Financial Proposal and Technical Proposal has
            been given{" "}
            <span className='font-semibold'>{ratio?.length && ratio[1]}%</span>{" "}
            and{" "}
            <span className='font-semibold'>{ratio?.length && ratio[0]}%</span>{" "}
            respectively.
          </h2>
          <h2 className='text-md text-gray-600 mb-1'>
            - The Financial Proposals shall be given scores as follows -
          </h2>
          <div className='mb-3'>
            <h2 className='text-md text-center '>
              <span className='text-gray-500'>
                P<sub>f</sub> = 100
                {""}&#10008;{""}F<sub>m</sub> {""}
                <span className='text-x2l'>/</span>
                {""}F
              </span>
            </h2>
            <div className='p-4 text-gray-500 text-md'>
              <p className='text-sm'>where-</p>
              <div className='px-3'>
                <p>
                  P<sub>f</sub> is Financial score{" "}
                </p>
                <p>
                  F<sub>m</sub> is the lowest Bid Price{" "}
                </p>
                <p>F is the price of the proposal under consideration </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-md text-gray-600 mb-1'>
              - The Composite score from Technical Proposal and Financial
              Proposal shall be computed as follows:
            </h2>
            <div className='py-3'>
              <h2 className='text-md text-center text-gray-500 font-semibold'>
                Composite Score ={" "}
                <span className='text-gray-500 font-normal'>
                  P<sub>f</sub>
                  {""}
                  &#10008;{""}
                  {ratio?.length && Number(ratio[1]) / 100} + P<sub>t</sub>
                  {""}&#10008;{""}
                  {ratio?.length && Number(ratio[0] / 100)}
                </span>
              </h2>
              <div className='p-4 text-gray-500 text-md'>
                <p className='text-sm'>where-</p>
                <div className='px-3'>
                  <p>
                    P<sub>t</sub> is the Technical score of the percentage
                    scored{" "}
                  </p>
                </div>
              </div>

              <div className='text-right mt-8'>
                {applicationFullData?.boq?.pre_tendering_details
                  ?.is_rate_contract && (
                  <h2 className='text-lg text-gray-600 font-semibold'>
                    Rate Contract Type
                  </h2>
                )}

                <h2 className='text-lg text-gray-500'>
                  The Least Bidding Price here is -{" "}
                  <span className='font-semibold'>
                    {indianAmount(
                      applicationFullData?.comparison?.[0]
                        ?.lowest_bidding_amount?.bidding_amount
                    )}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* bidder details table */}
        <div className='p-2'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-start uppercase bg-blue-600 text-white sticky -top-0'>
              <tr className=''>
                {Columns?.length &&
                  Columns?.map((item, index) => (
                    <th scope='col' className='p-4' key={index}>
                      <div className=' flex items-start text-sm'>
                        {item?.header}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {applicationFullData?.comparison?.length ? (
                applicationFullData?.comparison.map((items, index) => (
                  <tr
                    className='text-center text-base text-black border-b hover:bg-[#fafafb]'
                    key={index}
                  >
                    <td className=' p-4'>
                      <input
                        type='checkbox'
                        className='w-4 h-4 cursor-pointer'
                        onClick={() =>
                          selectBidderData(items?.bidder_master?.id)
                        }
                      />
                    </td>
                    <td className=' p-4'>
                      <div className='flex items-center'>{index + 1}</div>
                    </td>

                    <td className='px-6 py-2 capitalize'>
                      {items?.bidder_master?.name}
                    </td>
                    <td className='px-6 py-2'>
                      {indianAmount(items?.bidder_master?.bidding_amount)}
                    </td>
                    <td className='px-4 py-2'>
                      {Number(items?.technical_score).toFixed(2)}
                    </td>
                    <td className='px-6 py-2'>
                      {Number(items?.financial_score).toFixed(2)}
                    </td>
                    <td className='px-4 py-2'>
                      {Number(items?.overall_score).toFixed(2)}
                    </td>
                    <td className='px-6 py-2'>
                      L{applicationFullData?.comparison.length - index}
                    </td>
                  </tr>
                ))
              ) : (
                <p></p>
              )}
            </tbody>
          </table>

          <div className='my-20 flex items-end justify-end'>
            <button
              className='bg-[#4338CA]  hover:bg-[#5a50c6]  text-white px-10 py-2 rounded flex'
              onClick={decideWinnerApi}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
