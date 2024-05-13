import React from 'react'

function DocumentRow() {
  return (
    <>
      <tr>

        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            1
          </p>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            Aadhar Card
          </p>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="#" className="block relative">
                <img alt="profil" src="http://192.168.0.16:822/RMCDMC/public/assets/img/pdf_logo.png" className="mx-auto object-cover rounded-full h-10 w-10 " />
              </a>
            </div>
          </div>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <p className="text-red-900 whitespace-no-wrap">
            Rejected.
          </p>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-sky-900 leading-tight">
            <span aria-hidden="true" className="absolute inset-0 bg-sky-200 opacity-50 rounded-full">
            </span>
            <span className="relative">
              Upload Fresh Document
            </span>
          </span>
        </td>
      </tr>
    </>
  )
}

export default DocumentRow