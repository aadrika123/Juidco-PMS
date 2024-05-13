//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - rmcdmc
//    Component  - Td
//    DESCRIPTION - Td Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'

function Td(props) {
    return (
        <>
            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {props.value}
                </p>
            </td>
        </>
    )
}

export default Td
/**
 * Exported to :
 * 1. DetailsTable component
 */