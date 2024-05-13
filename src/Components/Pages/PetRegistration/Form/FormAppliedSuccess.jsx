import React from 'react'
import { useNavigate } from 'react-router-dom'

const FormAppliedSuccess = (props) => {

  const navigate = useNavigate();

  console.log('Full props data', props?.data)
  console.log('this is id', props?.data?.id)
  return (
    <div className='space-y-2'>
      <p className='text-center'> Your Application has submitted successfully</p>
      <p className='text-center'>Application No.  <span className='font-semibold text-lg'> {props?.data?.applicationNo}</span></p>
      <div className='flex justify-center gap-x-5'>
        <button onClick={() => navigate(`/search-pet-registration`)} className='border border-indigo-600 px-2 py-1 rounded shadow hover:bg-indigo-500 hover:text-white'>Dashboard</button>
        <button onClick={() => navigate(`/pet-payment-offline/${props?.data?.id}`)} className='bg-indigo-500 px-2 py-1 rounded shadow text-white hover:bg-indigo-700'>Make Payment</button>
      </div>
    </div>
  )
}

export default FormAppliedSuccess
