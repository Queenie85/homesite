import React, { Component } from 'react'
import {connect} from 'react-redux'
import StepZilla from 'react-stepzilla'
import SignupPage from './SignupPage'
import {signup} from '../../../actions/userActions'

class SignupPageProgressBar extends Component {
    render() {
        const steps =
            [
                {
                    name: 'Basic Information',
                    component: <SignupPage
                        userSignupState={this.props.userSignupState}
                        signupHandler={this.signupHandler.bind(this)}/>
                },
                {
                    name: 'Education Background',
                    component: <SignupPage
                        userSignupState={this.props.userSignupState}
                        signupHandler={this.signupHandler.bind(this)}/>
                },
                {
                    name: 'Current & Past Experience',
                    component: <SignupPage
                        userSignupState={this.props.userSignupState}
                        signupHandler={this.signupHandler.bind(this)}/>}
            ]

        return (
            <div>
                <div className='step-progress'>
                    <StepZilla
                        steps={steps}
                        preventEnterSubmission={true}
                        nextButtonText='Next>'
                        backButtonText='Back'
                        stepsNavigation={false}
                        startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
                        onStepChange={(step) => window.sessionStorage.setItem('step', step)}>
                    </StepZilla>
                </div>
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

export default connect(select)(SignupPageProgressBar)