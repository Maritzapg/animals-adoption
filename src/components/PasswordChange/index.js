import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <div className="font-login2">
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Cambiar contraseña</h5>
                  <div classNameName="form-label-group">
                    <div>
                      Cuenta: {this.props.mailAccount}
                    </div>
                  </div>
                  <br/>
                  <form className="form-signin" onSubmit={this.onSubmit}>
                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputPasswordOne"
                        className="form-control"
                        placeholder="Nueva contraseña"
                        value={passwordOne}
                        onChange={this.onChange}
                        name="passwordOne"
                        required autoFocus
                      />
                      <label for="inputPasswordOne">Nueva Contraseña</label>
                    </div>
                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputPasswordTwo"
                        className="form-control"
                        placeholder="Confirmar nueva contraseña"
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        required
                      />
                      <label for="inputPasswordTwo">Repetir contraseña</label>
                    </div>

                    <hr className="my-4" />

                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                      disabled={isInvalid}
                    >
                      Restablecer contraseña
                    </button>
                    <br />
                    {error && <p>{error.message}</p>}
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

export default withFirebase(PasswordChangeForm);