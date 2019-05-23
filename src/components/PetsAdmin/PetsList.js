import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PetsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            pets: [],
            open: false,
            selectedPet: {}
        }
        this.handleDeletePet = this.handleDeletePet.bind(this)
    }

    onClick() {
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

    handleClickOpen = (pet) => {
        debugger
        this.setState({ open: true, selectedPet: pet });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleDeletePet(){ 
        this.props.firebase.pet(this.state.selectedPet.uid).remove()
        this.handleClose()
    }

    showPopupDelete() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Eliminar mascota</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Seguro que deseas eliminar a {this.state.selectedPet.name}?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDeletePet} color="primary">
                        Eliminar
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    onClick(pet) 
    {
        this.props.history.push({
            pathname: `${ROUTES.REGISTER_PET}/${pet.uid}`,
            state: { pet }
        })
    }

    render() {
        const { pets, loading } = this.state;

        return (
            <div className="container">
                {this.showPopupDelete()}
                <hr />

                {loading && <div>Cargando ...</div>}

                <ul>
                    {pets.map(pet => (
                        !pet.isAdopted ? (
                            <li key={pet.uid} style={{listStyleType:'none', marginLeft:'-3.5%'}} >
                                <div className="row">
                                    <div className="col-md-7">
                                        <a>
                                            <img className="img-fluid rounded mb-3 mb-md-0" src={pet.photo} alt="" style={{maxWidth:'600px', maxHeight:'400px'}}/>
                                        </a>
                                    </div>
                                    <div className="col-md-5">
                                        <h3>{pet.name}</h3>
                                        <p>Edad en meses: {pet.age}</p>
                                        <p>Raza: {pet.breed}</p>
                                        <a className="btn btn-secondary" onClick={()=>this.onClick(pet)} style={{cursor:'pointer', color:'white'}}>Modificar información</a>
                                        <br/><br/>
                                        <a className="btn btn-danger" onClick={()=>this.handleClickOpen(pet)} style={{cursor:'pointer', color:'white'}}>Remover</a>
                                    </div>
                                </div>
                                <hr/>
                            </li>
                        ) :
                        (
                            <li key={pet.uid} style={{listStyleType:'none', marginLeft:'-3.5%'}} >
                                <div className="row">
                                    <div className="col-md-7">
                                        <a>
                                            <img className="img-fluid rounded mb-3 mb-md-0" src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                                        </a>
                                    </div>
                                    <div className="col-md-5">
                                        <h3>Lola</h3>
                                        <p>Pendiente por adopción</p>
                                        <a className="btn btn-primary" href="#">Ver solicitudes de adopción</a>
                                        <br/><br/>
                                        <a className="btn btn-secondary" href="#">Remover</a>
                                    </div>
                                </div>
                            </li>
                        )
                    ))}
                </ul>

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
        );
    }
}

export default PetsList; 