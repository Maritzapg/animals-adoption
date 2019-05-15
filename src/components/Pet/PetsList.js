import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';

class PetsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            pets: [],
        }
    }

    onClick()
    {
        this.props.history.push(ROUTES.ADOPTION_FORM)
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.pets().on('value', snapshot => {
            const petsObject = snapshot.val();
            const petsList = Object.keys(petsObject).map(key => ({
                ...petsObject[key],
                uid: key,
            }));

            this.setState({
                pets: petsList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.pets().off();
    }

    render() {
        /*return (
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-0 shadow">
                        <img src="https://images.unsplash.com/photo-1543333232-add7974e52cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="card-img-top" alt="..." />
                        <div className="card-body text-center">
                            <h5 className="card-title mb-0">Beethoven</h5>
                            <div className="card-text text-black-50">Edad: 1 año</div>
                            <div className="card-text text-black-50">Raza: criollo</div>
                            <button className="btn btn-lg btn-success btn-block text-uppercase" 
                                    type="button"
                                    onClick={()=>this.onClick()}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-0 shadow">
                        <img src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="card-img-top" alt="..." />
                        <div className="card-body text-center">
                            <h5 className="card-title mb-0">Hachiko</h5>
                            <div className="card-text text-black-50">Edad: 2 meses</div>
                            <div className="card-text text-black-50">Raza: criollo</div>
                            <button className="btn btn-lg btn-success btn-block text-uppercase" 
                                    type="submit"
                                    onClick={()=>this.onClick()}
                            >
                                Adoptar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-0 shadow">
                        <img src="https://images.unsplash.com/photo-1541857145371-27b0521ead69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="card-img-top" alt="..." />
                        <div className="card-body text-center">
                            <h5 className="card-title mb-0">Laika</h5>
                            <div className="card-text text-black-50">Edad: 3 años</div>
                            <div className="card-text text-black-50">Raza: criollo</div>
                            <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit">Adoptar</button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-0 shadow">
                        <img src="https://images.unsplash.com/photo-1508280756091-9bdd7ef1f463?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="card-img-top" alt="..." />
                        <div className="card-body text-center">
                            <h5 className="card-title mb-0">Pongo</h5>
                            <div className="card-text text-black-50">Edad: 4 años</div>
                            <div className="card-text text-black-50">Raza: criollo</div>
                            <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit">Adoptar</button>
                        </div>
                    </div>
                </div>
            </div>
        )*/
        const { pets, loading } = this.state;

        return (
            <div className="row">
                {loading && <div>Loading ...</div>}
                <ul>
                    {pets.map(pet => (
                        <li key={pet.uid} style={{listStyleType:'none'}}>
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-0 shadow">
                                    <img src={pet.photo} className="card-img-top" alt="..." />
                                    <div className="card-body text-center">
                                        <h5 className="card-title mb-0">{pet.name}</h5>
                                        <div className="card-text text-black-50">Meses de nacido/a: {pet.age}</div>
                                        <div className="card-text text-black-50">Raza: {pet.breed}</div>
                                        <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit">Adoptar</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default PetsList; 