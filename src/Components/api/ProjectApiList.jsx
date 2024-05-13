import BackendUrl from "./BackendUrl"

export default function ProjectApiList() {
    let baseUrl = BackendUrl
    let apiList = {


        //heartBeatApi
        api_checkHeartBeat: `${baseUrl}/api/heartbeat`,
        // 1 API TO MENU LIST
        api_getFreeMenuList: `${baseUrl}/api/menu/by-module`,
        //WARD LIST
        api_login: `${baseUrl}/api/login`,

        // 19 API TO GET WORKFLOW BASIC INFO LIKE PERMISSIONS/WORKFLOW-CANDIDATES
        api_workflowInfo: `${baseUrl}/api/workflow/role-map/workflow-info`,


        // 21 API TO POST DEPARTMENTAL COMMUNICATION DATA
        api_postDepartmental: `${baseUrl}/api/post-custom-data`,

        // 22 API TO TO GET SAF DEPARTMENTAL COMMUNICATION LIST
        api_getDepartmentalData: `${baseUrl}/api/get-all-custom-tab-data`,


        //application demand detail in demand screen
        api_verifyDocuments: `${baseUrl}/api/workflows/document/verify-reject`,
        //application demand detail in demand screen
        api_changePassword: `${baseUrl}/api/change-password`,

        // API TO EDIT ADMIN PROFILE
        api_editAdminProfile: `${baseUrl}/api/edit-my-profile`,
        // API TO FETCH JSK DASHBOARD RECENT APPLICATIONS AND RECENT PAYMENTS

        // API TO FETCH NOTIFICATION DATA
        api_getNotification: `${baseUrl}/api/get-user-notifications`,
        // API TO CREATE NOTIFICATION DATA
        api_createNotification: `${baseUrl}/api/dashboard/jsk/prop-dashboard`,
        // API TO DELETE NOTIFICATION DATA
        api_deleteNotification: `${baseUrl}/api/dashboard/jsk/prop-dashboard`,


        ///////{*******MARRIAGE API LIST********}////////
        marriageInbox: baseUrl + '/api/marriage/inbox',
        marriageDetails: baseUrl + '/api/marriage/details',
        workflowInfo: baseUrl + "/api/workflow/role-map/workflow-info",
        appointSet: baseUrl + "/api/marriage/set-appiontment-date",
        getUploadedDocument: baseUrl + "/api/marriage/get-uploaded-document",
        docVerify: baseUrl + "/api/marriage/doc-verify-reject",
        approveReject: baseUrl + "/api/marriage/final-approval-rejection",
        approvedList: baseUrl + "/api/marriage/approved-application",
        marriageApplicationList: baseUrl + "/api/marriage/search-application",
        marriageOrderId: baseUrl + "/api/marriage/generate-order-id",
        api_postMarriageOfflinePayment: baseUrl + '/api/marriage/offline-payment',
        api_MarriageReceipt: baseUrl + '/api/marriage/payment-receipt',
        api_marriageNextLevel: baseUrl + '/api/marriage/post-next-level',

        api_postMarriageSubmission: `${baseUrl}/api/marriage/apply`,
        api_getDocList: `${baseUrl}/api/marriage/get-doc-list`,
        api_docUpload: `${baseUrl}/api/marriage/upload-document`,
        api_getDetails: `${baseUrl}/api/marriage/static-details`,
        api_getList: `${baseUrl}/api/marriage/applied-application`,
        api_deleteApplication: `${baseUrl}/api/marriage/`,
        api_editMarriageApplication: `${baseUrl}/api/marriage/edit-application`,

        // ════════════════════════║🔰 Marriage Api List 🔰║═══════════════════════════ 
        marriageInbox: baseUrl + '/api/marriage/inbox',
        marriageDetails: baseUrl + '/api/marriage/details',
        workflowInfo: baseUrl + "/api/workflow/role-map/workflow-info",
        appointSet: baseUrl + "/api/marriage/set-appiontment-date",
        getUploadedDocument: baseUrl + "/api/marriage/get-uploaded-document",
        docVerify: baseUrl + "/api/marriage/doc-verify-reject",
        approveReject: baseUrl + "/api/marriage/final-approval-rejection",
        approvedList: baseUrl + "/api/marriage/approved-application",
        marriageApplicationList: baseUrl + "/api/marriage/search-application",
        marriageOrderId: baseUrl + "/api/marriage/generate-order-id",
        api_postMarriageOfflinePayment: baseUrl + '/api/marriage/offline-payment',
        api_MarriageReceipt: baseUrl + '/api/marriage/payment-receipt',
        api_marriageNextLevel: baseUrl + '/api/marriage/post-next-level',

        api_postMarriageSubmission: `${baseUrl}/api/marriage/apply`,
        api_getDocList: `${baseUrl}/api/marriage/get-doc-list`,
        api_docUpload: `${baseUrl}/api/marriage/upload-document`,
        api_getDetails: `${baseUrl}/api/marriage/static-details`,
        api_getList: `${baseUrl}/api/marriage/applied-application`,
        api_deleteApplication: `${baseUrl}/api/marriage/`,
        api_editMarriageApplication: `${baseUrl}/api/marriage/edit-application`,


        //Sample-Demo Api for PMS
        api_GetWaterTankerSearchData: `${baseUrl}/api/water-tanker/search-booking`, //search paramter from list
        api_getWaterTankerBookingDetailsById: `${baseUrl}/api/water-tanker/get-booking-details-by-id `, //get -by -id
        
        //Api for PMS
        api_addProcurement: `${baseUrl}/api/sr/pre-procurement `,

        api_itemCategory: `${baseUrl}/api/master/category `,
        // api_itemSubCategory: `${baseUrl}/api/master/sub-category/by-category/1ef878d1-3a0f-4986-bf6b-ce3fd5aa3c37 `,
        api_itemSubCategory: `${baseUrl}/api/master/sub-category `,
        api_itemBrand: `${baseUrl}/api/master/brand `,
        api_fetchProcessor: `${baseUrl}/api/master/processor `,
        api_fetchRam: `${baseUrl}/api/master/ram `,
        api_fetchOperatingSystem: `${baseUrl}/api/master/os `,
        api_fetchRom: `${baseUrl}/api/master/rom `,
        api_fetchGraphics: `${baseUrl}/api/master/graphics `,

    }


    return apiList
}


