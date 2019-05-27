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
    strengthPwd: 'Ninguna'
};

const style = {
    fontSize:14, 
    textAlign:'center'
};

const TEXTS = {
    LOW: 'Baja',
    MEDIUM: 'Media',
    HIGH: 'Alta'
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

        if(event.target.name === 'passwordOne')
        {
            // Create an array and push all possible values that you want in password
            var matchedCase = new Array();
            matchedCase.push("[$@$!%*#?&]"); // Special Charector
            matchedCase.push("[A-Z]");      // Uppercase Alpabates
            matchedCase.push("[0-9]");      // Numbers
            matchedCase.push("[a-z]");      // Lowercase Alpabates

            var ctr = 0;
            for (var i = 0; i < matchedCase.length; i++) {
                if (new RegExp(matchedCase[i]).test(event.target.value)) {
                    ctr++;
                }
            }

            // Display it
            var color = "";
            var strengthPwd = "";
            switch (ctr) {
                case 0:
                case 1:
                case 2:
                    strengthPwd = TEXTS.LOW;
                    color = "red";
                    break;
                case 3:
                    strengthPwd = TEXTS.MEDIUM;
                    color = "orange";
                    break;
                case 4:
                    strengthPwd = TEXTS.HIGH;
                    color = "green";
                    break;
            }

            this.setState({ [event.target.name]: event.target.value, strengthPwd, color });
        }
        else
        {
            this.setState({ [event.target.name]: event.target.value });
        }
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
            strengthPwd,
            color
        } = this.state; 

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' || strengthPwd !== TEXTS.HIGH;

        return (
            <div className="font-login">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-9 mx-auto">
                            <div className="card card-signin flex-row my-5">
                                <div className="card-img-left d-none d-md-flex" />
                                <div className="card-body">
                                    <h5 className="card-title text-center">Registrate</h5>
                                    <form onSubmit={this.onSubmit} className="form-signin">
                                        <div className="form-label-group">
                                            <input
                                                name="username"
                                                id="inputUserame"
                                                className="form-control"
                                                value={username}
                                                onChange={this.onChange}
                                                type="text"
                                                placeholder='Nombre de usuario'
                                                required autoFocus
                                            />
                                            <label htmlFor="inputUserame">Nombre de usuario</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input
                                                name="email"
                                                value={email}
                                                onChange={this.onChange}
                                                type="email"
                                                id="inputEmail"
                                                className="form-control"
                                                placeholder='Correo'
                                                required
                                            />
                                            <label htmlFor="inputEmail">Correo</label>
                                        </div>

                                        <hr />

                                        <div className="form-label-group">
                                            <input
                                                name="passwordOne"
                                                value={passwordOne}
                                                onChange={this.onChange}
                                                type="password"
                                                id="inputPassword"
                                                className="form-control"
                                                placeholder='Contraseña'
                                                required
                                            />
                                            <label htmlFor="inputPassword">Contraseña</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input
                                                name="passwordTwo"
                                                value={passwordTwo}
                                                onChange={this.onChange}
                                                type="password"
                                                id="inputConfirmPassword"
                                                className="form-control"
                                                placeholder='Confirmar contraseña'
                                                required
                                            />
                                            <label htmlFor="inputConfirmPassword">Confirmar contraseña</label>
                                        </div>
                                        {/* <div className="custom-control custom-checkbox mb-3">
                                            <input name="isAdmin"
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="isAdmin"
                                                checked={isAdmin}
                                                onChange={this.onChangeCheckbox}
                                            />
                                            <label className="custom-control-label" htmlFor="isAdmin">Administrador</label>
                                        </div> */}
                                        <hr/>
                                        <h6 style={style}>{strengthPwd === TEXTS.LOW || strengthPwd === TEXTS.MEDIUM?'La contraseña debe tener más de seis caracteres':''}</h6>
                                        <h6 style={style}>{strengthPwd === TEXTS.LOW || strengthPwd === TEXTS.MEDIUM?'al menos un número, una mayuscula, una minúscula':''}</h6>
                                        <h6 style={style}>{strengthPwd === TEXTS.LOW || strengthPwd === TEXTS.MEDIUM?'y un caracter especial':''}</h6>
                                        <label>Seguridad de la contraseña: <label style={{color:color}}>{strengthPwd}</label></label>

                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={isInvalid}>Regístrate</button>
                                        <SignInLink/>
                                            
                                        {error && <p>{error.message}</p>}
                                        <hr className="my-4" />

                                        {/* <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Regístrate con Google </button> */}
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
        ¿No tienes una cuenta? <Link to={ROUTES.SIGN_UP}>Regístrate</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };