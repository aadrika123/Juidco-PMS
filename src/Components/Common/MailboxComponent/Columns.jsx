//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - COLUMNS
//    DESCRIPTION - COLUMNS Component
//////////////////////////////////////////////////////////////////////////////////////
import { format } from 'date-fns'
export const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'id'
    },
    {
        Header: 'First Name',
        accessor: 'first_name'
    },
    {
        Header: 'Last Name',
        accessor: 'last_name'
    },
    {
        Header: 'DOB',
        accessor: 'dob',
        Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') }

    },
    {
        Header: 'Gender',
        accessor: 'gender'
    },
    {
        Header: 'IP',
        accessor: 'ip_address'
    },
    {
        Header: 'Country',
        accessor: 'contry',
        Cell: ({ cell }) => (
            <button className='bg-sky-200 px-3 py-1 rounded-lg shadow-lg hover:shadow-xl hover:bg-sky-800 hover:text-white text-black' value={cell.row.values.contry}>
                View
            </button>
        )
    }
]

/**
 * Exported to :
 * 1. 
 * 
 */