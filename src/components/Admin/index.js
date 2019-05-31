import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import firebase from 'firebase';
import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const AdminPage = () => (
    <div >
        <Switch>
            <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
            <Route exact path={ROUTES.ADMIN} component={UserList} />
        </Switch>
    </div>
);

class UserListBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
            open: false,
            selectedUser: {},
            search: '',
            filteredUsers: null
        };
        this.handleDeleteUser = this.handleDeleteUser.bind(this)
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    handleClickOpen = (user) => {
        this.setState({ open: true, selectedUser: user });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleDeleteUser() {
        this.props.firebase.user(this.state.selectedUser.uid).remove()
        this.handleClose()
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0, 20)})

        let filteredUsers = this.state.users.filter(
            (user) => {
                return (
                    user.username.toLowerCase().indexOf((event.target.value.substr(0, 20)).toLowerCase()) !== -1
                )
            }
        )
        this.setState({filteredUsers})
    }

    showPopupDelete() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Eliminar usuario</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Seguro que deseas eliminar a {this.state.selectedUser.username}?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDeleteUser} color="primary">
                        Eliminar
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        const { users, loading } = this.state;
        var usersResult = this.state.filteredUsers === null ? users : this.state.filteredUsers
        return (
            <div>
                {this.showPopupDelete()}
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-md-8 col-lg-6">
                            <div className="d-flex align-items-right py-3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-9 col-lg-8 mx-auto">
                                            <form>
                                                <div className="form-label-group">
                                                    <input onChange={this.updateSearch.bind(this)} value={this.state.search} type="text" id="inputUserame" className="form-control" placeholder="Username" required autoFocus />
                                                    <label htmlFor="inputUserame">Buscar usuario</label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table">
                    {loading && <label>Loading ...</label>}
                    <br />
                    <div className="container-fluid" style={{ display: 'table' }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Detalle</th>
                                <th scope="col">Eliminar usuario</th>
                            </tr>
                        </thead>
                        <tbody>

                            {usersResult.map((user, i) => (
                                <tr key={user.uid}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.roles ? user.roles[0] : 'Usuario'}</td>
                                    <td>
                                        <Link className="btn btn-info"
                                            to={{
                                                pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                                state: { user },
                                            }}
                                        >
                                            Ver más
                                        </Link>

                                        {/* <button className="btn btn-info" type="submit">Ver más</button> */}
                                    </td>
                                    {user.roles ? 
                                        ''
                                        : 
                                        <td><button onClick={() => this.handleClickOpen(user)} role="button" data-toggle="modal" className="btn btn-danger" type="button">Eliminar</button></td>
                                    }
                                </tr>
                            ))}

                        </tbody>
                    </div>
                </table>
            </div>
        );
    }
}

class UserItemBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: null,
            ...props.location.state,
        };
    }

    componentDidMount() {
        if (this.state.user) {
            return;
        }

        this.setState({ loading: true });

        this.props.firebase
            .user(this.props.match.params.id)
            .on('value', snapshot => {
                this.setState({
                    user: snapshot.val(),
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.match.params.id).off();
    }

    onSendPasswordResetEmail = () => {
        this.props.firebase.doPasswordReset(this.state.user.email)
        this.props.history.push(ROUTES.ADMIN)
    }

    render() {
        const { user, loading } = this.state;

        return (
            <div>
                {loading && <div>Loading ...</div>}

                {user && (
                    <div className="container-fluid">
                        <div className="row no-gutter">
                            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image2"></div>
                            <div className="col-md-8 col-lg-6">
                                <div className="login d-flex align-items-center py-5">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-9 col-lg-8 mx-auto">
                                                <h3 className="login-heading mb-4 text-uppercase" align="center">Detalles de usuario</h3>
                                                <form>
                                                    <div className="form-label-group">
                                                        <h4 className="login-heading mb-4 align-items-center" align="center">Usuario</h4>
                                                        <h6 className="login-heading mb-4 align-items-center" align="center">{user.username}</h6>
                                                    </div>
                                                    <hr />
                                                    <div className="form-label-group">
                                                        <h4 className="login-heading mb-4 align-items-center" align="center">Correo</h4>
                                                        <h6 className="login-heading mb-4 align-items-center" align="center">{user.email}</h6>
                                                    </div>
                                                    <hr />

                                                    <div className="form-label-group">
                                                        <h4 className="login-heading mb-4 align-items-center" align="center">Uid</h4>
                                                        <h6 className="login-heading mb-4 align-items-center" align="center">{this.props.match.params.id}</h6>
                                                    </div>
                                                    <hr/> 

                                                    <button
                                                        className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                        type="button"
                                                        onClick={this.onSendPasswordResetEmail}
                                                    >
                                                        Enviar reseteo de la constraseña
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

/*const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
         <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>e-mail:</strong> {user.email}
        </span>
        {'    '}
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);*/

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const condition = authUser =>
    authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase,
)(AdminPage);

//export default withFirebase(AdminPage);