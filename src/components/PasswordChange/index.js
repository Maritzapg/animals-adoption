import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
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

  render() {
    const { passwordOne, passwordTwo, error, strengthPwd, color } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || strengthPwd !== TEXTS.HIGH;

    return (
      <div className="font-login2">
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Cambiar contraseña</h5>
                  <div className="form-label-group">
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
                      <label htmlFor="inputPasswordOne">Nueva Contraseña</label>
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
                      <label htmlFor="inputPasswordTwo">Repetir contraseña</label>
                    </div>

                    <h6 style={style}>{strengthPwd === TEXTS.LOW || strengthPwd === TEXTS.MEDIUM?'La contraseña debe tener más de seis caracteres':''}</h6>
                    <h6 style={style}>{strengthPwd === TEXTS.LOW || strengthPwd === TEXTS.MEDIUM?'al menos un número, una mayuscula, una minúscula':''}</h6>
                    <h6 style={style}>{strengthPwd === TEXTS.LOW || strengthPwd === TEXTS.MEDIUM?'y un caracter especial':''}</h6>
                    <label>Seguridad de la contraseña: <label style={{color:color}}>{strengthPwd}</label></label>

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