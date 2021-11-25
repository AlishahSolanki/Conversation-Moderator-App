//
//  ActionTypes.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:06:43 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

const CREATE = "CREATE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

function createRequestTypes(base) {
	const res = {};
	[REQUEST, SUCCESS, FAILURE, CANCEL, CREATE, UPDATE, DELETE].forEach(
		type => {
			res[type] = `${base}_${type}`;
		}
	);
	return res;
}
//DEFAULT ACTIONS
export const GENERAL_ACTION = "GENERAL_ACTION";
export const GENERAL_ACTION_MULTIPLE_REQUEST =
	"GENERAL_ACTION_MULTIPLE_REQUEST";
export const NO_INTERNET = "NO_INTERNET";
//SOCKET DEFAULT ACTIONS
export const SOCKET_INFO = createRequestTypes("SOCKET_INFO");
export const SOCKET_DUMP = createRequestTypes("SOCKET_DUMP");
export const SOCKET_WRITE = "SOCKET_WRITE";
//NETWORK DEFAULT ACTION
export const NETWORK_INFO = "NETWORK_INFO";
//LOCATION ACTIONS
export const USER_LOCATION = createRequestTypes("USER_LOCATION");
//APP GENERAL ACTIONS
export const LOGIN = createRequestTypes("LOGIN");
export const SIGNUP = createRequestTypes("SIGNUP");
export const FORGOT_PASSWORD = createRequestTypes("FORGOT_PASSWORD");
export const CHANGE_PASSWORD = createRequestTypes("CHANGE_PASSWORD");
export const LOGOUT = "LOGOUT";
//APP RELATED ACTIONS
//ADD HERE
