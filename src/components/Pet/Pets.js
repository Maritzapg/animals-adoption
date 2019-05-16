import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import PetsListBase from './PetsList'
import { withAuthorization, withEmailVerification } from '../Session';
import { compose } from 'recompose';

class Pets extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
        }
    }

    onClick() 
    {
        this.props.history.push(ROUTES.REGISTER_PET)
    }

    render() {
        const { text, messages, loading } = this.state;
        return (
            <div>
                {loading && <div>Loading ...</div>}

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
                    <PetsList history={this.props.history}/>
                </div>
                
            </div>
        )
    }
}

const condition = authUser => !!authUser;

const PetsList = withFirebase(PetsListBase);

//export default Pets; 

export default compose(
    withEmailVerification,
    withAuthorization(condition),
  )(Pets);