  import React, { Component } from 'react'
  import StudentDataService from '../services/Student.service'

  export default class AddStudent extends Component {
    constructor(props){ //สำหรับกำหนดค่าเริ่มต้นให้กับตัวแปร ทำในทันที
      super(props); //ส่งให้ class component

      this.onChangeStudentID = this.onChangeStudentID.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeSurname = this.onChangeSurname.bind(this);
      this.onChangeUniversity = this.onChangeUniversity.bind(this);
      this.saveStudent = this.saveStudent.bind(this);
      this.newStudent = this.newStudent.bind(this);
      this.toggleGraduation = this.toggleGraduation.bind(this);

      this.state = {
        id: null,
        student_id: "",
        name: "",
        surname: "",
        university: "",
        graduate: false,
        submitted: false
      }
    }

    onChangeStudentID(e) {
      this.setState({
        student_id: e.target.value //ถ้ามีการ key title เข้าไปจะทำการเปลี่ยน title ใน state แรก
      });
    }
    
    onChangeName(e) {
      this.setState({
        name: e.target.value
      });
    }

    onChangeSurname(e) {
      this.setState({
        surname: e.target.value
      });
    }

    onChangeUniversity(e) {
      this.setState({
        university: e.target.value
      });
    }

    toggleGraduation() {
      this.setState({
        graduate: !this.state.graduate
      });
    }

    saveStudent() {
      var data = {
        student_id: this.state.student_id,
        name: this.state.name,
        surname: this.state.surname,
        university: this.state.university,
      }; //ถ้ากด summit จะเอาข้อมูลใน state แรกมาเก็บไว้ในนี้ก่อนจะบันทึกข้อมูล

      StudentDataService.create(data) //data มาจากตรง saveTutorial แล้วจะวิ่งไปที่ services 
        .then( response => {
          this.setState({
            id: response.data.id, 
            student_id: response.data.student_id,
            name: response.data.name,
            surname: response.data.surname,
            university: response.data.university,
            graduate: response.data.graduate,
            submitted: true
          });
        }) 
        .catch(err => {
          console.log(err);
        });
    }

    newStudent(){
      this.setState({
        id: null,
        student_id: "",
        name: "",
        surname: "",
        university: "",
        graduate: false,
        submitted: false
      });
    }

    render() {
      return (
        <div className='submit-form'>
          {this.state.submitted ? (
            <>
              <h4>You submitted successfully</h4>
              <button className='btn btn-success' onClick={this.newStudent}>OK</button>
            </>
          ) : (
            <>
              <div className='form-group'>
                <label htmlFor='title'>Student ID</label>
                <input type='text' 
                className='form-control' 
                id='student_id' 
                value={this.state.student_id} 
                onChange={this.onChangeStudentID} 
                name='student_id' 
                required />
              </div>
              <div className='form-group'>
                <label htmlFor='title'>Name</label>
                <input type='text' 
                className='form-control' 
                id='name' 
                value={this.state.name} 
                onChange={this.onChangeName} 
                name='name' 
                required />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Surname</label>
                <input type='text' 
                className='form-control' 
                id='surname' 
                value={this.state.surname} 
                onChange={this.onChangeSurname} 
                name='surname' 
                required />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>University</label>
                <input type='text' 
                className='form-control' 
                id='university' 
                value={this.state.university} 
                onChange={this.onChangeUniversity} 
                name='university' 
                required />
              </div>
              <div className='form-group'>
            <label htmlFor='graduate'>Graduated</label>
            <button
            className={`btn m ${this.state.graduate ? 'btn-success' : 'btn-danger'}`}
            onClick={this.toggleGraduation}
           >
            {this.state.graduate ? 'Yes' : 'No'}
            </button>
                </div>
              <button onClick={this.saveStudent} 
              className='my-5 btn btn-success'>
                SUBMIT
              </button>
            </>
          )} 
        </div>
      );
    }  
  }