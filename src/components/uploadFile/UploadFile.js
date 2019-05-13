import React, { Component } from 'react';

class UploadFile extends Component {

    constructor(){
        super()
        this.state = {
            uploadValue: null,
        }
    }

    render() {
        return (
            <div>
                <progress value={this.props.uploadValue} max={100} alt=""/>
                <br/>
                <input type="file" onChange={this.props.onUpload}/>
            </div>
        );
    }
}

export default UploadFile;
