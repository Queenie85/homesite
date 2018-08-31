import React, {Component} from 'react'
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
}

export default SignupContainer
