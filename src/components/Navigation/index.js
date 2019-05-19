import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <NavigationAuth authUser={authUser} />
            ) : (
                    <NavigationNonAuth />
                )
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.LANDING}>Inicio</Link>
                        {/* <a className="nav-link" href="#">Inicio
                            <span className="sr-only">(current)</span>
                        </a> */}
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.HOME}>Mascotas</Link>
                        {/* <a className="nav-link" href="#">Cuidados de las mascotas</a>  */}
                    </li>
                    
                    {/* {authUser.roles.includes(ROLES.ADMIN) && (
                        <li className="nav-item">
                            <Link className="nav-link" to={ROUTES.PETS}>Mascotas</Link>
                        </li>
                    )} */}
                    {/* {!authUser.roles.includes(ROLES.ADMIN) && (
                        <li className="nav-item">
                            <Link className="nav-link" to={ROUTES.PETS_USER}>Mascotas</Link>
                        </li>
                    )} */}
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.ACCOUNT}>Cuenta</Link>
                        {/* <a className="nav-link" href="#">Mascotas para adoptar</a> */}
                    </li>
                    {authUser.roles.includes(ROLES.ADMIN) && (
                        <li className="nav-item">
                            <Link className="nav-link" to={ROUTES.ADMIN}>Administrar</Link>
                            {/* <a className="nav-link" href="#">Iniciar sesion</a> */}
                        </li>
                    )}
                    <li className="nav-item" style={{cursor:'pointer'}}>
                        <SignOutButton />
                        {/* <a className="nav-link" href="#">Regístrarse</a> */}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

const NavigationNonAuth = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.LANDING}>Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.PET_CARE}>Cuidados de las mascotas</Link> 
                    </li> 
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.PETS_USER}>Mascotas para adoptar</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.SIGN_IN}>Iniciar sesion</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={ROUTES.SIGN_UP}>Registrarse</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Navigation;