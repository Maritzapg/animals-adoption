import React, { Component  } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
  constructor(props) {
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
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        {/* <span>
          <strong>ID:</strong> {user.uid}
        </span>*/}
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
);

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);
export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);

//export default withFirebase(AdminPage);