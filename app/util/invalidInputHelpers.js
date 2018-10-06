import { validateEmail } from './validationHelpers'

export function handleInvalidFirstNameForSignUp(state, firstName, emptyFirstnameMsg) {
	let firstnameadd = firstName
	let msg = ""
	let valid = true
	if (firstnameadd.length === 0 ) {
		msg = emptyFirstnameMsg
		valid = false
	}
	state.errorMsgForSignUp.firstName = msg
	state.validInputForSignUp.firstName = valid
	state.signupValid = state.validInputForSignUp.email 
							&& state.validInputForSignUp.password
							&& state.validInputForSignUp.firstName
							&& state.validInputForSignUp.lastName
							&& state.validInputForSignUp.phone
}

export function handleInvalidLastNameForSignUp(state, lastName, emptyLastnameMsg) {
	let lastnameadd = lastName
	let msg = ""
	let valid = true
	if (lastnameadd.length === 0 ) {
		msg = emptyLastnameMsg
		valid = false
	}
	state.errorMsgForSignUp.lastName = msg
	state.validInputForSignUp.lastName = valid
	state.signupValid = state.validInputForSignUp.email 
							&& state.validInputForSignUp.password
							&& state.validInputForSignUp.firstName
							&& state.validInputForSignUp.lastName
							&& state.validInputForSignUp.phone
}

export function handleInvalidPhoneForSignUp(state, phone, emptyPhoneMsg) {
	let phoneadd = phone
	let msg = ""
	let valid = true
	if (phoneadd.length === 0 ) {
		msg = emptyPhoneMsg
		valid = false
	}
	state.errorMsgForSignUp.phone = msg
	state.validInputForSignUp.phone = valid
	state.signupValid = state.validInputForSignUp.email 
							&& state.validInputForSignUp.password
							&& state.validInputForSignUp.firstName
							&& state.validInputForSignUp.lastName
							&& state.validInputForSignUp.phone
}



export function handleInvalidEmailForSignUp(state, email, incorrectFormatMsg, emptyEmailMsg) {
	let emailadd = email
	let msg = ""
	let valid = true
	if (! validateEmail(emailadd)) {
		msg = incorrectFormatMsg
		valid = false
	}
	if (emailadd.length === 0 ) {
		msg = emptyEmailMsg
		valid = false
	}
	state.errorMsgForSignUp.email = msg
	state.validInputForSignUp.email = valid
	state.signupValid = state.validInputForSignUp.email 
							&& state.validInputForSignUp.password
							&& state.validInputForSignUp.firstName
							&& state.validInputForSignUp.lastName
							&& state.validInputForSignUp.phone
}

export function handleInvalidPasswordForSignUp(state, password, invalidPasswordMsg, noPasswordMsg) {
	let pass = password
	let msg = ""
	let valid = true
	if (pass.length < 6 && pass.length > 0) {
		msg = invalidPasswordMsg
		valid = false
	}
	if (pass.length === 0) {
		msg = noPasswordMsg
		valid = false
	}
	state.errorMsgForSignUp.password = msg
	state.validInputForSignUp.password = valid
	state.signupValid = state.validInputForSignUp.email 
							&& state.validInputForSignUp.password
							&& state.validInputForSignUp.firstName
							&& state.validInputForSignUp.lastName
							&& state.validInputForSignUp.phone
}

export function handleInvalidEmailForSignIn(state, email, incorrectFormatMsg, emptyEmailMsg) {
	let emailadd = email
	let msg = ""
	let valid = true
	if (! validateEmail(emailadd)){
		msg = incorrectFormatMsg
		valid = false
	}
	if (emailadd.length === 0 ) {
		msg = emptyEmailMsg
		valid = false
	}
	state.errorMsgForSignIn.email = msg
	state.validInputForSignIn.email = valid
	state.cansubmitForSignIn = state.validInputForSignIn.email && state.validInputForSignIn.password
}

export function handleInvalidPasswordForSignIn(state, password, invalidPasswordMsg) {
		let pass = password
		let msg = ""
		let valid = true
		if (pass.length === 0) {
			msg = invalidPasswordMsg
			valid = false
		}
		state.errorMsgForSignIn.password = msg
		state.validInputForSignIn.password = valid
		state.cansubmitForSignIn = state.validInputForSignIn.email && state.validInputForSignIn.password
	}

export function handleInvalidEmailForForgetPassword(state, email, incorrectFormatMsg, emptyEmailMsg) {
	let emailadd = email
	let msg = ""
	let valid = true
	if (! validateEmail(emailadd)){
		msg = incorrectFormatMsg
		valid = false
	}
	if (emailadd.length === 0 ) {
		msg = emptyEmailMsg
		valid = false
	}
	state.errorMsgForForgetPassword = msg
	state.cansubmitForForgetPassword = valid
}