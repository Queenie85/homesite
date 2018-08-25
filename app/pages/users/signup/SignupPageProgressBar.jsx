import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignupPage from './SignupPage'
import { signup } from '../../../actions/userActions'
import { Steps } from 'antd'

const Step = Steps.Step
const stepTitle = [{
    title: 'Basic Information' },{
    title: 'Education Background' }, {
    title: 'Current & Past Experience'
}]

class SignupPageProgressBar extends Component {
    constructor(props) {
		super(props)
		this.state = {
            currentStep: 0,
            content: <SignupPage
                        userSignupState={this.props.userSignupState}
                        signupHandler={this.signupHandler.bind(this)}
                        nextHandler={this.nextHandler.bind(this)}/>
        }
    }

    signupHandler(firstName, lastName, preferredName, phone, email, password, consented) {
        this.props.dispatch(signup(firstName, lastName, preferredName, phone, email, password, consented))
    }

    nextHandler(b) {
        let s = this.state.currentStep + 1
        if (b === true) {
            if ( s < stepTitle.length ) {
                this.setState({
                    currentStep: s,
                })
            }
        }
    }

    // updatePage(step) {
    //     if (step === 1) {
    //         this.setState({
    //             content: <SignupPageTitleBar/>
    //         })
    //     }
    // }
    //
    // next() {
    //     let s = this.state.currentStep + 1
    //     if ( s < stepTitle.length ) {
    //         this.setState({
    //             currentStep: s,
    //         })
    //         this.updateComponent(s)
    //     }
    //     if ( s === stepTitle.length - 1 ) {
    //         this.handleClickSignup()
    //     }
    // }

    // back() {
    //     let s = this.state.currentStep - 1
    //     if ( s >= 0 ) {
    //         this.setState({
    //             currentStep: s
    //         })
    //         this.updateComponent(s)
    //     }
    // }

    render() {
        return (
            <div>
                <Steps current={ this.state.currentStep }>
                    { stepTitle.map((s, i) => <Step key={i} title={s.title}/>) }
                </Steps>
                <div className="progress-container" >
                    { this.state.content }
                </div>
                {/* <div className="progress-btn-container">
                    <Button type="primary"
                            size="large"
                            // disabled={ !this.state.signupValid }
                            onClick={ this.back.bind(this) }
                            className="progress-prev-btn">
                            Back>
                    </Button>
                    <Button type="primary"
                            size="large"
                            onClick={ this.next.bind(this) }
                            // onClick={ this.handleClickSignup.bind(this) }
                            className="progress-nxt-btn">
                            Next>
                    </Button>
                </div> */}
            </div>
        )
    }
}

function select(state) {
    return {
        userSignupState: state.userSignupState
    }
}

export default connect(select)(SignupPageProgressBar)
