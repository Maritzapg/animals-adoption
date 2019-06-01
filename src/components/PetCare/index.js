import React, { Component } from 'react';


class PetCare extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeSlide: 0,
        }
    }

    render() {
        return (
            <div>
            <div className="card-group">
                <div className="card">
                    <img className="card-img-top" src="https://images.unsplash.com/photo-1484190929067-65e7edd5a22f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">¿Qué es la adopción responsable?</h5>
                        <p className="card-text">La adopción de una mascota es un proceso a través del cual una persona decide acoger a un perro o un gato como parte de su familia, ofreciéndole un hogar para siempre, en el que serán cubiertas todas sus necesidades básicas como alimentación, higiene, salud, recreación y amor.</p>
                        <p className="card-text">Para realizar un proceso de adopción responsable, las personas deben acudir a una fundación que se encargue de rescatar animales. Cada una de ellas cuenta con distintos protocolos, pero lo ideal es que las familias tengan la oportunidad de conocer a los animales, exponer sus necesidades, limitaciones, condiciones de vida y demás datos de convivencia relevantes con los encargados del lugar, para que puedan identificar cuál de los perros o gatos se puede adaptar mejor a sus dinámicas y, finalmente, tomar una decisión a conciencia.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">
                            <img className="img-fluid" src="https://images.unsplash.com/photo-1463008420065-8274332e2be8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                        </small>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top" src="https://images.unsplash.com/photo-1508675801627-066ac4346a61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Los beneficios de adoptar una mascota</h5>
                        <p className="card-text">En algunos países como Estados Unidos, España y Francia se han realizado campañas impactantes para promover la adopción de animales. Con incentivos como rebajas de impuestos hasta en un 50% a la propiedad, ciudades como Córdoba España, han logrado reducir los números de animales abandonados en las calles.</p>
                        <p>Según Rios, "Colombia ha empezado un proceso de concientización de proteger y cuidar a  los animales donde es muy posible que en los próximos años  y con la ayuda de las alcaldías logremos que en estas jornadas las cifras en sacrificios lleguen a cero”.</p>
                        <p>Tanto Felipe Rios como otras personalidades colombianas buscan que en todas las ciudades a través de las alcadias se diseñen programas para proteger e incentivar las jornadas de adopción de animales.</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">
                            <img className="img-fluid" src="https://images.unsplash.com/photo-1424709746721-b8fd0ff52499?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                        </small>
                    </div>
                </div>
                <div className="card">
                    <img className="card-img-top" src="https://images.unsplash.com/photo-1529511026851-6fe7f6c908a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">BENEFICIOS</h5>
                        <p className="card-text">Éstos son algunos de los beneficios según expertos</p>
                        <ul>
                            <li>Las personas que tienen perro son menos propensas a sufrir enfermedades cardiovasculares.</li>
                            <li>Las personas que viven solas y tienen perro o gato nunca se sienten solas.</li>
                            <li>Los perros pueden detectar cuando sus "amos" están tristes y siempre van a encontrar la forma de sacarles una sonrisa.</li>
                            <li>La mayoría de niños que se crían en hogares con mascotas en un futuro van a ser padres más responsables y amorosos.</li>
                            <li>Los bebés cuyos padres tienen perros aprenden a caminar más rápido.</li>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">
                            <img className="img-fluid" src="https://images.unsplash.com/photo-1429963845899-06ea8dc67d0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                        </small>
                    </div>
                </div>
            </div>
            <label>Tomado de: www.publimetro.co</label>
            </div>
        )
    }
}

export default PetCare; 