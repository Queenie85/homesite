import React, {Component} from 'react'
import {connect} from 'react-redux'
import SignupPage from './SignupPage'
import {signup} from "../../../actions/userActions"

class SignupContainer extends Component {
	render() {
		return (
			<div>
				<SignupPage
					userSignupState={this.props.userSignupState}
					signupHandler={this.signupHandler.bind(this)}
				/>
			</div>
		)
	}

	signupHandler(firstName, lastName, preferredName, phone, email, password, consented) {
		this.props.dispatch(signup(firstName, lastName, preferredName, phone, email, password, consented))
	}

}

function select(state) {
	return {
		userSignupState: state.userSignupState
	}
}

export default connect(select)(SignupContainer)