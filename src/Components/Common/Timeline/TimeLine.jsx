import locationMan from "@/assets/Images/loactionMan.svg";
import { FaCheck } from "react-icons/fa6";
import { MdKeyboardArrowLeft } from "react-icons/md"; //pointing left
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

export default function TimeLine({ status }) {
  return (
    <div className='flex justify-center items-center p-2 mb-16 mt-4'>
      <div className='flex justify-center items-center w-full'>
        {/* stock receiver */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {(status === 0 || status === -1 || status === 6) && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}
            {!(status === 0 || status === -1 || status === 6) && (
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

        {/* //divider */}
        <div className='h-[2px] bg-black w-[20%] relative flex justify-center items-center'>
          {(status === 1 || status === 69) && (
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

            {(status === -1 ||
              status === -70 ||
              status === -72 ||
              status === 6 ||
              status === 70) && <FaCheck color='white' size={16} />}
          </div>
          <p className='absolute -bottom-[30px] w-[145px] text-sm'>
            Departmental Admin
          </p>
          <p className='border font-semibold absolute -top-[38px] px-2 shadow-md bg-white text-xs w-[100px] text-center'>
            {status === 71 || status === 73
              ? "BOQ"
              : status === 5
              ? "Stocks Received"
              : status === 3
              ? "Supplier Assigned"
              : status === 4
              ? "Partial Stocks Received"
              : ""}
          </p>
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

          {(status === 70 || status === -72) && (
            <MdKeyboardArrowRight
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveRight'
            />
          )}
        </div>

        {/* Accountant */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {(status === 70 || status === -70 || status === 72) && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}

            {(status === 71 ||
              status === 73 ||
              status === 3 ||
              status === 4 ||
              status === 5 ||
              status === 6 ||
              status === 7) && <FaCheck color='white' size={16} />}
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

//-2=rejected, -1=back to sr, 0=pending, 1=in DA's inbox, 69= revised and in DA's inbox,70=ready for BOQ, -70=returned from da, 71=BOQ ready, 72=ready for tender form, -72=returned from da, 73=tender form ready, 2=released for tender,3=supplier assigned,4=stock partially recieved, 5=stock recieved, 6=partially added, 7=added
// release for tender
