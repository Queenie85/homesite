import axios from 'axios'
import config from '../config/config'
import { coffeeApi } from '../config/api'
import { getSessionValues } from '../util/loginHelpers'
import { createCookie, eraseCookie,
	userIdCookie, emailCookie, sessionCookie } from '../util/cookieHelpers'

export const SIGNUP_INVALID_REQUEST = 'SIGNUP_INVALID_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNIN_INVALID_REQUEST = 'SIGNIN_INVALID_REQUEST'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS'

export const GET_PROFILE_START = 'GET_PROFILE_START'
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR'
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR'

export function getProfile(id) {
	return dispatch => {
		dispatch(getProfileStart())
		const { userId, sessionId, email } = getSessionValues()
		axios.get(config.coffeeApp.baseUrl + coffeeApi.getProfile + '/' + id, {
			headers: {
				fe_el_id: userId,
				fe_el: email,
				fe_sk_el: sessionId,
		}}).then(function(res){
				if (!res.data || !res.data.result) {
					dispatch(receiveGetProfileException(res.data.data))
				} else {
					dispatch(getProfileSuccess(res.data.data))
				}
		})
	}
}

export function signup(firstName, lastName, preferredName, phone, email, password, consented) {
	return dispatch => {
		axios.post(config.coffeeApp.baseUrl + coffeeApi.signup,
			{
				email: email,
				password: password,
				first_name: firstName,
				preferred_name: preferredName,
				phone: phone,
				last_name: lastName,
				consented: consented,
				type: 'professional'
		}).then(function(res){
				if (!res.data || !res.data.result) {
					dispatch(receiveSignupException(res.data.data))
				} else {
					dispatch(SignupSuccess())
				}
		})
	}
}

export function signin(email, password) {
	return dispatch => {
		axios.post(config.coffeeApp.baseUrl + coffeeApi.signin,
			{
				email: email,
				password: password,
		}).then(function(res){
			if (!res.data || !res.data.result) {
				dispatch(receiveSigninException(res.data.data))
			} else {
				dispatch(SigninSuccess(email, res.data.data))
			}
		})
	}
}

export function existingSignin() {
	const { userId, sessionId, email } = getSessionValues()
	return dispatch => {
		if (!(!userId || !sessionId || !email)) {
			dispatch(SigninSuccess(email, {data:{session_id: sessionId, user_id: userId}}))
		}
	}
}

export function signout() {
	return dispatch => {
		const { userId, sessionId, email } = getSessionValues()
		if (userId !== null && sessionId !== null && email !== null) {
			axios.post(config.coffeeApp.baseUrl + coffeeApi.signout,
				{
					email: email,
					session_id: sessionId,
					user_id: userId,
				}, {
					headers: {
						fe_el_id: userId,
						fe_el: email,
						fe_sk_el: sessionId,
					},
			}).then(function(res){
				if (res && res.data && res.data.result) {
					dispatch(SignoutSuccess(emailCookie, sessionCookie, userIdCookie))
				}
			})
		}
	}
}

function receiveSignupException(msg) {
	return {
		type: SIGNUP_INVALID_REQUEST,
		signupMsg: msg,
	}
}

function SignupSuccess() {
	return {
		type: SIGNUP_SUCCESS,
	}
}

function receiveSigninException(msg) {
	return {
		type: SIGNIN_INVALID_REQUEST,
		signinMsg: msg.data,
	}
}

function SigninSuccess(email, data) {
	createCookie(emailCookie, email)
	createCookie(sessionCookie, data.data.session_id)
	createCookie(userIdCookie, data.data.user_id)
	return {
		type: SIGNIN_SUCCESS,
	}
}

function SignoutSuccess(emailCookie, sessionCookie, userIdCookie) {
	eraseCookie(emailCookie)
	eraseCookie(sessionCookie)
	eraseCookie(userIdCookie)
	return {
		type: SIGNOUT_SUCCESS,
	}
}

function getProfileStart() {
	return {
		type: GET_PROFILE_START,
	}
}

function receiveGetProfileException() {
	return {
		type: GET_PROFILE_ERROR,
	}
}

function getProfileSuccess(data) {
	return {
		type: GET_PROFILE_SUCCESS,
		profile: data[0],
	}
}
