import locationMan from "@/assets/Images/loactionMan.svg";
import { FaCheck } from "react-icons/fa6";
import { MdKeyboardArrowLeft } from "react-icons/md"; //pointing left
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

export default function BoqTimeLine({ status }) {
  return (
    <div className='flex justify-center items-center p-2 mb-16 mt-4'>
      <div className='flex justify-center items-center w-full'>
        {/* //Accountant */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {(status === 0 ||
              status === -1 ||
              status === 41 ||
              status === 42 ||
              status === 50 ||
              status === 60) && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}

            {(status === 40 || status === 70) && (
              <FaCheck color='white' size={16} />
            )}
          </div>
          <p className='absolute -bottom-[30px] w-[7rem] text-sm'>
            Inventory Admin
          </p>
          {/* <p className='border font-semibold absolute -top-[38px] px-2 shadow-md bg-white text-xs'>
            {status === 70 || status === -70
              ? "BOQ"
              : status === 72
              ? "Tender"
              : ""}
          </p> */}
        </div>

        {/* //divider */}
        <div className='h-[2px] bg-black w-[20%] relative flex justify-center items-center'>
          {(status === 1 || status === 40) && (
            <MdKeyboardArrowRight
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveRight'
            />
          )}
          {(status === -1 ||
            status === 41 ||
            status === 42 ||
            status === 50 ||
            status === 60) && (
            <MdKeyboardArrowLeft
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveLeft'
            />
          )}
        </div>

        {/* //Finance */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {status === 40 && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}
            {(status === -2 ||
              status === -1 ||
              status === 41 ||
              status === 42 ||
              status === 50 ||
              status === 60 ||
              status === 70) && <FaCheck color='white' size={16} />}
          </div>
          <p className='absolute -bottom-[30px] text-sm'>Finance</p>
          <p className='border font-semibold absolute -top-[38px] px-2 shadow-md bg-white text-xs'>
            {status === -1
              ? "Procurement"
              : status === 6 && "Stocks Partially added"}
          </p>
        </div>

        {/* //divider */}
        <div className='h-[2px] bg-black w-[20%] relative flex justify-center items-center'>
          {(status === 1 || status === 70) && (
            <MdKeyboardArrowRight
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveRight'
            />
          )}
          {(status === -1 || status === 41) && (
            <MdKeyboardArrowLeft
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveLeft'
            />
          )}
        </div>

        {/* //TA */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {status === 70 && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}
            {/* {status !== 70 && <FaCheck color='white' size={16} />} */}
          </div>
          <p className='absolute -bottom-[30px] text-sm w-[7rem]'>
            Tendering Admin
          </p>
          {/* <p className='border font-semibold absolute -top-[38px] px-2 shadow-md bg-white text-xs'>
            {status === -1
              ? "Procurement"
              : status === 6 && "Stocks Partially added"}
          </p> */}
        </div>

        {/* //approved or rejected bubble */}
        {/* //divider */}
        {/* {(status === 42 || status === 43) && (
          <div
            className={`h-[2px] ${
              status === 42 ? "bg-green-500" : status === 43 ? "bg-red-500" : ""
            }  w-[20%] relative flex justify-center items-center`}
          />
        )} */}

        {/* {(status === 43 || status === 42) && (
          <div
            className={`flex justify-center items-center ${
              status === 42 ? "bg-green-500" : status === 43 ? "bg-red-500" : ""
            } rounded-full w-10 h-10`}
          >
            {status === 42 && <FaCheck color='white' size={16} />}
            {status === 43 && <TiCancel color='white' size={16} />}
          </div>
        )} */}

        {/* <div className='flex flex-col items-center gap-1 relative'>
          <p className='absolute -bottom-[48px] w-[100px] text-sm'>
            {status === 42 ? "Approved" : status === 43 ? "Rejected" : ""}
          </p>
        </div> */}
      </div>
    </div>
  );
}

//0=pending,40=finance pending, 41=finance returned, 42=finance approved, 43=finance rejected, 50=pre tender details, 60=tendering form, 70=tendering admin
