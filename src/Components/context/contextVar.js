import { createContext } from "react";

// Define the context with a default value that matches the structure of contextData
export const contextVar = createContext({
  notify: () => {},
  menuList: [],
  setmenuList: () => {},
  userDetails: null,
  setuserDetails: () => {},
  titleText: "",
  settitleText: () => {},
  titleBarVisibility: false,
  settitleBarVisibility: () => {},
  heartBeatCounter: 0,
  setheartBeatCounter: () => {},
  toggleBar: false,
  settoggleBar: () => {},
  refresh: false,
  setrefresh: () => {},
  reference_no: "",
  setReferenceNo: () => {},
});
