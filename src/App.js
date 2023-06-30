import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  }

  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]});
  }

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )

    axios.post("https://x2njyspw7d.execute-api.eu-north-1.amazonaws.com/prod/file-upload", formData).then(() =>{
    this.setState({selectedFile: null});
    this.setState({fileUploadedSuccessfully: true});
     } )
    
    
  }

  fileData = () =>{
    if(this.state.selectedFile){
      return (
      <div>
        <h2>File Details:</h2>
        <p>File Name: {this.state.selectedFile.name}</p>
        <p>File Name: {this.state.selectedFile.type}</p>
        <p>Last Modified: {" "}
          {this.state.selectedFile.lastModifiedDate.toDateString()}
        </p>
      </div>
      );
    } else if (this.state.fileUploadedSuccessfully) {
      return (
        <div>
          <br />
          <h4>Your file has been successfully uploaded  </h4>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4 style={{color: 'blue'}}>Choose a file and then  press the Upload button</h4>
        </div>
      )
    }
  }
  render(){
    return (
      <div className="container">
        <h2>Shivam's File Upload System</h2>
        <h3>File upload Serverlessly</h3>
        <div>
          <input style={{color: 'red'}} type="file" onChange={this.onFileChange} />
          <button className="upload-button" onClick={this.onFileUpload}>
            Upload
          </button>
        </div>
        {this.fileData()}
      </div>
    )
  }
}
export default App;
