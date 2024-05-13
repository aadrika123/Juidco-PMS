//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - Sidebar
//    DESCRIPTION - Sidebar Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react'
import RawLink from '../Common/Sidebar/RawLink'
import MailboxLink from './MailboxLink'
import WorkFlowCandidate from './WorkFlowCandidate'
import { useQuery } from "react-query";
import axios from 'axios'
import AxiosInterceptors from '../Common/AxiosInterceptors';

function Sidebar(props) {
    const [tabIndex, setTabIndex] = useState(0)
    const { isLoading, data, isError, error } = useQuery("first-query", () => {
        return AxiosInterceptors.get("http://localhost:3001/levelCandidateList");
    });

    const tabSwitch = (index) => {
        setTabIndex(index)
        props.fun(index)
    }
    return (
        <>

            <aside className="" >
                <div className="py-4 rounded flex flex-row sm:flex-col pl-4 sm:pl-0">

                    <div onClick={() => tabSwitch(0)}><MailboxLink activeStatus={tabIndex == 0 ? true : false} title="Inbox" /></div>
                    <div onClick={() => tabSwitch(1)}><MailboxLink activeStatus={tabIndex == 1 ? true : false} title="Outbox" /></div>
                    <div onClick={() => tabSwitch(2)}><MailboxLink activeStatus={tabIndex == 2 ? true : false} title="Search" /></div>
                    <div onClick={() => tabSwitch(3)}><MailboxLink activeStatus={tabIndex == 3 ? true : false} title="Special" /></div>




                </div>
                <div className="shadow-xl bg-green-100 pt-4 border-t-4 border-green-500 h-40 sm:h-96 overflow-y-scroll">

                    {/* <div className='overflow-y-scroll h-auto'> */}
                    {!isLoading ? data.data.map((data) => {
                        return (
                            <>
                                <WorkFlowCandidate designation={data.designation} name={data.name} activeCandidateStatus={data.activeCandidateStatus} />
                                <hr />
                            </>
                        )
                    }) : ''}

                    {/* </div> */}


                </div>
            </aside>

        </>
    )
}

export default Sidebar
/**
 * Exported to :
 * 1. Mailbox Component
 * 
 */