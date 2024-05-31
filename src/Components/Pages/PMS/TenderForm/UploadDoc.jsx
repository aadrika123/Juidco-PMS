import { LuCloudy } from "react-icons/lu";
import { useRef } from "react";

export default function UploadDoc({ tab }) {
  const inputFileRef = useRef();

  return (
    <>
      <div className='flex w-full px-10'>
        <div className=' px-5 flex flex-col rounded w-full'>
          <div className='mt-5 flex items-center'>
            <div>
              <LuCloudy className='text-[2.5rem] p-2 mr-3 mt-1 border-[2px] rounded-full' />
            </div>
            <div>
              <h1>Upload {tab} Files</h1>
            </div>
          </div>

          <hr className='w-full mt-3' />

          <div className='mb-10 mt-5 border-[3px] rounded-xl border-dashed flex justify-center items-center flex-col'>
            {/* {preview == null && ( */}
            <>
              <div className='rounded-md mt-8'>
                <LuCloudy className='text-[1.5rem]' />
              </div>
              <h3 className='text-xl text-black font-openSans mb-3'>
                Choose a file or drag & drop it here
              </h3>
              <h1 className='text-gray-400 text-sm'>
                PDF, XLSX formats up to 2MB
              </h1>
            </>
            {/* )} */}

            {/* {props?.imageDoc?.type?.match(/(jpg|jpeg|png)$/) && (
              <img
                src={preview}
                alt='Image Preview'
                // style={{ width: "200px", height: "auto", marginTop: "20px", border: "2px", borderColor: "blue" }}
                className="w-[200px] h-auto mt-[20px] border border-indigo-400 rounded"
              />
            )} */}

            {/* {props?.imageDoc?.type.includes("pdf") && (
              <iframe
                src={preview}
                alt='Image Previewss'
                style={{ marginTop: "20px", width: "400px", height: "250px" }}
              />
            )} */}

            <div className='mb-4'>
              <input
                type='file'
                accept='.jpg, .jpeg, .pdf .png'
                className='hidden'
                ref={inputFileRef}
                // onChange={(e) => imageHandler(e)}
              />

              {/* <p className='text-red-500 text-sm m-2'>
                {props?.imageDoc?.name}
              </p> */}
              <div className='flex justify-center'>
                <button
                  className={`bg-white border-gray-300 border text-gray-150 text-sm px-14 py-1 mt-2 hover:bg-gray-200 hover:text-gray-500  rounded leading-5 shadow-lg`}
                  // onClick={handleUploadDoc}
                >
                  Browse File
                </button>
              </div>
            </div>
          </div>

          <div className='w-full'>
            <div className=''>
              <h3 className='text-md text-gray-600 font-openSans mb-2'>
                Content
              </h3>
            </div>
            <div className='flex w-full mb-6'>
              <textarea
                // name={props.remarks}
                className='border border-[#5448dd] rounded  p-2 w-full'
                placeholder='Type Here...'
                // onChange={(e) => {
                //   props?.setFormData((prev) => ({
                //     ...prev,
                //     remark: e.target.value,
                //   }));
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
