import { UserRole } from "../helpers/authHelper";

export const appVersion = '1.0.20';

// /* ************* URL Development *************/

// export const apiUrl = 'http://hlgs.centralindia.cloudapp.azure.com';
// export const imageURL = 'http://hlgs.centralindia.cloudapp.azure.com/images/';
// export const teamsiteUrl = 'http://hlgs.centralindia.cloudapp.azure.com/teamsite/hlgs';
// export const LiveBuild = false;
/* ************* URL Development *************/

// export const apiUrl = 'http://159.89.163.171:5001/api';
// export const Booking = 'http://159.89.163.171:5018/api';
// export const Bookingimages = 'http://159.89.163.171:5018';
// export const RAapiUrl = 'http://159.89.163.171:5020/api';

// export const Notificationurl = 'http://159.89.163.171:5023/api';

// export const imageURL = 'http://159.89.163.171:5018/api/';
// export const teamsiteUrl = 'http://hlgs.centralindia.cloudapp.azure.com/teamsite/hlgs';
// export const LiveBuild = false;

/* ************* URL Production WEB *************/
export const apiUrlImport = 'https://localhost:44360';
export const apiUrlAutomation = 'https://localhost:44350'
export const apiUrlTesting = 'https://localhost:44361';
export const apiUrlExport = 'https://localhost:44351';
export const apiUrlUsers = 'https://localhost:44316';
export const apiUrlNotification = 'https://localhost:44324';
export const apiUrlAP = 'https://localhost:44326';
export const apiUrlTender = 'https://localhost:44325';
export const apiUrlBooking = 'https://localhost:44352';
export const apiUrlBookingAmendment = 'https://localhost:44362';
export const apiUrlFeeder = 'https://localhost:44353';
export const apiUrlMainline = 'https://localhost:44319';
export const apiUrl = 'https://localhost:44316';
export const apiUrlBchteam = 'https://localhost:44363';
export const apiUrlAsia = 'https://localhost:44355';
export const apiUrlDD = 'https://localhost:44366';
export const apiUrlFA = 'https://localhost:44367';
export const apiUrlRA = 'https://localhost:44324';
export const apiUrlDG = 'https://localhost:44385';
export const apiUrlDispute = 'https://localhost:44368';
export const apiUrlVesselBalancing = 'https://localhost:44380';
export const apiUrlRailNotification = 'https://localhost:44388';
// export const apiUrl = 'https://10.162.17.253';
export const imageURL = 'https://localhost:44316/images/';
// export const teamsiteUrl = 'https://10.162.17.253/teamsite/hlgs'
export const teamsiteUrl = 'http://localhost:3002/teamsite/hlgs'
export const teamsiteUrlBooking = 'http://localhost:3001/teamsite/hlgs'
export const LiveBuild = true;

/* ************* URL Production Desktop *************/

// export const apiUrl = 'http://10.162.17.253';
// export const imageURL = 'http://10.162.17.253/images/';
// export const teamsiteUrl = 'http://10.162.17.253/teamsite/hlgs'
// export const LiveBuild = true;


/* ************* API Individual Name *************/

export const Master_gateway ='/gateway/'
// export const Master_gateway = '/'
export const  Masters  ='/masters/'
export const Export = '/exports/'
export const Testing = '/testing/'
export const Automation = '/automation/'
export const DG = '/dg/'
export const Import = '/imports/'
export const Epos = '/epos/'
export const Supportteam = '/supportteam/'
export const MIS = '/mis/'
export const ASIA ='/asia/'
export const VesselChartering ='/vesselchart/'
export const Tender ='/tender/'
export const DnD ='/dd/'
export const PactKPI ='/pactkpi/'
export const QA ='/qa/'
export const Railnotification ='/railnotification/'
export const DisputeProcess ='/disputeprocess/'
export const FeedersSchedules ='/feederschedule/'
export const Mainline ='/mainlinefeeder/'
export const AP ='/ap/'
export const SQ ='/sq/'
// export const BookingProcessdash ='/bookingprocess/'
export const BookingProcess ='/bookingprocess/'
export const BookingAmendment ='/bookingamendment/'
export const Bchteam ='/bchteam/'
export const Vesselbalancing ='/vesselbalancing/'
export const FA ='/fa/'
export const RA ='/ra/'
// export const RA ='/'

export const Notification ='/notification/'
// export const Notification ='/'

export const KFR ='/kfrreport/'

/* Pagination */

export const INDEX_PAGE_SIZE_OPTIONS = [10,25, 50, 100, 500, 1000];

/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-sub-hidden';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',
  authDomain: 'gogo-react-login.firebaseapp.com',
  databaseURL: 'https://gogo-react-login.firebaseio.com',
  projectId: 'gogo-react-login',
  storageBucket: 'gogo-react-login.appspot.com',
  messagingSenderId: '216495999563',
};

export const adminRoot = '/app';
export const Tenderadmin = '/app/tender/errorcapturing';
export const buyUrl = 'https://1.envato.market/k4z0';
export const searchPath = `${adminRoot}/#`;
export const servicePath = 'https://api.coloredstrategies.com';

export const currentUser = {
  id: 1,
  title: 'Sarah Kortney',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  role: UserRole.Admin
}



export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.purplemonster';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
