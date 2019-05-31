import React, { Component } from 'react';
import { compose } from 'recompose';
import firebase from 'firebase';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withAuthorization } from '../Session';

const INITIAL_STATE = {
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
    user:{},
    pet:{}
};

class AdoptionForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...INITIAL_STATE
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount()
    {
        const userUid = this.props.location.state.userUid
        
        this.props.firebase
            .user(userUid)
            .on('value', snapshot => {
                this.setState({
                    user: snapshot.val()
                })
            })
    }

    onSubmit(event){
        const { 
            numberPhone,
            numberPeople,
            numberSons,
            ageYoungestSon,
            houseType,
            whyThisPet,
            petsInThePresent,
            petsInThePast,
            agreePeriodicVisit,
            haveAllergicFamily,
            ifChangeHouse,
            wouldChangeDeal,
            howWillBeInTwoYears,
            enoughSpace,
            ifBadConduct,
            enoughMoney,
            doWantSterilize 
        } = this.state;
        
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let today  = new Date();
        const date = today.toLocaleDateString("es", options)
        const pet = this.props.location.state.pet
        var user = this.state.user
        user.uid = this.props.location.state.userUid

        // Create a register of adoption form in your Firebase realtime database
        var newRef = firebase.database().ref(`/adoptionForms`)
        newRef.push().set({
            pet,
            user,
            numberPhone,
            numberPeople,
            numberSons,
            ageYoungestSon,
            houseType,
            whyThisPet,
            petsInThePresent,
            petsInThePast,
            agreePeriodicVisit,
            haveAllergicFamily,
            ifChangeHouse,
            wouldChangeDeal,
            howWillBeInTwoYears,
            enoughSpace,
            ifBadConduct,
            enoughMoney,
            doWantSterilize, 
            created_at: date 
            //this.props.firebase.serverValue.TIMESTAMP,
        })
        .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            this.setState({ error });
        });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            numberPhone,
            numberPeople,
            numberSons,
            ageYoungestSon,
            houseType,
            whyThisPet,
            petsInThePresent,
            petsInThePast,
            agreePeriodicVisit,
            haveAllergicFamily,
            ifChangeHouse,
            wouldChangeDeal,
            howWillBeInTwoYears,
            enoughSpace,
            ifBadConduct,
            enoughMoney,
            doWantSterilize
        } = this.state; 

        const isInvalid =
            numberPhone === '' ||
            numberPeople === '' ||
            numberSons === '' || 
            ageYoungestSon === '' ||
            houseType === '' ||
            whyThisPet === '' ||
            petsInThePresent === '' ||
            petsInThePast === '' ||
            agreePeriodicVisit === '' ||
            haveAllergicFamily === '' ||
            ifChangeHouse === '' ||
            wouldChangeDeal === '' ||
            howWillBeInTwoYears === '' ||
            enoughSpace === '' ||
            ifBadConduct === '' ||
            enoughMoney === '' ||
            doWantSterilize === '';
            
        return (
            <div className="container-fluid">
                <div className="row no-gutter">
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image-cuestionario"
                        style={{ backgroundImage: 'url(' + this.props.location.state.pet.photo + ')' }}
                        //style={backgroundImage: url('https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')}
                    ></div>
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-15 col-lg-12 mx-auto">
                                        <h1 className="login-heading mb-4">Cuestionario</h1>
                                        <form onSubmit={this.onSubmit}>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">Número telefónico</h6>
                                                <input
                                                    name="numberPhone"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Teléfono"
                                                    value={numberPhone}
                                                    onChange={this.onChange}
                                                    required autoFocus
                                                />
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Cuantas personas viven con usted?</h6>
                                                <select className="form-control" name="numberPeople" onChange={this.onChange} value={numberPeople}>
                                                    <option value='0'>Ninguna</option>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>Más de 3</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Cuántos hijos tiene?</h6>
                                                <select className="form-control" name="numberSons" onChange={this.onChange} value={numberSons}>
                                                    <option value='0'>Ninguno</option>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>Más de 3</option>
                                                </select>
                                            </div>

                                            <h6 className="login-heading mb-2">Si la respuesta anterior fue positiva, ¿Cuántos años tiene su hijo/a menor?</h6>
                                            <input 
                                                name="ageYoungestSon"
                                                type="number" 
                                                min="0"
                                                className="form-control" 
                                                placeholder="Edad en años" 
                                                value={ageYoungestSon}
                                                onChange={this.onChange}
                                                required autoFocus 
                                            />

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Qué tipo de vivienda tiene?</h6>
                                                <select className="form-control" name="houseType" onChange={this.onChange} value={houseType}>
                                                    <option value='Ninguna'>Ninguna</option>
                                                    <option value='Apartamento'>Apartamento</option>
                                                    <option value='Casa'>Casa</option>
                                                    <option value='Finca'>Finca</option>
                                                    <option value='Otra'>Otra</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Por qué desea adoptar esta mascota?</h6>
                                                <textarea 
                                                    name="whyThisPet"
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Escriba aquí" 
                                                    value={whyThisPet}
                                                    onChange={this.onChange}
                                                    required autoFocus
                                                />
                                            </div>

                                            <div className="form-label-group">
                                            <h6 className="login-heading mb-2">¿Actualmente tiene otras mascotas?</h6>
                                            <select className="form-control" name="petsInThePresent" value={petsInThePresent} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Anteriormente ha tenido otras mascotas?</h6>
                                                <select className="form-control" name="petsInThePast" value={petsInThePast} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Está de acuerdo en que se realice visita periódica para ver cómo se encuentra la mascota adoptada?</h6>
                                                <select className="form-control" name="agreePeriodicVisit" value={agreePeriodicVisit} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Algún miembro de su familia es alérgico a los animales o sufre de asma?</h6>
                                                <select className="form-control" name="haveAllergicFamily" value={haveAllergicFamily} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">Si por algún motivo tuviera que cambiar de domicilio, ¿Qué pasaría con su mascota?</h6>
                                                <textarea 
                                                    name="ifChangeHouse"
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Escriba aquí" 
                                                    value={ifChangeHouse}
                                                    onChange={this.onChange}
                                                    required autoFocus 
                                                />
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">En caso de una ruptura en la familia (divorcio, fallecimiento) o de la llegada de un nuevo hijo ¿Cree usted que cambie el trato hacia la mascota?</h6>
                                                <select className="form-control" name="wouldChangeDeal" value={wouldChangeDeal} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Cómo se ve con su mascota adoptada dentro de 2 años?</h6>
                                                <textarea 
                                                    name="howWillBeInTwoYears"
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Escriba aquí" 
                                                    value={howWillBeInTwoYears}
                                                    onChange={this.onChange}
                                                    required autoFocus 
                                                />
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Considera que cuenta con espacio suficiente para que la mascota este cómoda?</h6>
                                                <select className="form-control" name="enoughSpace" value={enoughSpace} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">Si el comportamiento no es el que usted desea, ¿Qué medidas tomaría?</h6>
                                                <textarea 
                                                    name="ifBadConduct"
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Escriba aquí" 
                                                    value={ifBadConduct}
                                                    onChange={this.onChange}
                                                    required autoFocus 
                                                />
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Cuenta con el presupuesto suficiente para la alimentación de la mascota adoptada?</h6>
                                                <select className="form-control" name="enoughMoney" value={enoughMoney} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Asume el compromiso de esterilizar al adoptado una vez que tenga la edad suficiente?</h6>
                                                <select className="form-control" name="doWantSterilize" value={doWantSterilize} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            <h6>Después de enviar el formulario y evaluar tus respuestas, te contactaremos. ¡Ánimo!</h6>
                                            <br/>
                                            <button disabled={isInvalid} className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Enviar Cuestionaro</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const condition = authUser => !!authUser;

export default compose(
    withFirebase,
    withAuthorization(condition),
)(AdoptionForm);