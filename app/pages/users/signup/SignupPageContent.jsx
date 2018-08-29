import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import SignupPage from './SignupPage'
import { signup } from '../../../actions/userActions'
import { Steps } from 'antd'

const Step = Steps.Step

class SignupPageContent extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			currentStep: 0
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.currentStep !== this.state.currentStep
	}

	getStepContents() {
		return [
			['Basic Information', 
			<SignupPage
				userSignupState={this.props.userSignupState}
				count="1"/>],
			['Education Background', 
				<SignupPage
				userSignupState={this.props.userSignupState}
				count="2"/>],
			['Current & Past Experience', 
				<SignupPage
				userSignupState={this.props.userSignupState}
				count="3"/>]]
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

	signup(firstName, lastName, preferredName, phone, email, password, consented) {
		this.props.dispatch(signup(firstName, lastName, preferredName, phone, email, password, consented))
	}

	render() {
		const content = this.getStepContents()[this.state.currentStep][1]
		const nextButton = this.state.currentStep === this.getStepContents().length - 1
			? <Button type="primary"
				size="large"
				onClick={this.signup.bind(this)}
				className="progress-nxt-btn">
				Register
			</Button>
			: <Button type="primary"
				size="large"
				onClick={this.next.bind(this)}
				className="progress-nxt-btn">
				Next&gt;
			</Button>
		return (
			<div>
				<Steps current={ this.state.currentStep }>
					{ this.getStepContents().map((data, i) => <Step key={i} title={data[0]}/>) }
				</Steps>
				<div className="progress-container" >
					{content} 
				</div>
				<div className="progress-btn-container">
					<Button type="primary"
						size="large"
						disabled={ this.state.currentStep === 0 }
						onClick={this.previous.bind(this)}
						className="progress-prev-btn">
						&lt;Back
					</Button>
					{nextButton}
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
