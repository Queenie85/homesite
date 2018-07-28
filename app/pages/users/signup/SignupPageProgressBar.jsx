import React, { Component } from 'react'
import StepZilla from 'react-stepzilla'
import SignupPageTitle from './SignupPageTitle'

export default class SignupPageProgressBar extends Component {
    render() {
        const steps =
            [
                {name: 'Basic Information', component: <SignupPageTitle />},
                {name: 'Education Background', component: <SignupPageTitle />}
//                {name: 'Current & Past Experience', component: <Step2 />}
            ]

        return (
            <div>
                <div className='step-progress'>
                    <StepZilla
                        steps={steps}
                        preventEnterSubmission={true}
                        backButtonText='Back'
                        stepsNavigation={false}
                        startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
                        onStepChange={(step) => window.sessionStorage.setItem('step', step)}>
                    </StepZilla>
                </div>
            </div>
        )
    }
}