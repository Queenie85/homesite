import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { cookieDomain, baseUrl } from '../../../config/config'
import { isValidInternalURL } from '../../../util/validationHelpers'
import { handleInvalidEmailForSignUp, handleInvalidPasswordForSignUp, handleInvalidFirstNameForSignUp,
				handleInvalidLastNameForSignUp, handleInvalidPhoneForSignUp }
				from "../../../util/invalidInputHelpers.js"
import loadingImage from '../../../assets/img/loading.gif'
import PropTypes from 'prop-types'

export default class SignupBasicInfoStep extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: "",
			lastName: "",
			preferredName: "",
			phone:"",
			email: "",
			password: "",
			consented: false,
			errorMsgForSignUp: {
				firstName: "",
				lastName: "",
				phone: "",
				email: "",
				password: "",
			},
			validInputForSignUp: {
				firstName: false,
				lastName: false,
				phone: false,
				email: false,
				password: false,
			},
			signupValid:false,
			countdownSeconds: 3,
		}
		this.timer = 0
		this.startTimer = this.startTimer.bind(this)
		this.countDown = this.countDown.bind(this)
		this.isValidated = this.isValidated.bind(this)
	}

	isValidated () {
		if (this.state.firstName === "" || this.state.lastName === "" ||
			this.state.phone === "" || this.state.email === "" ||
			this.state.password === "") {
			return false
		}
		return true
	}


	startTimer() {
		if (this.timer === 0) {
			this.timer = window.setInterval(this.countDown, 1000)
		}
	}

	countDown() {
		// Remove one second, set state so a re-render happens.
		let countdownSeconds = this.state.countdownSeconds - 1
		this.setState({
			countdownSeconds: countdownSeconds,
		})
		if (countdownSeconds === 0) {
			window.clearInterval(this.timer)
			let callbackURL = this.props.query === undefined ? null : decodeURIComponent(this.props.query)
			if (isValidInternalURL(callbackURL, cookieDomain)) {
				window.location.href = baseUrl + 'users/signin' + '?callback=' + callbackURL
			} else {
				window.location.href = baseUrl + 'users/signin'
			}
		}
	}

	handleChangeFirstName(event) {
		this.setState({
			firstName: event.target.value,
		})
		handleInvalidFirstNameForSignUp(this.state, event.target.value,
			"First name is required.",)
	}

	handleChangeLastName(event) {
		this.setState({
			lastName: event.target.value,
		})
		handleInvalidLastNameForSignUp(this.state, event.target.value,
			"Last name is required.",)
	}

	handleChangePreferredName(event) {
		this.setState({
			preferredName: event.target.value,
		})
	}

	handleChangePhone(event) {
		this.setState({
			phone: event.target.value,
		})
		handleInvalidPhoneForSignUp(this.state, event.target.value,
			"Phone number is required.",)
	}

	handleChangeEmail(event) {
		this.setState({
			email: event.target.value,
		})
		handleInvalidEmailForSignUp(this.state, event.target.value,
			"The email you provide is invalid format.",
			"Email address is required.",)
	}

	handleChangePassword(event) {
		this.setState({
			password: event.target.value,
		})
		handleInvalidPasswordForSignUp(this.state, event.target.value,
			"The password you provide is invalid.",
			"Password is required.",)
	}

	handleChangeAgreement(event) {
		this.setState({
			consented: event.target.checked,
		})
	}

	handleClickSignup(event) {
		event.preventDefault()
		let firstName = this.state.firstName
		let lastName = this.state.lastName
		let preferredName = this.state.preferredName
		let phone = this.state.phone
		let email = this.state.email
		let password = this.state.password
		let consented = false
		if (this.state.consented) {
			consented = true
		}
		let status = this.state.signupValid

		this.props.signupHandler(firstName, lastName, preferredName, phone, email, password, consented)
		this.props.getStatus(status)
	}

	render() {
		let { userSignupState } = this.props
		let signupMsg = userSignupState.signupMsg
		let signupSuccess = (
			<div id="signup" className="signup-success-page">
				<div className="signup-success-outer-container">
					<div className="container clearfix">
						<div className="">
							<div>
								<p>You have signed up successfully!</p>
								<br/>
								<br/>
								<p>You will be redirected to sign in page in
									&nbsp;{this.state.countdownSeconds}
									&nbsp;seconds.</p>
							</div>
							<div className="center">
								<img src={loadingImage} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
		let signupContent = (
			<div className="signup-page">
				<div className="signup-outer-container">
					<div className="container clearfix">
						<div className="signup-exception margin-bottom-30">
							<span>{signupMsg}</span>
						</div>
						<form>
							<div className="row">
								<div className="col-lg-6 col-md-6">
									<label>First Name
										<label className="required-star">*</label>
									</label>
									<input aria-label="firstname"
											className="border-white form-control transparent-input form-user"
											name="firstname"
											placeholder="First Name"
											type="text"
											value={this.state.value}
											onChange={this.handleChangeFirstName.bind(this)} />
											<div className="help-block inline-error">
												<span>{this.state.errorMsgForSignUp["firstName"]}</span>
											</div>
											<span></span>
								</div>
								<div className="col-lg-6 col-md-6">
									<label>Last Name
										<label className="required-star">*</label>
									</label>
									<input aria-label="lastname"
											className="border-white form-control transparent-input form-user"
											name="lastname"
											placeholder="Last Name"
											type="text"
											value={this.state.value}
											onChange={this.handleChangeLastName.bind(this)} />
											<div className="help-block inline-error">
												<span>{this.state.errorMsgForSignUp["lastName"]}</span>
											</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6 col-md-6">
									<label>Preferred Name
										<label id="nonrequired-star">*</label>
									</label>
									<input aria-label="preferredName"
												className="border-white form-control transparent-input form-user"
												name="preferredName"
												placeholder="Preferred Name"
												type="text"
												value={this.state.value}
												onChange={this.handleChangePreferredName.bind(this)} />
												<div className="help-block inline-error">
													<span>{this.state.errorMsgForSignUp["Preferred name"]}</span>
												</div>
								</div>
								<div className="col-lg-6 col-md-6">
										<label>Phone Number
											<label className="required-star">*</label>
										</label>
										<input aria-label="phone"
												className="border-white form-control transparent-input form-user"
												name="phone"
												placeholder="Phone: (000)000-0000"
												type="text"
												value={this.state.value}
												onChange={this.handleChangePhone.bind(this)} />
												<div className="help-block inline-error">
													<span>{this.state.errorMsgForSignUp["phone"]}</span>
												</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6 col-md-6">
									<label>Email
										<label className="required-star">*</label>
									</label>
										<input aria-label="email"
												className="border-white form-control transparent-input"
												name="email"
												placeholder="Email"
												type="email"
												value={this.state.value}
												onChange={this.handleChangeEmail.bind(this)} />
										<div className="help-block inline-error">
											<span>{this.state.errorMsgForSignUp["email"]}</span>
										</div>
								</div>
								<div className="col-lg-6 col-md-6">
									<label>Password
										<label className="required-star">*</label>
									</label>
									<input aria-label="password"
												className="border-white form-control transparent-input"
												name="password"
												placeholder="Password"
												minLength="6"
												type="password"
												value={this.state.value}
												onChange={this.handleChangePassword.bind(this)} />
										<div className="help-block inline-error">
											<span>{this.state.errorMsgForSignUp["password"]}</span>
										</div>
								</div>
							</div>
							<div className="row">
							</div>
								<div className="signin-link">
									<br/>Already have an account with us?&nbsp;<Link to="/users/signin">
									Sign in</Link>&nbsp;instead.
								</div>
						</form>
					</div>
				</div>
			</div>
		)

		if (userSignupState.signedUp) {
			this.startTimer()
			return signupSuccess
		}
		return signupContent
	}
}

SignupPage.propTypes = {
	userSignupState: PropTypes.shape({
		signedUp: PropTypes.bool.isRequired,
		signupMsg: PropTypes.string.isRequired,
	}).isRequired,
}
