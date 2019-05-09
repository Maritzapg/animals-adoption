import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { SignInLink } from '../SignIn/'
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => (
    <div>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne, isAdmin } = this.state;

        const roles = [];
        if (isAdmin) {
            roles.push(ROLES.ADMIN);
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        roles
                    });
            })
            .then(() => {
                return this.props.firebase.doSendEmailVerification();
            })
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onChangeCheckbox = event => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            isAdmin,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div className="font-login">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-9 mx-auto">
                            <div class="card card-signin flex-row my-5">
                                <div class="card-img-left d-none d-md-flex" />
                                <div class="card-body">
                                    <h5 class="card-title text-center">Regístrate</h5>
                                    <form onSubmit={this.onSubmit} class="form-signin">
                                        <div class="form-label-group">
                                            <input
                                                name="username"
                                                id="inputUserame"
                                                class="form-control"
                                                value={username}
                                                onChange={this.onChange}
                                                type="text"
                                                placeholder='Nombre de usuario'
                                                required autoFocus
                                            />
                                            <label htmlFor="inputUserame">Nombre de usuario</label>
                                        </div>

                                        <div class="form-label-group">
                                            <input
                                                name="email"
                                                value={email}
                                                onChange={this.onChange}
                                                type="email"
                                                id="inputEmail"
                                                class="form-control"
                                                placeholder='Correo'
                                                required
                                            />
                                            <label htmlFor="inputEmail">Correo</label>
                                        </div>

                                        <hr />

                                        <div class="form-label-group">
                                            <input
                                                name="passwordOne"
                                                value={passwordOne}
                                                onChange={this.onChange}
                                                type="password"
                                                id="inputPassword"
                                                class="form-control"
                                                placeholder='Contraseña'
                                                required
                                            />
                                            <label htmlFor="inputPassword">Contraseña</label>
                                        </div>

                                        <div class="form-label-group">
                                            <input
                                                name="passwordTwo"
                                                value={passwordTwo}
                                                onChange={this.onChange}
                                                type="password"
                                                id="inputConfirmPassword"
                                                class="form-control"
                                                placeholder='Confirmar contraseña'
                                                required
                                            />
                                            <label htmlFor="inputConfirmPassword">Confirmar contraseña</label>
                                        </div>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input name="isAdmin"
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="isAdmin"
                                                checked={isAdmin}
                                                onChange={this.onChangeCheckbox}
                                            />
                                            <label className="custom-control-label" htmlFor="isAdmin">Administrador</label>
                                        </div>

                                        <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={isInvalid}>Regístrate</button>
                                        <SignInLink/>
                                            
                                        {error && <p>{error.message}</p>}
                                        <hr class="my-4" />

                                        <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Regístrate con Google </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const SignUpLink = () => (
    <p>
        ¿No tienes una cuenta? <Link to={ROUTES.SIGN_UP}>Registrate</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };