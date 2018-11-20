import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignupBasicInfoStep from './SignupBasicInfoStep'
import SignupEducationStep from './SignupEducationStep'
import SignupExperienceStep from './SignupExperienceStep'
import { signup } from '../../../actions/userActions'
import { Steps } from 'antd'

const Step = Steps.Step

class SignupPageContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentStep: 0,
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.currentStep !== this.state.currentStep
	}

	getStepContents() {
		return [
			['Basic Information',
			<SignupBasicInfoStep
				userSignupState={this.props.userSignupState}
				previous={this.previous.bind(this)}
				next={this.next.bind(this)}
				signupHandler={this.signupHandler.bind(this)}
				{...this.state}/>],
			['Education Background',
			<SignupEducationStep
				userSignupState={this.props.userSignupState}
				previous={this.previous.bind(this)}
				next={this.next.bind(this)}
				{...this.state}/>],
			['Current & Past Experience',
			<SignupExperienceStep
				userSignupState={this.props.userSignupState}
				previous={this.previous.bind(this)}
				next={this.next.bind(this)}
				signup={this.signupHandler.bind(this)}
				{...this.state}/>]]
	}

	next() {
		const newStep = this.state.currentStep + 1
		if (newStep <= this.getStepContents().length - 1) {
			this.setState({currentStep: newStep})
		}
	}

	previous() {
		const newStep = this.state.currentStep - 1
		if (newStep >= 0) {
			this.setState({currentStep: newStep})
		}
	}

	signupHandler(firstName, lastName, preferredName, phone, email, password, consented) {
		this.props.dispatch(signup(firstName, lastName, preferredName, phone, email, password, consented))
	}

	render() {
		const content = this.getStepContents()[this.state.currentStep][1]

		return (
			<div className="progress-outer-container">
				<Steps current={ this.state.currentStep }>
					{ this.getStepContents().map((data, i) => <Step key={i} title={data[0]}/>) }
				</Steps>
				<div className="progress-container" >
					{ content }
				</div>
			</div>
		)
	}
}

function select(state) {
	return {
		userSignupState: state.userSignupState
	}
}

export default connect(select)(SignupPageContent)
