import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const FormsByPetPage = () => (
    <div>
        <FormsByPetResult />
    </div>
);

const style = {
    minWidth: '260px'
}

const INITIAL_STATE = {
    loading: false,
    formsByPet: [
        {
            numberPhone: 0,
            numberPeople: 0,
            numberSons: 0,
            ageYoungestSon: 0,
            houseType: 'Ninguna',
            whyThisPet: '',
            petsInThePresent: false,
            petsInThePast: false,
            agreePeriodicVisit: false,
            haveAllergicFamily: false,
            ifChangeHouse: '',
            wouldChangeDeal: false,
            howWillBeInTwoYears: '',
            enoughSpace: false,
            ifBadConduct: '',
            enoughMoney: false,
            doWantSterilize: false,
            pet: {
                name: '',
                photo: '',
            },
            user: {
                uid: '',
                username: '',
                email: ''
            }
        }
    ]
}

class FormsByPet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...INITIAL_STATE,
        }
    }

    componentDidMount() {
        this.setState({ loading: true });

        const rootRefForms = this.props.firebase.adoptionForms()

        rootRefForms.on('value', (snapshot) => {
            var formsByPet = []
            snapshot.forEach((form) => {
                if(form.val().pet.uid === this.props.location.state.pet.uid)
                    formsByPet.push(form.val())
            })

            this.setState({
                formsByPet: formsByPet,
                loading: false,
            })
        });
    }

    render() {
        const { formsByPet, loading } = this.state;

        return (
            <div>
                {loading && <label>Loading ...</label>}

                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-md-8 col-lg-6">
                            <div className="d-flex align-items-right py-3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-9 col-lg-8 mx-auto">
                                            <form>
                                                <div className="form-label-group">
                                                    <h1 htmlFor="inputUserame">Mascota</h1>
                                                    <h3 htmlFor="inputUserame">{formsByPet[0].pet.name}</h3>
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
                    <div className="container-fluid">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th style={style} scope="col">Nombre</th>
                                <th style={style} scope="col">Correo</th>
                                <th style={style} scope="col">Fecha de formulario</th>
                                <th style={style} scope="col">Telefono</th>
                                <th style={style} scope="col" data-toggle="modal">Ver formulario</th>
                            </tr>
                        </thead>
                        <tbody>

                            {formsByPet.map((form, i) => (
                                <tr key={form.uid}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{form.user.username}</td>
                                    <td>{form.user.email}</td>
                                    <td>{form.created_at}</td>
                                    <td>{form.numberPhone}</td>
                                    <td>
                                        {/* <Link className="btn btn-info"
                                            to={{
                                                pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                                state: { user },
                                            }}
                                        >
                                            Ver más
                                        </Link> */}

                                        <button onClick={() => this.handleClickOpen(form)} className="btn btn-info" type="button">Ver más</button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <th scope="row">1</th>
                                <td>Larry</td>
                                <td>Larry@correo.com</td>
                                <td>15-05-19</td>
                                <td>2345678</td>

                                <td><button href="#victorModal" role="button" data-toggle="modal" className="btn btn-info" type="submit">Ver más</button></td>

                                <div id="victorModal" className="modal fade">
                                    <div className="modal-dialog">
                                        <ul>
                                        <div className="modal-content">
                                            <li>
                                            <div className="modal-header">
                                                <h5 className="modal-title">Formulario diligenciado</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" />
                                                <span aria-hidden="true">&times;</span>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>Número de telefono</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>12345678</small></p>
                                                </div>
                                            </div>
                                            </li>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Cuantas personas conforman su nucleo familiar?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>1</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Cuantas personas viven con usted?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>3</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body  modal-header">
                                                <div className="left">
                                                    <p>¿Cuantas hijos tiene?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>3</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Entre que edades se encientran sus hijos?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>0-9 meses</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Que tipo de vivienda tiene?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>Casa</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body">
                                                <div className="left">
                                                    <p>¿Por qué desea adoptar una mascota?</p>
                                                </div>
                                                <div className="centerrr">
                                                    <p><small>asdfgjnbfvdscaxcsdfngbvdcsvgf nbvdscavd gbvdcsafdvsc</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Actualmente tiene otras mascotas?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>si</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>Si la respuesta anterior fue positiva, ¿Hace cuanto tiempo tiene la mascota?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>Menos de 1 año</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Anteriormente ha tenido otras mascotas?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>No</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Está de acuerdo en que se realicen visita periódica para ver cómo se encuentra la mascota adoptado?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>No</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Están todos los mienbro de su familia deacuerdo en adoptar?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>No</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Algun miembro de su familia es alérgico a los animales o sufre de asma?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>No</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>En caso de alquiler, ¿Sus arrendadores permiten mascotas en la vivienda?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>No</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>Si por algún motivo tuviera que cambiar de domicilio, ¿Qué pasaría con su mascota?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>No</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>En caso de una ruptura en la familia (divorcio, fallecimiento) o de la llegada de un nuevo hijo ¿cree usted que cambie el trato hacia la mascota?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>No</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body">
                                                <div >
                                                    <p>¿Cómo se ve con su mascota adoptada dentro de 5 años?</p>
                                                </div>
                                                <div className="centerrr">
                                                    <p><small>asfdgfhgjmhnbvcvebrtbvec</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Considera usted que cuenta con espacio sufuciente para que la mascota este cómodo?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>no</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Cuánto tiempo pasará sola la mascota?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>2 horas</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body">
                                                <div className="left">
                                                    <p>¿Si el comportamiento no es el que usted desea, qué medidas tomaría?</p>
                                                </div>
                                                <div className="centerrr">
                                                    <p><small>asdfbgnhyuynrbrvewc</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Cuenta con el presupuesto sufuciente para la alimentación de la mascota adoptada?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>si</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Quién será el responsable y se hará cargo de cubrir los gastos del adoptado?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>si</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Cuenta con los recursos para cubrir los gastos veterinarios?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>si</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-body modal-header">
                                                <div className="left">
                                                    <p>¿Asume el compromiso de esterilizar al adoptado una vez que tenga la edad suficiente?</p>
                                                </div>
                                                <div className="right">
                                                    <p><small>si</small></p>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-success" data-dismiss="modal">Aprobar Adopción</button>
                                                <button type="button" className="btn btn-danger">Denegar Adopción</button>
                                            </div>
                                        </div>
                                        </ul>
                                    </div>
                                </div>
                            </tr>
                        </tbody>
                    </div>
                </table>
            </div>
        )
    }
}

const condition = authUser =>
    authUser && authUser.roles.includes(ROLES.ADMIN);

const FormsByPetResult = compose(
    withRouter,
    withAuthorization(condition),
    withFirebase,
)(FormsByPet);

export { FormsByPetPage };

export default FormsByPetResult;