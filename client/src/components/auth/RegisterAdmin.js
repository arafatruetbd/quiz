import React, { Component, Fragment } from 'react';
import  { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';

import { registerAdmin } from '../../actions/authActions';
import isEmpty from '../../validation/is-empty';

import TextInputGroup from '../input-groups/TextInputGroup';
import Spinner from '../common/Spinner';

class RegisterAdmin extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            loading: false,
            errors: {}
        };
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (!isEmpty(nextProps.errors)) {
            const { errors } = nextProps;
            if (errors.message) {
                M.toast({
                    html: errors.message,
                    classes: 'toast-invalid'
                });
                this.setState({
                    loading: false
                });
            } else {
                M.toast({
                    html: 'Invalid input data!',
                    classes: 'toast-invalid'
                });
                this.setState({
                    errors: nextProps.errors,
                    loading: false
                });
            }
        } else {
            M.toast({
                html: 'Signup successful!',
                classes: 'toast-valid',
                displayLength: 5000,
                completeCallback: () => {
                    this.props.history.push('/login/admin');
                }

            });
            document.getElementById('registerForm').reset();
            this.setState({
                username: '',
                password: '',
                confirmPassword: '',
                loading: false,
                errors: {}
            });
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        this.props.registerAdmin(user, this.props.history);
        this.setState({
            loading: true
        });
    }

    render () {
        const { errors } = this.state;
        return (
            <Fragment>
                <Helmet><title>Register Admin - Quiz</title></Helmet>
                <section className="signup-container">
                    <div className="form-container">
                        <form id="registerForm" onSubmit={this.handleSubmit}>
                            <h3>Create an Account</h3>
                            <div className="input-container">                             
                                <TextInputGroup 
                                    label="Username"
                                    id="username"
                                    name="username"
                                    value={this.state.username}
                                    errorMessage={errors.username}
                                    onChange={this.onChange}
                                    icon="mdi mdi-alphabetical"
                                    info="User name must be at least 5 characters long."
                                />
                                <TextInputGroup 
                                    type="password"
                                    label="Password"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    errorMessage={errors.password}
                                    onChange={this.onChange}
                                    icon="mdi mdi-lock-outline"
                                    info="Password must be at least 8 characters long."
                                />
                                <TextInputGroup 
                                    type="password"
                                    label="Confirm Password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    errorMessage={errors.confirmPassword}
                                    onChange={this.onChange}
                                    icon="mdi mdi mdi-lock-outline"
                                />
                                <div className="row">
                                    <div className="col">
                                        <input 
                                            className="signupButton"
                                            type="submit"
                                            value="Register"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Already have an account? <Link to="/login/admin">Login!</Link></p>
                            </div>
                        </form>
                    </div>
                </section>
                <Spinner loading={this.state.loading} text="Please wait . . ." />
            </Fragment>
        );
    }
}

RegisterAdmin.propTypes = {
    errors: PropTypes.object,
    registerAdmin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps, { registerAdmin })(RegisterAdmin);