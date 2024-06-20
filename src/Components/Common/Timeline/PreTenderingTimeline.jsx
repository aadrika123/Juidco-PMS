import locationMan from "@/assets/Images/loactionMan.svg";
import { FaCheck } from "react-icons/fa6";
import { MdKeyboardArrowLeft } from "react-icons/md"; //pointing left
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

export default function PreTenderingTimeline({ status }) {
  return (
    <div className='flex justify-center items-center p-2 mb-16 mt-4'>
      <div className='flex justify-center items-center w-full'>
        {/* //Accountant */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {(status === 0 || status === -1) && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}

            {(status === 69 || status === 2) && (
              <FaCheck color='white' size={16} />
            )}
          </div>
          <p className='absolute -bottom-[30px] w-[75px] text-sm'>Accountant</p>
          <p className='border font-semibold absolute -top-[38px] px-2 shadow-md bg-white text-xs'>
            {status === 70 || status === -70
              ? "BOQ"
              : status === 72
              ? "Tender"
              : ""}
          </p>
        </div>

        {/* //divider */}
        <div className='h-[2px] bg-black w-[20%] relative flex justify-center items-center'>
          {status === 69 && (
            <MdKeyboardArrowRight
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveRight'
            />
          )}
          {status === -1 && (
            <MdKeyboardArrowLeft
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveLeft'
            />
          )}
        </div>

        {/* //DA */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {(status === 69 || status === 2) && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}
            {(status === -2 || status === -1) && (
              <FaCheck color='white' size={16} />
            )}
          </div>
          <p className='absolute -bottom-[30px] w-[110px] text-sm'>
            Stock Receiver
          </p>
          <p className='border font-semibold absolute -top-[38px] px-2 shadow-md bg-white text-xs'>
            {status === -1
              ? "Procurement"
              : status === 6 && "Stocks Partially added"}
          </p>
        </div>

        {/* //approved or rejected bubble */}
        {/* //divider */}
        {(status === 2 || status === -2) && (
          <div
            className={`h-[2px] ${
              status === 2 ? "bg-green-500" : status === -2 ? "bg-red-500" : ""
            }  w-[20%] relative flex justify-center items-center`}
          />
        )}

        {(status === 2 || status === -2) && (
          <div
            className={`flex justify-center items-center ${
              status === 2 ? "bg-green-500" : status === -2 ? "bg-red-500" : ""
            } rounded-full w-10 h-10`}
          >
            {status === 2 && <FaCheck color='white' size={16} />}
            {status === -2 && <TiCancel color='white' size={16} />}
          </div>
        )}

        <div className='flex flex-col items-center gap-1 relative'>
          <p className='absolute -bottom-[48px] w-[100px] text-sm'>
            {status === 2
              ? "Released for Tender"
              : status === -2
              ? "Rejected"
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

//-2=rejected, -1=returned, 0=pending, 1=DA, 69=revised, 2=released for tender ,
