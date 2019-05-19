import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

/*class AdminPage extends Component {
  constructor(props) 
  {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      if(usersObject)
      {
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));

        this.setState({
          users: usersList,
          loading: false,
        });
      }else{
        this.setState({
          users: [],
          loading: false,
        });
      }
    });
  }

  render() {

    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <p>
          The Admin Page is accessible by every signed in admin user.
        </p>
        {loading && <div>Loading ...</div>}

        {users.length>0?<UserList users={users} />:'No hay usuarios registrados en la base de datos'}
      </div>
    );
  }
}*/

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
        };
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

    render() {
        const { users, loading } = this.state;

        return (
            <div>
                
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-md-8 col-lg-6">
                            <div className="d-flex align-items-right py-3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-9 col-lg-8 mx-auto">
                                            <form>
                                                <div className="form-label-group">
                                                    <input type="text" id="inputUserame" className="form-control" placeholder="Username" required autoFocus />
                                                    <label htmlFor="inputUserame">Buscar</label>
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
                    <br/>
                    <div className="container-fluid" style={{display:'table'}}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre de usuario</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Detalle</th>
                                <th scope="col">Eliminar usuario</th>
                            </tr>
                        </thead>
                        <tbody>

                            {users.map((user, i) => (
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
                                    <td><button href="#victorModal" role="button" data-toggle="modal" className="btn btn-danger" type="submit">Eliminar</button></td>
                                    <div id="victorModal" className="modal fade">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                    <div className="modal-body">
                                                        <p>¿Seguro que desea eliminar el usuario?</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-danger">Eliminar</button>
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

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
        this.props.firebase.doPasswordReset(this.state.user.email);
    };

    render() {
        const { user, loading } = this.state;

        return (
            <div>
                <h2>User ({this.props.match.params.id})</h2>
                {loading && <div>Loading ...</div>}

                {user && (
                    <div>
                        {/*<span>
                        <strong>ID:</strong> {user.uid}
                        </span>*/}
                        {'    '}
                        <span>
                            <strong>e-mail:</strong> {user.email}
                        </span>
                        {'    '}
                        <span>
                            <strong>Username:</strong> {user.username}
                        </span>
                        <br />
                        <span>
                            <button
                                type="button"
                                onClick={this.onSendPasswordResetEmail}
                            >
                                Send Password Reset
                            </button>
                        </span>
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