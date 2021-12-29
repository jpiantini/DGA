import { Redirect } from "react-router";
import Login from "../views/Auth/Login/Login";
import Register from "../views/Auth/Register/Register";
import RequestPassword from "../views/Auth/RequestPassword/RequestPassword";
import Contact from "../views/Contact/Contact";
import Home from "../views/Home/Home";
import ListOfServicesPerCategory from "../views/ListOfServicesPerCategory/ListOfServicesPerCategory";
import MyDesk from "../views/MyDesk/MyDesk";
import { PolicyPrivacy } from "../views/PolicyPrivacy/PolicyPrivacy";
import RequestedServiceList from "../views/RequestedServiceList/RequestedServiceList";
import RequestService from "../views/RequestService/RequestService";
import ServiceDescription from "../views/ServiceDescription/ServiceDescription";
import ServiceRequestedDetails from "../views/ServiceRequestedDetails/ServiceRequestedDetails";
import ExampleAppForm from "../views/ExampleAppForm/ExampleAppForm";

const routes = [ //PUT ALL loginRequired:false routes on TOP
  {
    path: "/",
    component: Home,
    exact: true,
    layout: "/public",
    loginRequired: false,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
    layout: "/public",
    loginRequired: false,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
    layout: "/app",
    loginRequired: false,
  },
  {  // FOR SEE ALL FORM FIELDS AND COMPONENTS
    path: "/TESTFORM",
    component: ExampleAppForm,
    exact: true,
    layout: "/app",
    loginRequired: false,
  },
  {
    path: "/requestPassword",
    component: RequestPassword,
    exact: true,
    layout: "/public",
    loginRequired: false,
  },
  {
    path: "/serviceDescription/:serviceID",
    component: ServiceDescription,
    exact: true,
    layout: "/app",
    loginRequired: false,
  },
  {
    path: "/listOfServices/:categoryID",
    component: ListOfServicesPerCategory,
    exact: true,
    layout: "/app",
    loginRequired: false,
  },
  {
    path: "/contact",
    component: Contact,
    exact: true,
    layout: "/app",
    loginRequired: false,
  },
  {
    path: "/policy",
    component: PolicyPrivacy,
    exact: true,
    layout: "/app",
    loginRequired: false,
  },
  {
    path: "/myDesk",
    component: MyDesk,
    exact: true,
    layout: "/app",
    loginRequired: true,
  },
  {
    path: "/requestService/:serviceID",
    component: RequestService,
    exact: true,
    layout: "/app",
    loginRequired: true,
  },
  {
    path: "/serviceRequestedDetails/:serviceID/:requestID/:actionRequired",
    component: ServiceRequestedDetails,
    exact: true,
    layout: "/app",
    loginRequired: true,
  },
  {
    path: "/requestedServicesList/:servicesStatus",
    component: RequestedServiceList,
    exact: true,
    layout: "/app",
    loginRequired: true,
  },
 
  {
    path: "*",
    layout: "/public",
    component: () => <Redirect to="/public" />,
  },

  {
    path: "*",
    layout: "/app",
    component: () => <Redirect to="/public" />, //Can be changed for a not login required route inside app
  },
];

export default routes;
