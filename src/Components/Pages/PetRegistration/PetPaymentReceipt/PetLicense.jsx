


// 👉 Import necessary dependencies from React and external libraries 👈
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiFillPrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import PetRegAPIList from "@/Components/api/PetRegAPIList";
import ulb_data from "@/Components/Common/DynamicData";
import useSetTitle from "@/Components/Common/useSetTitle";
import moment from "moment";

// Functional component for displaying Pet Payment Receipt
const PetLicense = () => {

    // State to hold fetched data and loading state
    const [fetchedData, setFetchedData] = useState();
    const [isDataLoading, setIsDataLoading] = useState(false);

    // Custom hook to set the document title
    useSetTitle("Pet Payment Receipt")

    // Extracting transaction number from the route parameters
    const { id } = useParams()

    // Ref for the component to be printed
    const componentRef = useRef();

    // React-to-print hook for handling print functionality
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
    });

    // Destructuring API-related data from PetRegAPIList hook
    const { api_petCertificate, header } = PetRegAPIList();

    // Function to fetch data based on the transaction number
    const fetchData = () => {
        console.log("called........")
        setIsDataLoading(true);

        axios.post(api_petCertificate, { registrationId: id }, header)
            .then((res) => {
                if (res?.data?.status) {
                    setFetchedData(res?.data?.data);
                    setIsDataLoading(false);
                    console.log("Data Found", res);
                } else {
                    setIsDataLoading(false);
                    console.log("No Data Found");
                }
            })
            .catch((err) => {
                setIsDataLoading(false);
                console.log("Exception while getting receipt bill", err);
            });
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData()
    }, []);

    console.log("data", fetchedData);
    // Import moment.js library if not already imported
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

    // Assuming fetchedData.dob is in the format YYYY-MM-DD
    const dob = fetchedData?.dob;

    const today = moment();
    const birthDate = moment(dob, "YYYY-MM-DD");
    const years = today.diff(birthDate, 'years');
    birthDate.add(years, 'years');
    const months = today.diff(birthDate, 'months');
    birthDate.add(months, 'months');
    const days = today.diff(birthDate, 'days');

    // Construct the age string
    const ageString = `${years} years, ${months} months, and ${days} days`;





    return (
        <>

            <div className="" >
                <div>
                    <div className="md:px-0 flex-1 "></div>
                    <div className="md:px-0 flex-1 ">
                        <button
                            onClick={handleprint}
                            className="float-right pl-4 pr-6 py-1 bg-sky-400 text-white font-medium text-xs leading-tight uppercase rounded  hover:bg-sky-500 hover: focus: focus:outline-none focus:ring-0  active: transition duration-150 ease-in-out"
                        >
                            <AiFillPrinter className="inline text-lg" />
                            print
                        </button>
                    </div>
                </div>
                <div id="printableArea" className="w-full h-full flex justify-center items-center mx-auto mt-6 " ref={componentRef}>
                    <div className="">
                        <div className="font-tahoma mt-10">
                            <div className="border-2 border-dashed border-gray-600  bg-white p-4 w-[250mm] h-auto  md:mx-auto lg:mx-auto  container ">
                                <div className="grid grid-col-1 md:grid-col-12 lg:grid-col-12 relative">
                                    <div className="">
                                        <img src={ulb_data()?.ulb_logo} className="h-20 mx-auto" />
                                    </div>
                                    {/* <div className="">
                                        <img
                                            src={ulb_data()?.state_logo}
                                            alt=""
                                            className=" w-[22rem] h-[22rem]  absolute z-10 bg-transparent opacity-20 mt-[10rem] ml-[28%]  rounded-full border bg-center"
                                        />
                                    </div> */}
                                    <div className='flex justify-center items-center w-full h-full relative'>
                                        <img
                                            src={fetchedData?.ulbDetails?.state_logo}
                                            alt=''
                                            className=' w-80 h-80  top-60 absolute bg-transparent opacity-10  rounded-full border'
                                        />
                                    </div>
                                </div>

                                {/* rmc */}
                                <div className="grid grid-col-1 md:grid-col-12 lg:grid-col-12 p-1 ">
                                    <div className="">
                                        <h1 className="font-semibold text-2xl text-center ">
                                        {fetchedData?.ulbDetails?.ulb_name}
                                        </h1>
                                    </div>
                                    <div className="space-y-2 mt-1">
                                        <h1 className="font-semibold text-1xl text-center text-gray-800 ">
                                        {fetchedData?.ulbDetails?.address}
                                        </h1>
                                        <h1 className="font-semibold text-xs text-center text-gray-800 ">
                                        {fetchedData?.ulbDetails?.email}
                                        </h1>
                                    </div>
                                </div>

                                {/* holding tax */}
                                <div className="grid grid-col-1 md:grid-col-12 lg:grid-col-12 p-1 ">
                                    <div className="mx-auto">



                                    </div>
                                    <h1 className="font-semibold text-center underline text-2xl mt-2">Pet Certificate</h1>
                                </div>


                                {/* detail section 1 */}

                                <div class="grid grid-cols-12 border border-gray-10 border-r border-l border-b rounded-lg shadow-lg ">
                                    <div class="grid col-span-6 p-4 ">
                                        <div class="mb-4">
                                            <span class="font-semibold"> Application No:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.application_no}</span>
                                        </div>
                                        <div class="mb-4">
                                            <span class="font-semibold">Type of Animal:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.ref_pet_type}</span>
                                        </div>
                                        <div class="mb-4">
                                            <span class="font-semibold">Breed:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.breed}</span>
                                        </div>
                                        <div class="mb-4">
                                            <span class="font-semibold">Gender of Pet:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.ref_gender}</span>
                                        </div>
                                    </div>
                                    <div class="grid col-span-6 p-4 ">
                                        <div class="mb-4">
                                            <span class="font-semibold">  Certificate No:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.registration_id}</span>
                                        </div>
                                        <div class="mb-4">
                                            <span class="font-semibold">Date of Birth:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.dob}</span>
                                        </div>
                                        <div class="mb-4">
                                            <span class="font-semibold">Pet Name:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.pet_name}</span>
                                        </div>
                                        {/* <div class="mb-4">
                                            <span class="font-semibold">Age of Animal:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.petName}</span>
                                        </div> */}
                                        <div class="mb-4">
                                            <span class="font-semibold">Age of Animal:</span>
                                            <span class="text-gray-700 ml-2" id="animalAge">{ageString}</span>
                                        </div>

                                    </div>
                                </div>


                                {/* detail section 2 */}
                                <div class="grid grid-cols-12 border border-gray-10 border-r border-l border-b rounded-lg shadow-lg mt-3">
                                    <div class="grid col-span-12 p-4 ">
                                        <div class="mb-4">
                                            <span class="font-semibold">Name of Owner of Pet:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.applicant_name}</span>
                                        </div>
                                        <div class="mb-4">
                                            <span class="font-semibold">Address of Owner of Pet:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.address}</span>
                                        </div>
                                        <div class="mb-4">
                                            <span class="font-semibold">Holding No of Property/Residence :</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.holding_no}</span>
                                        </div>
                                        {/* <div class="mb-4">
                                            <span class="font-semibold">Amount Paid for Pet Registration:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.gender}</span>
                                        </div> */}
                                        <div class="mb-4">
                                            <span class="font-semibold">Vertnary Doctor Registration No:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.doctor_registration_no}</span>
                                        </div>
                                        <div class="mb-4">
                                            <span class="font-semibold">Name of Vertnary doctor:</span>
                                            <span class="text-gray-700 ml-2">{fetchedData?.vet_doctor_name}</span>
                                        </div>
                                    </div>

                                </div>

                                <div class="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
                                    <h3 class="text-lg font-semibold mb-1">TERMS & CONDITIONS FOR REGISTRATION OF PET DOG</h3>
                                    <ol class="list-decimal pl-6 text-xs">
                                        <li class="mb-4">The owner of the pet shall get Pet dog Registration done & Pet Registration Number issued on an annual basis.</li>
                                        <li class="mb-4">The owner of the dog shall ensure that Pet Registration Number is on the neck collar of the Dog at all times & on demand produce the registration certificate to the authority.</li>
                                        <li class="mb-4">A valid Anti Rabies vaccination certificate by a registered Veterinary practitioner shall be the pre-requisite for Pet dog Registration.</li>
                                        <li class="mb-4">In case a vaccinated dog is bitten by a Rabies suspected dog during the validity period of registration, the owner of the dog will ensure its proper post-bite vaccination regimen failing which registration shall be cancelled.</li>
                                        <li class="mb-4">Validity of Registration of the pet shall be co-terminus with that of Anti Rabies Vaccination.</li>
                                        <li class="mb-4 mt-3">The owner shall indemnify ULB from all legal consequences arising due to violent acts of the pet viz: biting, injuring, and howling any person or other animals.</li>
                                        <li class="mb-4">The owner shall be responsible for timely Anti Rabies Vaccination and the good health of the pet dog.</li>
                                        <li class="mb-4">The owner of the pet shall ensure that his/her pet does not contribute in any way to the growth of the stray canine population.</li>
                                        <li class="mb-4">The owner shall not allow an aggressive dog to roam freely without a muzzle at any public place. Irresponsible ownership causing severe biting injury shall lead to cancellation of pet dog Registration. In such cases, the owner shall be responsible for proper compensation to the victim & shall bear all expenses likely to be incurred in Anti Rabies Serum and post bite Anti Rabies vaccination of the victim.</li>
                                        <li class="mb-4">The owner of the pet shall not allow his /her pet to defile public places and shall scoop the poop instant to clean up the spot each such negligence will attract a penalty of Rs.500/- from the ULB.</li>
                                        <li class="mb-4">The owner of the pet shall provide adequate food and shelter to pet dog and shall not cause any cruelty to it failing which SPCA provisions would be invoked.</li>
                                        <li class="mb-4">The Pet Dog Registration is nontransferable in nature. In case of change of ownership, new owner will apply for fresh Registration Certificate. Before applying, owner should take RC, ARV certificate details etc. from previous owner. For instance, if at the time of purchase of the Pet dog, the validity of Anti Rabies Vaccination is likely to expire after 2 months, the owner of the pet shall reapply for a fresh Registration after getting booster dose of Anti Rabies Vaccination.</li>
                                        <li class="mb-4">The owner shall not abandon his/her pet dog for straying at public places.</li>
                                        <li class="mb-4">The owner of the pet shall strictly abide by the above-mentioned Terms & conditions of the Pet Dog Registration. Any violation of the Terms & conditions in part or as a whole shall lead to cancellation of the Registration.</li>
                                        <li class="mb-4">Pet Registration - One-year duration - Fee: 100 Rs.</li>
                                        <li class="mb-4">Pet renewal registration needs to be done annually.</li>
                                        <li class="mb-4">Vaccination certificates should be updated upadted </li>
                                    </ol>
                                </div>



                                {/* holding tax details */}

                                {/* swatch bharat logo */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default PetLicense
