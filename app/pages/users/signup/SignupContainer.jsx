import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signup} from '../../../actions/userActions'
import SignupPageTitle from './SignupPageTitle'
import SignupPageTitleBar from './SignupPageTitleBar'
import SignupPageContent from "./SignupPageContent"

class SignupContainer extends Component {
    render() {
        return (
            <div>
                <div className="signup-container">
                    <div className="title-container">
                        <SignupPageTitle />
                        <SignupPageTitleBar />
                    </div>
                </div>
                <div className="progress-bar-container">
                    <SignupPageContent />
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

export default connect(select)(SignupContainer)
