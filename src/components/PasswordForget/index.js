import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { SignInLink } from '../SignIn/'
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,

};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE, msg: false };
        this.renderMsg = this.renderMsg.bind(this)
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE, msg: true });
            })
            .catch(error => {
                if(error.code==='auth/user-not-found')
                {
                    error.message = 'No hay registro de usuario correspondiente a este correo electrónico. El usuario puede haber sido eliminado.'
                }
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    renderMsg() {
        if (this.state.msg) {
            return (
                <label>Te hemos enviado un correo con las indicaciones para cambiar tu contraseña y poder ingresar.</label>
            )
        }
    }

    render() {
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <div className="font-login2">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Restablecimiento de contraseña</h5>
                                    <div className="form-label-group">
                                        <div>
                                            <label htmlFor="inputUserame">Por favor ingresa tu correo electrónico.</label>
                                        </div>
                                    </div>
                                    <form className="form-signin" onSubmit={this.onSubmit}>
                                        <div className="form-label-group">
                                            <input
                                                type="email" id="inputEmail"
                                                className="form-control"
                                                placeholder="Correo electrónico"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.onChange}
                                                required autoFocus
                                            />
                                            <label htmlFor="inputEmail">Correo electrónico</label>
                                        </div>
                                        {this.renderMsg()}
                                        <hr className="my-4" />
                                        <button
                                            className="btn btn-lg btn-primary btn-block text-uppercase"
                                            type="submit"
                                            disabled={isInvalid}
                                        >
                                            Restablecer contraseña
                                        </button>
                                        <SignInLink />
                                    </form>
                                    <br />
                                    {error && <p>{error.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>¿Olvidaste la constraseña?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };