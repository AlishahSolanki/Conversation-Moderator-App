import _ from "lodash";
import singleton from "../singleton";
import { store } from "../store";
import { request } from "../actions/ServiceAction";

const callback = (response) => global.log({ response });

const callDispatch = (request) => {
  const dispatch = singleton.storeRef.dispatch;
  dispatch(request);
};

const getUser = () => {
  return singleton.storeRef.getState().loginReducer.data;
};

const dispatchRequest = (
  url, //Service url
  method, //Web Service type 'post,get,put,delete....'
  data, //Paramter for request
  actionType = null, //Action Type
  showHud = true, //Show spinner
  successCB = callback,
  failureCB = callback
) => {
  store.dispatch(
    request(url, method, data, actionType, showHud, successCB, failureCB)
  );
};

export { getUser, callDispatch, dispatchRequest };
