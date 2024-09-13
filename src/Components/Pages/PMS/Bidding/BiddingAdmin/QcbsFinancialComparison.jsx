import { useState } from "react";
import LoaderApi from "@/Components/Common/Loaders/LoaderApi";
import TitleBar from "@/Components/Pages/Others/TitleBar";

export default function QcbsFinancialComparison() {
  const [isLoading, setIsLoading] = useState();
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
            been given <span className='font-semibold'>20%</span> and{" "}
            <span className='font-semibold'>80%</span> respectively.
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
                  &#10008;{""}0.2 + P<sub>t</sub>
                  {""}&#10008;{""}0.8
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
