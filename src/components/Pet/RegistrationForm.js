import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RegistrationForm extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 col-xl-9 mx-auto">
                        <div class="card flex-row my-5">
                            <div class=" d-none d-md-flex">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title text-center">Registrar mascota</h5>
                                <form class="form-signin">

                                    <div class="form-label-group">
                                        <img class="mx-auto d-block" src="https://images.unsplash.com/photo-1424709746721-b8fd0ff52499?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                                    </div>


                                    <div class="form-label-group">
                                        <input type="text" id="inputUserame" class="form-control" placeholder="Nombre" required autoFocus />
                                        <label htmlFor="inputUserame">Nombre de la mascota</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input type="text" id="inputEmail" class="form-control" placeholder="Raza" required />
                                        <label htmlFor="inputEmail">Raza</label>
                                    </div>

                                    <hr />

                                    <div class="form-label-group">
                                        <input type="text" id="inputPassword" class="form-control" placeholder="Color" required />
                                        <label htmlFor="inputPassword">Color</label>
                                    </div>

                                    <div class="form-label-group">
                                        <input type="text" id="inputConfirmPassword" class="form-control" placeholder="Edad" required />
                                        <label htmlFor="inputConfirmPassword">Edad</label>
                                    </div>

                                    <div class="form-label-group">
                                        <select type="" id="inputConfirmPassword" class="form-control" placeholder="Tipo" required>
                                            <option value="1">Gato</option>
                                            <option value="2">Perro</option>
                                        </select>
                                    </div>

                                    <button class="btn btn-lg btn-outline-success btn-block text-uppercase" type="submit">Seleccionar Foto</button>

                                    <hr class="my-4" />
                                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Registrar mascota</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationForm; 