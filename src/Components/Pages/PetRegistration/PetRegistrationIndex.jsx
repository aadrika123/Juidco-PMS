// Importing necessary dependencies and components
import React, { useState } from 'react'
import FormAppliedSuccess from './Form/FormAppliedSuccess'
import PetRegistrationFormIndex from './Form/PetRegistrationFormIndex'
// Importing custom hook for setting the page title
import useSetTitle from '@/Components/Common/useSetTitle'

// Component for handling pet registration
const PetRegistrationIndex = () => {
  // Using the custom hook to set the page title
  useSetTitle("Registration")
  // State variables for managing the current screen and data after application submit
  const [currentScreen, setCurrentScreen] = useState(1)
  const [dataAfterApplicationSubmit, setDataAfterApplicationSubmit] = useState()

  // JSX for the component
  return (
    <>
      <div className="grid grid-cols-9 space-x-6 my-2 mx-8">
        <div className='col-span-9 border border-gray-400 rounded'>
          <p className="border-b border-indigo-300 bg-indigo-200 p-1 text-center text-xl shadow-md font-semibold">Pet Registration Application</p>
          <div className='p-5'>
            {/* Rendering the PetRegistrationFormIndex component based on the current screen */}
            <p className={`${currentScreen == 1 ? 'block' : 'hidden'}`}> <PetRegistrationFormIndex screen={setCurrentScreen} data={setDataAfterApplicationSubmit} /> </p>
            {/* Rendering the FormAppliedSuccess component based on the current screen */}
            <p className={`${currentScreen == 2 ? 'block' : 'hidden'}`}> <FormAppliedSuccess screen={setCurrentScreen} data={dataAfterApplicationSubmit} /></p>
          </div>
        </div>
        {/* <div className='col-span-3 border border-gray-400 rounded p-3'>
          <p className="border-2 border-indigo-400 p-2 text-center bg-white text-xl shadow-md"> Frequently Asked Questions </p>
          <PetAccordionPage />
        </div> */}
      </div>
    </>
  )
}

export default PetRegistrationIndex