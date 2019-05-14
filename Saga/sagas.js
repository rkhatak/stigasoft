import { AsyncStorage } from 'react-native';
import { put, call, takeEvery, takeLatest, select, cps } from 'redux-saga/effects';
import API_CONST from '../Constants/APIConstants';
import ACTION_TYPES from '../Action/ActionsType';

//Call for fetching data from api
const _apiCall = (url, data) => {
	return fetch(url, data)
		.then((res) => {
			return { res: res, res_json: res.json() };
		})
		.catch((e) => {
			throw e;
		});
};

//get response json
const _extJSON = (p) => {
	return p.then((res) => res);
};
//login
function* login(action) {
	var username = action.data.username;
	var password = action.data.password;
	var postData={username:username,password:password}

	try {
		let response = yield call(_apiCall, 'https://demo7643920.mockable.io/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
		var responseJSON = yield call(_extJSON, response.res_json);
		var responseData = {
			data: responseJSON,
			headerResponse: response.res
		}
		//console.log(responseData,'action');
		yield put({
			type: ACTION_TYPES.LOGIN_RES,
			payload: responseData
		});
	} catch (e) {
		//console.log('Error: ' + e);
	}
}
function* rootSaga() {
	yield takeLatest(API_CONST.N_LOGIN, login);
}
export default rootSaga;