import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div>
        <SignInForm />
        {/* <PasswordForgetLink />
    <SignUpLink /> */}
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
    'auth/account-exists-with-different-credential';
const ERROR_MSG_ACCOUNT_EXISTS = `
An account with an E-Mail address to
this social account already exists. Try to login from
this account instead and associate your social accounts on
your personal account page.
`;

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.LANDING);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div className="container-fluid">
                <div className="row no-gutter">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h3 className="login-heading mb-4">¡Bienvenido!</h3>

                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-label-group">
                                                <input
                                                    id="inputEmail"
                                                    required autoFocus
                                                    name="email"
                                                    value={email}
                                                    onChange={this.onChange}
                                                    type="email"
                                                    placeholder="Email Address"
                                                    className="form-control"
                                                />
                                                <label htmlFor="inputEmail">Correo</label>
                                            </div>
                                            <div className="form-label-group">
                                                <input
                                                    id="inputPassword"
                                                    className="form-control"
                                                    name="password"
                                                    value={password}
                                                    onChange={this.onChange}
                                                    type="password"
                                                    placeholder="Password"
                                                    required
                                                />
                                                <label htmlFor="inputPassword">Contraseña</label>
                                            </div>
                                            {/* <div className="custom-control custom-checkbox mb-3">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Recordar contraseña</label>
                                            </div> */}
                                            <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                type="submit"
                                                disabled={isInvalid}
                                            >
                                                Iniciar sesión
                                            </button>
                                            <div className="text-center">
                                                <PasswordForgetLink />
                                            </div>
                                            <div className="text-center">
                                                <SignUpLink />
                                            </div>
                                            {error &&
                                                <div className="text-center">
                                                    <a className="small">{error.message}</a>
                                                </div>
                                            }
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const SignInLink = () => (
    <Link to={ROUTES.SIGN_IN} className="d-block text-center mt-2 small">Iniciar sesión</Link>
  );

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignInLink };