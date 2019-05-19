import React, { Component } from 'react';

const INITIAL_STATE = {
    numberPhone: '',
    numberPeople: '',
    numberSons: 0,
    ageYoungestSon: 0,
    houseType: '',
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
    doWantSterilize: false
};

class AdoptionForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...INITIAL_STATE
        }
    }

    onChange = event => {
        debugger
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
                    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image-cuestionario"></div>
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
                                                type="number" 
                                                className="form-control" 
                                                placeholder="Teléfono" 
                                                value={numberPhone}
                                                onChange={this.onChange}
                                                required autoFocus 
                                            />
                                        </div>

                                            {/* <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Cuantas personas conforman su nucleo familiar?</h6>
                                                <select className="form-control" id="exampleFormControlSelect1">
                                                    <option>Ninguna</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>Más de 5</option>
                                                </select>
                                            </div> */}

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Cuantas personas viven con usted?</h6>
                                                <select className="form-control" id="exampleFormControlSelect1" onChange={this.onChange} value={numberPeople}>
                                                    <option value='0'>Ninguna</option>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>Más de 3</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2" onChange={this.onChange} value={numberSons}>¿Cuántos hijos tiene?</h6>
                                                <select className="form-control" id="exampleFormControlSelect1">
                                                    <option value='0'>Ninguno</option>
                                                    <option value='1'>1</option>
                                                    <option value='2'>2</option>
                                                    <option value='3'>3</option>
                                                    <option value='4'>Más de 3</option>
                                                </select>
                                            </div>

                                            <h6 className="login-heading mb-2">Si la respuesta anterior fue positiva, ¿Cuántos años tiene su hijo/a menor?</h6>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                placeholder="Edad en años" 
                                                value={ageYoungestSon}
                                                onChange={this.onChange}
                                                required autoFocus 
                                            />

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Que tipo de vivienda tiene?</h6>
                                                <select className="form-control" onChange={this.onChange} value={houseType}>
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
                                                    type="text" id="inputcuestionario" 
                                                    className="form-control" 
                                                    placeholder="Escriba aquí" 
                                                    value={whyThisPet}
                                                    onChange={this.onChange}
                                                    required autoFocus
                                                />
                                            </div>

                                            <div className="form-label-group">
                                            <h6 className="login-heading mb-2">¿Actualmente tiene otras mascotas?</h6>
                                            <select className="form-control" value={petsInThePresent} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            {/* <div className="form-label-group">
                                                <h6 className="login-heading mb-2">Si la respuesta anterior fue positiva, ¿Hace cuanto tiempo tiene la mascota?</h6>
                                                <select className="form-control" id="exampleFormControlSelect1">
                                                    <option>Menos de 1 año</option>
                                                    <option>Entre 1 y 2 años</option>
                                                    <option>Entre 2 y 3 años</option>
                                                    <option>Más de 3 años</option>
                                                    <option>No aplica</option>
                                                </select>
                                            </div> */}

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Anteriormente ha tenido otras mascotas?</h6>
                                                <select className="form-control" value={petsInThePast} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Está de acuerdo en que se realicen visita periódica para ver cómo se encuentra la mascota adoptado?</h6>
                                                <select className="form-control" value={agreePeriodicVisit} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            {/* <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Están todos los mienbro de su familia deacuerdo en adoptar?</h6>
                                                <select className="form-control" id="exampleFormControlSelect1">
                                                    <option>SI</option>
                                                    <option>NO</option>
                                                </select>
                                            </div> */}

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Algun miembro de su familia es alérgico a los animales o sufre de asma?</h6>
                                                <select className="form-control" value={haveAllergicFamily} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            {/* <div className="form-label-group">
                                                <h6 className="login-heading mb-2">En caso de alquiler, ¿Sus arrendadores permiten mascotas en la vivienda?</h6>
                                                <select className="form-control" id="exampleFormControlSelect1">
                                                    <option>SI</option>
                                                    <option>NO</option>
                                                    <option>VIVO EN CASA PROPIA</option>
                                                </select>
                                            </div> */}

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">Si por algún motivo tuviera que cambiar de domicilio, ¿Qué pasaría con su mascota?</h6>
                                                <textarea 
                                                    type="text" 
                                                    id="inputEmail" 
                                                    className="form-control" 
                                                    placeholder="Escriba aquí" 
                                                    value={ifChangeHouse}
                                                    onChange={this.onChange}
                                                    required autoFocus 
                                                />
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">En caso de una ruptura en la familia (divorcio, fallecimiento) o de la llegada de un nuevo hijo ¿Cree usted que cambie el trato hacia la mascota?</h6>
                                                <select className="form-control" value={wouldChangeDeal} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Cómo se ve con su mascota adoptada dentro de 2 años?</h6>
                                                <textarea 
                                                    type="text" 
                                                    id="inputEmail" 
                                                    className="form-control" 
                                                    placeholder="Escriba aquí" 
                                                    value={howWillBeInTwoYears}
                                                    onChange={this.onChange}
                                                    required autoFocus 
                                                />
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Considera que cuenta con espacio suficiente para que la mascota este cómoda?</h6>
                                                <select className="form-control" value={enoughSpace} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            {/* <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Cuánto tiempo pasará sola la mascota?</h6>
                                                <input type="text" id="inputEmail" className="form-control" placeholder="telefotno" required autofocus />
                                            </div> */}

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">Si el comportamiento no es el que usted desea, ¿Qué medidas tomaría?</h6>
                                                <textarea 
                                                    type="text" 
                                                    id="inputEmail" 
                                                    className="form-control" 
                                                    placeholder="Escriba aquí" 
                                                    value={ifBadConduct}
                                                    onChange={this.onChange}
                                                    required autoFocus 
                                                />
                                            </div>

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Cuenta con el presupuesto suficiente para la alimentación de la mascota adoptada?</h6>
                                                <select className="form-control" value={enoughMoney} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

                                            {/* <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Quién será el responsable y se hará cargo de cubrir los gastos del adoptado?</h6>
                                                <select className="form-control" id="exampleFormControlSelect1">
                                                    <option>SI</option>
                                                    <option>NO</option>
                                                </select>
                                            </div> */}

                                            {/* <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Cuenta con los recursos para cubrir los gastos veterinarios?</h6>
                                                <select className="form-control" id="exampleFormControlSelect1">
                                                    <option>SI</option>
                                                    <option>NO</option>
                                                </select>
                                            </div> */}

                                            <div className="form-label-group">
                                                <h6 className="login-heading mb-2">¿Asume el compromiso de esterilizar al adoptado una vez que tenga la edad suficiente?</h6>
                                                <select className="form-control" value={doWantSterilize} onChange={this.onChange}>
                                                    <option value={true}>SI</option>
                                                    <option value={false}>NO</option>
                                                </select>
                                            </div>

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

export default AdoptionForm; 