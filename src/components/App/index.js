import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import PetsListUser from '../PetsUser/PetsListUser';
import Pets from '../PetsAdmin/PetsListAdmin';
import AdoptionForm from '../PetsUser/AdoptionForm';
import RegistrationForm from '../PetsAdmin/RegistrationForm';
import PetCare from '../PetCare';
import FormsByPet from '../PetsAdmin/FormsByPet';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
    <Router>
        <div>
            <Navigation />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            {/* <Route path={ROUTES.PETS} component={Pets} /> */}
            <Route path={ROUTES.ADOPTION_FORM} component={AdoptionForm} />
            <Route path={ROUTES.REGISTER_PET} component={RegistrationForm} />
            <Route path={ROUTES.PETS_USER} component={PetsListUser} />
            <Route path={ROUTES.PET_CARE} component={PetCare} />
            <Route path={ROUTES.FORMS_BY_PET} component={FormsByPet} />
        </div>
    </Router>
);

export default withAuthentication(App);