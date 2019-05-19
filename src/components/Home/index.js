import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification, AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import PetsListAdmin from '../PetsAdmin/PetsListAdmin'
import PetsListUser from '../PetsUser/PetsListUser'

const Home = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser.roles.includes(ROLES.ADMIN)?
            <PetsListAdmin /> : <PetsListUser />
        }
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(Home);