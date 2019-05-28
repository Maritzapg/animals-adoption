import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import UploadFile from './../uploadFile/UploadFile'

const RegistrationFormPage = () => (
    <div>
        <RegistrationForm />
    </div>
);

const INITIAL_STATE = {
    name: '',
    breed: '',
    age: 0,
    type: 'Gato',
    photo: '',
    gender: 'Hembra',
    isAdopted: false,
    owner: {uid:'', username:''},
    uploadValue:null
};

class RegistrationFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //...INITIAL_STATE,
            name: this.props.location.state!==undefined?this.props.location.state.pet.name:'',
            breed: this.props.location.state!==undefined?this.props.location.state.pet.breed:'',
            age: this.props.location.state!==undefined?this.props.location.state.pet.age:0,
            type: this.props.location.state!==undefined?this.props.location.state.pet.type:'Gato',
            photo: this.props.location.state!==undefined?this.props.location.state.pet.photo:'',
            gender: this.props.location.state!==undefined?this.props.location.state.pet.gender:'Hembra',
            isAdopted: this.props.location.state!==undefined?this.props.location.state.pet.isAdopted:false,
            owner: {uid:'', username:''},
            uploadValue:null
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event){
        const { name, breed, age, type, photo, gender, isAdopted, owner } = this.state;

        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let today  = new Date();
        const date = today.toLocaleDateString("es", options)

        // Edit a pet in your Firebase realtime database
        if(this.props.location.state!==undefined)
        {
            this.props.firebase.pet(this.props.location.state.pet.uid).set({
                name,
                breed,
                age,
                type,
                photo,
                gender,
                isAdopted,
                owner,
                upload_date: date,
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        }
        else
        {// Create a pet in your Firebase realtime database
            var newRef = firebase.database().ref(`/pets`)
            newRef.push().set({
                name,
                breed,
                age,
                type,
                photo,
                gender,
                isAdopted,
                owner,
                upload_date: date,
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        }

        event.preventDefault();
    }

    handleUpload = (event) =>
    {
        const file = event.target.files[0]
        const storageRef = firebase.storage().ref(`/photos/${file.name}`)
        const task = storageRef.put(file);

        task.on('state_changed', snapshot => {
                let percentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                this.setState({uploadValue: percentaje})
            }, error => {console.log(error.message)
            }, () => {
                task.then(snapshot => snapshot.ref.getDownloadURL())
                    .then((url) => {
                        this.setState({photo: url})
                    })
                    .catch(console.error);
            }
        )
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            name,
            breed,
            age,
            type,
            photo,
            gender
        } = this.state; 

        const isInvalid =
            name === '' ||
            breed === '' ||
            age < 0 || 
            type === '' ||
            photo === '';

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card flex-row my-5">
                            <div className=" d-none d-md-flex">
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">{this.props.location.state!==undefined?'Editar mascota':'Registrar mascota'}</h5>
                                <form onSubmit={this.onSubmit} className="form-signin">

                                    <div className="form-label-group">
                                        <img className="mx-auto d-block" src={this.state.photo} alt="" style={{maxHeight:'300px', maxWidth:'300px'}}/>
                                    </div>

                                    {/* <input className="btn btn-lg btn-outline-success btn-block text-uppercase" type="file"/> */}
                                    <UploadFile onUpload={this.handleUpload} uploadValue={this.state.uploadValue}/>

                                    <hr />

                                    <div className="form-label-group">
                                        <input 
                                            name="name"
                                            value={name}
                                            onChange={this.onChange}
                                            type="text" 
                                            id="inputName" 
                                            className="form-control" 
                                            placeholder="Nombre" 
                                            required autoFocus 
                                        />
                                        <label htmlFor="inputName">Nombre de la mascota</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input
                                            name="breed"
                                            value={breed}
                                            onChange={this.onChange}
                                            type="text" 
                                            id="inputBreed" 
                                            className="form-control" 
                                            placeholder="Raza" 
                                            required autoFocus
                                        />
                                        <label htmlFor="inputBreed">Raza</label>
                                    </div>

                                    <hr />

                                    <div className="form-label-group">
                                        <input 
                                            name="age"
                                            value={age}
                                            onChange={this.onChange}
                                            type="number" 
                                            id="inputAge" 
                                            className="form-control" 
                                            placeholder="Edad en meses" 
                                            min="0"
                                            required autoFocus
                                        />
                                        <label htmlFor="inputAge">Edad en meses</label>
                                    </div>

                                    <div className="form-label-group">
                                        <select 
                                            name="gender"
                                            value={gender}
                                            onChange={this.onChange}
                                            type="" 
                                            id="inputGender" 
                                            className="form-control" 
                                            placeholder="Género" 
                                            required
                                        >
                                            <option defaultValue="1">Hembra</option>
                                            <option value="2">Macho</option>
                                        </select>   
                                    </div>

                                    <div className="form-label-group">
                                        <select 
                                            name="type"
                                            value={type}
                                            onChange={this.onChange}
                                            type="" 
                                            id="inputType" 
                                            className="form-control" 
                                            placeholder="Tipo" 
                                            required
                                        >
                                            <option defaultValue="1">Gato</option>
                                            <option value="2">Perro</option>
                                        </select>   
                                    </div>

                                    <hr className="my-4" />
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={isInvalid}>Registrar mascota</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const condition = authUser =>
    authUser && authUser.roles.includes(ROLES.ADMIN);

const RegistrationForm = compose(
    withRouter,
    withAuthorization(condition),
    withFirebase,
)(RegistrationFormBase);

export { RegistrationFormPage };

export default RegistrationForm; 