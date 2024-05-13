//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - rmcdmc
//    Component  - cardRow
//    DESCRIPTION - cardRow Component
//////////////////////////////////////////////////////////////////////////////////////
import React from 'react'

function cardRow(props) {
    return (
        <>
            <div className='font-semibold text-sm'>{props.title} :</div>
            <div className='text-sm'>{props.value}</div>
        </>
    )
}

export default cardRow
/**
 * Exported to :
 * 
 */