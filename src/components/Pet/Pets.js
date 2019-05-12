import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PetsList from './PetsList'

class Pets extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    onClick() 
    {
        this.props.history.push("/register-pet")
    }

    render() {
        return (
            <div>
                <header className="bg-secondary text-center py-3 mb-4">
                    <div className="container">
                        <h1 className="font-weight-light text-white">Listado de mascotas</h1>
                    </div>
                </header>
                <div className="container">
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-0 shadow">
                            <div className="card-body text-center">
                                <button className="btn btn-lg btn-success btn-block text-uppercase" 
                                        type="submit"
                                        onClick={()=>this.onClick()}
                                >
                                    Registrar nueva
                                </button>
                            </div>
                        </div>
                    </div>
                    <PetsList/>
                </div>
                
            </div>
        )
    }
}

export default Pets; 