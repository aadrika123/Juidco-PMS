//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dimple Kumari
//    Version - 1.0
//    Date - 19/06/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - Loader
//    DESCRIPTION - page loader
//////////////////////////////////////////////////////////////////////////////////////

import zIndex from "@mui/material/styles/zIndex";
import { ThreeDots } from "react-loader-spinner";

export default function LoaderApi() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 flex items-center justify-center z-1000 ">
        <div className=" ">
          <div className="bg-[#4338a44] flex justify-center items-center aspect-video w-[10rem]  rounded-[80%]">
            <ThreeDots
              visible={true}
              color="white"
              height={80}
              width={80}
              ariaLabel="circles-loading"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
