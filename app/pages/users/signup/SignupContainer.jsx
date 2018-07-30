import React, {Component} from 'react'
import SignupPageTitle from './SignupPageTitle'
import SignupPageTitleBar from './SignupPageTitleBar'
import SignupPageProgressBar from "./SignupPageProgressBar"

class SignupContainer extends Component {
    render() {
        return (
            <div className="signup-container">
                <div className="title-container">
                    <SignupPageTitle />
                    <SignupPageTitleBar />
                </div>
                <div className="progress-bar-container">
                    <SignupPageProgressBar />
                </div>
            </div>
        )
    }
}

export default SignupContainer