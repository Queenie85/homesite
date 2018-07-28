import React, {Component} from 'react'
import {connect} from 'react-redux'
import SignupExperienceStep from './SignupExperienceStep'
import SignupPage from './SignupPage'
import {signup} from '../../../actions/userActions'
import SignupPageTitle from './SignupPageTitle'
import SignupPageTitleBar from './SignupPageTitleBar'
import SignupPageProgressBar from "./SignupPageProgressBar"

class SignupContainer extends Component {
    render() {
        return (
            <div>
                <div className="title-container">
                    <SignupPageTitle />
                    <SignupPageTitleBar />
                    <SignupPageProgressBar/>
                </div>
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
