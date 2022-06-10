import React, { useState } from 'react';
// import axios from 'axios';
import './Employee.css';

export default class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      addingUser: 0,
      newUser: {},
    };
  }

  AddUserComp = () => {
    return (
      <form action="#">
        <h2 className="form-head">Add a Employee</h2>
        <input
          type="text"
          className="form-input"
          onChange={(value) => this.setState({ newUser: { name: value } })}
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(value) => this.setState({ newUser: { phone: value } })}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(value) => this.setState({ newUser: { email: value } })}
          placeholder="E-mail"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(value) => this.setState({ newUser: { country: value } })}
          placeholder="Country"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(value) => this.setState({ newUser: { about: value } })}
          placeholder="About"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(value) => this.setState({ newUser: { age: value } })}
          placeholder="Age"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(value) => this.setState({ newUser: { dob: value } })}
          placeholder="Date of Birth"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(value) => this.setState({ newUser: { address: value } })}
          placeholder="Address"
          required
        />
        <button className="form-button">Add New User</button>
      </form>
    );
  };

  EmployeeRow = (props) => {
    return (
      <div className="employee-card">
        <p>
          <i className="fa fa-user row-icon" />
          {props.name}
        </p>
        <div className="row-right">
          <p>
            <i className="fa fa-location-dot row-icon" />
            {props.country}
          </p>
          <i
            className="fa fa-trash row-icon deleteIcon"
            onClick={props.delUser}
          />
        </div>
      </div>
    );
  };

  componentDidMount() {
    this.loadUsers();
  }
  loadUsers = async () => {
    await fetch(
      'https://mockrestapi.herokuapp.com/api/employee?pageNo=2&limit=10'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          users: data.data,
        });
        document.body.style.opacity = 1;
      });
  };

  addUser = (userObj) => {
    fetch('https://mockrestapi.herokuapp.com/api/employee/', {
      method: 'POST',
      data: JSON.stringify(userObj),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  delUser = async (userId) => {
    document.body.style.opacity = 0.2;
    await fetch(`https://mockrestapi.herokuapp.com/api/employee/${userId}`, {
      method: 'DELETE',
      // data:JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        this.loadUsers();
      });

    this.loadUsers();
  };

  render() {
    if (this.state.addUser) {
      return <AddUserComp />;
    } else {
      return (
        <div>
          <div className="btnContain">
            <h2 id="home-head">EmployeeAppReact</h2>
            <button
              onClick={this.setState({ addingUser: 1 })}
              className="click-button"
            >
              <i className="fa fa-plus row-icon"></i>Add Employee
            </button>
          </div>
          <div className="mainDiv">
            {this.state.addingUser ? (
              <this.AddUserComp />
            ) : (
              this.state.users.map((item) => {
                return (
                  <EmployeeRow
                    name={item.name}
                    id={item._id}
                    delUser={() => this.delUser(item._id)}
                    country={item.country}
                  />
                );
              })
            )}
          </div>
        </div>
      );
    }
  }
}
