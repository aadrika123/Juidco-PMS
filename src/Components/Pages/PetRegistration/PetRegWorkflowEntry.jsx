
import ProjectApiList from '@/Components/api/ProjectApiList'
import PilotWorkflowIndex from '@/Components/Common/WORKFLOW_PILOT/PilotWorkflowIndex'
import React from 'react'
import { format } from 'date-fns'
// import AdvertisementApiList from '../../../../../Components/ApiList/AdvertisementApiList'
// import BackendUrlAdvt from '../../../../../Components/ApiList/BackendUrlAdvt'
// import ProjectApiList from '../../../../../Components/ApiList/ProjectApiList'
// import PilotWorkflowIndex from '../PilotWorkflowIndex'
import BackendUrl from '@/Components/api/BackendUrl'
function PetRegWorkflowEntry() {

    // const ServerUrl = 'http://203.129.217.246:8005'
    const ServerUrl = BackendUrl
    // const ServerUrl = 'https://www.jharkhandegovernance.com/auth'
    // const ServerUrl = 'https://aadrikainfomedia.com/auth'

    const petInbox = `${ServerUrl}/api/pet/inbox` //Pet Inbox
    const petOutbox = `${ServerUrl}/api/pet/outbox` //Pet Inbox
    const petSpecial = `${ServerUrl}/api/pet/special-inbox` //Pet Inbox
    const petPostNextLevel = `${ServerUrl}/api/pet/post-next-level` //Pet Post Next Level
    const petEscalateNextLevel = `${ServerUrl}/api/pet/escalate` //Pet Escalate Next Level
    const petDocVerifyReject = `${ServerUrl}/api/pet/doc-verify-reject` //Pet Document Verify
    const petDocViewList = `${ServerUrl}/api/pet/application/get-uploaded-docs` //Pet Document Verify
    const petDocUpload = `${ServerUrl}/api/pet/application/upload-docs`
    const petDocShowOnDocUpload = `${ServerUrl}/api/pet/application/get-doc-to-upload`
    const petFinalVerifyReject = `${ServerUrl}/api/pet/final-verify-reject`

    const petWorkflowApplicationDetails = `${ServerUrl}/api/pet/application/get-wf-detials`

    // LIST OF API'S
    const { api_safBTCList, api_backToCitizen, api_workflowInfo, api_postDepartmental, api_getDepartmentalData, api_uploadDocumentShow, api_fieldVerificationList } = ProjectApiList()


    const workflowRules = {
        api: {
            // 1 - API TO FETCH INBOX LIST
            api_inboxList: { method: 'post', url: petInbox },
            // 2 - API TO FETCH OUTBOX LIST
            api_outboxList: { method: 'post', url: petOutbox },
            // 3 - API TO FETCH SPECIAL LIST
            api_specialList: { method: 'post', url: petSpecial},
            // 4 - API TO FETCH BACK TO CITIZEN LIST
            apt_btcList: { method: 'post', url: "" },
            // 5 - API TO FETCH FIELD VERIFICATION LIST
            // api_fieldVerificationList: , // ------not done
            api_fieldVerificationList: { method: 'post', url: api_fieldVerificationList },
            // 6 - API TO FETCH APPLICATION DETAILS BY ID 
            api_details: { method: 'post', url: petWorkflowApplicationDetails },
            // 7 - API TO FETCH WORKFLOW RELATED DATA eg: - WORKFLOW CANDIDATED,WORKFLOW PERMISSIONS,PSEUDO USERS
            api_workflowInfo: { method: 'post', url: api_workflowInfo },
            // 8 - API TO SEND INDEPENDENT COMMENT
            api_independentComment: { method: 'post', url: "" },
            // 9 - API TO SEND BACKWARD OR FORWARD
            api_sendLevel: { method: 'post', url: petPostNextLevel },
            // 10 - API TO ESACALATE OR DEESCALATE
            api_escalate: { method: 'post', url: petEscalateNextLevel },
            // 11 - API TO SEND BACK TO CITIZEN
            api_btc: { method: 'post', url: "" },
            // 12 - API TO APPROVE OR REJECT
            api_approveReject: { method: 'post', url: petFinalVerifyReject },
            // 13 - API TO post DEPARTMENTAL COMMUNICATION DATA
            api_postDepartmentalData: { method: 'post', url: api_postDepartmental },
            // 13 - API TO get DEPARTMENTAL COMMUNICATION DATA
            api_getDepartmentalData: { method: 'post', url: api_getDepartmentalData },
            // 14 - API TO SHOW DOCUMENTS WHICH HAS TO BE UPLOADED
            api_uploadDocumentShow: { method: 'post', url: petDocShowOnDocUpload },
            // 14 - API TO UPLOAD DOCUMENTS 
            api_uploadDocument: { method: 'post', url: petDocUpload },
            // 15 - API TO VERIFY DOCUMENTS
            api_verifyDocuments: { method: 'post', url: petDocVerifyReject },
            // 16 - API TO SHOW  DOCUMENTS IN VIEW DOCUMENT AND VERIFY DOCUMENT TABS
            api_documentList: { method: 'post', url: petDocViewList },
            // 17 - BASE URL TO VIEW  DOCUMENT
            documentBaseUrl: "",

        },
        workflow: {
            workflowName: 'Pet Workflow',
            workflowId: 31,
            moduleId: 9,
            formUrl: `/pet/viewPetApplication`,
            // fullDetailsUrl: '/advertisement/lodgeApplicationDetail'
            fullDetailsUrl: '/pet/viewPetApplication'
        },

        tableColumns: [
            {
                Header: "#",
                Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
            },
            {
                Header: "Application No.",
                accessor: "application_no",
            },
            {
                Header: "Applicant Name",
                accessor: "owner_name",
            },
            {
                Header: "Ward No",
                accessor: "ward_no",
            },
            {
                Header: "Applied Date",
                accessor: "application_apply_date",
                Cell: ({ value }) => { return format(new Date(value), 'dd-MM-yyyy') },
            },
        ],

    }
    return (
        <>
            < PilotWorkflowIndex workflowData={workflowRules} />
        </>
    )
}

export default PetRegWorkflowEntry