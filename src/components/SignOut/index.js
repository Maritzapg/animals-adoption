import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <a className="nav-link" onClick={firebase.doSignOut}>
    Salir
  </a>
);

export default withFirebase(SignOutButton);