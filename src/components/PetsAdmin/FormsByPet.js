import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const FormsByPetPage = () => (
    <div>
        <FormsByPetResult />
    </div>
);

const style = {
    minWidth: '260px'
}

const INITIAL_STATE = {
    loading: false,
    open: false,
    selectedForm: {},
    openConfirmPopup: false,
    denied: false,
    formsByPet: [
        {
            numberPhone: 0,
            numberPeople: 0,
            numberSons: 0,
            ageYoungestSon: 0,
            houseType: 'Ninguna',
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
            doWantSterilize: false,
            pet: {
                name: '',
                photo: '',
            },
            user: {
                uid: '',
                username: '',
                email: ''
            }
        }
    ]
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class FormsByPet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...INITIAL_STATE,
        }
        this.handleResultAdoption = this.handleResultAdoption.bind(this)
    }

    componentDidMount() {
        this.setState({ loading: true });

        const rootRefForms = this.props.firebase.adoptionForms()

        rootRefForms.on('value', (snapshot) => {
            var formsByPet = []
            snapshot.forEach((form) => {
                if(form.val().pet.uid === this.props.location.state.pet.uid)
                    formsByPet.push(form.val())
            })

            this.setState({
                formsByPet: formsByPet,
                loading: false,
            })
        });
    }

    handleResultAdoption()
    {
        if(this.state.denied)
        {
            console.log('Mascota NO adoptada... :(', this.state.selectedForm.pet.name)
            this.props.firebase.pet(this.props.location.state.pet.uid).update({...this.state.selectedForm.pet,
                'isAdopted': true, 'owner':{uid:this.state.selectedForm.user.uid, username:this.state.selectedForm.usser.username} })
            debugger
        }
        else
        {
            this.props.firebase.pet(this.props.location.state.pet.uid).update({...this.state.selectedForm.pet,
                'isAdopted': true, 'owner':{uid:this.state.selectedForm.user.uid, username:this.state.selectedForm.user.username} })
        }
        this.setState({openConfirmPopup:false, open:false})
    }

    handleClickOpen = (form) => {
        this.setState({ open: true, selectedForm: form });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    showConfirmPopup() {
        
        if(this.state.openConfirmPopup)
        {
            var isShe = this.state.selectedForm.pet.gender ==='Hembra'?'ella.':'él.'
            return (
                <Dialog
                    open={this.state.openConfirmPopup}
                    onClose={()=>this.setState({openConfirmPopup:false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.denied?'Denegar adopción':'Aprobar adopción'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.denied?'¿Estas seguro de denegar esta adopción?, Si aceptas, '+ this.state.selectedForm.pet.name +' perderá esta aportunidad de adopción':
                            '¿Estas seguro de aprobar esta adopción?, Si aceptas, '+ this.state.selectedForm.pet.name +' dejará de aparecer disponible para los usuarios interesados en '+ isShe}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions className="modal-footer">
                        <Button onClick={this.handleResultAdoption} color="primary" autoFocus className="btn btn-success">
                            Aceptar
                        </Button>
                        <Button onClick={()=>this.setState({openConfirmPopup:false})} color="primary" className="btn btn-danger">
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>
            )
        }
    }

    showPopupForm() {
        
        const {
            open,
            selectedForm,
        } = this.state
        
        return (
            <div>
                {this.showConfirmPopup()}
                <Dialog fullScreen open={open} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" style={{paddingRight:'33em', color:'white', paddingLeft:'2em'}}>
                                Formulario diligenciado
                            </Typography>
                            <Button color="inherit" onClick={()=>this.setState({openConfirmPopup:true, denied:false})}>
                                Aprobar adopción
                            </Button>
                            {/* <Button color="inherit" onClick={()=>this.setState({openConfirmPopup:true, denied:true})}>
                                Denegar adopción
                            </Button> */}
                        </Toolbar>
                    </AppBar>
                    <br/><br/><br/>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Número telefónico" secondary={selectedForm.numberPhone} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Cuántas personas viven con usted?" secondary={selectedForm.numberPeople} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Cuántos hijos tiene?" secondary={selectedForm.numberSons} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Si la respuesta anterior fue positiva, ¿Cuántos años tiene su hijo/a menor?" secondary={selectedForm.ageYoungestSon} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Qué tipo de vivienda tiene?" secondary={selectedForm.houseType} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Por qué desea adoptar esta mascota?" secondary={selectedForm.whyThisPet} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Actualmente tiene otras mascotas?" secondary={selectedForm.petsInThePresent?'Si': 'No'} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Anteriormente ha tenido otras mascotas?" secondary={selectedForm.petsInThePast?'Si': 'No'} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Está de acuerdo en que se realice visita periódica para ver cómo se encuentra la mascota adoptada?" secondary={selectedForm.agreePeriodicVisit?'Si': 'No'} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Algún miembro de su familia es alérgico a los animales o sufre de asma?" secondary={selectedForm.haveAllergicFamily?'Si': 'No'} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Si por algún motivo tuviera que cambiar de domicilio, ¿Qué pasaría con su mascota?" secondary={selectedForm.ifChangeHouse} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="En caso de una ruptura en la familia (divorcio, fallecimiento) o de la llegada de un nuevo hijo ¿Cree usted que cambie el trato hacia la mascota?" secondary={selectedForm.wouldChangeDeal?'Si': 'No'} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Cómo se ve con su mascota adoptada dentro de 2 años?" secondary={selectedForm.howWillBeInTwoYears} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Considera que cuenta con espacio suficiente para que la mascota este cómoda?" secondary={selectedForm.enoughSpace?'Si': 'No'} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Si el comportamiento no es el que usted desea, ¿Qué medidas tomaría?" secondary={selectedForm.ifBadConduct} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Cuenta con el presupuesto suficiente para la alimentación de la mascota adoptada?" secondary={selectedForm.enoughMoney?'Si': 'No'} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="¿Asume el compromiso de esterilizar al adoptado una vez que tenga la edad suficiente?" secondary={selectedForm.doWantSterilize?'Si': 'No'} />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }

    render() {
        const { formsByPet, loading } = this.state;

        if(formsByPet.length > 0)
        {
            return (
                <div>
                    {this.showPopupForm()}
                    <div className="container-fluid">
                        <div className="row no-gutter">
                            <div className="col-md-8 col-lg-6">
                                <div className="d-flex align-items-right py-3">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-9 col-lg-8 mx-auto">
                                                <form>
                                                    <div className="form-label-group">
                                                        <h1 htmlFor="inputUserame">Mascota</h1>
                                                        <h3 htmlFor="inputUserame">{formsByPet[0].pet.name}</h3>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loading && <label>Loading ...</label>}
                    <table className="table">
                        <div className="container-fluid">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th style={style} scope="col">Nombre</th>
                                    <th style={style} scope="col">Correo</th>
                                    <th style={style} scope="col">Fecha de formulario</th>
                                    <th style={style} scope="col">Telefono</th>
                                    <th style={style} scope="col" data-toggle="modal">Ver formulario</th>
                                </tr>
                            </thead>
                            <tbody>
    
                                {formsByPet.map((form, i) => (
                                    <tr key={form.uid}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{form.user.username}</td>
                                        <td>{form.user.email}</td>
                                        <td>{form.created_at}</td>
                                        <td>{form.numberPhone}</td>
                                        <td>
                                            <button onClick={() => this.handleClickOpen(form)} className="btn btn-info" type="button">Ver más</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </div>
                    </table>
                </div>
            )
        }
        else
        {
            return (
                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="col-md-8 col-lg-6">
                            <div className="d-flex align-items-right py-3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-9 col-lg-8 mx-auto">
                                            <form>
                                                <div className="form-label-group">
                                                    <h1 htmlFor="inputUserame">Aún no hay solicitudes de adopción para esta mascota</h1>
                                                </div>
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
}

const condition = authUser =>
    authUser && authUser.roles.includes(ROLES.ADMIN);

const FormsByPetResult = compose(
    withRouter,
    withAuthorization(condition),
    withFirebase,
)(FormsByPet);

export { FormsByPetPage };

export default FormsByPetResult;