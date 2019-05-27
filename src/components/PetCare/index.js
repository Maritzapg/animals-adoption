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
            <div className="container">

                <h1 className="my-4 " align="center">Recuerda esto antes de adoptar una mascota</h1>

                <div className="row">
                    <div className="mx-auto d-block ">
                        <img className="img-fluid" src="https://images.unsplash.com/photo-1504803542671-cb92eb06a148?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                    </div>

                    <div className="col-md-20">
                        <h3 className="my-3">¿Qué es la adopción responsable?</h3>
                        <p>La adopción de una mascota es un proceso a través del cual una persona decide acoger a un perro o un gato como parte de su familia, ofreciéndole un hogar para siempre, en el que serán cubiertas todas sus necesidades básicas como alimentación, higiene, salud, recreación y amor.</p>
                        <p>Para realizar un proceso de adopción responsable, las personas deben acudir a una fundación que se encargue de rescatar animales. Cada una de ellas cuenta con distintos protocolos, pero lo ideal es que las familias tengan la oportunidad de conocer a los animales, exponer sus necesidades, limitaciones, condiciones de vida y demás datos de convivencia relevantes con los encargados del lugar, para que puedan identificar cuál de los perros o gatos se puede adaptar mejor a sus dinámicas y, finalmente, tomar una decisión a conciencia.</p>

                        <div className="row">

                            <div className="col-md-3 col-sm-6 mb-4">
                                <img className="img-fluid" src="https://images.unsplash.com/photo-1521354465180-c1ceac1d709a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                            </div>

                            <div className="col-md-3 col-sm-6 mb-4">
                                <img className="img-fluid" src="https://images.unsplash.com/photo-1470390356535-d19bbf47bacb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                            </div>

                            <div className="col-md-3 col-sm-6 mb-4">
                                <img className="img-fluid" src="https://images.unsplash.com/photo-1496284427489-f59461d8a8e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                            </div>

                            <div className="col-md-3 col-sm-6 mb-4">
                                <img className="img-fluid" src="https://images.unsplash.com/photo-1424709746721-b8fd0ff52499?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                            </div>

                        </div>

                        <div className="col-md-20">
                            <h3 className="my-3">Los beneficios de adoptar una mascota</h3>
                            <p>En algunos países como Estados Unidos, España y Francia se han realizado campañas impactantes para promover la adopción de animales. Con incentivos como rebajas de impuestos hasta en un 50% a la propiedad, ciudades como Córdoba España, han logrado reducir los números de animales abandonados en las calles.</p>
                            <p>Estos son algunos de reconocidos famosos  que han optado por ayudar a estos animales; la reconocida actriz Pamela Anderson, miembro activo de PETA, tiene en su casa a Brigitte Bardot y Gina Lollobrigida, dos cachorros que adoptó tras ser rescatados después del derrame de petróleo en el Golfo de México.</p>
                            <p>Penélope Curz adoptó a “Vino” cuando se encontraba filmando la película “Bandidas” en México y este cachorro la siguió por varios días.</p>
                            <p>Esta es la historia de Hilary Swank y Karoo: Ella trabaja en distintos centros de rescate y adopción y encontró a uno de sus perros en África del Sur mientras filmaba un película. Swank tiene un proyecto de caridad llamado “Hilaroo” en honor a sus perros.</p>
                            <p>Según rios, "Colombia ha empezado un proceso de concientización de proteger y cuidar a  los animales donde es muy posible que en los próximos años  y con la ayuda de las alcaldías logremos que en estas jornadas las cifras en sacrificios lleguen a cero”.</p>
                            <p>Tanto Felipe Rios como otras personalidades colombianas buscan que en todas las ciudades a través de las alcadias se diseñen programas para proteger e incentivar las jornadas de adopción de animales.</p>

                            <h3 className="my-3">BENEFICIOS</h3>
                            <p>Éstos son algunos de los beneficios según expertos</p>
                            <ul>
                                <li>Las personas que tienen perro son menos propensas a sufrir enfermedades cardiovasculares</li>
                                <li>Las personas que viven solas y tienen perro o gato nunca se sienten solas.</li>
                                <li>Los perros pueden detectar cuando sus "amos" están tristes y siempre van a encontrar la forma de sacarles una sonrisa.</li>
                                <li>La mayoría de niños que se crían en hogares con mascotas en un futuro van a ser padres más responsables y amorosos.</li>
                                <li>Los bebés cuyos padres tienen perros aprenden a caminar más rápido.</li>
                            </ul>
                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-3 col-sm-6 mb-4">

                            <img className="img-fluid" src="https://images.unsplash.com/photo-1424709746721-b8fd0ff52499?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                        </div>

                        <div className="col-md-3 col-sm-6 mb-4">
                            <img className="img-fluid" src="https://images.unsplash.com/photo-1463008420065-8274332e2be8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                        </div>

                        <div className="col-md-3 col-sm-6 mb-4">

                            <img className="img-fluid" src="https://images.unsplash.com/photo-1429963845899-06ea8dc67d0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                        </div>

                        <div className="col-md-3 col-sm-6 mb-4">

                            <img className="img-fluid" src="https://images.unsplash.com/photo-1542765826-d17aa264390d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default PetCare; 