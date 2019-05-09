import React, { Component } from 'react';
import gato from './../../assets/images/gato.jpg'
import perro_nina from './../../assets/images/perro_nina.jpg'
import gato_pc from './../../assets/images/gato_pc.jpg'

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeSlide: 0,
        }
    }

    handlePrevious = () =>
    {
        if(this.state.activeSlide === 0)
            this.setState({activeSlide:2})
        else if(this.state.activeSlide === 1)
            this.setState({activeSlide:0})
        else
            this.setState({activeSlide:1})
    }

    handleNext = () =>
    {
        if(this.state.activeSlide === 0)
            this.setState({activeSlide:1})
        else if(this.state.activeSlide === 1)
            this.setState({activeSlide:2})
        else
            this.setState({activeSlide:0})
    }

    render() {
        return (
            <div>
                <header>
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">

                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" 
                                data-slide-to="0" 
                                className={this.state.activeSlide===0?'active':''}
                                onClick={()=>this.setState({activeSlide:0})}
                            ></li>
                            <li data-target="#carouselExampleIndicators" 
                                data-slide-to="1" 
                                className={this.state.activeSlide===1?'active':''}
                                onClick={()=>this.setState({activeSlide:1})}    
                            ></li>
                            <li data-target="#carouselExampleIndicators" 
                                data-slide-to="2" 
                                className={this.state.activeSlide===2?'active':''}  
                                onClick={()=>this.setState({activeSlide:2})}
                            ></li>
                        </ol>

                        <div className="carousel-inner" role="listbox">
                            <div className={this.state.activeSlide===0?'carousel-item active':'carousel-item'} style={{ backgroundImage: 'url(' + gato + ')' }}>
                                <div className="carousel-caption d-none d-md-block">
                                    <h3 className="display-4">¡Adopta!</h3>
                                    <p className="lead">Cada adopción garantiza la oportunidad de ayudar a otro animalito de la calle.</p>
                                </div>
                            </div>

                            <div className={this.state.activeSlide===1?'carousel-item active':'carousel-item'} style={{ backgroundImage: 'url(' + perro_nina + ')' }}>
                                <div className="carousel-caption d-none d-md-block">
                                    <p className="lead">Hemos cambiado su mundo y ellos el nuestro. Muchos han sido felizmente adoptados, otros nos han enseñado a no darnos por vencidos y son el vivo ejemplo de perseverancia y gratitud. Algunos ya no nos acompañan, pero nos queda la sensación de haberles permitido conocer la bondad humana. Y están los que habitan el refugio y que siguen esperando una oportunidad para tener una familia y llenar sus hogares de alegría y amor.</p>
                                </div>
                            </div>

                            <div className={this.state.activeSlide===2?'carousel-item active':'carousel-item'} style={{ backgroundImage: 'url(' + gato_pc + ')' }}>
                                <div className="carousel-caption d-none d-md-block">
                                    <h3 className="display-4">Nuesto objetivo</h3>
                                    <p className="lead">Promover la sensibilización, el respeto a la vida, el NO al maltrato animal y la adopción responsable y soñamos con convertirnos en una organización líder en la protección y preservación de los animales que son víctimas del maltrato y la indiferencia.</p>
                                </div>
                            </div>
                        </div>

                        <a className="carousel-control-prev"
                            role="button" data-slide="prev"
                            onClick={()=>this.handlePrevious()}
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" 
                            role="button" data-slide="next"
                            onClick={()=>this.handleNext()}
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </header>
            </div>
        )
    }
}

export default Landing; 