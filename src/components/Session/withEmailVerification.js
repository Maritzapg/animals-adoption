import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
        .map(provider => provider.providerId)
        .includes('password');

const withEmailVerification = Component => {
    class WithEmailVerification extends React.Component {
        constructor(props) {
            super(props);
            this.state = { isSent: false };
        }

        onSendEmailVerification = () => {
            this.props.firebase
                .doSendEmailVerification()
                .then(() => this.setState({ isSent: true }));
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        needsEmailVerification(authUser) ? (
                            <div className="font-login">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-10 col-xl-9 mx-auto">
                                            <div className="card card-signin2 flex-row my-5">
                                                <div className="card-img-left2 d-none d-md-flex">
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title text-center">Gracias por registrarte</h5>
                                                    <div className="form-signin">
                                                        <br /><br />
                                                        <div className="form-label-group">
                                                            <div>
                                                                {this.state.isSent ? (
                                                                    <label htmlFor align="center">
                                                                        Confirmación de correo electrónico enviada:
                                                                        revise sus correos electrónicos
                                                                        (se incluye la carpeta de correo no deseado)
                                                                        para recibir un correo electrónico de confirmación.
                                                                        Actualice esta página una vez que haya confirmado su correo electrónico.
                                                                    </label>
                                                                ) : (
                                                                        <label htmlFor="inputUserame" align="center">
                                                                            Verifique su correo electrónico: revise sus correos electrónicos
                                                                            (se incluye la carpeta de correo no deseado)
                                                                            para un correo electrónico de confirmación o
                                                                            envíe otro correo electrónico de confirmación.
                                                                        </label>
                                                                    )}
                                                            </div>
                                                        </div>

                                                        <hr />

                                                        <button
                                                            className="btn btn-lg btn-primary btn-block text-uppercase"
                                                            type="button"
                                                            onClick={this.onSendEmailVerification}
                                                            disabled={this.state.isSent}
                                                        >
                                                            Enviar mensaje confirmación
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                                <Component {...this.props} />
                            )
                    }
                </AuthUserContext.Consumer>
            );
        }
    }
    return withFirebase(WithEmailVerification);
};

export default withEmailVerification;