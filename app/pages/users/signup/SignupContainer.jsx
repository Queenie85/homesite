import React, {Component} from 'react'
import {connect} from 'react-redux'
import SignupExperienceStep from './SignupExperienceStep'
import {signup} from "../../../actions/userActions"

class SignupContainer extends Component {
	render() {
		return (
			<div>
				<SignupExperienceStep
					userSignupState={this.props.userSignupState}
					signupHandler={this.signupHandler.bind(this)}
				/>
			</div>
		)
	}
	signupHandler(industry, role, location, yearOfExperience) {
		this.props.dispatch(signup(industry, role, location, yearOfExperience))
	}
}

function select(state) {
	return {
		userSignupState: state.userSignupState
	}
}

export default connect(select)(SignupContainer)
