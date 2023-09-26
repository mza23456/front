import React, { Component } from 'react'
import TutorialDataService from '../services/tutorial.service'

export default class AddTutorial extends Component {
  constructor(props){ //สำหรับกำหนดค่าเริ่มต้นให้กับตัวแปร ทำในทันที
    super(props); //ส่งให้ class component

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    }
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value //ถ้ามีการ key title เข้าไปจะทำการเปลี่ยน title ใน state แรก
    });
  }
  
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description
    }; //ถ้ากด summit จะเอาข้อมูลใน state แรกมาเก็บไว้ในนี้ก่อนจะบันทึกข้อมูล

    TutorialDataService.create(data) //data มาจากตรง saveTutorial แล้วจะวิ่งไปที่ services 
      .then( response => {
        this.setState({
          id: response.data.id, 
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
          submitted: true
        });
      }) 
      .catch(err => {
        console.log(err);
      });
  }


  newTutorial(){
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className='submit-form'>
        {this.state.submitted ? (
          <>
            <h4>You submitted successfully</h4>
            <button className='btn btn-success' onClick={this.newTutorial}>OK</button>
          </>
        ) : (
          <>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input type='text' 
              className='form-control' 
              id='title' 
              value={this.state.title} 
              onChange={this.onChangeTitle} 
              name='title' 
              required />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>description</label>
              <input type='text' 
              className='form-control' 
              id='description' 
              value={this.state.description} 
              onChange={this.onChangeDescription} 
              name='description' 
              required />
            </div>
  
            <button onClick={this.saveTutorial} 
            className='btn btn-success'>
              Submit
            </button>
          </>
        )} 
      </div>
    );
  }  
}
