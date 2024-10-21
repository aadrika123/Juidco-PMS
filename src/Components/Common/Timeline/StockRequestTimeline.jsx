import locationMan from "@/assets/Images/loactionMan.svg";
import { FaCheck } from "react-icons/fa6";
import { MdKeyboardArrowLeft } from "react-icons/md"; //pointing left
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

export default function StockRequestTimeline({ status }) {
  return (
    <div className='flex justify-center items-center p-2 mb-16 mt-4'>
      <div className='flex justify-center items-center w-full'>
        {/* DD */}
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
            {!(status === 0 || status === -1) && (
              <FaCheck color='white' size={16} />
            )}
          </div>
          <p className='absolute -bottom-[30px] w-[10rem] text-sm'>
            Departmental Distributor
          </p>
        </div>

        {/* //divider */}
        <div className='h-[2px] bg-black w-[20%] relative flex justify-center items-center'>
          {status === 1 ||
            (status === 2 && (
              <MdKeyboardArrowRight
                color='black'
                size={26}
                className='absolute -top-[13px] animate-moveRight'
              />
            ))}
          {status === -1 && (
            <MdKeyboardArrowLeft
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveLeft'
            />
          )}
        </div>

        {/* DA */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {(status === 1 ||
              status === 69 ||
              status === 71 ||
              status === 73 ||
              status === 5 ||
              status === 3 ||
              status === 4 ||
              status === 2) && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}

            {(status === 80 || status === -1) && (
              <FaCheck color='white' size={16} />
            )}
          </div>
          <p className='absolute -bottom-[30px] w-[145px] text-sm'>
            Departmental Admin
          </p>
          {/* <p className='border font-semibold absolute -top-[38px] px-2 shadow-md bg-white text-xs w-[100px] text-center'>
            {status === 71 || status === 73
              ? "BOQ"
              : status === 5
              ? "Stocks Received"
              : status === 3
              ? "Supplier Assigned"
              : status === 4
              ? "Partial Stocks Received"
              : ""}
          </p> */}
        </div>

        {/* //divider */}
        <div className='h-[2px] bg-black w-[20%] relative flex justify-center items-center'>
          {(status === -70 || status === 71 || status === 73) && (
            <MdKeyboardArrowLeft
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveLeft'
            />
          )}

          {status === 80 && (
            <MdKeyboardArrowRight
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveRight'
            />
          )}
        </div>

        {/* IA */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {status === 80 && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}

            {status === 71 && <FaCheck color='white' size={16} />}
          </div>
          <p className='absolute -bottom-[30px] w-[152px] text-sm'>
            Inventory Admin
          </p>
        </div>

        {/* //completed or rejected bubble */}
        {/* //divider */}
        {(status === 7 || status === -2) && (
          <div
            className={`h-[2px] ${
              status === 7 ? "bg-green-500" : status === -2 ? "bg-red-500" : ""
            }  w-[20%] relative flex justify-center items-center`}
          />
        )}

        {(status === 7 || status === -2) && (
          <div
            className={`flex justify-center items-center ${
              status === 7 ? "bg-green-500" : status === -2 ? "bg-red-500" : ""
            } rounded-full w-10 h-10`}
          >
            {status === 7 && <FaCheck color='white' size={16} />}
            {status === -2 && <TiCancel color='white' size={16} />}
          </div>
        )}

        <div className='flex flex-col items-center gap-1 relative'>
          <p className='absolute -bottom-[48px] w-[100px] text-sm'>
            {status === 7 ? "Received" : status === -2 ? "Rejected" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

//-2=rejected, -1=returned, 0=pending, 1=revised, 2= forwarded to DA, 80=forwarded to IA, 81=IA returned, 82= IA rejected, 3=approved, 4=handover pending, 41=allotted, 5=return pending, 51= returned to inventory, 52=returned to DD, -5= rejected, 6=dead stock pending, 61=added to dead stock, 62=returned to DD, -6= rejected, 7=warranty claim pending, 71=warranty claimed, 72=returned to DD, -7= rejected,
