import BackendUrl from "./BackendUrl";

export default function ProjectApiList() {
  let baseUrl = BackendUrl;
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

    //Sample-Demo Api for PMS
    api_GetWaterTankerSearchData: `${baseUrl}/api/water-tanker/search-booking`, //search paramter from list
    api_getWaterTankerBookingDetailsById: `${baseUrl}/api/water-tanker/get-booking-details-by-id `, //get -by -id

    //Api for PMS
    api_addProcurement: `${baseUrl}/api/pms/ia/pre-procurement`,
    api_editProcurement: `${baseUrl}/api/pms/da/pre-procurement/edit`,
    api_editSrProcurement: `${baseUrl}/api/pms/sr/pre-procurement/edit`,

    api_itemCategory: `${baseUrl}/api/pms/master/category`,
    api_itemCategoryUpdate: `${baseUrl}/api/pms/master/category/update`,
    api_categoryStatusUpdate: `${baseUrl}/api/pms/master/category/switch`,
    api_subcategoryStatusUpdate: `${baseUrl}/api/pms/master/sub-category/switch`,
    api_unitStatusUpdate: `${baseUrl}/api/pms/master/unit/switch`,
    api_brandStatusUpdate: `${baseUrl}/api/pms/master/brand/switch`,
    api_itemSubCategory: `${baseUrl}/api/pms/master/sub-category/by-category`,
    api_itemSubCategoryAll: `${baseUrl}/api/pms/master/sub-category`,
    api_itemSubCategoryUpdate: `${baseUrl}/api/pms/master/sub-category/update`,
    api_itemBrand: `${baseUrl}/api/pms/master/by-subcategory`,
    api_getAllunit: `${baseUrl}/api/pms/master/unit`,
    api_getAllSupplier: `${baseUrl}/api/pms/master/supplier`,
    api_updateUnit: `${baseUrl}/api/pms/master/unit/update`,
    api_itemBrandNew: `${baseUrl}/api/pms/master/brand`,
    api_itemBrandUpdate: `${baseUrl}/api/pms/master/brand/update`,

    api_fetchProcessor: `${baseUrl}/api/pms/master/processor `,
    api_fetchRam: `${baseUrl}/api/pms/master/ram `,
    api_fetchOperatingSystem: `${baseUrl}/api/pms/master/os `,
    api_fetchRom: `${baseUrl}/api/pms/master/rom `,
    api_fetchGraphics: `${baseUrl}/api/pms/master/graphics `,

    api_fetchStockList: `${baseUrl}/api/pms/sr/pre-procurement`,
    api_fetchProcurementList: `${baseUrl}/api/pms/ia/pre-procurement`, //--copy pf the just above row
    api_fetchProcurementListInbox: `${baseUrl}/api/pms/sr/post-procurement`,
    api_fetchProcurementDAList: `${baseUrl}/api/pms/ia/pre-procurement/outbox`,
    api_fetchProcurementDetailById: `${baseUrl}/api/pms/sr/pre-procurement`,
    api_fetchOutboxProcurementDetailById: `${baseUrl}/api/pms/sr/pre-procurement/outbox`,
    api_postForwardToDA: `${baseUrl}/api/pms/sr/pre-procurement/to-da`,
    api_fetchProcurementRejectedList: `${baseUrl}/api/pms/sr/pre-procurement/rejected`,
    api_fetchProcurementReleasedList: `${baseUrl}/api/pms/sr/pre-procurement/released`,

    api_fetchProcurementDAListInbox: `${baseUrl}/api/pms/da/pre-procurement`,
    api_fetchProcurementDAListOutbox: `${baseUrl}/api/pms/da/pre-procurement/outbox`,
    api_fetchProcurementDADetailByIdinbox: `${baseUrl}/api/pms/da/pre-procurement`,
    api_fetchProcurementDADetailByIdOutbox: `${baseUrl}/api/pms/da/pre-procurement/outbox`,
    api_postBackToSR: `${baseUrl}/api/pms/da/pre-procurement/to-sr`,
    // api_postReleaseTender: `${baseUrl}/api/pms/da/pre-procurement/release-tender`,
    api_postForwardtoAcc: `${baseUrl}/api/pms/da/pre-procurement/to-acc-boq`,

    api_postRejectTender: `${baseUrl}/api/pms/da/pre-procurement/reject`,
    api_postDaEditTender: `${baseUrl}/api/pms/da/pre-procurement/edit`,

    api_exportcsv: `${baseUrl}/api/pms/download`,

    //post
    api_fetchPostProcurementDetailById: `${baseUrl}/api/pms/da/post-procurement`,
    api_fetchPostProcurementDAListInbox: `${baseUrl}/api/pms/da/post-procurement`,
    api_fetchPostProcurementDAListOutbox: `${baseUrl}/api/pms/da/post-procurement/outbox`,
    api_postPostProcurementDaAdditionalDetails: `${baseUrl}/api/pms/da/post-procurement/save-additional-details`,
    api_fetchDaReceivedInvtListInbox: `${baseUrl}/api/pms/da/rec-inv`,

    //inventory
    api_fetchDaReceivedInvtListOutbox: `${baseUrl}/api/pms/da/rec-inv/outbox`,
    api_fetchDaReceivedInvtListOutboxId: `${baseUrl}/api/pms/da/rec-inv/outbox`,
    api_fetchDaReceivedInvtDetailById: `${baseUrl}/api/pms/da/rec-inv`,
    api_postDaReceivedInvtDetail: `${baseUrl}/api/pms/da/rec-inv/receive`,

    //sr
    api_fetchSrReceivedInvtListInbox: `${baseUrl}/api/pms/sr/rec-inv`,
    api_fetchSrReceivedInvtListOutbox: `${baseUrl}/api/pms/sr/rec-inv/outbox`,
    api_postSrAddInvt: `${baseUrl}/api/pms/sr/rec-inv/add-to-inv`,
    api_postSrAddProduct: `${baseUrl}/api/pms/sr/rec-inv/add-product`,
    api_fetchSrInvtDetailsList: `${baseUrl}/api/pms/inventory/by-filter`,

    //BOQ
    api_fetchBoqList: `${baseUrl}/api/pms/acc/pre-procurement/list-for-boq`, //accountant
    api_postToAccountant: `${baseUrl}/api/pms/da/pre-procurement/to-acc-boq`,
    api_fetchAllBoqDetails: `${baseUrl}/api/pms/acc/pre-procurement/bulk`,
    api_postForwardAndCreateBoq: `${baseUrl}/api/pms/acc/pre-procurement/boq`,
    api_fetchBoqListOutbox: `${baseUrl}/api/pms/acc/pre-procurement/boq/outbox`, //accountant
    api_fetchDaBoqListInbox: `${baseUrl}/api/pms/da/pre-procurement/boq`, //da
    api_fetchDaBoqListOutbox: `${baseUrl}/api/pms/da/pre-procurement/boq/outbox`, //da
    api_fetchAllBoqDetailsbyId: `${baseUrl}/api/pms/boq/by-ref`,
    api_fetchBoqInboxList: `${baseUrl}/api/pms/acc/pre-procurement/boq`,
    api_postUpdatedBoq: `${baseUrl}/api/pms/boq`, //update boq
    api_postBacktoAcc: `${baseUrl}/api/pms/da/pre-procurement/boq/return-boq`, //boq back to acc
    api_postForwardBoq: `${baseUrl}/api/pms/da/pre-procurement/boq/approve`, //approve boq
    api_postRejectBoq: `${baseUrl}/api/pms/da/pre-procurement/boq/reject`, //reject boq
    api_forwardBoqToFinance: `${baseUrl}/api/pms/da/pre-procurement/boq/to-finance`,
    api_forwardBoqToTA: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/to-ta`,

    //tendring form
    api_postPreTenderDetails: `${baseUrl}/api/pms/pre-tender/details`,

    api_postBasicDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/basic-details`,
    api_getBasicDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/basic-details`,
    api_postWorkDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/work-details`,
    api_getWorkDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/work-details`,
    api_postFeeDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/fee-details`,
    api_getFeeDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/fee-details`,
    api_postCriticalDatesDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/critical-dates`,
    api_getCriticalDatesDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/critical-dates`,

    api_postBidOpenerDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/bid-openers`,
    api_getBidOpenerDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/bid-openers`,
    api_getPreviewDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender`,
    api_getDAPreviewDetails: `${baseUrl}/api/pms/pre-tender`,
    api_postCoverDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/cover-details`,
    api_getCoverDetails: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/cover-details`,
    api_postFinalSubit: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/submit`,
    api_postDocumentUpload: `${baseUrl}/api/pms/upload`, //to upload doc

    api_postForwardtoDA: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/to-da`,
    api_getAccPreTenderInbox: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender`,
    api_getAccPreTenderOutbox: `${baseUrl}/api/pms/acc/pre-procurement/pre-tender/outbox`,
    api_fetchAllDaPreTenderingInbox: `${baseUrl}/api/pms/da/pre-procurement/pre-tender`,
    api_fetchAllDaPreTenderingOutbox: `${baseUrl}/api/pms/da/pre-procurement/pre-tender/outbox`,
    api_postReleaseForTender: `${baseUrl}/api/pms/da/pre-procurement/pre-tender/approve`, //release to tender
    api_postPreTenderBackToAcc: `${baseUrl}/api/pms/da/pre-procurement/pre-tender/to-acc`, //tender back to acc
    api_postRejectPreTender: `${baseUrl}/api/pms/da/pre-procurement/pre-tender/reject`, //reject tender

    // notification
    api_fetchNotification: `${baseUrl}/api/pms/notification`,
    api_readNotification: `${baseUrl}/api/pms/notification`,

    //inventory
    api_getDDSRInbox: `${baseUrl}/api/pms/dist/stock-request`,
    api_getDDSROutbox: `${baseUrl}/api/pms/dist/stock-request/outbox`,
    api_getStockRequetById: `${baseUrl}/api/pms/stock-request`,
    api_postStockReqForwardtoDA: `${baseUrl}/api/pms/dist/stock-request/to-da`,
    api_postStockRequest: `${baseUrl}/api/pms/dist/stock-request`,
    api_editStockRequest: `${baseUrl}/api/pms/stock-request`,
    api_postStockRequest: `${baseUrl}/api/pms/dist/stock-request`,
    api_getActiveCategory: `${baseUrl}/api/pms/master/category/active`,
    api_getActiveSubCategory: `${baseUrl}/api/pms/master/sub-category/by-category`,
    api_getActiveBrand: `${baseUrl}/api/pms/master/by-subcategory`,
    api_getActiveDesc: `${baseUrl}/api/pms/inventory/by-filter`,
    api_getActiveQty: `${baseUrl}/api/pms/inventory/total-available`,
    api_getEmpDetails: `${baseUrl}/api/hrms/v1/employee/get?limit=100000000000&page=1`,
    api_postHandoverReq: `${baseUrl}/api/pms/dist/stock-request/handover`,
    api_postReturnReq: `${baseUrl}/api/pms/dist/stock-request/return-inv`,
    api_postDeadStockReq: `${baseUrl}/api/pms/dist/stock-request/add-dead-stock`,
    api_postWarrantyClaim: `${baseUrl}/api/pms/dist/stock-request/warranty-claim-req`,

    api_getSRStockReqInbox: `${baseUrl}/api/pms/sr/stock-request`,
    api_getSRStockReqOutbox: `${baseUrl}/api/pms/sr/stock-request/outbox`,

    api_getSrStockRequetById: `${baseUrl}/api/pms/stock-request`,
    api_approveApplication: `${baseUrl}/api/pms/sr/stock-request/approve`,
    api_rejectApplication: `${baseUrl}/api/pms/sr/stock-request/reject`,

    api_forwardStockReqToI: `${baseUrl}/api/pms/da/stock-request/to-ia`,
    api_iaStockReqInbox: `${baseUrl}/api/pms/ia/stock-request/`,
    api_iaStockReqOubox: `${baseUrl}/api/pms/ia/stock-request/outbox`,
    api_iaStockReqApprove: `${baseUrl}/api/pms/ia/stock-request/approve`,

    api_forwardLevelone: `${baseUrl}/api/pms/ia/pre-procurement/to-level1`,
    api_forwardLeveltwo: `${baseUrl}/api/pms/level1/to-level2`,

    // Level 1
    api_getLevelOneInbox: `${baseUrl}/api/pms/level1`,
    api_getLevelOneOutbox: `${baseUrl}/api/pms/level1/outbox`,
    api_approveByLevelone: `${baseUrl}/api/pms/level1/approve`,
    api_rejectByLevelone: `${baseUrl}/api/pms/level1/reject`,
    api_backByLevel1toIA: `${baseUrl}/api/pms/level1/return`,

    // Level 2
    api_getLevelTwoInbox: `${baseUrl}/api/pms/level2`,
    api_getLevelTwoOutbox: `${baseUrl}/api/pms/level2/outbox`,
    api_approveByLeveltwo: `${baseUrl}/api/pms/level2/approve`,
    api_rejectByLeveltwo: `${baseUrl}/api/pms/level2/reject`,
    api_backByLevel2toLevel1: `${baseUrl}/api/pms/level2/return`,

    //updated
    api_fetchStockRequestDAInbox: `${baseUrl}/api/pms/da/stock-request/`,
    api_fetchStockRequestDAOutbox: `${baseUrl}/api/pms/da/stock-request/outbox`,

    //pre-procure
    api_fetchProcurementById: `${baseUrl}/api/pms/procurement`,
    api_fetchProcurementDetById: `${baseUrl}/api/pms/pre-tender/details`,

    //tendering admin
    api_fetchTAInbox: `${baseUrl}/api/pms/ta`,
    api_fetchTAOutbox: `${baseUrl}/api/pms/ta/outbox`,



    api_postBidType: `${baseUrl}/api/pms/ta/bid-type`,
    api_getBidType: `${baseUrl}/api/pms/bidding`,


  };

  return apiList;
}
