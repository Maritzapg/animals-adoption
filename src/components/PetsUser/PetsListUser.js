import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import firebase from 'firebase';

const PetsListUserPage = () => (
    <div>
        <PetsUserList />
    </div>
);

class PetsListUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            pets: [],
            user:null
        }
    }
    
    componentWillMount()
    {
        firebase.auth().onAuthStateChanged(user =>
        {
            this.setState({ user })
        })
    }

    onClick(pet) {
        this.state.user?
            this.props.history.push({
                pathname: `${ROUTES.ADOPTION_FORM}/${pet.uid}`,
                //search: `${pet.uid}`,
                state: { pet },
            })
            :
            this.props.history.push(ROUTES.SIGN_IN)

            // this.props.history.push({
            //     pathname: '/template',
            //     search: '?query=abc',
            //     state: { detail: response.data }
            //   })
    }

    componentDidMount() {
        this.setState({ loading: true });

        try {
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
        catch (error) {
            console.error(error)
        }

    }

    componentWillUnmount() {
        this.props.firebase.pets().off();
    }

    render() {

        const { pets, loading } = this.state;

        return (
            <div>

                <header className="bg-secondary text-center py-3 mb-4">
                    <div className="container">
                        <h1 className="font-weight-light text-white">Listado de mascotas</h1>
                    </div>
                </header>
                <div className="container">

                    <div className="row" style={{ columnCount: 2 }}>
                        {loading && <div>Cargando ...</div>}
                        <ul>
                            {pets.map(pet => (
                                <li key={pet.uid} style={{ listStyleType: 'none' }}>
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-0 shadow">
                                            <img src={pet.photo} className="card-img-top" alt="..." />
                                            <div className="card-body text-center">
                                                <h5 className="card-title mb-0">{pet.name}</h5>
                                                <div className="card-text text-black-50">Meses de nacido/a: {pet.age}</div>
                                                <div className="card-text text-black-50">Raza: {pet.breed}</div>
                                                <button 
                                                    className="btn btn-lg btn-success btn-block text-uppercase" 
                                                    type="submit"
                                                    onClick={()=>this.onClick(pet)}
                                                >
                                                    Adoptar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <hr />

                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">2</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">3</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>

                </div>


            </div>
        );
    }
}

const PetsUserList = compose(
    withRouter,
    withFirebase,
)(PetsListUser);

export default PetsListUserPage;

export { PetsUserList };