import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import home from '@/Components/assets/home.png'
import water from '@/Components/assets/water.png'
import team from '@/Components/assets/team.png'
import piechart from '@/Components/assets/piechart.png'
import dustbin from '@/Components/assets/dustbin.png'
import advt from '@/Components/assets/advt.png'
import Category from '@/Components/assets/Category.png'

function PermittedModuleCard(props) {
    const navigate = useNavigate()
    const [errorImage, seterrorImage] = useState([]);
    const [permittedModuleList, setpermittedModuleList] = useState([
        { moduleName: 'Property', route: '/property/transfer', icon: home },
        { moduleName: 'Water', route: '/water/transfer', icon: water },
        { moduleName: 'Trade', route: '/trade/transfer', icon: team },
        { moduleName: 'Advertisement', route: '/advertisement/transfer', icon: advt },
        { moduleName: 'SWM', route: '/swm/transfer', icon: dustbin },
        { moduleName: 'Dashboard', route: '/dashboard/transfer', icon: piechart },
    ])
    // const [permittedModuleList, setpermittedModuleList] = useState([
    //     { moduleName: 'Property', route: '/property/transfer' },
    //     { moduleName: 'Water', route: '/water/transfer' },
    //     { moduleName: 'Trade', route: '/trade/transfer' },
    //     { moduleName: 'Advertisement', route: '/advertisement/transfer' },
    //     { moduleName: 'SWM', route: '/swm/transfer' },
    //     { moduleName: 'Dashboard', route: '/dashboard/transfer' },
    // ])
    const checkImage = (id) => {
        return errorImage?.some((docId) => docId == id);
       };
      
       const swithModule = (route) => {
        window.location.replace(`${route}/transfer`);
       };


    return (
       <div className="w-full h-full md:w-1/2 mx-auto mt-40 animate__animated animate__zoomIn animate__faster ">

   <div className="bg-slate-500 shadow-xl flex justify-center items-center relative">

    <button

     onClick={props?.closeModuleModal}

     type="button"

     class="absolute top-3 right-2.5 text-gray-100 bg-transparent bg-gray-300 hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center darks:hover:bg-gray-800 darks:hover:text-white"

    >

     <svg class="w-5 h-5" fill="currentColor">

      <path

       fill-rule="evenodd"

       d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"

       clip-rule="evenodd"

      ></path>

     </svg>

    </button>



    <div className="w-full px-4 mx-auto py-4 md:py-6 ">

     <div className="w-full">

      <div>

       <h2 className="text-3xl text-white font-medium text-center">

        Choose Module

       </h2>

      </div>

     </div>

     <div className="my-6 relative">

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">

       {/* 1 NEW ASSESSMENT */}

       {Array.isArray(props?.permittedModuleList) &&

        props?.permittedModuleList?.map((data) => (

         <div

          onClick={() => swithModule(data?.url)}

          className="bg-gray-100 hover:scale-105 transition-all duration-200 rounded-xl flex flex-col justify-center items-center p-4 md:p-6 relative cursor-pointer"

          href=""

         >

          <img

           className="h-16 w-16"

           src={checkImage(data?.id) ? Category : data?.image}

           alt={data?.title}

           onError={() =>

            seterrorImage((prev) => [...prev, data?.id])

           }

          />

          <div className="font-bold mt-4 text-center">

           {data?.title}

          </div>

         </div>

        ))}

      </div>

     </div>

    </div>

   </div>

  </div>
    )
}

export default PermittedModuleCard