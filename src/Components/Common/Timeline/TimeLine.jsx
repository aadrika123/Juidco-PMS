import locationMan from "@/assets/Images/loactionMan.svg";
import { FaCheck } from "react-icons/fa6";
import { MdKeyboardArrowLeft } from "react-icons/md"; //pointing left
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

export default function TimeLine({ status }) {
  return (
    <div className='flex justify-center items-center p-2 mb-16 mt-4'>
      <div className='flex justify-center items-center w-full'>
        {/* IA */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {(status === 0 || status === 11) && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}
            {!(status === 0 || status === 11) && (
              <FaCheck color='white' size={16} />
            )}
          </div>
          <p className='absolute -bottom-[30px] w-[110px] text-sm'>
            Inventory Admin
          </p>
        </div>

        {/* //divider */}
        <div className='h-[2px] bg-black w-[20%] relative flex justify-center items-center'>
          {(status === 1 ||
            status === 10 ||
            status === 13 ||
            status === 20 ||
            status === 14 ||
            status === 24 ||
            status === 12) && (
            <MdKeyboardArrowRight
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveRight'
            />
          )}
          {(status === -1 || status === 11) && (
            <MdKeyboardArrowLeft
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveLeft'
            />
          )}
        </div>

        {/* level 1 */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {(status === 1 ||
              status === 10 ||
              status === 13 ||
              status === 21 ||
              status === 24 ||
              status === 12) && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}

            {(status === -1 ||
              status === 11 ||
              status === 20 ||
              status === 14 ||
              status === 24) && <FaCheck color='white' size={16} />}
          </div>
          <p className='absolute -bottom-[30px] w-12 text-sm'>level 1</p>
        </div>

        {/* //divider */}
        <div className='h-[2px] bg-black w-[20%] relative flex justify-center items-center'>
          {(status === -70 || status === 21) && (
            <MdKeyboardArrowLeft
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveLeft'
            />
          )}

          {(status === 70 || status === 20 || status === 24) && (
            <MdKeyboardArrowRight
              color='black'
              size={26}
              className='absolute -top-[13px] animate-moveRight'
            />
          )}
        </div>

        {/* Level 2 */}
        <div className='flex flex-col items-center gap-1 relative'>
          <div className='flex justify-center items-center bg-[#4338ca] rounded-full w-10 h-10'>
            {(status === 70 || status === 20) && (
              <img
                src={locationMan}
                alt='locationTag'
                width={22}
                className='animate-pulse'
              />
            )}

            {(status === 71 || status === 21 || status === 24) && (
              <FaCheck color='white' size={16} />
            )}
          </div>
          <p className='absolute -bottom-[30px] w-12 text-sm'>Level 2</p>
        </div>

        {/* //completed or rejected bubble */}
        {/* //divider */}
        {(status === 7 ||
          status === -2 ||
          status === 14 ||
          status === 24 ||
          status === 12) && (
          <div
            className={`h-[2px] ${
              status === 14 || status === 24
                ? "bg-green-500"
                : status === -2 || status === 12
                ? "bg-red-500"
                : ""
            }  w-[20%] relative flex justify-center items-center`}
          />
        )}

        {(status === 7 ||
          status === -2 ||
          status === 14 ||
          status === 24 ||
          status === 12) && (
          <div
            className={`flex justify-center items-center ${
              status === 14 || status === 24
                ? "bg-green-500"
                : status === -2 || status === 12
                ? "bg-red-500"
                : ""
            } rounded-full w-10 h-10`}
          >
            {(status === 14 || status === 24) && (
              <FaCheck color='white' size={16} />
            )}
            {(status === -2 || status === 12) && (
              <TiCancel color='white' size={16} />
            )}
          </div>
        )}

        <div className='flex flex-col items-center gap-1 relative'>
          <p className='absolute -bottom-[48px] w-[100px] text-sm'>
            {status === 14 || status === 24
              ? "Approved"
              : status === -2 || status === 12
              ? "Rejected"
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

//   0=pending, 10=level1, 11=level1 returned, 12=level1 rejected, 13=level1 revised, 14=level1 approved, 20=level2, 21=level2 return, 22=level2 rejected, 23=level2 revised, 24=level2 approved
