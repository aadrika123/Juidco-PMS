//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - DocumentRowMailbox
//    DESCRIPTION - DocumentRowMailbox Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'

function DocumentRowMailbox(props) {
    return (
        <>
            <tr>

                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {props.index}
                    </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {props.documentName}
                    </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm" onClick={() => props.openModal('http://192.168.0.16:822/RMCDMC/public/assets/img/pdf_logo.png')}>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <a href="#" className="block relative">
                                <img alt="profil" src="http://192.168.0.16:822/RMCDMC/public/assets/img/pdf_logo.png" className="mx-auto object-cover rounded-full h-10 w-10" />
                            </a>
                        </div>
                    </div>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <p className="text-red-900 whitespace-no-wrap">
                        {props.status}
                    </p>
                </td>
                <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-sky-900 leading-tight">
                        <span aria-hidden="true" className="absolute inset-0 bg-sky-200 opacity-50 rounded-full">
                        </span>
                        <span className="relative">
                            {props.remarks}
                        </span>
                    </span>
                </td>
            </tr>
        </>
    )
}

export default DocumentRowMailbox
/**
 * Exported to :
 * 1. DocumentMailbox Component
 * 
 */