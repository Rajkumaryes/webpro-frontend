import { adminRoot, Tenderadmin } from "../../constants/defaultValues";
// import { UserRole } from "../helpers/authHelper"


const data = [
  {
    key: 'Exports',
    icon: 'iconsminds-upload-1',
    label: 'Exports',
    to: `${adminRoot}/export`,
    subs: [

      {
        key: 'Indexing Process',
        icon: 'iconsminds-alarm-clock-2',
        label: 'Indexing Process',
        to: `${adminRoot}/export/indexing`,
      },
      {
        key: 'Input Sheet',
        icon: 'iconsminds-upload-1',
        label: 'Input Sheet',
        to: `${adminRoot}/export/inputsheet`,
      },
      {
        key: 'Correction Sheet',
        icon: 'iconsminds-file-edit',
        label: 'Correction Sheet',
        to: `${adminRoot}/export/correctionsheet`,
      },
      {
        key: 'Communication & Transmission Level Sheet',
        icon: 'iconsminds-conference',
        label: 'Communication & Transmission Level Sheet',
        to: `${adminRoot}/export/communicationsheet`,
      },
      {
        key: 'Query Resolve Sheet',
        icon: 'iconsminds-newspaper',
        label: 'Query Resolve Sheet',
        to: `${adminRoot}/export/queryResolvesheet`,
      },
      {
        key: 'Audit Sheet',
        icon: 'iconsminds-files',
        label: 'Audit Sheet',
        to: `${adminRoot}/export/auditsheet`,
      },
      {
        key: 'CRM Case Handling',
        icon: 'simple-icon-notebook',
        label: 'CRM Case Handling',
        to: `${adminRoot}/export/crmcasehandling`,
      },
      // {
      //   key: 'Customs and OBL',
      //   icon: 'iconsminds-mail-with-cursors',
      //   label: 'Customs and OBL',
      //   to: `${adminRoot}/export/customsandobl`,
      // },
      {
        key: 'Release',
        icon: 'simple-icon-envelope-open',
        label: 'Release',
        to: `${adminRoot}/export/realese`,
      },
      {
        key: 'Match Code Creation',
        icon: 'iconsminds-formula',
        label: 'Match Code Creation',
        to: `${adminRoot}/export/matchcode`,
      },

      {
        key: 'POST BOT Process',
        icon: 'iconsminds-upgrade',
        label: 'POST BOT Process',
        to: `${adminRoot}/export/cod`,
      },
      {
        key: 'Error Module',
        icon: 'iconsminds-information',
        label: 'Error Module',
        to: `${adminRoot}/export/errormodule`,
      },
      // {
      //   key: 'Other Activities',
      //   icon: 'iconsminds-duplicate-layer',
      //   label: 'Other Activities',
      //   to: `${adminRoot}/export/otheractivites`,
      // },


      {
        key: 'SI Reminder',
        icon: 'iconsminds-map-marker-2',
        label: 'SI Reminder',
        to: `${adminRoot}/export/si-remainder`,
      },

      {
        key: 'RUT, Invoice & SDC',
        icon: 'simple-icon-book-open',
        label: 'RUT, Invoice & SDC',
        to: `${adminRoot}/export/rut_invoice`,
      },

      {
        key: 'OT',
        icon: 'iconsminds-yacht',
        label: 'OT',
        to: `${adminRoot}/export/ot`,
      },
      {
        key: 'Report',
        icon: 'iconsminds-mail-with-cursors',
        label: 'Report',
        to: `${adminRoot}/export/reports`,

      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/export/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/export/dashboard`,
      },
      {
        key: 'Export Raw Data',
        icon: 'simple-icon-grid',
        label: 'Export Raw Data',
        to: `${adminRoot}/export/report`,
        subs: [
          {
            key: 'Indexing Process Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Indexing Process Raw Data',
            to: `${adminRoot}/export/report/indexing`,
          },
          {
            key: 'Input Sheet Raw Data',
            icon: 'iconsminds-upload-1',
            label: 'Input Sheet Raw Data',
            to: `${adminRoot}/export/report/inputsheet`,
          },
          {
            key: 'Correction Sheet Raw Data',
            icon: 'iconsminds-file-edit',
            label: 'Correction Sheet Raw Data',
            to: `${adminRoot}/export/report/correctionsheet`,
          },
          {
            key: 'Communication & Transmission Level Sheet Raw Data',
            icon: 'iconsminds-conference',
            label: 'Communication & Transmission Level Sheet Raw Data',
            to: `${adminRoot}/export/report/communicationsheet`,
          },
          {
            key: 'Query Resolve Sheet Raw Data',
            icon: 'iconsminds-newspaper',
            label: 'Query Resolve Sheet Raw Data',
            to: `${adminRoot}/export/report/queryResolvesheet`,
          },
          {
            key: 'Audit Sheet Raw Data',
            icon: 'iconsminds-files',
            label: 'Audit Sheet Raw Data',
            to: `${adminRoot}/export/report/auditsheet`,
          },
          {
            key: 'Release Raw Data',
            icon: 'simple-icon-envelope-open',
            label: 'Release Raw Data',
            to: `${adminRoot}/export/report/realese`,
          },
          {
            key: 'Match Code Creation Raw Data',
            icon: 'iconsminds-formula',
            label: 'Match Code Creation Raw Data',
            to: `${adminRoot}/export/report/matchcode`,
          },

          {
            key: 'COD & Exception Raw Data',
            icon: 'iconsminds-upgrade',
            label: 'COD & Exception Raw Data',
            to: `${adminRoot}/export/report/cod`,
          },
          {
            key: 'Error Module Raw Data',
            icon: 'iconsminds-information',
            label: 'Error Module Raw Data',
            to: `${adminRoot}/export/report/errormodule`,
          },
          // {
          //   key: 'Other Activities',
          //   icon: 'iconsminds-duplicate-layer',
          //   label: 'Other Activities',
          //   to: `${adminRoot}/export/otheractivites`,
          // },


          {
            key: 'SI Reminder Raw Data',
            icon: 'iconsminds-map-marker-2',
            label: 'SI Reminder Raw Data',
            to: `${adminRoot}/export/report/si-remainder`,
          },

          {
            key: 'RUT, Invoice & SDC Raw Data',
            icon: 'simple-icon-book-open',
            label: 'RUT, Invoice & SDC Raw Data',
            to: `${adminRoot}/export/report/rut_invoice`,
          },
          {
            key: 'CRM Case Handling Raw Data',
            icon: 'simple-icon-notebook',
            label: 'CRM Case Handling Raw Data',
            to: `${adminRoot}/export/report/crmcasehandling`,
          },
          {
            key: 'OT Raw Data',
            icon: 'iconsminds-yacht',
            label: 'OT Raw Data',
            to: `${adminRoot}/export/report/ot`,
          },
        ]
      },
      {
        key: 'Masters',
        icon: 'simple-icon-grid',
        label: 'Masters',
        to: `${adminRoot}/export/master`,
        subs: [

          {
            key: 'Request Type',
            icon: 'iconsminds-mail-with-cursors',
            label: 'Request Type',
            to: `${adminRoot}/export/master/requesttype`,
          },
          // {
          //   key: 'List View',
          //   icon: 'iconsminds-mail-with-cursors',
          //   label: 'List View',
          //   to: `${adminRoot}/export/master/listview`,
          // },
          {
            key: 'CRM Activity',
            icon: 'iconsminds-mail-with-cursors',
            label: 'CRM Activity',
            to: `${adminRoot}/export/master/crmactivity`,
          },
          {
            key: 'OBL Activity',
            icon: 'iconsminds-mail-with-cursors',
            label: 'OBL Activity',
            to: `${adminRoot}/export/master/oblactivity`,
          },
          // {
          //   key: 'Status Of Case',
          //   icon: 'iconsminds-mail-with-cursors',
          //   label: 'Status Of Case',
          //   to: `${adminRoot}/export/master/crmstatusofcase`,
          // },
          {
            key: 'Remarks',
            icon: 'iconsminds-mail-with-cursors',
            label: 'Remarks',
            to: `${adminRoot}/export/master/remarks`,
          },
          {
            key: 'Audit Category',
            icon: 'iconsminds-mail-with-cursors',
            label: 'Audit Category',
            to: `${adminRoot}/export/master/auditcategory`,
          },
          {
            key: 'DPRE Type',
            icon: 'iconsminds-mail-with-cursors',
            label: 'DPRE Type',
            to: `${adminRoot}/export/master/dpretype`,
          },
          {
            key: 'Error Type',
            icon: 'iconsminds-mail-with-cursors',
            label: 'Error Type',
            to: `${adminRoot}/export/master/errortype`,
          },
          {
            key: 'AMT Type',
            icon: 'iconsminds-mail-with-cursors',
            label: 'AMT Type',
            to: `${adminRoot}/export/master/amttype`,
          },
          {
            key: 'Type of OT',
            icon: 'iconsminds-mail-with-cursors',
            label: 'Type of OT',
            to: `${adminRoot}/export/master/typeofot`,
          },
          {
            key: 'Issuer Code',
            icon: 'iconsminds-mail-with-cursors',
            label: 'Issuer Code',
            to: `${adminRoot}/export/master/issuercode`,
          },
          {
            key: 'Customs Type',
            icon: 'iconsminds-mail-with-cursors',
            label: 'Customs Type',
            to: `${adminRoot}/export/master/customtype`,
          },
          {
            key: 'Area',
            icon: 'iconsminds-mail-with-cursors',
            label: 'Area',
            to: `${adminRoot}/export/master/exportarea`,
          },
          {
            key: 'Region',
            icon: 'iconsminds-mail-with-cursors',
            label: 'Region',
            to: `${adminRoot}/export/master/exportregion`,
          },
          {
            key: 'Team',
            icon: 'iconsminds-mail-with-cursors',
            label: 'Team',
            to: `${adminRoot}/export/master/exportteam`,
          },
          {
            key: 'Country',
            icon: 'iconsminds-mail-with-cursors',
            label: 'Country',
            to: `${adminRoot}/export/master/country`,
          },
          {
            key: 'purpose',
            icon: 'iconsminds-mail-with-cursors',
            label: 'purpose',
            to: `${adminRoot}/export/master/purpose`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/export/master/eqmaster`,
          },
          {
            key: 'Teamsite',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Teamsite',
            to: `${adminRoot}/export/master/teamsite`,
          },
        ]
      },
    ],
  },
  {
    key: 'Testing',
    icon: 'iconsminds-arrow-junction',
    label: 'Testing',
    to: `${adminRoot}/testing`,
    subs: [

      {
        key: 'Testing Input Sheet',
        icon: 'iconsminds-upload-1',
        label: 'Testing Input Sheet',
        to: `${adminRoot}/testing/inputsheet`,
      },
      {
        key: 'Testing Report',
        icon: 'iconsminds-download',
        label: 'Testing Report',
        to: `${adminRoot}/testing/report`,
      },
    ],
  },
  // {
  //   key: 'Automation',
  //   icon: 'simple-icon-cloud-upload',
  //   label: 'Automation',
  //   to: `${adminRoot}/automation`,
  //   subs: [
  //     {
  //       key: 'Automation Dashboard',
  //       icon: 'iconsminds-laptop---tablet',
  //       label: 'Automation Dashboard',
  //       to: `${adminRoot}/automation/dashboard`,
  //     },  
  //     {
  //       key: 'Automation Import',
  //       icon: 'iconsminds-upload-1',
  //       label: 'Automation Import',
  //       to: `${adminRoot}/automation/import`,
  //     },  
  //   ],
  // },
  {
    key: 'Meeting',
    icon: 'iconsminds-handshake',
    label: 'Meeting',
    to: `${adminRoot}/meeting`,
    subs: [
      {
        key: '1 on 1 meeting',
        icon: 'iconsminds-handshake',
        label: '1 on 1 Meeting',
        to: `${adminRoot}/meeting/1on1meeting`,
      },
    ],
  },
  {
    key: 'Booking Amendment',
    icon: 'iconsminds-address-book-2',
    label: 'Booking Amendment',
    to: `${adminRoot}/bookingamendment`,
    subs: [
      {
        key: 'OMNI Case Handling',
        icon: 'iconsminds-address-book-2',
        label: 'OMNI Case Handling',
        to: `${adminRoot}/bookingamendment/omni-case-handling`,
      },
      {
        key: 'OMNI Case Merging',
        icon: 'iconsminds-file-horizontal',
        label: 'OMNI Case Merging',
        to: `${adminRoot}/bookingamendment/omni-case-merging`,
      },
      {
        key: 'Unassigned List View',
        icon: 'iconsminds-alarm-clock-2',
        label: 'Unassigned List View',
        to: `${adminRoot}/bookingamendment/unassigned-list-view`,
      },
      {
        key: 'Work Order Removal',
        icon: 'iconsminds-project',
        label: 'Work Order Removal',
        to: `${adminRoot}/bookingamendment/work-order-removal`,
      },
      {
        key: 'Internal Audit',
        icon: 'iconsminds-receipt-4',
        label: 'Internal Audit',
        to: `${adminRoot}/bookingamendment/internal-audit`,
      },
      {
        key: 'Error Log Issue',
        icon: 'iconsminds-notepad',
        label: 'Error Log Issue',
        to: `${adminRoot}/bookingamendment/error-log-issue`,
      },
      {
        key: 'Escalation Email Assistance',
        icon: 'iconsminds-envelope',
        label: 'Escalation Email Assistance',
        to: `${adminRoot}/bookingamendment/escalation-email-assistance`,
      },
      {
        key: 'Case Allocations',
        icon: 'iconsminds-bank',
        label: 'Case Allocations',
        to: `${adminRoot}/bookingamendment/caseallocations`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/bookingamendment/productivity-report`,
      },
      {
        key: 'Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Masters',
        to: `${adminRoot}/bookingamendment`,
        subs: [
          {
            key: 'Amendment Due To',
            icon: 'iconsminds-receipt-4',
            label: 'Amendment Due To',
            to: `${adminRoot}/bookingamendment/amendment-due-to`,
          },
          {
            key: 'Amendment Type',
            icon: 'iconsminds-receipt-4',
            label: 'Amendment Type',
            to: `${adminRoot}/bookingamendment/amendment-type`,
          },
          {
            key: 'Exception Type',
            icon: 'iconsminds-receipt-4',
            label: 'Exception Type',
            to: `${adminRoot}/bookingamendment/exception-type`,
          },
          {
            key: 'Issue Code',
            icon: 'iconsminds-receipt-4',
            label: 'Issue Code',
            to: `${adminRoot}/bookingamendment/issuecode`,
          },
          {
            key: 'Status of the Case',
            icon: 'iconsminds-receipt-4',
            label: 'Status of the Case',
            to: `${adminRoot}/bookingamendment/status-of-the-case`,
          },
          {
            key: 'Queue Name',
            icon: 'iconsminds-receipt-4',
            label: 'Queue Name',
            to: `${adminRoot}/bookingamendment/queuename`,
          },
          {
            key: 'Process Type',
            icon: 'iconsminds-receipt-4',
            label: 'Process Type',
            to: `${adminRoot}/bookingamendment/processtype`,
          },
          {
            key: 'Audit Type',
            icon: 'iconsminds-receipt-4',
            label: 'Audit Type',
            to: `${adminRoot}/bookingamendment/audittype`,
          },
          {
            key: 'Error Category',
            icon: 'iconsminds-receipt-4',
            label: 'Error Category',
            to: `${adminRoot}/bookingamendment/errorcategory`,
          },
          {
            key: 'Query Type',
            icon: 'iconsminds-receipt-4',
            label: 'Query Type',
            to: `${adminRoot}/bookingamendment/querytype`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-receipt-4',
            label: 'EQ Master',
            to: `${adminRoot}/bookingamendment/eqmaster`,
          },
          {
            key: 'Status of the Case',
            icon: 'iconsminds-receipt-4',
            label: 'Status of the Case',
            to: `${adminRoot}/bookingamendment/statusofthecase`,
          },
          {
            key: 'User Allocation',
            icon: 'iconsminds-receipt-4',
            label: 'User Allocation',
            to: `${adminRoot}/bookingamendment/userallocation`,
          },
        ]
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/bookingamendment/rawdata`,
        subs: [
          {
            key: 'Omni Case Handling',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Omni Case Handling',
            to: `${adminRoot}/bookingamendment/rawdata/omnicasehandling`,
          },
          {
            key: 'Omni Case Merging',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Omni Case Merging',
            to: `${adminRoot}/bookingamendment/rawdata/omnicasemerging`,
          },
          {
            key: 'Unassigned List View',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Unassigned List View',
            to: `${adminRoot}/bookingamendment/rawdata/unassignedlistview`,
          },
          {
            key: 'Work Order Removal',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Work Order Removal',
            to: `${adminRoot}/bookingamendment/rawdata/workorderremoval`,
          },
          {
            key: 'Internal Audit',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Internal Audit',
            to: `${adminRoot}/bookingamendment/rawdata/internalaudit`,
          },
          {
            key: 'Error Log Issue',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Error Log Issue',
            to: `${adminRoot}/bookingamendment/rawdata/errorlogissue`,
          },
          {
            key: 'Escalation Email Assistance',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Escalation Email Assistance',
            to: `${adminRoot}/bookingamendment/rawdata/escalationemailassistance`,
          },
        ]
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-receipt-4',
        label: 'Dashboard',
        to: `${adminRoot}/bookingamendment/dashboard`,
        subs: [
          {
            key: 'Booking Amendment',
            icon: 'iconsminds-receipt-4',
            label: 'Booking Amendment',
            to: `${adminRoot}/bookingamendment/dashboard/omnicasehandling`,
          }
        ]
      },
    ],
  },
  {
    key: 'BCH Team',
    icon: 'simple-icon-cloud-upload',
    label: 'BCH Team',
    to: `${adminRoot}/bchteam`,
    subs: [
      {
        key: 'Business Partner Catalog',
        icon: 'iconsminds-cloud-hail',
        label: 'Business Partner Catalog',
        to: `${adminRoot}/bchteam/business-partner-catalog`,
      },
      {
        key: 'Contact Cleanup Services',
        icon: 'iconsminds-cloud-hail',
        label: 'Contact Cleanup Services',
        to: `${adminRoot}/bchteam/contact-cleanup-services`,
      }, {
        key: 'High Velocity Sales',
        icon: 'iconsminds-cloud-hail',
        label: 'High Velocity Sales',
        to: `${adminRoot}/bchteam/high-velocity-sales`,
      },
      {
        key: 'Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Masters',
        to: `${adminRoot}/bchteam`,
        subs: [
          {
            key: 'Category',
            icon: 'iconsminds-receipt-4',
            label: 'Category',
            to: `${adminRoot}/bchteam/category`,
          },
          {
            key: 'Matchcode Type',
            icon: 'iconsminds-receipt-4',
            label: 'Matchcode Type',
            to: `${adminRoot}/bchteam/matchcodetype`,
          },
          {
            key: 'Action Category',
            icon: 'iconsminds-receipt-4',
            label: 'Action Category',
            to: `${adminRoot}/bchteam/actioncategory`,
          },
          {
            key: 'BPC Area',
            icon: 'iconsminds-receipt-4',
            label: 'BPC Area',
            to: `${adminRoot}/bchteam/bpcarea`,
          },
          {
            key: 'CCS Area',
            icon: 'iconsminds-receipt-4',
            label: 'CCS Area',
            to: `${adminRoot}/bchteam/ccsarea`,
          },
          {
            key: 'CCS Comments',
            icon: 'iconsminds-receipt-4',
            label: 'CCS Comments',
            to: `${adminRoot}/bchteam/ccscomments`,
          },
          {
            key: 'HVS Area',
            icon: 'iconsminds-receipt-4',
            label: 'HVS Area',
            to: `${adminRoot}/bchteam/hvsarea`,
          },
          // {
          //   key: 'EQ Master',
          //   icon: 'iconsminds-receipt-4',
          //   label: 'EQ Master',
          //   to: `${adminRoot}/bchteam/eqmaster`,
          // },  
        ]
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/bchteam/rawdata`,
        subs: [
          {
            key: 'Business Partner Catalog',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Business Partner Catalog',
            to: `${adminRoot}/bchteam/rawdata/businesspartnercatalog`,
          },
          {
            key: 'Contact Cleanup Service',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Contact Cleanup Service',
            to: `${adminRoot}/bchteam/rawdata/contactcleanupservice`,
          },
          {
            key: 'High Velocity Sales',
            icon: 'iconsminds-alarm-clock-2',
            label: 'High Velocity Sales',
            to: `${adminRoot}/bchteam/rawdata/highvelocitysales`,
          },
        ]
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/bchteam/productivity-report`,
      },
    ],
  },
  {
    key: 'Imports',
    icon: 'iconsminds-download-1',
    label: 'Imports',
    to: `${adminRoot}/import`,
    subs: [
      {
        key: 'KPI Report',
        icon: 'iconsminds-laptop---tablet',
        label: 'KPI Report',
        to: `${adminRoot}/import/kpireport`,
      },

      {
        key: 'Vessel Information',
        icon: 'iconsminds-ship',
        label: 'Vessel Information',
        to: `${adminRoot}/import/vesselinfo`,
      },
      {
        key: 'CSI Productivity',
        icon: 'iconsminds-globe-2',
        label: 'CSI Productivity',
        to: `${adminRoot}/import/ca`,
      },
      {
        key: 'DO Count Sheet',
        icon: 'iconsminds-box-close',
        label: 'DO Count Sheet',
        to: `${adminRoot}/import/doform`,
      },
      {
        key: 'Release Count Sheet',
        icon: 'iconsminds-key-lock',
        label: 'Release Count Sheet',
        to: `${adminRoot}/import/releaseform`,
      },
      {
        key: 'Delivery Order Query',
        icon: 'iconsminds-pen',
        label: 'Delivery Order Query',
        to: `${adminRoot}/import/doquery`,
      },
      {
        key: 'Vessel Posting',
        icon: 'iconsminds-sailing-ship',
        label: 'Vessel Posting',
        to: `${adminRoot}/import/vesselposting`,
      },
      {
        key: 'Domestic Invoice',
        icon: 'iconsminds-bank',
        label: 'Domestic Invoice',
        to: `${adminRoot}/import/domesticinvoice`,
      },
      {
        key: 'Communication Sheet',
        icon: 'iconsminds-laptop---tablet',
        label: 'Communication Sheet',
        to: `${adminRoot}/import/communication`,
      },
      {
        key: 'CRM Process',
        icon: 'simple-icon-notebook',
        label: 'CRM Process',
        to: `${adminRoot}/import/crm`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/import/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/import/dashboard`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/import/reports`,
        subs: [
          {
            key: 'Vessel Information Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Vessel Information Raw Data',
            to: `${adminRoot}/import/reports/vesselinfo`,
          },

          {
            key: 'CSI Productivity Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'CSI Productivity Raw Data',
            to: `${adminRoot}/import/reports/ca`,
          },
          {
            key: 'DO Count Sheet Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'DO Count Sheet Raw Data',
            to: `${adminRoot}/import/reports/doform`,
          },
          {
            key: 'Release Count Sheet Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Release Count Sheet Raw Data',
            to: `${adminRoot}/import/reports/releaseform`,
          },
          {
            key: 'Vessel Posting Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Vessel Posting Raw Data',
            to: `${adminRoot}/import/reports/vesselposting`,
          },
          {
            key: 'Domestic Invoice Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Domestic Invoice Raw Data',
            to: `${adminRoot}/import/reports/domesticinvoice`,
          },
          {
            key: 'Invoice Cancellation Import Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Invoice Cancellation Import Raw Data',
            to: `${adminRoot}/import/reports/invoicecancelation`,
          },
          {
            key: 'Delivery Order Query Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Delivery Order Query Raw Data',
            to: `${adminRoot}/import/reports/doquery`,
          },
          {
            key: 'CSI Error Capturing Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'CSI Error Capturing Raw Data',
            to: `${adminRoot}/import/reports/csierrorcapturing`,
          },
          {
            key: 'Communication Sheet Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Communication Sheet Raw Data',
            to: `${adminRoot}/import/reports/communication`,
          },
          {
            key: 'CRM Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'CRM Raw Data',
            to: `${adminRoot}/import/reports/crm`,
          },
        ]
      },
      {
        key: 'KFR Report',
        icon: 'iconsminds-laptop---tablet',
        label: 'KFR Report',
        to: `${adminRoot}/import/vesselinfo`,
        subs: [
          {
            key: 'Vessel Information KFR Report',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Vessel Information KFR Report',
            to: `${adminRoot}/import/kfr-report/vesselinfo`,
          },
          {
            key: 'CSI Productivity KFR Report',
            icon: 'iconsminds-alarm-clock-2',
            label: 'CSI Productivity KFR Report',
            to: `${adminRoot}/import/kfr-report/ca`,
          },
          {
            key: 'DO Count Sheet KFR Report',
            icon: 'iconsminds-alarm-clock-2',
            label: 'DO Count Sheet KFR Report',
            to: `${adminRoot}/import/kfr-report/doform`,
          },
          {
            key: 'Release Count Sheet KFR Report',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Release Count Sheet KFR Report',
            to: `${adminRoot}/import/kfr-report/releaseform`,
          },
          {
            key: 'Vessel Posting KFR Report',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Vessel Posting KFR Report',
            to: `${adminRoot}/import/kfr-report/vesselposting`,
          },
          {
            key: 'Domestic Invoice KFR Report',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Domestic Invoice KFR Report',
            to: `${adminRoot}/import/kfr-report/domesticinvoice`,
          },
          {
            key: 'Invoice Cancellation Import KFR Report',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Invoice Cancellation Import KFR Report',
            to: `${adminRoot}/import/kfr-report/invoicecancelation`,
          },
          {
            key: 'Delivery Order Query KFR Report',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Delivery Order Query KFR Report',
            to: `${adminRoot}/import/kfr-report/doquery`,
          },
          {
            key: 'CSI Error Capturing KFR Report',
            icon: 'iconsminds-alarm-clock-2',
            label: 'CSI Error Capturing KFR Report',
            to: `${adminRoot}/import/kfr-report/csierrorcapturing`,
          },
          {
            key: 'Communication Sheet KFR Report',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Communication Sheet KFR Report',
            to: `${adminRoot}/import/kfr-report/communication`,
          },
        ]
      },
      {
        key: 'KFR',
        icon: 'iconsminds-laptop---tablet',
        label: 'KFR',
        to: `${adminRoot}/import/vesselinfo`,
        subs: [
          {
            key: 'Vessel Information KFR',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Vessel Information KFR',
            to: `${adminRoot}/import/kfr/vesselinfo`,
          },
          {
            key: 'CSI Productivity KFR',
            icon: 'iconsminds-alarm-clock-2',
            label: 'CSI Productivity KFR',
            to: `${adminRoot}/import/kfr/ca`,
          },
          {
            key: 'DO Count Sheet KFR',
            icon: 'iconsminds-alarm-clock-2',
            label: 'DO Count Sheet KFR',
            to: `${adminRoot}/import/kfr/doform`,
          },
          {
            key: 'Release Count Sheet KFR',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Release Count Sheet KFR',
            to: `${adminRoot}/import/kfr/releaseform`,
          },
          {
            key: 'Vessel Posting KFR',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Vessel Posting KFR',
            to: `${adminRoot}/import/kfr/vesselposting`,
          },
          {
            key: 'Domestic Invoice KFR',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Domestic Invoice KFR',
            to: `${adminRoot}/import/kfr/domesticinvoice`,
          },
          {
            key: 'Invoice Cancellation Import KFR',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Invoice Cancellation Import KFR',
            to: `${adminRoot}/import/kfr/invoicecancelation`,
          },
          {
            key: 'Delivery Order Query KFR',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Delivery Order Query KFR',
            to: `${adminRoot}/import/kfr/doquery`,
          },
          {
            key: 'CSI Error Capturing KFR',
            icon: 'iconsminds-alarm-clock-2',
            label: 'CSI Error Capturing KFR',
            to: `${adminRoot}/import/kfr/csierrorcapturing`,
          },
          {
            key: 'Communication Sheet KFR',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Communication Sheet KFR',
            to: `${adminRoot}/import/kfr/communication`,
          },
        ]
      },
      {
        key: 'Vessel Information Masters',
        icon: 'simple-icon-grid',
        label: 'Vessel Information Masters',
        to: `${adminRoot}/import/vesselmaster`,
        subs: [
          {
            key: 'Check List',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Check List',
            to: `${adminRoot}/import/vesselmaster/checklist`,
          },
        ]
      },
      {
        key: 'CSI Productivity Masters',
        icon: 'simple-icon-grid',
        label: 'CSI Productivity Masters',
        to: `${adminRoot}/import/checklistdaymaster`,
        subs: [
          {
            key: 'Check List Activity',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Check List Activity',
            to: `${adminRoot}/import/checklistdaymaster/checklistday`,
          },
        ]
      },
      {
        key: 'DO Count Sheet Masters',
        icon: 'simple-icon-grid',
        label: 'DO Count Sheet Masters',
        to: `${adminRoot}/import/docountmaster`,
        subs: [
          {
            key: 'Type',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Type',
            to: `${adminRoot}/import/docountmaster/type`,
          },
        ]
      },
      {
        key: 'Release Count Sheet Masters',
        icon: 'simple-icon-grid',
        label: 'Release Count Sheet Masters',
        to: `${adminRoot}/import/realsemaster`,
        subs: [
          {
            key: 'Charges',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Charges',
            to: `${adminRoot}/import/realsemaster/charges`,
          },
          {
            key: 'Type',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Type',
            to: `${adminRoot}/import/realsemaster/releasetype`,
          },
        ]
      },
      {
        key: 'Vessel Posting Masters',
        icon: 'simple-icon-grid',
        label: 'Vessel Posting Masters',
        to: `${adminRoot}/import/mastervessel`,
        subs: [
          {
            key: 'Activity',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Activity',
            to: `${adminRoot}/import/mastervessel/activity`,
          },
        ]
      },
      {
        key: 'Domestic Invoice Masters',
        icon: 'simple-icon-grid',
        label: 'Domestic Invoice Masters',
        to: `${adminRoot}/import/domesticmaster`,
        subs: [
          {
            key: 'Type',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Type',
            to: `${adminRoot}/import/domesticmaster/domestictype`,
          },
        ]
      },
      {
        key: 'Invoice Cancellation Masters',
        icon: 'simple-icon-grid',
        label: 'Invoice Cancellation Masters',
        to: `${adminRoot}/import/invoicemaster`,
        subs: [
          {
            key: 'Reason Code',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Reason Code',
            to: `${adminRoot}/import/invoicemaster/reasoncode`,
          },
          {
            key: 'Accepted / Refuted',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Accepted / Refuted',
            to: `${adminRoot}/import/invoicemaster/acceptedrefuted`,
          },
        ]
      },
      {
        key: 'Delivery Order Query Master',
        icon: 'simple-icon-grid',
        label: 'Delivery Order Query Master',
        to: `${adminRoot}/import/deliverymaster`,
        subs: [
          {
            key: 'Unit',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Unit',
            to: `${adminRoot}/import/deliverymaster/deliveryorder_team`,
          },
        ]
      },
      {
        key: 'CSI Error Capturing Masters',
        icon: 'simple-icon-grid',
        label: 'CSI Error Capturing Masters',
        to: `${adminRoot}/import/csierrormaster`,
        subs: [
          {
            key: 'Error Code',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Error Code',
            to: `${adminRoot}/import/csierrormaster/errorcode`,
          },
          {
            key: 'Sub Activity',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Sub Activity',
            to: `${adminRoot}/import/csierrormaster/subactivity`,
          },
          {
            key: 'Activity',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Activity',
            to: `${adminRoot}/import/csierrormaster/csi-error-activity`,
          },
        ]
      },
      {
        key: 'Communication Masters',
        icon: 'simple-icon-grid',
        label: 'Communication Masters',
        to: `${adminRoot}/import/communicationmaster`,
        subs: [
          {
            key: 'Customs Type',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Customs Type',
            to: `${adminRoot}/import/communicationmaster/customstype`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/import/communicationmaster/eq-communication`,
          },
        ]
      },
      {
        key: 'Masters',
        icon: 'simple-icon-grid',
        label: 'Masters',
        to: `${adminRoot}/import/master`,
        subs: [
          {
            key: 'Reports',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Reports',
            to: `${adminRoot}/import/master/report`,
          },
          {
            key: 'Team',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Team',
            to: `${adminRoot}/import/master/areaimport`,
          },
          {
            key: 'Region',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Region',
            to: `${adminRoot}/import/master/regionimport`,
          },
          {
            key: 'CRM Activity',
            icon: 'iconsminds-alarm-clock-2',
            label: 'CRM Activity',
            to: `${adminRoot}/import/master/crmactivity`,
          },

        ],
      },
      // {
      //   key: 'Vessel Activity Sheet',
      //   icon: 'iconsminds-sailing-ship',
      //   label: 'Vessel Activity Sheet',
      //   to: `${adminRoot}/import/vesselactivity`,
      // },
      {
        key: 'CSI Error Capturing',
        icon: 'iconsminds-orientation-1',
        label: 'CSI Error Capturing',
        to: `${adminRoot}/import/csierrorcapturing`,
      },
      {
        key: 'Invoice Cancellation Import',
        icon: 'iconsminds-delete-file',
        label: 'Invoice Cancellation Import',
        to: `${adminRoot}/import/invoicecancelation`,
      },
    ]
  },
  {
    key: 'RA',
    icon: 'iconsminds-file-copy',
    label: 'RA',
    to: `${adminRoot}/ra`,
    subs: [
      {
        key: 'AMD / Contracts',
        icon: 'iconsminds-file-clipboard-file---text',
        label: 'AMD / Contracts',
        to: `${adminRoot}/ra/amd-contracts`,
      },
      {
        key: 'Correction Log',
        icon: 'iconsminds-notepad',
        label: 'Correction Log',
        to: `${adminRoot}/ra/correction-log`,
      },
      {
        key: 'Cross Borders',
        icon: 'iconsminds-open-book',
        label: 'Cross Borders',
        to: `${adminRoot}/ra/cross-borders`,
      },
      {
        key: 'Control Screen',
        icon: 'iconsminds-control-2',
        label: 'Control Screen',
        to: `${adminRoot}/ra/controlescreen`,
      },
      {
        key: 'Reports',
        icon: 'simple-icon-notebook',
        label: 'Reports',
        to: `${adminRoot}/ra/report`,
      },

      {
        key: 'Dispute',
        icon: 'iconsminds-file-horizontal',
        label: 'Dispute',
        to: `${adminRoot}/ra/Dispute`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/ra/productivity-report`,
      },
      {
        key: 'KPI Report',
        icon: 'iconsminds-laptop---tablet',
        label: 'KPI Report',
        to: `${adminRoot}/ra/kpi-report`,
      },
      {
        key: 'Masters',
        icon: 'simple-icon-grid',
        label: 'Masters',
        to: `${adminRoot}/ra/master`,
        subs: [
          {
            key: 'Region',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Region',
            to: `${adminRoot}/ra/master/region`,
          },
          {
            key: 'Area',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Area',
            to: `${adminRoot}/ra/master/area`,
          },
          {
            key: 'Priority',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Priority',
            to: `${adminRoot}/ra/master/priority`,
          },
          {
            key: 'Size',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Size',
            to: `${adminRoot}/ra/master/size`,
          },
          {
            key: 'Error Type',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Error Type',
            to: `${adminRoot}/ra/master/errortype`,
          },
          {
            key: 'Status',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Status',
            to: `${adminRoot}/ra/master/status`,
          },
          {
            key: 'Internal / External',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Internal / External',
            to: `${adminRoot}/ra/master/internalexternal`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/ra/master/eqmaster`,
          },
          // {
          //   key: 'AMD Number',
          //   icon: 'iconsminds-alarm-clock-2',
          //   label: 'AMD Number',
          //   to: `${adminRoot}/ra/amdno`,
          // },
          // {
          //   key: 'Type of Amendments',
          //   icon: 'iconsminds-alarm-clock-2',
          //   label: 'Type of Amendments',
          //   to: `${adminRoot}/ra/amendments`,
          // },
        ]
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-receipt-4',
        label: 'Raw Data',
        to: `${adminRoot}/ra/reports`,
        subs: [
          {
            key: 'AMD / Contracts Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'AMD / Contracts Raw Data',
            to: `${adminRoot}/ra/reports/amd-contracts`,
          },
          {
            key: 'Control Screen Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Control Screen Raw Data',
            to: `${adminRoot}/ra/reports/controlescreen`,
          },
          {
            key: 'Correction Log Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Correction Log Raw Data',
            to: `${adminRoot}/ra/reports/correction-log`,
          },
          {
            key: 'Cross Borders Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Cross Borders Raw Data',
            to: `${adminRoot}/ra/reports/cross-borders`,
          },
          {
            key: 'Dispute Raw Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Dispute Raw Raw Data',
            to: `${adminRoot}/ra/reports/Dispute`,
          },
        ]
      },
      {
        key: 'KFR',
        icon: 'iconsminds-receipt-4',
        label: 'KFR',
        to: `${adminRoot}/ra/master`,
        subs: [
          {
            key: 'AMD / Contracts KFR',
            icon: 'iconsminds-receipt-4',
            label: 'AMD / Contracts KFR',
            to: `${adminRoot}/ra/kfr/amd-contracts`,
          },
          {
            key: 'Control Screen KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Control Screen KFR',
            to: `${adminRoot}/ra/kfr/controlescreen`,
          },
          {
            key: 'Correction Log KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Correction Log KFR',
            to: `${adminRoot}/ra/kfr/correction-log`,
          },
          {
            key: 'Cross Borders KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Cross Borders KFR',
            to: `${adminRoot}/ra/kfr/cross-borders`,
          },
          {
            key: 'Dispute KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Dispute KFR',
            to: `${adminRoot}/ra/kfr/Dispute`,
          },
        ]
      },
      {
        key: 'KFR Report',
        icon: 'iconsminds-receipt-4',
        label: 'KFR Report',
        to: `${adminRoot}/ra/master`,
        subs: [
          {
            key: 'AMD / Contracts KFRR Report',
            icon: 'iconsminds-receipt-4',
            label: 'AMD / Contracts KFRR Report',
            to: `${adminRoot}/ra/kfr-report/amd-contracts`,
          },
          {
            key: 'Control Screen KFRR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Control Screen KFRR Report',
            to: `${adminRoot}/ra/kfr-report/controlescreen`,
          },
          {
            key: 'Correction Log KFRR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Correction Log KFRR Report',
            to: `${adminRoot}/ra/kfr-report/correction-log`,
          },
          {
            key: 'Cross Borders KFRR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Cross Borders KFRR Report',
            to: `${adminRoot}/ra/kfr-report/cross-borders`,
          },
          {
            key: 'Dispute KFRR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Dispute KFRR Report',
            to: `${adminRoot}/ra/kfr-report/Dispute`,
          },
        ]
      },

    ]
  },
  {
    key: 'SQ',
    icon: 'iconsminds-file',
    label: 'SQ',
    to: `${adminRoot}/sq`,
    subs: [
      {
        key: 'KPI Report',
        icon: 'iconsminds-laptop---tablet',
        label: 'KPI Report',
        to: `${adminRoot}/sq/kpireport`,
      },
      {
        key: 'Quotation Details',
        icon: 'iconsminds-file-clipboard-file---text',
        label: 'Quotation Details',
        to: `${adminRoot}/sq/quotation-details`,
      },
      // {
      //   key: 'General Information',
      //   icon: 'iconsminds-book',
      //   label: 'General Information',
      //   to: `${adminRoot}/sq/general-information`,
      // },
      {
        key: 'Correction Log',
        icon: 'iconsminds-notepad',
        label: 'Correction Log',
        to: `${adminRoot}/sq/correction-log`,
      },
      // {
      //   key: 'Administrator',
      //   icon: 'iconsminds-open-book',
      //   label: 'Administrator',
      //   to: `${adminRoot}/sq/administrator`,
      // },
      {
        key: 'Reports',
        icon: 'simple-icon-notebook',
        label: 'Reports',
        to: `${adminRoot}/sq/report`,
      },
      {
        key: 'Control Screen',
        icon: 'simple-icon-notebook',
        label: 'Control Screen',
        to: `${adminRoot}/sq/controlpage`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/sq/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/sq/dashboard`,
      },
      {
        key: 'SQ Raw Data',
        icon: 'iconsminds-file',
        label: 'SQ Raw Data',
        to: `${adminRoot}/sq/rawdata`,
        subs: [
          {
            key: 'Quotation Details',
            icon: 'iconsminds-file-clipboard-file---text',
            label: 'Quotation Details',
            to: `${adminRoot}/sq/rawdata/quodationdetailsrawdata`,
          },
          {
            key: 'Correction Log',
            icon: 'iconsminds-notepad',
            label: 'Correction Log',
            to: `${adminRoot}/sq/rawdata/correction-lograwdata`,
          },
          {
            key: 'Control Screen',
            icon: 'iconsminds-notepad',
            label: 'Control Screen',
            to: `${adminRoot}/sq/rawdata/controlrawdata`,
          },
        ],
      },
      {
        key: 'SQ Masters',
        icon: 'iconsminds-file',
        label: 'SQ Masters',
        to: `${adminRoot}/sq/master`,
        subs: [
          {
            key: 'Area',
            icon: 'simple-icon-notebook',
            label: 'Area',
            to: `${adminRoot}/sq/master/area`,
          },
          {
            key: 'Priority',
            icon: 'simple-icon-notebook',
            label: 'Priority',
            to: `${adminRoot}/sq/master/priority`,
          },
          {
            key: 'Type of Request',
            icon: 'simple-icon-notebook',
            label: 'Type of Request',
            to: `${adminRoot}/sq/master/Typeofrequest`,
          },
          // {
          //   key: 'Publisher',
          //   icon: 'simple-icon-notebook',
          //   label: 'Publisher',
          //   to: `${adminRoot}/sq/publisher`,
          // },
          {
            key: 'Status',
            icon: 'simple-icon-notebook',
            label: 'Status',
            to: `${adminRoot}/sq/master/status`,
          },
          {
            key: 'Region',
            icon: 'simple-icon-notebook',
            label: 'Region',
            to: `${adminRoot}/sq/master/region`,
          },
          {
            key: 'Size',
            icon: 'simple-icon-notebook',
            label: 'Size',
            to: `${adminRoot}/sq/master/size`,
          },
          // {
          //   key: 'Auditor',
          //   icon: 'simple-icon-notebook',
          //   label: 'Auditor',
          //   to: `${adminRoot}/sq/auditor`,
          // },
          // {
          //   key: 'Audited by',
          //   icon: 'simple-icon-notebook',
          //   label: 'Audited by',
          //   to: `${adminRoot}/sq/auditedby`,
          // },
          {
            key: 'Internal/external',
            icon: 'simple-icon-notebook',
            label: 'Internal/external',
            to: `${adminRoot}/sq/master/internal`,
          },
          // {
          //   key: 'Quotation Done by',
          //   icon: 'simple-icon-notebook',
          //   label: 'Quotation Done by',
          //   to: `${adminRoot}/sq/quotationdoneby`,
          // },
          {
            key: 'Error Type',
            icon: 'simple-icon-notebook',
            label: 'Error Type',
            to: `${adminRoot}/sq/master/errortype`,
          },
          // {
          //   key: 'Report Type',
          //   icon: 'simple-icon-notebook',
          //   label: 'Report Type',
          //   to: `${adminRoot}/sq/reporttype`,
          // },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/sq/master/eqmaster`,
          },
        ]
      }

    ]
  },
  {
    key: 'Rail Notification',
    icon: 'simple-icon-bell',
    label: 'Rail Notification',
    to: `${adminRoot}/railnotification`,
    subs: [
      {
        key: 'Container Release Data',
        icon: 'iconsminds-data-storage',
        label: 'Container Release Data',
        to: `${adminRoot}/railnotification/containerdata`,
      },
      {
        key: 'Announcement Data',
        icon: 'iconsminds-conference',
        label: 'Announcement Data',
        to: `${adminRoot}/railnotification/announcement`,
      },
      {
        key: 'Free Time Notification Data',
        icon: 'iconsminds-mail-unread',
        label: 'Free Time Notification Data',
        to: `${adminRoot}/railnotification/freenotification`,
      },
      {
        key: 'Communication Data',
        icon: 'iconsminds-mail-password',
        label: 'Communication Data',
        to: `${adminRoot}/railnotification/communicationdata`,
      },
      {
        key: 'Others',
        icon: 'iconsminds-pulse',
        label: 'Others',
        to: `${adminRoot}/railnotification/others`,
      },
      {
        key: 'Report',
        icon: 'iconsminds-notepad',
        label: 'Report',
        to: `${adminRoot}/railnotification/report`,
      },
      {
        key: 'Accuracy',
        icon: 'iconsminds-testimonal',
        label: 'Accuracy',
        to: `${adminRoot}/railnotification/accuracy`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/railnotification/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/railnotification/dashboard`,
      },
      {
        key: 'Rail Notification Masters',
        icon: 'simple-icon-bell',
        label: 'Rail Notification Masters',
        to: `${adminRoot}/railnotification/master`,
        subs: [
          {
            key: 'Activity',
            icon: 'iconsminds-data-storage',
            label: 'Activity',
            to: `${adminRoot}/railnotification/master/activity`,
          },
          {
            key: 'Type',
            icon: 'iconsminds-data-storage',
            label: 'Type',
            to: `${adminRoot}/railnotification/master/type`,
          },
          // {
          //   key: 'Reports',
          //   icon: 'iconsminds-data-storage',
          //   label: 'Reports',
          //   to: `${adminRoot}/railnotification/master/reports`,
          // },
          {
            key: 'Error Type',
            icon: 'iconsminds-data-storage',
            label: 'Error Type',
            to: `${adminRoot}/railnotification/master/errortype`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/railnotification/master/eqmaster`,
          },
        ],
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/railnotification/reportrawdata`,
        subs: [
          {
            key: 'Container Release Raw Data',
            icon: 'iconsminds-data-storage',
            label: 'Container Release Raw Data',
            to: `${adminRoot}/railnotification/reportrawdata/containerdata`,
          },
          {
            key: 'Announcement Raw Data',
            icon: 'iconsminds-conference',
            label: 'Announcement Raw Data',
            to: `${adminRoot}/railnotification/reportrawdata/announcement`,
          },
          {
            key: 'Free Time Notification Raw Data',
            icon: 'iconsminds-mail-unread',
            label: 'Free Time Notification Raw Data',
            to: `${adminRoot}/railnotification/reportrawdata/freenotification`,
          },
          {
            key: 'Communication Raw Data',
            icon: 'iconsminds-mail-password',
            label: 'Communication Raw Data',
            to: `${adminRoot}/railnotification/reportrawdata/communicationdata`,
          },
          {
            key: 'Others Raw Data',
            icon: 'iconsminds-pulse',
            label: 'Others Raw Data',
            to: `${adminRoot}/railnotification/reportrawdata/others`,
          },
          // {
          //   key: 'Report  Raw Data',
          //   icon: 'iconsminds-notepad',
          //   label: 'Report  Raw Data',
          //   to: `${adminRoot}/railnotification/reportrawdata/report`,
          // },
          {
            key: 'Accuracy  Raw Data',
            icon: 'iconsminds-testimonal',
            label: 'Accuracy  Raw Data',
            to: `${adminRoot}/railnotification/reportrawdata/accuracy`,
          },

        ]
      },

    ]
  },
  {
    key: 'DG',
    icon: 'iconsminds-testimonal',
    label: 'DG',
    to: `${adminRoot}/dg`,
    subs: [
      {
        key: 'KPI Report',
        icon: 'iconsminds-laptop---tablet',
        label: 'KPI Report',
        to: `${adminRoot}/dg/kpireport`,
      },
      {
        key: 'DG',
        icon: 'iconsminds-data-cloud',
        label: 'DG',
        to: `${adminRoot}/dg/dginputsheet`,
      },
      {
        key: 'DG-PTO',
        icon: 'iconsminds-data-storage',
        label: 'DG-PTO',
        to: `${adminRoot}/dg/dgpto`,
      },
      {
        key: 'Errors',
        icon: 'iconsminds-loading-3',
        label: 'Errors',
        to: `${adminRoot}/dg/error`,
      },
      {
        key: 'Track & Trace',
        icon: 'iconsminds-map-marker-2',
        label: 'Track & Trace',
        to: `${adminRoot}/dg/track`,
      },
      // {
      //   key: 'Report',
      //   icon: 'iconsminds-project',
      //   label: 'Report',
      //   to: `${adminRoot}/blank-page`,
      // },
      {
        key: 'Admin',
        icon: 'iconsminds-user',
        label: 'Admin',
        to: `${adminRoot}/blank-page`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/dg/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/dg/dashboard`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-receipt-4',
        label: 'Raw Data',
        to: `${adminRoot}/dg/rawdata`,
        subs: [
          {
            key: 'DG Raw Data',
            icon: 'iconsminds-data-cloud',
            label: 'DG Raw Data',
            to: `${adminRoot}/dg/rawdata/dginputsheetrawdata`,
          },
          {
            key: 'DG-PTO Raw Data',
            icon: 'iconsminds-data-storage',
            label: 'DG-PTO Raw Data',
            to: `${adminRoot}/dg/rawdata/dgptorawdata`,
          },
          {
            key: 'Errors Raw Data',
            icon: 'iconsminds-loading-3',
            label: 'Errors Raw Data',
            to: `${adminRoot}/dg/rawdata/errorrawdata`,
          },
          {
            key: 'Track & Trace Raw Data',
            icon: 'iconsminds-map-marker-2',
            label: 'Track & Trace Raw Data',
            to: `${adminRoot}/dg/rawdata/trackrawdata`,
          },
        ]
      },


      {
        key: 'Masters',
        icon: 'simple-icon-grid',
        label: 'Masters',
        to: `${adminRoot}/dg/master`,
        subs: [
          {
            key: 'Input Status',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Input Status',
            to: `${adminRoot}/dg/master/inputstatus`,
          },
          {
            key: 'Dec Type',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Dec Type',
            to: `${adminRoot}/dg/master/dectype`,
          },
          {
            key: 'Container Type',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Container Type',
            to: `${adminRoot}/dg/master/containertype`,
          },
          {
            key: 'Track & Trace Activity',
            icon: 'iconsminds-network',
            label: 'Track & Trace Activity',
            to: `${adminRoot}/dg/master/dgactivity`,
          },
          {
            key: 'DG Area',
            icon: 'iconsminds-network',
            label: 'DG Area',
            to: `${adminRoot}/dg/master/dgarea`,
          },
          {
            key: 'Error Region',
            icon: 'iconsminds-network',
            label: 'Error Region',
            to: `${adminRoot}/dg/master/dgerrorregion`,
          },
          {
            key: 'DG Track & Trace Region',
            icon: 'iconsminds-network',
            label: 'DG Track & Trace Region',
            to: `${adminRoot}/dg/master/dgtrackregion`,
          },
          {
            key: 'DG-PTO Activity',
            icon: 'iconsminds-network',
            label: 'DG-PTO Activity',
            to: `${adminRoot}/dg/master/dgptoactivity`,
          },
          {
            key: 'DG-PTO Region',
            icon: 'iconsminds-network',
            label: 'DG-PTO Region',
            to: `${adminRoot}/dg/master/dgregion`,
          },
          {
            key: 'DG Module EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'DG Module EQ Master',
            to: `${adminRoot}/dg/master/eqmaster`,
          },
          {
            key: 'DG PTO & Track Trace EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'DG PTO & Track Trace EQ Master',
            to: `${adminRoot}/dg/master/dtptotteqmaster`,
          },
          {
            key: 'TimeZone',
            icon: 'iconsminds-alarm-clock-2',
            label: 'TimeZone',
            to: `${adminRoot}/dg/master/timezone`,
          },


        ],
      },
    ]

  },

  {
    key: 'Booking Process',
    icon: 'iconsminds-cash-register-2',
    label: 'Booking Process',
    to: `${adminRoot}/bookingprocess`,
    subs: [
      {
        key: 'Booking Process',
        icon: 'iconsminds-cash-register-2',
        label: 'Booking Creation Original',
        to: `${adminRoot}/bookingprocess/bookingprocess`,
      },
      {
        key: 'Cloud Booking',
        icon: 'iconsminds-data-cloud',
        label: 'Cloud Booking',
        to: `${adminRoot}/bookingprocess/cloudbooking`,
      },
      {
        key: 'CRM Process',
        icon: 'iconsminds-cash-register-2',
        label: 'CRM Process',
        to: `${adminRoot}/bookingprocess/crmprocess`,
      },
      {
        key: 'Email Handling',
        icon: 'iconsminds-envelope',
        label: 'Email Handling',
        to: `${adminRoot}/bookingprocess/email-handling`,
      },
      {
        key: 'DOC Exception',
        icon: 'iconsminds-file-horizontal',
        label: 'DOC Exception',
        to: `${adminRoot}/bookingprocess/doc-exception`,
      },
      // {
      //   key: 'Internal Errors',
      //   icon: 'iconsminds-loading-3',
      //   label: 'Internal Errors',
      //   to: `${adminRoot}/bookingprocess/internal-error`,
      // },
      {
        key: 'Error Capturing',
        icon: 'iconsminds-file-horizontal',
        label: 'Error Capturing',
        to: `${adminRoot}/bookingprocess/error-capturing`,
      },
      {
        key: 'AF Exceptions',
        icon: 'iconsminds-file-horizontal',
        label: 'AF Exceptions',
        to: `${adminRoot}/bookingprocess/af-exceptions`,
      },
      {
        key: 'Booking Amendment',
        icon: 'iconsminds-file-horizontal',
        label: 'Booking Amendment',
        to: `${adminRoot}/bookingprocess/booking-amendment`,
      },
      {
        key: 'Pending Follow-up Sheet',
        icon: 'iconsminds-file-horizontal',
        label: 'Pending Follow-up Sheet',
        to: `${adminRoot}/bookingprocess/pending-follow-up`,
      },
      // {
      //   key: 'Accuracy Calculation',
      //   icon: 'iconsminds-loading-3',
      //   label: 'Accuracy Calculation',
      //   to: `${adminRoot}/bookingprocess/accuracy-calculation`,
      // },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/bookingprocess/productivity-report`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/bookingprocess/rawdata`,
        subs: [
          {
            key: 'Booking Process',
            icon: 'iconsminds-cash-register-2',
            label: 'Booking Creation Original',
            to: `${adminRoot}/bookingprocess/rawdata/bookingprocess`,
          },
          {
            key: 'Cloud Booking',
            icon: 'iconsminds-cash-register-2',
            label: 'Cloud Booking',
            to: `${adminRoot}/bookingprocess/rawdata/cloudbooking`,
          },
          {
            key: 'CRM Process',
            icon: 'iconsminds-cash-register-2',
            label: 'CRM Process',
            to: `${adminRoot}/bookingprocess/rawdata/crmprocess`,
          },
          {
            key: 'Email Handling',
            icon: 'iconsminds-envelope',
            label: 'Email Handling',
            to: `${adminRoot}/bookingprocess/rawdata/email-handling`,
          },
          {
            key: 'DOC Exception',
            icon: 'iconsminds-file-horizontal',
            label: 'DOC Exception',
            to: `${adminRoot}/bookingprocess/rawdata/doc-exception`,
          },
          // {
          //   key: 'Internal Errors',
          //   icon: 'iconsminds-loading-3',
          //   label: 'Internal Errors',
          //   to: `${adminRoot}/bookingprocess/internal-error`,
          // },
          {
            key: 'Error Capturing',
            icon: 'iconsminds-file-horizontal',
            label: 'Error Capturing',
            to: `${adminRoot}/bookingprocess/rawdata/error-capturing`,
          },
          {
            key: 'AF Exceptions',
            icon: 'iconsminds-file-horizontal',
            label: 'AF Exceptions',
            to: `${adminRoot}/bookingprocess/rawdata/af-exceptions`,
          },
          {
            key: 'Booking Amendment',
            icon: 'iconsminds-file-horizontal',
            label: 'Booking Amendment',
            to: `${adminRoot}/bookingprocess/rawdata/booking-amendment`,
          },
          {
            key: 'Pending Follow-up Sheet',
            icon: 'iconsminds-file-horizontal',
            label: 'Pending Follow-up Sheet',
            to: `${adminRoot}/bookingprocess/rawdata/pending-follow-up`,
          },
          {
            key: 'Booking Data',
            icon: 'iconsminds-cash-register-2',
            label: 'Booking Data',
            to: `${adminRoot}/bookingprocess/rawdata/bookingdata`,
          },
        ]
      },
      {
        key: 'Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Masters',
        to: `${adminRoot}/bookingprocess`,
        subs: [
          // {
          //   key: 'Team',
          //   icon: 'iconsminds-receipt-4',
          //   label: 'Team',
          //   to: `${adminRoot}/bookingprocess/team`,
          // },
          // {
          //   key: 'Action Type',
          //   icon: 'iconsminds-receipt-4',
          //   label: 'Action Type',
          //   to: `${adminRoot}/bookingprocess/action`,
          // },
          {
            key: 'Booking Type',
            icon: 'iconsminds-receipt-4',
            label: 'Booking Type',
            to: `${adminRoot}/bookingprocess/bookingtype`,
          },
          {
            key: 'Handling Type',
            icon: 'iconsminds-receipt-4',
            label: 'Handling Type',
            to: `${adminRoot}/bookingprocess/handling`,
          },
          {
            key: 'Reasons',
            icon: 'iconsminds-receipt-4',
            label: 'Reasons',
            to: `${adminRoot}/bookingprocess/reasons`,
          },
          {
            key: 'Cargo Type',
            icon: 'iconsminds-receipt-4',
            label: 'Cargo Type',
            to: `${adminRoot}/bookingprocess/cargotype`,
          },
          {
            key: 'Final Status',
            icon: 'iconsminds-receipt-4',
            label: 'Final Status',
            to: `${adminRoot}/bookingprocess/finalstatus`,
          },
          // {
          //   key: 'ABC Type',
          //   icon: 'iconsminds-receipt-4',
          //   label: 'ABC Type',
          //   to: `${adminRoot}/bookingprocess/abc`,
          // },

          // {
          //   key: 'Error Type',
          //   icon: 'iconsminds-receipt-4',
          //   label: 'Error Type',
          //   to: `${adminRoot}/bookingprocess/errortype`,
          // },
          {
            key: 'Status of Exception',
            icon: 'iconsminds-receipt-4',
            label: 'Status of Exception',
            to: `${adminRoot}/bookingprocess/statusexception`,
          },
          {
            key: 'Issue Code',
            icon: 'iconsminds-receipt-4',
            label: 'Issue Code',
            to: `${adminRoot}/bookingprocess/issuecode`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-receipt-4',
            label: 'EQ Master',
            to: `${adminRoot}/bookingprocess/eqmaster`,
          },
          {
            key: 'Teamsite',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Teamsite',
            to: `${adminRoot}/bookingprocess/teamsite`,
          },
        ]
      },
      {
        key: 'Booking Creation Original Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Booking Creation Original Masters',
        to: `${adminRoot}/bookingprocess/bookingstatus`,
        subs: [
          {
            key: 'Booking Status',
            icon: 'iconsminds-receipt-4',
            label: 'Booking Status',
            to: `${adminRoot}/bookingprocess/bookingoriginal/bookingstatus`,
          },
          {
            key: 'Exception Party',
            icon: 'iconsminds-receipt-4',
            label: 'Exception Party',
            to: `${adminRoot}/bookingprocess/bookingoriginal/exceptionparty`,
          },
        ]
      },
      {
        key: 'Auditing',
        icon: 'iconsminds-receipt-4',
        label: 'Auditing',
        to: `${adminRoot}/bookingprocess/auditing`,
        subs: [
          {
            key: 'Auditing1',
            icon: 'iconsminds-receipt-4',
            label: 'Auditing1',
            to: `${adminRoot}/bookingprocess/auditing/auditing1`,
          },
          {
            key: 'Auditing2',
            icon: 'iconsminds-receipt-4',
            label: 'Auditing2',
            to: `${adminRoot}/bookingprocess/auditing/auditing2`,
          },
        ]
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-receipt-4',
        label: 'Dashboard',
        to: `${adminRoot}/bookingprocess/dashboard`,
        subs: [
          {
            key: 'Booking Creation',
            icon: 'iconsminds-receipt-4',
            label: 'Booking Creation',
            to: `${adminRoot}/bookingprocess/dashboard/bookingcreation`,
          }
        ]
      },
      {
        key: 'CRM Process Masters',
        icon: 'iconsminds-receipt-4',
        label: 'CRM Process Masters',
        to: `${adminRoot}/bookingprocess/crm_process`,
        subs: [
          {
            key: 'Action Type',
            icon: 'iconsminds-receipt-4',
            label: 'Action Type',
            to: `${adminRoot}/bookingprocess/crm_process/action`,
          },
          {
            key: 'Status of Case',
            icon: 'iconsminds-receipt-4',
            label: 'Status of Case',
            to: `${adminRoot}/bookingprocess/crm_process/statusofcase`,
          },
        ]
      },
      {
        key: 'Email handling Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Email handling Masters',
        to: `${adminRoot}/bookingprocess/emailhandling`,
        subs: [
          {
            key: 'Request Type',
            icon: 'iconsminds-receipt-4',
            label: 'Request Type',
            to: `${adminRoot}/bookingprocess/emailhandling/requesttype`,
          },

        ]
      },
      {
        key: 'Doc Exception Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Doc Exception Masters',
        to: `${adminRoot}/bookingprocess/doc_exception`,
        subs: [
          {
            key: 'Exception Type',
            icon: 'iconsminds-receipt-4',
            label: 'Exception Type',
            to: `${adminRoot}/bookingprocess/doc_exception/exceptiontype`,
          },

        ]
      },
      {
        key: 'Error Capturing Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Error Capturing Masters',
        to: `${adminRoot}/bookingprocess/error_capturing`,
        subs: [
          {
            key: 'Error Type',
            icon: 'iconsminds-receipt-4',
            label: 'Error Type',
            to: `${adminRoot}/bookingprocess/error_capturing/errortype`,
          },
          {
            key: 'Error Status',
            icon: 'iconsminds-receipt-4',
            label: 'Error Status',
            to: `${adminRoot}/bookingprocess/error_capturing/errorstatus`,
          },
        ]
      },
      {
        key: 'AF Exceptions Masters',
        icon: 'iconsminds-receipt-4',
        label: 'AF Exceptions Masters',
        to: `${adminRoot}/bookingprocess/afexceptions`,
        subs: [
          {
            key: 'Exception Type',
            icon: 'iconsminds-receipt-4',
            label: 'Exception Type',
            to: `${adminRoot}/bookingprocess/afexceptions/afexception`,
          },
          {
            key: 'Status of Exception',
            icon: 'iconsminds-receipt-4',
            label: 'Status of Exception',
            to: `${adminRoot}/bookingprocess/afexceptions/Af_status_exception`,
          },
          {
            key: 'Category',
            icon: 'iconsminds-receipt-4',
            label: 'Category',
            to: `${adminRoot}/bookingprocess/afexceptions/category`,
          },
        ]
      },
      {
        key: 'Booking Amendment Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Booking Amendment Masters',
        to: `${adminRoot}/bookingprocess/booking_amendment`,
        subs: [
          {
            key: 'Amendment Medium',
            icon: 'iconsminds-receipt-4',
            label: 'Amendment Medium',
            to: `${adminRoot}/bookingprocess/booking_amendment/amendmentmedium`,
          },
          {
            key: 'Amendment Type',
            icon: 'iconsminds-receipt-4',
            label: 'Amendment Type',
            to: `${adminRoot}/bookingprocess/booking_amendment/Amendmenttype`,
          },
          {
            key: 'Amendment Induced',
            icon: 'iconsminds-receipt-4',
            label: 'Amendment Induced',
            to: `${adminRoot}/bookingprocess/booking_amendment/Amendmentinduced`,
          },
          {
            key: 'Amendment Status',
            icon: 'iconsminds-receipt-4',
            label: 'Amendment Status',
            to: `${adminRoot}/bookingprocess/booking_amendment/Amendmentstatus`,
          },
          {
            key: 'Assigned to',
            icon: 'iconsminds-receipt-4',
            label: 'Assigned To',
            to: `${adminRoot}/bookingprocess/booking_amendment/Assignedto`,
          },
        ]
      },
      {
        key: 'Pending follow-up sheet Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Pending follow-up sheet Masters',
        to: `${adminRoot}/bookingprocess/pendingfollow`,
        subs: [
          {
            key: 'Exception Type',
            icon: 'iconsminds-receipt-4',
            label: 'Exception Type',
            to: `${adminRoot}/bookingprocess/pendingfollow/pendingexceptiontype`,
          },
          {
            key: 'Action Type',
            icon: 'iconsminds-receipt-4',
            label: 'Action Type',
            to: `${adminRoot}/bookingprocess/pendingfollow/pendingaction`,
          },
        ]
      },
    ]

  },
  {
    key: 'Vessel Balancing',
    icon: 'simple-icon-cloud-upload',
    label: 'Vessel Balancing',
    to: `${adminRoot}/vesselbalancing`,
    subs: [
      {
        key: 'Vessel Balancing',
        icon: 'iconsminds-cloud-hail',
        label: 'Vessel Balancing',
        to: `${adminRoot}/vesselbalancing/vesselbalancing`,
      },
      {
        key: 'Pending Follow-Up',
        icon: 'iconsminds-file-horizontal',
        label: 'Pending Follow-Up',
        to: `${adminRoot}/vesselbalancing/pendingfollowup`,
      },
      {
        key: 'Internal Audit',
        icon: 'iconsminds-file-horizontal',
        label: 'Internal Audit',
        to: `${adminRoot}/vesselbalancing/internalaudit`,
      },
      {
        key: 'Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Masters',
        to: `${adminRoot}/vesselbalancing`,
        subs: [
          {
            key: 'Activity',
            icon: 'iconsminds-receipt-4',
            label: 'Activity',
            to: `${adminRoot}/vesselbalancing/masters/activity`,
          },
          {
            key: 'Status of Case',
            icon: 'iconsminds-receipt-4',
            label: 'Status of Case',
            to: `${adminRoot}/vesselbalancing/masters/statusofcase`,
          },
          {
            key: 'Pending Type',
            icon: 'iconsminds-receipt-4',
            label: 'Pending Type',
            to: `${adminRoot}/vesselbalancing/masters/pendingtype`,
          },
          {
            key: 'Audit Type',
            icon: 'iconsminds-receipt-4',
            label: 'Audit Type',
            to: `${adminRoot}/vesselbalancing/masters/audittype`,
          },
          {
            key: 'Region',
            icon: 'iconsminds-receipt-4',
            label: 'Region',
            to: `${adminRoot}/vesselbalancing/masters/region`,
          },
          {
            key: 'Area',
            icon: 'iconsminds-receipt-4',
            label: 'Area',
            to: `${adminRoot}/vesselbalancing/masters/area`,
          },
          {
            key: 'Sub Area',
            icon: 'iconsminds-receipt-4',
            label: 'Sub Area',
            to: `${adminRoot}/vesselbalancing/masters/subarea`,
          },
        ]
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/vesselbalancing/rawdata`,
        subs: [
          {
            key: 'Vessel Balancing',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Vessel Balancing',
            to: `${adminRoot}/vesselbalancing/rawdata/vesselbalancing`,
          },
        ]
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/vesselbalancing/productivity-report`,
      },
    ],
  },
  {
    key: 'Asia Reporting',
    icon: 'iconsminds-globe-2',
    label: 'Asia Reporting',
    to: `${adminRoot}/asia`,
    subs: [
      {
        key: 'Asia Reporting',
        icon: 'iconsminds-globe-2',
        label: 'Asia Reporting',
        to: `${adminRoot}/asia/asiareporting`,
      },
      {
        key: 'Error Sheet',
        icon: 'iconsminds-file-edit',
        label: 'Error Sheet',
        to: `${adminRoot}/asia/errorsheet`,

      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/asia/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/asia/dashboard`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/asia/rawdata`,
        subs: [
          {
            key: 'Asia Reporting Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Asia Reporting Raw Data',
            to: `${adminRoot}/asia/rawdata/asiareportingrawdata`,
          },
          {
            key: 'Error Sheet Raw Data',
            icon: 'iconsminds-file-edit',
            label: 'Error Sheet Raw Data',
            to: `${adminRoot}/asia/rawdata/errorsheetrawdata`,

          },
        ]
      },
      {
        key: 'Asia Master',
        icon: 'iconsminds-project',
        label: 'Asia Master',
        to: `${adminRoot}/asia/master`,
        subs: [
          {
            key: 'Asia Report',
            icon: 'iconsminds-globe-2',
            label: 'Asia Report',
            to: `${adminRoot}/asia/master/asiareport`,
          },
          {
            key: 'Region',
            icon: 'iconsminds-file-edit',
            label: 'Region',
            to: `${adminRoot}/asia/master/asiaregion`,
          },
          // {
          //   key: 'EQ Master',
          //   icon: 'iconsminds-alarm-clock-2',
          //   label: 'EQ Master',
          //   to: `${adminRoot}/asia/master/eqmaster`,
          // },
        ]
      }
    ]
  },
  {
    key: 'Detention Demurrage',
    icon: 'iconsminds-coins-2',
    label: 'Detention Demurrage',
    to: `${adminRoot}/dnd`,
    subs: [
      {
        key: 'RADM',
        icon: 'iconsminds-dollar-sign-2',
        label: 'RADM',
        to: `${adminRoot}/dnd/radm`,
      },
      {
        key: 'RATP',
        icon: 'iconsminds-bio-hazard',
        label: 'RATP',
        to: `${adminRoot}/dnd/ratp`,
      },
      {
        key: 'Error Sheet',
        icon: 'iconsminds-file-edit',
        label: 'Error Sheet',
        to: `${adminRoot}/dnd/errorsheet`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/dnd/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/dnd/dashboard`,
      },
      {
        key: 'Master',
        icon: 'iconsminds-project',
        label: 'Master',
        to: `${adminRoot}/dnd/master`,
        subs: [
          {
            key: 'Area',
            icon: 'iconsminds-globe-2',
            label: 'Area',
            to: `${adminRoot}/dnd/master/dndarea`,
          },
          {
            key: 'Sub Area',
            icon: 'iconsminds-globe-2',
            label: 'Sub Area',
            to: `${adminRoot}/dnd/master/dndsubarea`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/dnd/master/eqmaster`,
          },
        ],
      },

      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/dnd/reports`,
        subs: [
          {
            key: 'RADM Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'RADM Raw Data',
            to: `${adminRoot}/dnd/reports/radm`,
          },
          {
            key: 'RATP Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'RATP Raw Data',
            to: `${adminRoot}/dnd/reports/ratp`,
          },
          {
            key: 'Error Sheet Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Error Sheet Raw Data',
            to: `${adminRoot}/dnd/reports/errorsheet`,
          },

        ]
      },

    ]
  },


  {
    key: 'EPOS',
    icon: 'iconsminds-data-center',
    label: 'EPOS',
    to: `${adminRoot}/epos`,
    subs: [
      {
        key: 'Error Handling Productivity',
        icon: 'iconsminds-loading-3',
        label: 'Error Handling Productivity',
        to: `${adminRoot}/epos/errorhandling`,
      },
      {
        key: 'Street Turns',
        icon: 'iconsminds-location-2',
        label: 'Street Turns',
        to: `${adminRoot}/epos/streetturns`,
      },
      {
        key: 'Adhoc / Bulk Upload Productivity',
        icon: 'simple-icon-cloud-upload',
        label: 'Adhoc / Bulk Upload',
        to: `${adminRoot}/epos/adhocbulkupload`,
      },
      {
        key: 'TPFREP Productivity',
        icon: 'iconsminds-ship',
        label: 'TPFREP Productivity',
        to: `${adminRoot}/epos/TPFREPproductivity`,
      },
      {
        key: 'Time Pending Monitoring',
        icon: 'iconsminds-clock',
        label: 'Time Pending Monitoring',
        to: `${adminRoot}/epos/timemonitoring`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/epos/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/epos/dashboard`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/epos/report`,
        subs: [
          {
            key: 'Error Handling Productivity Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Error Handling Productivity Raw Data',
            to: `${adminRoot}/epos/report/errorhandling`,
          },
          {
            key: 'Street Turns Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Street Turns Raw Data',
            to: `${adminRoot}/epos/report/streetturns`,
          },
          {
            key: 'TPFREP Productivity Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'TPFREP Productivity Raw Data',
            to: `${adminRoot}/epos/report/TPFREPproductivity`,
          },
          {
            key: 'Adhoc / Bulk Upload Productivity Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Adhoc / Bulk Upload Productivity Raw Data',
            to: `${adminRoot}/epos/report/adhocbulkupload`,
          },

          {
            key: 'Error Capture Module Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Error Capture Module Raw Data',
            to: `${adminRoot}/epos/report/Errorcapturemodule`,
          },
          {
            key: 'Time Pending Monitoring Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Time Pending Monitoring Raw Data',
            to: `${adminRoot}/epos/report/timemonitoring`,
          },
          // {
          //   key: 'Reports Raw Data',
          //   icon: 'iconsminds-alarm-clock-2',
          //   label: 'Reports Turns Raw Data',
          //   to: `${adminRoot}/epos/report/reports`,
          // },

        ]
      },

      {
        key: 'Error Handling Productivity Masters',
        icon: 'simple-icon-grid',
        label: 'Error Handling Productivity Masters',
        to: `${adminRoot}/epos/errorhandlingmaster`,
        subs: [
          {
            key: 'Activity',
            icon: 'iconsminds-conference',
            label: 'Activity',
            to: `${adminRoot}/epos/errorhandlingmaster/eposactivity`,
          },
          {
            key: 'Reported By',
            icon: 'iconsminds-conference',
            label: 'Reported By',
            to: `${adminRoot}/epos/errorhandlingmaster/reportby`,
          },
        ]
      },
      {
        key: 'Error Capture Module Masters',
        icon: 'simple-icon-grid',
        label: 'Error Capture Module Masters',
        to: `${adminRoot}/epos/errorcaputruemaster`,
        subs: [
          {
            key: 'Area',
            icon: 'iconsminds-conference',
            label: 'Area',
            to: `${adminRoot}/epos/errorcaputruemaster/areaerror`,
          },
          {
            key: 'Region',
            icon: 'iconsminds-conference',
            label: 'Region',
            to: `${adminRoot}/epos/errorcaputruemaster/regionerror`,
          },
          {
            key: 'Epos Activity',
            icon: 'iconsminds-conference',
            label: 'Epos Activity',
            to: `${adminRoot}/epos/errorcaputruemaster/activitytypeerror`,
          },
          {
            key: 'Source',
            icon: 'iconsminds-conference',
            label: 'Source',
            to: `${adminRoot}/epos/errorcaputruemaster/sourceerror`,
          },
          {
            key: 'Type of Report',
            icon: 'iconsminds-conference',
            label: 'Type of Report',
            to: `${adminRoot}/epos/errorcaputruemaster/typeofreport`,
          },
          {
            key: 'Terminal Activity',
            icon: 'iconsminds-conference',
            label: 'Terminal Activity',
            to: `${adminRoot}/epos/errorcaputruemaster/activitys`,
          },

          // {
          //   key: 'Vessel Operator',
          //   icon: 'iconsminds-conference',
          //   label: 'Vessel Operator',
          //   to: `${adminRoot}/masters/errorvesseloperator`,
          // },
        ]
      },


      {
        key: 'Street Turns Masters',
        icon: 'simple-icon-grid',
        label: 'Street Turns Masters',
        to: `${adminRoot}/epos/streetturnsmaster`,
        subs: [
          {
            key: 'StturnCode',
            icon: 'iconsminds-conference',
            label: 'StturnCode',
            to: `${adminRoot}/epos/streetturnsmaster/stturncode`,
          },
        ]
      },

      {
        key: 'TPFREP Productivity Masters',
        icon: 'simple-icon-grid',
        label: 'TPFREP Productivity Masters',
        to: `${adminRoot}/epos/tpfrepproductivitymaster`,
        subs: [
          {
            key: 'Activity',
            icon: 'iconsminds-conference',
            label: 'Activity',
            to: `${adminRoot}/epos/tpfrepproductivitymaster/activitytpfrep`,
          },
          {
            key: 'Region',
            icon: 'iconsminds-conference',
            label: 'Region',
            to: `${adminRoot}/epos/tpfrepproductivitymaster/areatpfrep`,
          },
          {
            key: 'Hlcl Format',
            icon: 'iconsminds-conference',
            label: 'Hlcl Format',
            to: `${adminRoot}/epos/tpfrepproductivitymaster/hlclformat`,
          },

          // {
          //   key: 'Vessel Operator',
          //   icon: 'iconsminds-conference',
          //   label: 'Vessel Operator',
          //   to: `${adminRoot}/masters/vesseloperator`,
          // },
        ],
      },
      {
        key: 'Adhoc / Bulk Upload Productivity Masters',
        icon: 'simple-icon-grid',
        label: 'Adhoc / Bulk Upload Productivity Masters',
        to: `${adminRoot}/epos/adhocbulkproductivitymasters`,
        subs: [
          {
            key: 'Activity Type',
            icon: 'iconsminds-conference',
            label: 'Activity Type',
            to: `${adminRoot}/epos/adhocbulkproductivitymasters/typebulk`,
          },

          // {
          //   key: 'Activity',
          //   icon: 'iconsminds-conference',
          //   label: 'Activity',
          //   to: `${adminRoot}/masters/activitybulk`,
          // },
          // {
          //   key: 'Area',
          //   icon: 'iconsminds-conference',
          //   label: 'Area',
          //   to: `${adminRoot}/epos/areabulk`,
          // },
        ]
      },
      {
        key: 'Time Pending Monitoring Masters',
        icon: 'simple-icon-grid',
        label: 'Time Pending Monitoring Masters',
        to: `${adminRoot}/epos/timependingmonitoring`,
        subs: [
          {
            key: 'Activity',
            icon: 'iconsminds-conference',
            label: 'Activity',
            to: `${adminRoot}/epos/timependingmonitoring/activitytime`,
          },
          {
            key: 'Location',
            icon: 'iconsminds-conference',
            label: 'Location',
            to: `${adminRoot}/epos/timependingmonitoring/time`,
          },
        ],
      },

      // {
      //   key: 'Feeder Schedules',
      //   icon: 'iconsminds-sand-watch-2',
      //   label: 'Feeder Schedules',
      //   to: `${adminRoot}/epos/feeder-schedules`,
      // },
      {
        key: 'Masters',
        icon: 'simple-icon-grid',
        label: 'Masters',
        to: `${adminRoot}/epos/master`,
        subs: [
          {
            key: 'EQ Master',
            icon: 'iconsminds-conference',
            label: 'EQ Master',
            to: `${adminRoot}/epos/master/eqmaster`,
          },
        ]
      },
      {
        key: 'Error Capture Module',
        icon: 'iconsminds-bio-hazard',
        label: 'Error Capture Module',
        to: `${adminRoot}/epos/Errorcapturemodule`,
      },
    ]
  },
  {
    key: 'Feeder Schedules',
    icon: 'iconsminds-ship',
    label: 'Feeder Schedules',
    to: `${adminRoot}/feederschedules`,
    subs: [
      {
        key: 'KPI Report',
        icon: 'iconsminds-laptop---tablet',
        label: 'KPI Report',
        to: `${adminRoot}/feederschedules/kpireport`,
      },
      {
        key: 'Feeder Schedules',
        icon: 'iconsminds-sand-watch-2',
        label: 'Feeder Schedules',
        to: `${adminRoot}/feederschedules/feeder_schedules`,
      },
      {
        key: 'Error Capture Module',
        icon: 'iconsminds-bio-hazard',
        label: 'Error Capture Module',
        to: `${adminRoot}/feederschedules/Error_capturemodule`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/feederschedules/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/feederschedules/dashboard`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/feederschedules/rawdata`,
        subs: [
          {
            key: 'Feeder Schedules Raw Data',
            icon: 'iconsminds-sand-watch-2',
            label: 'Feeder Schedules Raw Data',
            to: `${adminRoot}/feederschedules/rawdata/feeder_schedulesrawdata`,
          },
          {
            key: 'Error Capture Module',
            icon: 'iconsminds-bio-hazard',
            label: 'Error Capture Module',
            to: `${adminRoot}/feederschedules/rawdata/Error_capturemodulerawdata`,
          },
        ]
      },
      {
        key: 'Feeder Schedules Master',
        icon: 'iconsminds-ship',
        label: 'Feeder Schedules Master',
        to: `${adminRoot}/feederschedules/master`,
        subs: [
          {
            key: 'Area Selection',
            icon: 'iconsminds-bio-hazard',
            label: 'Area Selection',
            to: `${adminRoot}/feederschedules/master/area`,
          },
          {
            key: 'Activity Selection',
            icon: 'iconsminds-bio-hazard',
            label: 'Activity Selection',
            to: `${adminRoot}/feederschedules/master/activityselection`,
          },
          {
            key: 'Vessel Operator',
            icon: 'iconsminds-bio-hazard',
            label: 'Vessel Operator',
            to: `${adminRoot}/feederschedules/master/vesseloperator`,
          },
          {
            key: 'Region',
            icon: 'iconsminds-bio-hazard',
            label: 'Region',
            to: `${adminRoot}/feederschedules/master/region`,
          },
          {
            key: 'Sub Activity',
            icon: 'iconsminds-bio-hazard',
            label: 'Sub Activity',
            to: `${adminRoot}/feederschedules/master/subactivity`,
          },
          {
            key: 'Request Type',
            icon: 'iconsminds-bio-hazard',
            label: 'Request Type',
            to: `${adminRoot}/feederschedules/master/requesttype`,
          },
          {
            key: 'Source',
            icon: 'iconsminds-bio-hazard',
            label: 'Source',
            to: `${adminRoot}/feederschedules/master/source`,
          },
          {
            key: 'Error Activity',
            icon: 'iconsminds-bio-hazard',
            label: 'Error Activity',
            to: `${adminRoot}/feederschedules/master/activitytype`,
          },
          {
            key: 'Error Type',
            icon: 'iconsminds-bio-hazard',
            label: 'Error Type',
            to: `${adminRoot}/feederschedules/master/errortype`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/feederschedules/master/eqmaster`,
          },
        ]
      }
    ]
  },

  {
    key: 'Mainline Feeders',
    icon: 'iconsminds-sailing-ship',
    label: 'Mainline Feeders',
    to: `${adminRoot}/mainlinefeeder`,
    subs: [
      {
        key: 'Mainline Feeders',
        icon: 'iconsminds-sand-watch-2',
        label: 'Mainline Feeders',
        to: `${adminRoot}/mainlinefeeder/mainlinefeeder`,
      },
      {
        key: 'Error Capture',
        icon: 'iconsminds-bio-hazard',
        label: 'Error Capture',
        to: `${adminRoot}/mainlinefeeder/error_capture_module`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/mainlinefeeder/productivity-report`,
      },
      {
        key: 'Master',
        icon: 'iconsminds-ship',
        label: 'Master',
        to: `${adminRoot}/mainlinefeeder/master`,
        subs: [
          {
            key: 'Region',
            icon: 'iconsminds-bio-hazard',
            label: 'Region',
            to: `${adminRoot}/mainlinefeeder/master/region`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/mainlinefeeder/master/eqmaster`,
          },
          {
            key: 'Activity',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Activity',
            to: `${adminRoot}/mainlinefeeder/master/activity`,
          },
          {
            key: 'SSY Details',
            icon: 'iconsminds-alarm-clock-2',
            label: 'SSY Details',
            to: `${adminRoot}/mainlinefeeder/master/ssydetails`,
          },
          {
            key: 'Request Type',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Request Type',
            to: `${adminRoot}/mainlinefeeder/master/requesttype`,
          },
          {
            key: 'Error Type',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Error Type',
            to: `${adminRoot}/mainlinefeeder/master/errortype`,
          },
        ]
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/mainlinefeeder/rawdata`,
        subs: [
          {
            key: 'Mainline Feeder',
            icon: 'iconsminds-sand-watch-2',
            label: 'Mainline Feeder',
            to: `${adminRoot}/mainlinefeeder/rawdata/mainlinefeeder`,
          },
          {
            key: 'Error Capture',
            icon: 'iconsminds-bio-hazard',
            label: 'Error Capture',
            to: `${adminRoot}/mainlinefeeder/rawdata/error_capture`,
          },
        ]
      },
    ]
  },

  {
    key: 'FA',
    icon: 'iconsminds-notepad',
    label: 'FA',
    to: `${adminRoot}/fa/shipment-details`,
    subs: [
      {
        key: 'Shipment Details',
        icon: 'iconsminds-files',
        label: 'Shipment Details',
        to: `${adminRoot}/fa/shipment-details`,
      },
      {
        key: 'Report',
        icon: 'iconsminds-file-clipboard-file---text',
        label: 'Report',
        to: `${adminRoot}/fa/Report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/fa/dashboard`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-receipt-4',
        label: 'Raw Data',
        to: `${adminRoot}/fa/rawdata`,
        subs: [
          {
            key: 'Shipment Import Raw Data',
            icon: 'iconsminds-files',
            label: 'Shipment Import Raw Data',
            to: `${adminRoot}/fa/rawdata/shipmentimportrawdata`,
          },
          {
            key: 'Shipment Export Raw Data',
            icon: 'iconsminds-files',
            label: 'Shipment Export Raw Data',
            to: `${adminRoot}/fa/rawdata/shipmentexportrawdata`,
          },
        ]
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-receipt-4',
        label: 'Productivity Report',
        to: `${adminRoot}/fa/productivity-report`,
      },
      {
        key: 'KFR Report',
        icon: 'iconsminds-laptop---tablet',
        label: 'KFR Report',
        to: `${adminRoot}/fa/shipment-details`,
        subs: [
          {
            key: 'Shipment Import KFR Report',
            icon: 'iconsminds-files',
            label: 'Shipment Import KFR Report',
            to: `${adminRoot}/fa/shipmentimportkfrreport`,
          },
          {
            key: 'Shipment Export KFR Report',
            icon: 'iconsminds-files',
            label: 'Shipment Export KFR Report',
            to: `${adminRoot}/fa/shipmentexportkfrreport`,
          },
        ]
      },
      {
        key: 'KFR',
        icon: 'iconsminds-laptop---tablet',
        label: 'KFR',
        to: `${adminRoot}/fa/shipment-details`,
        subs: [
          {
            key: 'Shipment Import KFR',
            icon: 'iconsminds-files',
            label: 'Shipment Import KFR',
            to: `${adminRoot}/fa/shipmentimportkfr`,
          },
          {
            key: 'Shipment Export KFR',
            icon: 'iconsminds-files',
            label: 'Shipment Export KFR',
            to: `${adminRoot}/fa/shipmentexportkfr`,
          },
        ]
      },
      {
        key: 'Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Masters',
        to: `${adminRoot}/fa/master`,
        subs: [
          {
            key: 'Region',
            icon: 'iconsminds-receipt-4',
            label: 'Region',
            to: `${adminRoot}/fa/master/region`,
          },
          {
            key: 'Area',
            icon: 'iconsminds-receipt-4',
            label: 'Area',
            to: `${adminRoot}/fa/master/area`,
          },
          {
            key: 'Subregion',
            icon: 'iconsminds-receipt-4',
            label: 'Subregion',
            to: `${adminRoot}/fa/master/subregion`,
          },
          {
            key: 'Data Selected',
            icon: 'iconsminds-receipt-4',
            label: 'Data Selected',
            to: `${adminRoot}/fa/master/data`,
          },
          {
            key: 'Quality Export',
            icon: 'iconsminds-receipt-4',
            label: 'Quality Export',
            to: `${adminRoot}/fa/master/qualityexport`,
          },
          {
            key: 'Quality Import',
            icon: 'iconsminds-receipt-4',
            label: 'Quality Import',
            to: `${adminRoot}/fa/master/qualityimport`,
          },
          // {
          //   key: 'Quality',
          //   icon: 'iconsminds-receipt-4',
          //   label: 'Quality',
          //   to: `${adminRoot}/fa/quality`,
          // },
          {
            key: 'Error Type',
            icon: 'iconsminds-receipt-4',
            label: 'Error Type',
            to: `${adminRoot}/fa/master/errortype`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/fa/master/eqmaster`,
          },
        ]
      },

      // {
      //   key: 'Shipment List',
      //   icon: 'iconsminds-file-clipboard-file---text',
      //   label: 'Shipment List',
      //   to: `${adminRoot}/fa/shipmentlist`,
      // },
      // {
      //   key: 'Freight Audit Information',
      //   icon: 'iconsminds-file',
      //   label: 'Freight Audit Information',
      //   to: `${adminRoot}/fa/frightauditinformation`,
      // },
    ]
  },
  {
    key: 'QA',
    icon: 'simple-icon-layers',
    label: 'QA',
    to: `${adminRoot}/qa`,
    subs: [
      {
        key: 'Quality Assurance',
        icon: 'iconsminds-project',
        label: 'Quality Assurance',
        to: `${adminRoot}/qa/quality-assurance`,
      },
      // {
      //   key: 'Other Activities',
      //   icon: 'iconsminds-project',
      //   label: 'Other Activities',
      //   to: `${adminRoot}/qa/other-activities`,
      // },
      {
        key: 'Non-Productive',
        icon: 'iconsminds-project',
        label: 'Non-Productive',
        to: `${adminRoot}/qa/non-productive`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/qa/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/qa/dashboard`,
      },
      {
        key: 'Quality Assurance Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Quality Assurance Masters',
        to: `${adminRoot}/qa/master`,
        subs: [

          {
            key: 'TL Acceptance',
            icon: 'iconsminds-receipt-4',
            label: 'TL Acceptance',
            to: `${adminRoot}/qa/tlacceptance`,
          },
          {
            key: 'Shipper / GSC',
            icon: 'iconsminds-receipt-4',
            label: 'Shipper / GSC',
            to: `${adminRoot}/qa/shipper`,
          },
          {
            key: 'Standard Comment',
            icon: 'iconsminds-receipt-4',
            label: 'Standard Comment',
            to: `${adminRoot}/qa/standardcomment`,
          },
          {
            key: 'Type of Charge Code',
            icon: 'iconsminds-receipt-4',
            label: 'Type of Charge Code',
            to: `${adminRoot}/qa/chargecodetype`,
          },
          // {
          //   key: 'MAF Applicable Stage',
          //   icon: 'iconsminds-receipt-4',
          //   label: 'MAF Applicable Stage',
          //   to: `${adminRoot}/qa/mafapplicable`,
          // },
          {
            key: 'Input Error Category',
            icon: 'iconsminds-receipt-4',
            label: 'Input Error Category',
            to: `${adminRoot}/qa/inputerrorcategory`,
          },
          {
            key: 'Input Error Sub Category',
            icon: 'iconsminds-receipt-4',
            label: 'Input Error Sub Category',
            to: `${adminRoot}/qa/inputerrorsubcategory`,
          },
          {
            key: 'Match Code Error Category',
            icon: 'iconsminds-receipt-4',
            label: 'Match Code Error Category',
            to: `${adminRoot}/qa/matchcodecategory`,
          },

          {
            key: 'Match Code Error Sub Category',
            icon: 'iconsminds-receipt-4',
            label: 'Match Code Error Sub Category',
            to: `${adminRoot}/qa/matchcodesubcategory`,
          },
          {
            key: 'Destination Error Category',
            icon: 'iconsminds-receipt-4',
            label: 'Destination Error Category',
            to: `${adminRoot}/qa/destinationcategory`,
          },
          {
            key: 'Destination Error Sub Category',
            icon: 'iconsminds-receipt-4',
            label: 'Destination Error Sub Category',
            to: `${adminRoot}/qa/destinationsubcategory`,
          },
          {
            key: 'Other Error Category',
            icon: 'iconsminds-receipt-4',
            label: 'Other Error Category',
            to: `${adminRoot}/qa/otherscategory`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-receipt-4',
            label: 'EQ Master',
            to: `${adminRoot}/qa/eqmaster`,
          },
        ]
      },
      {
        key: 'QA Raw Data',
        icon: 'simple-icon-grid',
        label: 'QA Raw Data',
        to: `${adminRoot}/qa/reports`,
        subs: [
          {
            key: 'Quality Assurance Raw Data',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Quality Assurance Raw Data',
            to: `${adminRoot}/qa/reports/quality-assurance`,
          },
        ]
      },
      {
        key: 'Non-Productive Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Non-Productive Masters',
        to: `${adminRoot}/qa/master`,
        subs: [
          {
            key: 'Category',
            icon: 'iconsminds-receipt-4',
            label: 'Category',
            to: `${adminRoot}/qa/category`,
          },
          {
            key: 'For-(Non-Productive)',
            icon: 'iconsminds-receipt-4',
            label: 'For-(Non-Productive)',
            to: `${adminRoot}/qa/for`,
          },
        ]
      },
    ]
  },
  {
    key: 'MIS QSC',
    icon: 'simple-icon-layers',
    label: 'MIS QSC',
    to: `${adminRoot}/mis-qa`,
    subs: [
      {
        key: 'MIS QSC',
        icon: 'iconsminds-project',
        label: 'MIS QSC',
        to: `${adminRoot}/mis-qa/supportteam`,
      },
      {
        key: 'ADHOC',
        icon: 'iconsminds-remove-file',
        label: 'ADHOC',
        to: `${adminRoot}/mis-qa/adhoc`,
      },
      {
        key: 'Error Capture',
        icon: 'iconsminds-file-edit',
        label: 'Error Capture',
        to: `${adminRoot}/mis-qa/errorcapture`,
      },
      {
        key: 'Non-Productivity Hours',
        icon: 'iconsminds-project',
        label: 'Non-Productivity Hours',
        to: `${adminRoot}/mis-qa/nonproductivityhours`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/mis-qa/dashboard`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-receipt-4',
        label: 'Raw Data',
        to: `${adminRoot}/mis-qa`,
        subs: [
          {
            key: 'MIS QSC Raw Data',
            icon: 'iconsminds-project',
            label: 'MIS QSC Raw Data',
            to: `${adminRoot}/mis-qa/rawdata/supportteamrawdata`,
          },
          {
            key: 'ADHOC Raw Data',
            icon: 'iconsminds-remove-file',
            label: 'ADHOC Raw Data',
            to: `${adminRoot}/mis-qa/rawdata/adhocrawdata`,
          },
          {
            key: 'Error Capture Raw Data',
            icon: 'iconsminds-file-edit',
            label: 'Error Capture Raw Data',
            to: `${adminRoot}/mis-qa/rawdata/errorcapturerawdata`,
          },
          // {
          //   key: 'Non-Productivity Hours Raw Data',
          //   icon: 'iconsminds-project Raw Data',
          //   label: 'Non-Productivity Hours',
          //   to: `${adminRoot}/mis-qa/rawdata/nonproductivityhoursrawdata`,
          // },
        ]
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-receipt-4',
        label: 'Productivity Report',
        to: `${adminRoot}/mis-qa/productivity-report`,
      },
      {
        key: 'KFR Report',
        icon: 'iconsminds-laptop---tablet',
        label: 'KFR Report',
        to: `${adminRoot}/mis-qa/supportteam`,
        subs: []
      },
      {
        key: 'KFR',
        icon: 'iconsminds-laptop---tablet',
        label: 'KFR',
        to: `${adminRoot}/mis-qa/supportteam`,
        subs: []
      },
      {
        key: 'MIS QSC Master',
        icon: 'iconsminds-project',
        label: 'MIS QSC Master',
        to: `${adminRoot}/mis-qa/master`,
        subs: [
          {
            key: 'MIS Team',
            icon: 'iconsminds-project',
            label: 'MIS Team',
            to: `${adminRoot}/mis-qa/master/misteam`,
          },
          {
            key: 'MISQSC Task',
            icon: 'iconsminds-project',
            label: 'MISQSC Task',
            to: `${adminRoot}/mis-qa/master/misqscmaster`,
          },
          {
            key: 'MIS Category',
            icon: 'iconsminds-remove-file',
            label: 'MIS Category',
            to: `${adminRoot}/mis-qa/master/miscategory`,
          },
          {
            key: 'MIS Report For',
            icon: 'iconsminds-file-edit',
            label: 'MIS Report For',
            to: `${adminRoot}/mis-qa/master/misreportfor`,
          },
          {
            key: 'MIS For',
            icon: 'iconsminds-project',
            label: 'MIS For',
            to: `${adminRoot}/mis-qa/master/misfor`,
          },
          // {
          //   key: 'MIS Supervisor Approval',
          //   icon: 'iconsminds-network',
          //   label: 'MIS Supervisor Approval',
          //   to: `${adminRoot}/mis-qa/master/missupervisor`,
          // },
          // {
          //   key: 'EQ Master',
          //   icon: 'iconsminds-alarm-clock-2',
          //   label: 'EQ Master',
          //   to: `${adminRoot}/mis-qa/eqmaster`,
          // },
        ]
      },
    ]
  },
  {
    key: 'Support Team',
    icon: 'iconsminds-network',
    label: 'Support Team',
    to: `${adminRoot}/support-team`,
    subs: [
      {
        key: 'Task Delivered',
        icon: 'iconsminds-inbox-out',
        label: 'Task Delivered',
        to: `${adminRoot}/support-team/supportteamadhoc`,
      },
      {
        key: 'Error Capture',
        icon: 'iconsminds-project',
        label: 'Error Capture',
        to: `${adminRoot}/support-team/supportteamerrorcapture`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/support-team/productivity-report`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-receipt-4',
        label: 'Raw Data',
        to: `${adminRoot}/support-team/rawdata`,
        subs: [
          {
            key: 'Task Delivered Raw Data',
            icon: 'iconsminds-inbox-out',
            label: 'Task Delivered Raw Data',
            to: `${adminRoot}/support-team/rawdata/supportteamtaskrawdata`,
          },
          {
            key: 'Error Capture Raw Data',
            icon: 'iconsminds-project',
            label: 'Error Capture Raw Data',
            to: `${adminRoot}/support-team/rawdata/supportteamerrorcapturerawdata`,
          },
        ]
      },
      {
        key: 'Master',
        icon: 'iconsminds-project',
        label: 'Master',
        to: `${adminRoot}/support-team/master`,
        subs: [
          {
            key: 'Team',
            icon: 'iconsminds-project',
            label: 'Team',
            to: `${adminRoot}/support-team/master/supportteam`,
          },
          // {
          //   key: 'EQ Master',
          //   icon: 'iconsminds-alarm-clock-2',
          //   label: 'EQ Master',
          //   to: `${adminRoot}/support-team/eqmaster`,
          // },
        ]
      },


    ]
  },



  {
    key: 'PACT KPI',
    icon: 'iconsminds-book',
    label: 'PACT KPI',
    to: `${adminRoot}/pact-kpi`,
    subs: [
      {
        key: 'Productivity With EH ',
        icon: 'iconsminds-loading-3',
        label: 'Productivity With EH',
        to: `${adminRoot}/pact-kpi/productivity-eh`,
      },
      {
        key: 'Productivity Without EH',
        icon: 'iconsminds-location-2',
        label: 'Productivity Without EH',
        to: `${adminRoot}/pact-kpi/productivity-without-eh`,
      },
      {
        key: 'Productivity EH Finding',
        icon: 'simple-icon-cloud-upload',
        label: 'Productivity EH Finding',
        to: `${adminRoot}/pact-kpi/productivity-finding`,
      },
      {
        key: 'Productivity Audit',
        icon: 'iconsminds-ship',
        label: 'Productivity Audit',
        to: `${adminRoot}/pact-kpi/productivity-audit`,
      },
      {
        key: 'Non-Productivity Hours',
        icon: 'iconsminds-clock',
        label: 'Non-Productivity Hours',
        to: `${adminRoot}/pact-kpi/non-productivity`,
      },
      {
        key: 'Error Capture',
        icon: 'iconsminds-receipt-4',
        label: 'Error Capture',
        to: `${adminRoot}/pact-kpi/error-capture`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/pact-kpi/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/pact-kpi/dashboard`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-receipt-4',
        label: 'Raw Data',
        to: `${adminRoot}/pact-kpi/reports`,
        subs: [
          {
            key: 'Productivity Audit Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity Audit Raw Data',
            to: `${adminRoot}/pact-kpi/reports/productivity-audit`,
          },
          {
            key: 'Productivity With EH Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity With EH Raw Data',
            to: `${adminRoot}/pact-kpi/reports/productivity-eh`,
          },
          {
            key: 'Productivity EH Finding Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity EH Finding Raw Data',
            to: `${adminRoot}/pact-kpi/reports/productivity-finding`,
          },
          {
            key: 'Productivity Without EH Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity Without EH Raw Data',
            to: `${adminRoot}/pact-kpi/reports/productivity-without-eh`,
          },
          // {
          //   key: 'Non-Productivity Hours Raw Data',
          //   icon: 'iconsminds-receipt-4',
          //   label: 'Non-Productivity Hours Raw Data',
          //   to: `${adminRoot}/pact-kpi/reports/non-productivity`,
          // },
          {
            key: 'Error Capture Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Error Capture Raw Data',
            to: `${adminRoot}/pact-kpi/reports/error-capture`,
          },
        ]
      },

      {
        key: 'KFR',
        icon: 'iconsminds-receipt-4',
        label: 'KFR',
        to: `${adminRoot}/pact-kpi/kfr`,
        subs: [
          {
            key: 'Productivity Audit KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity Audit KFR',
            to: `${adminRoot}/pact-kpi/kfr/productivity-audit`,
          },
          {
            key: 'Productivity With EH KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity With EH KFR',
            to: `${adminRoot}/pact-kpi/kfr/productivity-eh`,
          },
          {
            key: 'Productivity EH Finding KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity EH Finding KFR',
            to: `${adminRoot}/pact-kpi/kfr/productivity-finding`,
          },
          {
            key: 'Productivity Without EH KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity Without EH KFR',
            to: `${adminRoot}/pact-kpi/kfr/productivity-without-eh`,
          },
          {
            key: 'Non-Productivity Hours KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Non-Productivity Hours KFR',
            to: `${adminRoot}/pact-kpi/kfr/non-productivity`,
          },
          {
            key: 'Error Capture KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Error Capture KFR',
            to: `${adminRoot}/pact-kpi/kfr/error-capture`,
          },
        ]
      },
      {
        key: 'KFR Report',
        icon: 'iconsminds-receipt-4',
        label: 'KFR Report',
        to: `${adminRoot}/pact-kpi/master`,
        subs: [
          {
            key: 'Productivity Audit KFR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity Audit KFR Report',
            to: `${adminRoot}/pact-kpi/kfr-report/productivity-audit`,
          },
          {
            key: 'Productivity With EH KFR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity With EH KFR Report',
            to: `${adminRoot}/pact-kpi/kfr-report/productivity-eh`,
          },
          {
            key: 'Productivity EH Finding KFR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity EH Finding KFR Report',
            to: `${adminRoot}/pact-kpi/kfr-report/productivity-finding`,
          },
          {
            key: 'Productivity Without EH KFR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Productivity Without EH KFR Report',
            to: `${adminRoot}/pact-kpi/kfr-report/productivity-without-eh`,
          },
          {
            key: 'Non-Productivity Hours KFR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Non-Productivity Hours KFR Report',
            to: `${adminRoot}/pact-kpi/kfr-report/non-productivity`,
          },
          {
            key: 'Error Capture KFR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Error Capture KFR Report',
            to: `${adminRoot}/pact-kpi/kfr-report/error-capture`,
          },
        ]
      },
      {
        key: 'Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Masters',
        to: `${adminRoot}/pact-kpi/master`,
        subs: [
          // {
          //   key: 'Error Received By',
          //   icon: 'iconsminds-receipt-4',
          //   label: 'Error Received By',
          //   to: `${adminRoot}/pact-kpi/master/errorreceivedby`,
          // },
          {
            key: 'Category',
            icon: 'iconsminds-receipt-4',
            label: 'Category',
            to: `${adminRoot}/pact-kpi/master/category`,
          },
          {
            key: 'Error Type',
            icon: 'iconsminds-receipt-4',
            label: 'Error Type',
            to: `${adminRoot}/pact-kpi/master/errortype`,
          },
          // {
          //   key: 'For-(Non-Productivity Hours)',
          //   icon: 'iconsminds-receipt-4',
          //   label: 'For-(Non-Productivity Hours)',
          //   to: `${adminRoot}/pact-kpi/master/for`,
          // },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/pact-kpi/master/eqmaster`,
          },

        ]
      },
    ]
  },
  {
    key: 'Tender',
    icon: 'simple-icon-note',
    label: 'Tender',
    to: `${adminRoot}/tender`,
    subs: [
      {
        key: 'KPI Report',
        icon: 'iconsminds-laptop---tablet',
        label: 'KPI Report',
        to: `${adminRoot}/tender/kpireport`,
      },
      {
        key: 'Tender Input Sheet',
        icon: 'iconsminds-upload-1',
        label: 'Tender Input Sheet',
        to: `${adminRoot}/tender/tenderinputsheet`,
      },
      {
        key: 'Error Capturing',
        icon: 'iconsminds-receipt-4',
        label: 'Error Capturing',
        to: `${adminRoot}/tender/errorcapturing`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-receipt-4',
        label: 'Raw Data',
        to: `${adminRoot}/tender/rawdata`,
        subs: [
          {
            key: 'Tender Input Raw Data',
            icon: 'iconsminds-upload-1',
            label: 'Tender Input Raw Data',
            to: `${adminRoot}/tender/rawdata/tenderinputsheetrawdata`,
          },
          {
            key: 'Error Capturing Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Error Capturing Raw Data',
            to: `${adminRoot}/tender/rawdata/errorcapturingrawdata`,
          },
        ]
      },
      {
        key: 'Tender Master',
        icon: 'iconsminds-receipt-4',
        label: 'Tender Master',
        to: `${adminRoot}/tender/master`,
        subs: [
          {
            key: 'Tender Name',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Name',
            to: `${adminRoot}/tender/master/tendername`,
          },
          {
            key: 'Tender Type',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Type',
            to: `${adminRoot}/tender/master/tendertype`,
          },
          {
            key: 'Tender Category',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Category',
            to: `${adminRoot}/tender/master/tendercategory`,
          },
          {
            key: 'Tender Area',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Area',
            to: `${adminRoot}/tender/master/tenderarea`,
          },
          {
            key: 'Tender Error Severity',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Error Severity',
            to: `${adminRoot}/tender/master/tendererrorseverity`,
          },
          {
            key: 'Tender Error Status',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Error Status',
            to: `${adminRoot}/tender/master/tendererrorstatus`,
          },
          {
            key: 'Tender Error Type',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Error Type',
            to: `${adminRoot}/tender/master/tendererrortype`,
          },
          {
            key: 'Tender Feedback',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Feedback',
            to: `${adminRoot}/tender/master/tenderfeedback`,
          },
          {
            key: 'Tender Query Type',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Query Type',
            to: `${adminRoot}/tender/master/tenderquerytype`,
          },
          {
            key: 'Tender Round',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Round',
            to: `${adminRoot}/tender/master/tenderround`,
          },
          {
            key: 'Tender Section',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Section',
            to: `${adminRoot}/tender/master/tendersection`,
          },
          {
            key: 'Tender Activity',
            icon: 'iconsminds-receipt-4',
            label: 'Tender Activity',
            to: `${adminRoot}/tender/master/tenderactivity`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/tender/master/eqmaster`,
          },
          // {
          //   key: 'Tender Sub Activity',
          //   icon: 'iconsminds-receipt-4',
          //   label: 'Tender Sub Activity',
          //   to: `${adminRoot}/masters/tendersubactivity`,
          // },
        ]
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/tender/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/tender/dashboard`,
      },
    ]
  },
  {
    key: 'Vessel Chartering',
    icon: 'simple-icon-chart',
    label: 'Vessel Chartering',
    to: `${adminRoot}/vesselchartering`,
    subs: [
      {
        key: 'KPI Report',
        icon: 'iconsminds-laptop---tablet',
        label: 'KPI Report',
        to: `${adminRoot}/vesselchartering/kpireport`,
      },
      {
        key: 'Payment Advice Hire',
        icon: 'iconsminds-receipt-4',
        label: 'Payment Advice Hire ',
        to: `${adminRoot}/vesselchartering/payment`,
      },
      {
        key: 'Payment Advice Bunker',
        icon: 'iconsminds-files',
        label: 'Payment Advice Bunker ',
        to: `${adminRoot}/vesselchartering/paymentbunker`,
      },
      {
        key: 'Debit Note',
        icon: 'iconsminds-credit-card-3',
        label: 'Debit note',
        to: `${adminRoot}/vesselchartering/debitnote`,
      },
      {
        key: 'Credit Note',
        icon: 'iconsminds-credit-card',
        label: 'Credit note',
        to: `${adminRoot}/vesselchartering/creditnote`,
      },
      {
        key: 'Down payment',
        icon: 'iconsminds-mail-money',
        label: 'Down payment',
        to: `${adminRoot}/vesselchartering/downpayement`,
      },
      {
        key: 'Charter Expenses',
        icon: 'iconsminds-book',
        label: 'Charter Expenses',
        to: `${adminRoot}/vesselchartering/charterexpense`,
      },
      {
        key: 'Owners Expenses',
        icon: 'iconsminds-file-horizontal',
        label: 'Owners Expenses',
        to: `${adminRoot}/vesselchartering/ownersexpenses`,
      },
      {
        key: 'Monthly Hire',
        icon: 'iconsminds-file-clipboard-file---text',
        label: 'Monthly Hire',
        to: `${adminRoot}/vesselchartering/monthhire`,
      },
      {
        key: 'Retrieval of Payment advices',
        icon: 'iconsminds-testimonal',
        label: 'Retrieval of Payment Advices',
        to: `${adminRoot}/vesselchartering/retrieval`,
      },
      {
        key: 'Statement of Accounts',
        icon: 'iconsminds-loading-3',
        label: 'Statement of Accounts',
        to: `${adminRoot}/vesselchartering/statementAccounts`,
      },
      {
        key: 'Communication Emails',
        icon: 'iconsminds-mail-inbox',
        label: 'Communication Emails',
        to: `${adminRoot}/vesselchartering/communicationemail`,
      },
      {
        key: 'Error Sheet',
        icon: 'iconsminds-file-edit',
        label: 'Error Sheet',
        to: `${adminRoot}/vesselchartering/errorsheet`,
      },
      {
        key: 'Report',
        icon: 'iconsminds-mail-with-cursors',
        label: 'Report',
        to: `${adminRoot}/vesselchartering/reports`,
      },
      // {
      //   key: 'Productivity Report',
      //   icon: 'iconsminds-bank',
      //   label: 'Productivity Report',
      //   to: `${adminRoot}/vesselchartering/productivity-report`,
      // },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/vesselchartering/dashboard`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-laptop---tablet',
        label: 'Raw Data',
        to: `${adminRoot}/vesselchartering/reports`,
        subs: [
          {
            key: 'Payment Advice Bunker Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Payment Advice Bunker Raw Data',
            to: `${adminRoot}/vesselchartering/reports/paymentbunker`,
          },
          {
            key: 'Charter Expenses Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Charter Expenses Raw Data',
            to: `${adminRoot}/vesselchartering/reports/charterexpense`,
          },
          {
            key: 'Monthly Hire Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Monthly Hire Raw Data',
            to: `${adminRoot}/vesselchartering/reports/monthhire`,
          },
          {
            key: 'Owners Expenses Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Owners Expenses Raw Data',
            to: `${adminRoot}/vesselchartering/reports/ownersexpenses`,
          },
          {
            key: 'Debit Note Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Debit Note Raw Data',
            to: `${adminRoot}/vesselchartering/reports/debitnote`,
          },
          {
            key: 'Statement of Accounts Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Statement of Accounts Raw Data',
            to: `${adminRoot}/vesselchartering/reports/statementAccounts`,
          },
          {
            key: 'Payment Advice Hire Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Payment Advice Hire Raw Data',
            to: `${adminRoot}/vesselchartering/reports/payment`,
          },
          {
            key: 'Communication Emails Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Communication Emails Raw Data',
            to: `${adminRoot}/vesselchartering/reports/communicationemail`,
          },
          {
            key: 'Down payment Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Down payment Raw Data',
            to: `${adminRoot}/vesselchartering/reports/downpayement`,
          },
          {
            key: 'Credit Note Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Credit Note Raw Data',
            to: `${adminRoot}/vesselchartering/reports/creditnote`,
          },
          {
            key: 'Retrieval of Payment Advices Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Retrieval of Payment Advices Raw Data',
            to: `${adminRoot}/vesselchartering/reports/retrieval`,
          },
          {
            key: 'Error Sheet Raw Data',
            icon: 'iconsminds-globe-2',
            label: 'Error Sheet Raw Data',
            to: `${adminRoot}/vesselchartering/reports/errorsheet`,
          },
        ]
      },

      {
        key: 'KFR Report',
        icon: 'iconsminds-laptop---tablet',
        label: 'KFR Report',
        to: `${adminRoot}/vesselchartering/paymentbunker`,
        subs: [
          {
            key: 'Payment Advice Bunker KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Payment Advice Bunker KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/paymentbunker`,
          },
          {
            key: 'Charter Expenses KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Charter Expenses KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/charterexpense`,
          },
          {
            key: 'Monthly Hire KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Monthly Hire KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/monthhire`,
          },
          {
            key: 'Owners Expenses KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Owners Expenses KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/ownersexpenses`,
          },
          {
            key: 'Debit Note KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Debit Note KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/debitnote`,
          },
          {
            key: 'Statement of Accounts KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Statement of Accounts KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/statementAccounts`,
          },
          {
            key: 'Payment Advice Hire KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Payment Advice Hire KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/payment`,
          },
          {
            key: 'Communication Emails KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Communication Emails KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/communicationemail`,
          },
          {
            key: 'Down payment KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Down payment KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/downpayement`,
          },
          {
            key: 'Credit Note KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Credit Note KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/creditnote`,
          },
          {
            key: 'Retrieval of Payment Advices KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Retrieval of Payment Advices KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/retrieval`,
          },
          {
            key: 'Error Sheet KFR Report',
            icon: 'iconsminds-globe-2',
            label: 'Error Sheet KFR Report',
            to: `${adminRoot}/vesselchartering/kfr-report/errorsheet`,
          },
        ]
      },
      {
        key: 'KFR',
        icon: 'iconsminds-laptop---tablet',
        label: 'KFR',
        to: `${adminRoot}/vesselchartering/paymentbunker`,
        subs: [
          {
            key: 'Payment Advice Bunker KFR',
            icon: 'iconsminds-globe-2',
            label: 'Payment Advice Bunker KFR',
            to: `${adminRoot}/vesselchartering/kfr/paymentbunker`,
          },
          {
            key: 'Charter Expenses KFR',
            icon: 'iconsminds-globe-2',
            label: 'Charter Expenses KFR',
            to: `${adminRoot}/vesselchartering/kfr/charterexpense`,
          },
          {
            key: 'Monthly Hire KFR',
            icon: 'iconsminds-globe-2',
            label: 'Monthly Hire KFR',
            to: `${adminRoot}/vesselchartering/kfr/monthhire`,
          },
          {
            key: 'Owners Expenses KFR',
            icon: 'iconsminds-globe-2',
            label: 'Owners Expenses KFR',
            to: `${adminRoot}/vesselchartering/kfr/ownersexpenses`,
          },
          {
            key: 'Debit Note KFR',
            icon: 'iconsminds-globe-2',
            label: 'Debit Note KFR',
            to: `${adminRoot}/vesselchartering/kfr/debitnote`,
          },
          {
            key: 'Statement of Accounts KFR',
            icon: 'iconsminds-globe-2',
            label: 'Statement of Accounts KFR',
            to: `${adminRoot}/vesselchartering/kfr/statementAccounts`,
          },
          {
            key: 'Payment Advice Hire KFR',
            icon: 'iconsminds-globe-2',
            label: 'Payment Advice Hire KFR',
            to: `${adminRoot}/vesselchartering/kfr/payment`,
          },
          {
            key: 'Communication Emails KFR',
            icon: 'iconsminds-globe-2',
            label: 'Communication Emails KFR',
            to: `${adminRoot}/vesselchartering/kfr/communicationemail`,
          },
          {
            key: 'Down payment KFR',
            icon: 'iconsminds-globe-2',
            label: 'Down payment KFR',
            to: `${adminRoot}/vesselchartering/kfr/downpayement`,
          },
          {
            key: 'Credit Note KFR',
            icon: 'iconsminds-globe-2',
            label: 'Credit Note KFR',
            to: `${adminRoot}/vesselchartering/kfr/creditnote`,
          },
          {
            key: 'Retrieval of Payment Advices KFR',
            icon: 'iconsminds-globe-2',
            label: 'Retrieval of Payment Advices KFR',
            to: `${adminRoot}/vesselchartering/kfr/retrieval`,
          },
          {
            key: 'Error Sheet KFR',
            icon: 'iconsminds-globe-2',
            label: 'Error Sheet KFR',
            to: `${adminRoot}/vesselchartering/kfr/errorsheet`,
          },
        ]
      },
      {
        key: 'Masters',
        icon: 'iconsminds-project',
        label: 'Masters',
        to: `${adminRoot}/vesselchartering/master`,
        subs: [
          {
            key: 'Activity Type',
            icon: 'iconsminds-globe-2',
            label: 'Activity Type',
            to: `${adminRoot}/vesselchartering/master/activitytype_vessle`,
          },
          {
            key: 'Error Type',
            icon: 'iconsminds-globe-2',
            label: 'Error Type',
            to: `${adminRoot}/vesselchartering/master/errortype`,
          },
          // {
          //   key: 'EQ Master',
          //   icon: 'iconsminds-alarm-clock-2',
          //   label: 'EQ Master',
          //   to: `${adminRoot}/vesselchartering/master/eqmaster`,
          // },


        ]
      }
    ]
  },
  {
    key: 'AP',
    icon: 'iconsminds-receipt-4',
    label: 'AP',
    to: `${adminRoot}/ap/invoice-allocation`,
    subs: [
      {
        key: 'Invoice Allocation',
        icon: 'simple-icon-printer',
        label: 'Invoice Allocation',
        to: `${adminRoot}/ap/invoice-allocation`,
      },
      {
        key: 'Invoice Processing -  Input',
        icon: 'simple-icon-film',
        label: 'Invoice Processing -  Input',
        to: `${adminRoot}/ap/invoice-processing`,
      },
      {
        key: 'Audit Allocation',
        icon: 'iconsminds-loading',
        label: 'Audit Allocation',
        to: `${adminRoot}/ap/auditallocation`,
      },
      {
        key: 'Audit Review',
        icon: 'iconsminds-power-station',
        label: 'Audit Review',
        to: `${adminRoot}/ap/auditreview`,
      },
      {
        key: 'Error Reporting',
        icon: 'iconsminds-loading-3',
        label: 'Error Reporting',
        to: `${adminRoot}/ap/error-reporting`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/ap/productivity-report`,
      },
      {
        key: 'KPI Report',
        icon: 'iconsminds-bank',
        label: 'KPI Report',
        to: `${adminRoot}/ap/kpi-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/ap/dashboard`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-receipt-4',
        label: 'Raw Data',
        to: `${adminRoot}/ap/reports`,
        subs: [
          {
            key: 'Invoice Allocation Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Invoice Allocation Raw Data',
            to: `${adminRoot}/ap/reports/invoice-allocation`,
          },
          {
            key: 'Invoice Processing - Input Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Invoice Processing - Input Raw Data',
            to: `${adminRoot}/ap/reports/invoice-processing`,
          },
          {
            key: 'Audit Allocation Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Audit Allocation Raw Data',
            to: `${adminRoot}/ap/reports/auditallocation`,
          },
          {
            key: 'Audit Review Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Audit Review Raw Data',
            to: `${adminRoot}/ap/reports/auditreview`,
          },
          {
            key: 'Error Reporting Raw Data',
            icon: 'iconsminds-receipt-4',
            label: 'Error Reporting Raw Data',
            to: `${adminRoot}/ap/reports/error-reporting`,
          },
        ]
      },

      {
        key: 'KFR',
        icon: 'iconsminds-receipt-4',
        label: 'Dashboard',
        to: `${adminRoot}/ap/kfr`,
        subs: [
          {
            key: 'Invoice Allocation KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Invoice Allocation KFR',
            to: `${adminRoot}/ap/kfr/invoice-allocation`,
          },
          {
            key: 'Invoice Processing - Input KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Invoice Processing - Input KFR',
            to: `${adminRoot}/ap/kfr/invoice-processing`,
          },
          {
            key: 'Audit Allocation KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Audit Allocation KFR',
            to: `${adminRoot}/ap/kfr/auditallocation`,
          },
          {
            key: 'Audit Review KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Audit Review KFR',
            to: `${adminRoot}/ap/kfr/auditreview`,
          },
          {
            key: 'Error Reporting KFR',
            icon: 'iconsminds-receipt-4',
            label: 'Error Reporting KFR',
            to: `${adminRoot}/ap/kfr/error-reporting`,
          },
        ]
      },
      {
        key: 'KFR Report',
        icon: 'iconsminds-receipt-4',
        label: 'KFR Report',
        to: `${adminRoot}/ap/kfr-report`,
        subs: [
          {
            key: 'Invoice Allocation KFR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Invoice Allocation KFR Report',
            to: `${adminRoot}/ap/kfr-report/invoice-allocation`,
          },
          {
            key: 'Invoice Processing - Input KFR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Invoice Processing - Input KFR Report',
            to: `${adminRoot}/ap/kfr-report/invoice-processing`,
          },
          {
            key: 'Audit Allocation KFR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Audit Allocation KFR Report',
            to: `${adminRoot}/ap/kfr-report/auditallocation`,
          },
          {
            key: 'Audit Review KFR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Audit Review KFR Report',
            to: `${adminRoot}/ap/kfr-report/auditreview`,
          },
          {
            key: 'Error Reporting KFR Report',
            icon: 'iconsminds-receipt-4',
            label: 'Error Reporting KFR Report',
            to: `${adminRoot}/ap/kfr-report/error-reporting`,
          },
        ]
      },
      {
        key: 'Masters',
        icon: 'iconsminds-receipt-4',
        label: 'Masters',
        to: `${adminRoot}/ap/master`,
        subs: [
          {
            key: 'Region',
            icon: 'iconsminds-receipt-4',
            label: 'Region',
            to: `${adminRoot}/ap/master/region`,
          },
          {
            key: 'Area',
            icon: 'iconsminds-receipt-4',
            label: 'Area',
            to: `${adminRoot}/ap/master/area`,
          },
          {
            key: 'Invoice Status',
            icon: 'iconsminds-receipt-4',
            label: 'Invoice Status',
            to: `${adminRoot}/ap/master/invoice-status`,
          },
          {
            key: 'Audit Status',
            icon: 'iconsminds-receipt-4',
            label: 'Audit Status',
            to: `${adminRoot}/ap/master/auditstatus`,
          },
          {
            key: 'Category',
            icon: 'iconsminds-receipt-4',
            label: 'Category',
            to: `${adminRoot}/ap/master/category`,
          },
          {
            key: 'Error Category',
            icon: 'iconsminds-receipt-4',
            label: 'Error Category',
            to: `${adminRoot}/ap/master/errorcategory`,
          },
          {
            key: 'GSC Comments',
            icon: 'iconsminds-receipt-4',
            label: 'GSC Comments',
            to: `${adminRoot}/ap/master/gsccomments`,
          },
          {
            key: 'Standard Comments',
            icon: 'iconsminds-receipt-4',
            label: 'Standard Comments',
            to: `${adminRoot}/ap/master/standardcomment`,
          },
          {
            key: 'Error Type',
            icon: 'iconsminds-receipt-4',
            label: 'Error Type',
            to: `${adminRoot}/ap/master/errortype`,
          },
          {
            key: 'Scan Location',
            icon: 'iconsminds-receipt-4',
            label: 'Scan Location',
            to: `${adminRoot}/ap/master/scanlocation`,
          },
          {
            key: 'Audit EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Audit EQ Master',
            to: `${adminRoot}/ap/master/eqmaster`,
          },
        ]
      }
    ]
  },
  {
    key: 'Dispute Process',
    icon: 'iconsminds-security-settings',
    label: 'Dispute Process',
    to: `${adminRoot}/dispute-process/dispute-capture`,
    subs: [
      {
        key: 'Dispute Capture',
        icon: 'iconsminds-security-camera',
        label: 'Dispute Capture',
        to: `${adminRoot}/dispute-process/dispute-capture`,
      },
      {
        key: 'Dispute validation & Settlement',
        icon: 'iconsminds-open-book',
        label: 'Dispute validation & Settlement',
        to: `${adminRoot}/dispute-process/dispute-validation`,
      },
      {
        key: 'Invoice Cancellation',
        icon: 'iconsminds-securiy-remove',
        label: 'Invoice Cancellation',
        to: `${adminRoot}/dispute-process/invoice-cancellation`,
      },
      {
        key: 'Communication ',
        icon: 'iconsminds-conference',
        label: 'Communication',
        to: `${adminRoot}/dispute-process/communication`,
      },
      {
        key: 'Error Capturing',
        icon: 'iconsminds-loading-3',
        label: 'Error Capturing',
        to: `${adminRoot}/dispute-process/error-capturing`,
      },
      {
        key: 'Productivity Report',
        icon: 'iconsminds-bank',
        label: 'Productivity Report',
        to: `${adminRoot}/dispute-process/productivity-report`,
      },
      {
        key: 'Dashboard',
        icon: 'iconsminds-laptop---tablet',
        label: 'Dashboard',
        to: `${adminRoot}/dispute-process/dashboard`,
      },
      {
        key: 'Raw Data',
        icon: 'iconsminds-notepad',
        label: 'Raw Data',
        to: `${adminRoot}/dispute-process/rawdata`,
        subs: [
          {
            key: 'Dispute Capture Raw Data',
            icon: 'iconsminds-security-camera Raw Data',
            label: 'Dispute Capture ',
            to: `${adminRoot}/dispute-process/rawdata/dispute-capturerawdata`,
          },
          {
            key: 'Dispute Validation & Settlement Raw Data',
            icon: 'iconsminds-open-book',
            label: 'Dispute Validation & Settlement Raw Data',
            to: `${adminRoot}/dispute-process/rawdata/dispute-validationrawdata`,
          },
          {
            key: 'Invoice Cancellation Raw Data',
            icon: 'iconsminds-securiy-remove',
            label: 'Invoice Cancellation Raw Data',
            to: `${adminRoot}/dispute-process/rawdata/invoice-cancellationrawdata`,
          },
          {
            key: 'Communication Raw Data',
            icon: 'iconsminds-conference',
            label: 'Communication Raw Data',
            to: `${adminRoot}/dispute-process/rawdata/communicationrawdata`,
          },
          {
            key: 'Error Capturing Raw Data',
            icon: 'iconsminds-loading-3',
            label: 'Error Capturing Raw Data',
            to: `${adminRoot}/dispute-process/rawdata/error-capturingrawdata`,
          },
        ]
      },
      {
        key: 'Dispute Process Master',
        icon: 'iconsminds-security-settings',
        label: 'Dispute Process Master',
        to: `${adminRoot}/dispute-process/master`,
        subs: [
          {
            key: 'Process',
            icon: 'iconsminds-security-camera',
            label: 'Process',
            to: `${adminRoot}/dispute-process/master/process`,
          },
          {
            key: 'Country',
            icon: 'iconsminds-open-book',
            label: 'Country',
            to: `${adminRoot}/dispute-process/master/country`,
          },
          {
            key: 'Mail Action',
            icon: 'iconsminds-securiy-remove',
            label: 'Mail Action',
            to: `${adminRoot}/dispute-process/master/mailaction`,
          },
          // {
          //   key: 'Dispute Source',
          //   icon: 'iconsminds-conference',
          //   label: 'Dispute Source',
          //   to: `${adminRoot}/dispute-process/disputesource`,
          // },
          {
            key: 'Prepaid / Collect',
            icon: 'iconsminds-loading-3',
            label: 'Prepaid / Collect',
            to: `${adminRoot}/dispute-process/master/precollect`,
          },
          {
            key: 'Payment Terms',
            icon: 'iconsminds-security-camera',
            label: 'Payment Terms',
            to: `${adminRoot}/dispute-process/master/paymentterms`,
          },
          {
            key: 'Currency',
            icon: 'iconsminds-open-book',
            label: 'Currency',
            to: `${adminRoot}/dispute-process/master/currency`,
          },
          {
            key: 'Collection',
            icon: 'iconsminds-securiy-remove',
            label: 'Collection',
            to: `${adminRoot}/dispute-process/master/collection`,
          },
          {
            key: 'Layout type',
            icon: 'iconsminds-conference',
            label: 'Layout type',
            to: `${adminRoot}/dispute-process/master/layouttype`,
          },
          {
            key: 'Dispute Validation Status',
            icon: 'iconsminds-loading-3',
            label: 'Dispute Validation Status',
            to: `${adminRoot}/dispute-process/master/disputevalidationstatus`,
          },
          {
            key: 'Dispute status',
            icon: 'iconsminds-securiy-remove',
            label: 'Dispute status',
            to: `${adminRoot}/dispute-process/master/disputestatus`,
          },
          {
            key: 'Error type',
            icon: 'iconsminds-conference',
            label: 'Error type',
            to: `${adminRoot}/dispute-process/master/errortype`,
          },
          {
            key: 'Language',
            icon: 'iconsminds-loading-3',
            label: 'Language',
            to: `${adminRoot}/dispute-process/master/language`,
          },
          {
            key: 'Dispute Input',
            icon: 'iconsminds-loading-3',
            label: 'Dispute Input',
            to: `${adminRoot}/dispute-process/master/disputeinput`,
          },
          {
            key: 'EQ Master',
            icon: 'iconsminds-alarm-clock-2',
            label: 'EQ Master',
            to: `${adminRoot}/dispute-process/master/eqmaster`,
          },
          {
            key: 'Region',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Region',
            to: `${adminRoot}/dispute-process/master/region`,
          },
          {
            key: 'Area',
            icon: 'iconsminds-alarm-clock-2',
            label: 'Area',
            to: `${adminRoot}/dispute-process/master/area`,
          },
        ]
      }
    ]
  },
  {
    key: 'General Master',
    icon: 'simple-icon-grid',
    label: 'General Master',
    to: `${adminRoot}/generalmaster`,
    subs: [
      {
        key: 'Role Management',
        icon: 'simple-icon-layers',
        label: 'Role Management',
        to: `${adminRoot}/generalmaster/rolemanagment`,
      },
      {
        key: 'Groups',
        icon: 'simple-icon-people',
        label: 'Groups',
        to: `${adminRoot}/generalmaster/groups`,
      },

      {
        key: 'Hierarchy',
        icon: 'simple-icon-organization',
        label: 'Hierarchy',
        to: `${adminRoot}/generalmaster/hierarchy`,
      },
      {
        key: 'User Logs',
        icon: 'simple-icon-login',
        label: 'User Logs',
        to: `${adminRoot}/generalmaster/userlog`,
      },
      // {
      //   key: 'Timezone',
      //   icon: 'simple-icon-clock',
      //   label: 'Timezone',
      //   to: `${adminRoot}/generalmaster/timezone`,
      // },
      {
        key: 'Outgoing Server ',
        icon: 'simple-icon-call-out',
        label: 'Outgoing Server ',
        to: `${adminRoot}/generalmaster/outgoingserver`,
      },
      {
        key: 'Language',
        icon: 'simple-icon-drawer',
        label: 'Language',
        to: `${adminRoot}/generalmaster/language`,
      },
      {
        key: 'Language Data',
        icon: 'simple-icon-docs',
        label: 'Language Data',
        to: `${adminRoot}/generalmaster/languagedata`,
      },
      {
        key: 'Menu Manager',
        icon: 'simple-icon-menu',
        label: 'Menu Manager',
        to: `${adminRoot}/generalmaster/menumanager`,
      },
      {
        key: 'Location',
        icon: 'simple-icon-location-pin',
        label: 'Location',
        to: `${adminRoot}/generalmaster/location`,
      },
      {
        key: 'Department',
        icon: 'iconsminds-conference',
        label: 'Department',
        to: `${adminRoot}/generalmaster/department`,
      },
      {
        key: 'Designation',
        icon: 'simple-icon-location-pin',
        label: 'Designation',
        to: `${adminRoot}/generalmaster/designation`,
      },
      {
        key: 'Process',
        icon: 'iconsminds-reset',
        label: 'Process',
        to: `${adminRoot}/generalmaster/process`,
      },

      {
        key: 'Team Leader',
        icon: 'simple-icon-people',
        label: 'Team Leader',
        to: `${adminRoot}/generalmaster/tl`,
      },
      {
        key: 'Manager',
        icon: 'simple-icon-people',
        label: 'Manager',
        to: `${adminRoot}/generalmaster/manager`,
      },
      {
        key: 'Director',
        icon: 'simple-icon-user',
        label: 'Director',
        to: `${adminRoot}/generalmaster/director`,
      },
      {
        key: 'Managing Director',
        icon: 'simple-icon-user',
        label: 'Managing Director',
        to: `${adminRoot}/generalmaster/md`,
      },
      {
        key: 'Level',
        icon: 'simple-icon-chart',
        label: 'Level',
        to: `${adminRoot}/generalmaster/level`,
      },
      {
        key: 'Error Upload',
        icon: 'iconsminds-conference',
        label: 'Error Upload',
        to: `${adminRoot}/generalmaster/errorupload`,
      },
      {
        key: 'Attendance Upload',
        icon: 'iconsminds-students',
        label: 'Attendance Upload',
        to: `${adminRoot}/generalmaster/attendanceupload`,
      },
      {
        key: 'User Performance',
        icon: 'simple-icon-chart',
        label: 'User Performance',
        to: `${adminRoot}/generalmaster/userperformance`,
      },
      {
        key: 'Value Based Behaviour',
        icon: 'iconsminds-engineering',
        label: 'Value Based Behaviour',
        to: `${adminRoot}/generalmaster/vbb`,
      },
      {
        key: 'VBB Master',
        icon: 'simple-icon-map',
        label: 'VBB Master',
        to: `${adminRoot}/generalmaster/vbbmaster`,
      },
      {
        key: 'User Rating',
        icon: 'simple-icon-star',
        label: 'User Rating',
        to: `${adminRoot}/generalmaster/user-rating`,
      },
      {
        key: 'Slabs Upload',
        icon: 'simple-icon-cloud-upload',
        label: 'Slabs Upload',
        to: `${adminRoot}/generalmaster/slabs_upload`,
      },
      {
        key: 'Error Removal',
        icon: 'simple-icon-cloud-upload',
        label: 'Error Removal',
        to: `${adminRoot}/generalmaster/errorremoval`,
      },
      {
        key: 'User Management',
        icon: 'iconsminds-laptop---tablet',
        label: 'User Management',
        to: `${adminRoot}/generalmaster/usermanagement`,
        subs: [
          {
            key: 'Users',
            icon: 'simple-icon-user',
            label: 'Users',
            to: `${adminRoot}/generalmaster/usermanagement/user`,
          },
          {
            key: 'User Export',
            icon: 'simple-icon-cloud-download',
            label: 'User Export',
            to: `${adminRoot}/generalmaster/usermanagement/export`,
          },
          {
            key: 'User Import',
            icon: 'simple-icon-cloud-upload',
            label: 'User Import',
            to: `${adminRoot}/generalmaster/usermanagement/import`,
          },
          {
            key: 'Region',
            icon: 'iconsminds-map-marker',
            label: 'Region',
            to: `${adminRoot}/generalmaster/usermanagement/region`,
          },
          {
            key: 'Area',
            icon: 'iconsminds-location-2',
            label: 'Area',
            to: `${adminRoot}/generalmaster/usermanagement/area`,
          },
          {
            key: 'Team',
            icon: 'simple-icon-location-pin',
            label: 'Team',
            to: `${adminRoot}/generalmaster/usermanagement/team`,
          },

        ]
      },
      {
        key: 'Test',
        icon: 'simple-icon-cloud-upload',
        label: 'Test',
        to: `${adminRoot}/generalmaster/test`,
      },
{
        key: 'AI Chat',
        icon: 'simple-icon-cloud-upload',
        label: 'AI Chat',
        to: `${adminRoot}/generalmaster/chatai`,
      },
    ]
  },


  {
    key: 'Dashboard',
    icon: 'iconsminds-laptop---tablet',
    label: 'Dashboard',
    to: `${adminRoot}/dashboard`,
    subs: []

  },
  {
    key: 'Productivity Masters',
    icon: 'iconsminds-upload-1',
    label: 'Productivity Masters',
    to: `${adminRoot}/productivity`,
    subs: [
      {
        key: 'Non-Productivity Hours',
        icon: 'iconsminds-project',
        label: 'Non-Productivity Hours',
        to: `${adminRoot}/productivity/non-productivity`,
      },
      {
        key: 'Approve Non-Productivity Hours',
        icon: 'iconsminds-project',
        label: 'Approve Non-Productivity Hours',
        to: `${adminRoot}/productivity/approve-non-productivity`,
      },
      {
        key: 'Attendance Master',
        icon: 'iconsminds-project',
        label: 'Attendance Master',
        to: `${adminRoot}/productivity/attendance`,
      },
      {
        key: 'Masters',
        icon: 'iconsminds-project',
        label: 'Masters',
        to: `${adminRoot}/productivity/non-productive`,
        subs: [
          {
            key: 'Category',
            icon: 'iconsminds-loading-3',
            label: 'Category',
            to: `${adminRoot}/productivity/masters/Category`,
          },
          {
            key: 'Type',
            icon: 'iconsminds-loading-3',
            label: 'Type',
            to: `${adminRoot}/productivity/masters/type`,
          },
          {
            key: 'Approve Date',
            icon: 'iconsminds-loading-3',
            label: 'Approve Date',
            to: `${adminRoot}/productivity/masters/approvedate`,
          },
          {
            key: 'Apply Date',
            icon: 'iconsminds-loading-3',
            label: 'Apply Date',
            to: `${adminRoot}/productivity/masters/applydate`,
          },
        ]
      },
    ],
  },
  {
    key: 'KFR Report',
    icon: 'iconsminds-upload-1',
    label: 'KFR Report',
    to: `${adminRoot}/kfr-report`,
    subs: [
      {
        key: 'Total Efforts Doc',
        icon: 'iconsminds-project',
        label: 'Total Efforts Doc',
        to: `${adminRoot}/kfr-report/total-efforts`,
      },
      {
        key: 'Total Efforts Non-Doc',
        icon: 'iconsminds-project',
        label: 'Total Efforts Non-Doc',
        to: `${adminRoot}/kfr-report/total-efforts-non`,
      },
      {
        key: 'Budgeted HC',
        icon: 'iconsminds-project',
        label: 'Budgeted HC',
        to: `${adminRoot}/kfr-report/budgeted-hc`,
      },
      {
        key: 'Working Days',
        icon: 'iconsminds-project',
        label: 'Working Days',
        to: `${adminRoot}/kfr-report/working-days`,
      },
      {
        key: 'Actual HC',
        icon: 'iconsminds-project',
        label: 'Actual HC',
        to: `${adminRoot}/kfr-report/actual-hc`,
      },
      {
        key: 'KFR Report',
        icon: 'iconsminds-project',
        label: 'KFR Report',
        to: `${adminRoot}/kfr-report/report`,
      },


    ],
  }


];
export default data;
