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

let style = {
    boxSizing: 'unset',
    content: {
        left: '50%',
        position: 'fixed',
        top: '50%',
        transform: 'translate(-50%,-50%)'
    }
};

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

    showPopupDelete()
    {
        debugger
        return(
            <section style={style.content} className="box_popup">
                <div className="box_vert">
                    <div className="row">
                        <div className="box visible">
                            <div className="top">
                                <div className="titular_icon">
                                    <div className="icon">
                                        {/* <img src={ require('../../../assets/images/subjectDescription/upload.svg') }
                                             alt=""/> */}
                                    </div>
                                    <p>dsdsdsd}</p>
                                </div>
                                {/* <div className="btn_cerrar" onClick={this.onClickClose}>
                                    <img src={ require('../../../assets/images/iconos/btn_cerrar_popup.svg') } alt=""/>
                                </div> */}
                            </div>
                            <div className="info">
                                <form onSubmit={this.handleUnitUploadChange}>
                                    <div className="btn_text"
                                         style={{cursor: 'auto', marginTop: '-5%', opacity: 'unset'}}>
                                        <p>frgfb:</p>
                                        <a target="_blank"
                                           href="https://d3e5zprszzkroi.cloudfront.net/templates/unit-import-template.docx">
                                            {/*href="https://s3.amazonaws.com/ser-plus-storage-dev/templates/unit-import-template.docx">*/}
                                            <span>unit-import-template.docx</span>
                                        </a>
                                    </div>
                                    <div className="box_input full">
                                        <input className="btn_text" type="file" id="fileToUpload"
                                              // onChange={this.onChangeInputFile}
                                               accept=".doc, .docx"
                                        />
                                    </div>
                                  
                                    <div className="box_botones" style={{marginTop: '8px'}}>
                                        <div className="box_center">ssfd
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
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
                                <th scope="col">Usuario</th>
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
                                    <td><button onClick={()=>this.showPopupDelete()} role="button" data-toggle="modal" className="btn btn-danger" type="button">Eliminar</button></td>
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