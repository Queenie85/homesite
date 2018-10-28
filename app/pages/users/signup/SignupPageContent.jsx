import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignupBasicInfoStep from './SignupBasicInfoStep'
import SignupEducationStep from './SignupEducationStep'
import SignupExperienceStep from './SignupExperienceStep'
import { signup } from '../../../actions/userActions'
import { Steps, Button } from 'antd'

const Step = Steps.Step

class SignupPageContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentStep: 0,
			isValidated: 0,
		}
	}

	inputSatisfied(value){
		if (value === true) {
			this.setState({
				isValidated: 1
			})
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
				getMsg={this.inputSatisfied.bind(this)}/>],
			['Education Background',
			<SignupEducationStep
				userSignupState={this.props.userSignupState}/>],
			['Current & Past Experience',
			<SignupExperienceStep
				userSignupState={this.props.userSignupState}/>]]
	}

	next() {
		const newStep = this.state.currentStep + 1
		if (this.state.isValidated === 1) {
			if (newStep <= this.getStepContents().length - 1) {
				this.setState({currentStep: newStep})
			}
		}
	}

	previous() {
		const newStep = this.state.currentStep - 1
		if (newStep >= 0) {
			this.setState({currentStep: newStep})
		}
	}

	signup(firstName, lastName, preferredName, phone, email, password, consented) {
		this.props.dispatch(signup(firstName, lastName, preferredName, phone, email, password, consented))
	}

	render() {
		const content = this.getStepContents()[this.state.currentStep][1]
		const nextButton = this.state.currentStep === this.getStepContents().length - 1
			? <Button type="primary"
				size="large"
				onClick={this.signup.bind(this)}
				className="col-xs-12">
				Register
			</Button>
			: <Button type="primary"
				size="large"
				onClick={this.next.bind(this)}
				className="col-xs-12">
				Next&gt;
			</Button>
		return (
			<div className="progress-outer-container">
				<Steps current={ this.state.currentStep }>
					{ this.getStepContents().map((data, i) => <Step key={i} title={data[0]}/>) }
				</Steps>
				<div className="progress-container" >
					{ content }
				</div>
				<div className="back-btn-container">
					<Button type="primary"
						size="large"
						disabled={ this.state.currentStep === 0}
						onClick={ this.previous.bind(this) }
						className="col-xs-12">
						&lt;Back
					</Button>
				</div>
				<div className="next-btn-container">
					{ nextButton }
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
