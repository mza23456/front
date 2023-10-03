import React, { Component } from 'react';
import StudentDataService from '../services/Student.service';
import { Link } from 'react-router-dom';

export default class StudentsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveStudents = this.retrieveStudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStudent = this.setActiveStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveStudents();
  }

  onChangeSearchName(e){
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });
  }

  retrieveStudents(){
    StudentDataService.getAll()
      .then(response => {
        this.setState({
          students: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  refreshList() {
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });
  }

  setActiveStudent(student, index){
    this.setState({
      currentStudent: student,
      currentIndex: index
    });
  }

  deleteStudent(id) {
    StudentDataService.delete(id)
      .then(() => {
        this.refreshList();
      })
      .catch((error) => {
        console.log(error);
      });
  }  

  searchName(){
    StudentDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          students: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {searchName, students, currentStudent, currentIndex} = this.state;

    return (
      <div className='list row'>
        <div className='col-md-8'>
          <div className='input-group mb-3'>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={this.onChangeSearchName}
              />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={this.searchName}
              >Search</button>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <h4>Students List</h4>

          <ul className='list-group'>
              {students && students.map((student, index) => (
                <li className={"list-group-item " + (index === currentIndex ? "active" : "")} 
                onClick={() => this.setActiveStudent(student, index)}
                key={index}>
                  {student.name} 
                  {" "} 
                  {student.surname}
                </li>
              ))}
            </ul>

            <button
                className="btn btn-danger btn-sm float-right"
                onClick={() => this.deleteStudent(students.name)} // Add the deleteStudent function
              >
                Delete
              </button>
        </div>
        <div className='col-md-6'>
              {currentStudent ? (
              <div>
                <h4>Student Detail</h4>
                <div>
                  <label>
                    <strong>Student ID :</strong>
                  </label>
                  {" "}
                  {currentStudent.student_id}
                </div>
                <div>
                  <label>
                    <strong>Name :</strong>
                  </label>
                  {" "}
                  {currentStudent.name}
                </div>
                <div>
                  <label>
                    <strong>Surname :</strong>
                  </label>
                  {" "}
                  {currentStudent.surname}
                </div>
                <div>
                  <label>
                    <strong>University :</strong>
                  </label>
                  {" "}
                  {currentStudent.university}
                </div>
                <div>
                  <label>
                    <strong>Graduate :</strong>
                  </label>
                  {" "}
                  {currentStudent.graduate ? "Yes" : "No"}
                </div>
              </div>
              ) : (
              <div>
                <br />
                <p>Please click on a Student ...</p>
              </div>
              )}
        </div>
      </div>
    )
  }
}