import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { cookieDomain, baseUrl } from '../../../config/config'
import { isValidInternalURL } from '../../../util/validationHelpers'
import loadingImage from '../../../assets/img/loading.gif'
import PropTypes from 'prop-types'
import { Button } from 'antd'

export default class SignupEducationStep extends Component {
    constructor(props) {
        super(props)
        this.state = {
            school: "",
            yearOfGraduation: "",
            major: "",
            validInputForSignUp: {
                school: false,
                yearOfGraduation: false,
                major: false,
            },
            signupValid:false,
            countdownSeconds: 3,
        }
        this.timer = 0
        this.startTimer = this.startTimer.bind(this)
        this.countDown = this.countDown.bind(this)
    }

    startTimer() {
        if (this.timer === 0) {
            this.timer = window.setInterval(this.countDown, 1000)
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let countdownSeconds = this.state.countdownSeconds - 1
        this.setState({
            countdownSeconds: countdownSeconds,
        })
        if (countdownSeconds === 0) {
            window.clearInterval(this.timer)
            let callbackURL = this.props.query === undefined ? null : decodeURIComponent(this.props.query)
            if (isValidInternalURL(callbackURL, cookieDomain)) {
                window.location.href = baseUrl + 'users/signin' + '?callback=' + callbackURL
            } else {
                window.location.href = baseUrl + 'users/signin'
            }
        }
    }

    handleChangeSchool(event) {
		this.setState({
			school: event.target.value,
		})
	}

    handleChangeYearOfGraduation(event) {
        this.setState({
            yearOfGraduation: event.target.value,
        })
    }

    handleChangeMajor(event) {
        this.setState({
            major: event.target.value,
        })
    }

    handleClickNext(event) {
		event.preventDefault()

		this.props.next()
	}

    render() {
        let { userSignupState } = this.props
        let signupMsg = userSignupState.signupMsg
        let signupSuccess = (
            <div id="signup" className="signup-success-page">
                <div className="signup-success-outer-container">
                    <div className="container clearfix">
                        <div className="">
                            <div>
                                <p>You have signed up successfully!</p>
                                <br/>
                                <br/>
                                <p>You will be redirected to sign in page in
                                    &nbsp;{this.state.countdownSeconds}
                                    &nbsp;seconds.</p>
                            </div>
                            <div className="center">
                                <img src={loadingImage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        let signupContent = (
            <div className="signup-page">
                <div className="signup-outer-container">
                    <div className="container clearfix">
                        <div className="signup-exception margin-bottom-30">
                            <span>{signupMsg}</span>
                        </div>
                        <form>
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <label>School</label>
                                    <input aria-label="school"
                                            className="border-white form-control transparent-input form-user"
                                            name="school"
                                            placeholder="School"
                                            type="text"
                                            value={this.state.value}
                                            onChange={this.handleChangeSchool.bind(this)}
                                            />
                                            <div className="help-block inline-error">
                                            </div>
                                            <span></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <label>Year of Graduation</label>
                                    <select aria-label="year of graduation"
                                            className="border-secondary form-control transparent-input form-user"
                                            name="year of graduation"
                                            placeholder="Year of Graduation"
                                            type="text"
                                            value={this.state.value}
                                            onChange={this.handleChangeYearOfGraduation.bind(this)}
                                            >
                                        <option value="0" selected disabled>Year</option>
                                        <option value="2018">2018</option>
                                        <option value="2017">2017</option>
                                        <option value="2016">2016</option>
                                        <option value="2015">2015</option>
                                        <option value="2014">2014</option>
                                        <option value="2013">2013</option>
                                        <option value="2012">2012</option>
                                        <option value="2011">2011</option>
                                        <option value="2010">2010</option>
                                        <option value="2009">2009</option>
                                        <option value="2008">2008</option>
                                        <option value="2007">2007</option>
                                        <option value="2006">2006</option>
                                        <option value="2005">2005</option>
                                        <option value="2004">2004</option>
                                        <option value="2003">2003</option>
                                        <option value="2002">2002</option>
                                        <option value="2001">2001</option>
                                        <option value="2000">2000</option>
                                        <option value="1999">1999</option>
                                        <option value="1998">1998</option>
                                        <option value="1997">1997</option>
                                        <option value="1996">1996</option>
                                        <option value="1995">1995</option>
                                        <option value="1994">1994</option>
                                        <option value="1993">1993</option>
                                        <option value="1992">1992</option>
                                        <option value="1991">1991</option>
                                        <option value="1990">1990</option>
                                    </select>
                                        <div className="help-block inline-error">
                                        </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <label>Major</label>
                                    <input aria-label="major"
                                                className="border-white form-control transparent-input"
                                                name="major"
                                                placeholder="Major"
                                                type="text"
                                                value={this.state.value}
                                                onChange={this.handleChangeMajor.bind(this)}
                                                />
                                                <div className="help-block inline-error">
                                                </div>
                                </div>
                            </div>
                            <div>
                                <br/>Already have an account with us?&nbsp;<Link to="/users/signin">
                                    Sign in</Link>&nbsp;instead.
                            </div>
                            <div className="back-btn-container">
                                <Button type="primary"
                                    size="large"
                                    onClick={ this.props.previous }
                                    className="col-xs-12">
                                    &lt;Back
                                </Button>
                            </div>
                            <div className="next-btn-container">
                                <Button type="primary"
                                    size="large"
                                    onClick={this.handleClickNext.bind(this)}
                                    className="col-xs-12">
                                    Next&gt;
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )

        if (userSignupState.signedUp) {
            this.startTimer()
            return signupSuccess
        }
        return signupContent
    }
}

SignupEducationStep.propTypes = {
    userSignupState: PropTypes.shape({
    }).isRequired,
}
