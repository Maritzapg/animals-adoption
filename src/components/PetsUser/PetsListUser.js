import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import firebase from 'firebase';
import { finished } from 'stream';

const PetsListUserPage = () => (
    <div>
        <PetsUserList />
    </div>
)

class PetsListUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            pets: [],
            user: null,
            adoptionFormsByUser: []
        }
        this.isFormFilled = this.isFormFilled.bind(this)
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user })
            const adoptionFormsByUser = []

            this.props.firebase.adoptionForms().on('value', snapshot => {
                const adoptionFormsObject = snapshot.val()
                const adoptionFormsList = Object.keys(adoptionFormsObject).map(key => ({
                    ...adoptionFormsObject[key],
                    uid: key,
                }))

                if (user) {
                    adoptionFormsList.map((adoptionForm) => {
                        if (adoptionForm.user.uid === user.uid)
                            adoptionFormsByUser.push(adoptionForm)
                    })
                }

                this.setState({
                    adoptionFormsByUser
                });
            });
        })
    }

    onClick(pet) {
        if (this.state.user) {
            const userUid = this.state.user.uid

            this.props.history.push({
                pathname: `${ROUTES.ADOPTION_FORM}/${pet.uid}/${this.state.user.uid}`,
                state: { pet, userUid },
            })
        }
        else
            this.props.history.push(ROUTES.SIGN_IN)
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

    isFormFilled(pet) {
        var isFormFilled = false
        if (this.state.adoptionFormsByUser.length > 0) {
            this.state.adoptionFormsByUser.map((adoptionForm) => {
                if (adoptionForm.pet.uid === pet.uid)
                    isFormFilled = true
            })
        }
        return isFormFilled
    }

    render() {

        const { pets, loading } = this.state;
        let elements = []
        return (
            <div>
                <header className="bg-secondary text-center py-3 mb-4">
                    <div className="container">
                        <h1 className="font-weight-light text-white">Listado de mascotas</h1>
                    </div>
                </header>
                <div className="container">
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

                    <hr />

                    <div className="row">

                        {loading && <div>Cargando ...</div>}

                        {pets.map((pet, i) => {
                            if (!pet.isAdopted) {
                                elements.push
                                    (
                                        <div key={'pet' + i} className="card border-0 shadow" style={{ width: '300px', height: '390px', marginTop: '30px' }}>
                                            <img src={pet.photo} className="card-img-top" alt="..." style={{ height: '220px' }} />
                                            <div className="card-body text-center">
                                                <h5 className="card-title mb-0">{pet.name}</h5>
                                                <div className="card-text text-black-50">Meses: {pet.age}</div>
                                                <div className="card-text text-black-50">Raza: {pet.breed}</div>
                                                <button disabled={this.isFormFilled(pet)}
                                                    className="btn btn-lg btn-success btn-block text-uppercase"
                                                    type="submit"
                                                    onClick={() => this.onClick(pet)}
                                                >
                                                    {this.isFormFilled(pet) ? 'Solicitud enviada' : 'Adoptar'}
                                                </button>
                                            </div>
                                        </div>
                                    )

                                if ((i + 1) % 3 === 0) {
                                    let toRender = elements
                                    elements = []

                                    return (
                                        <div key={pet.uid} className="col-xl-3 col-md-6 mb-4" style={{ maxWidth: '100%', height: '390px', paddingRight:'4em' }}>
                                            {toRender}
                                        </div>
                                    )
                                }
                                else if ((i + 1) === pets.length) {
                                    let toRender = elements
                                    elements = []

                                    return (
                                        <div key={pet.uid} className="col-xl-3 col-md-6 mb-4" style={{ maxWidth: '100%', height: '390px', paddingRight:'4em' }}>
                                            {toRender}
                                        </div>
                                    )
                                }
                            }
                        })}
                    </div>
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