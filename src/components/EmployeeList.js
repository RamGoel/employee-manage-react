import React, { useState } from 'react';
// import axios from 'axios';
import './Employee.css';

export default class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      addingUser: true,
      rowHeight: '40px',
      name: '',
      phone: '',
      email: '',
      country: '',
      about: '',
      age: '',
      dob: '',
      address: '',
    };
    this.loadUsers();
  }

  AddUserComp = () => {
    return (
      <form action="#">
        <h2 className="form-head">Add a Employee</h2>
        <input
          type="text"
          className="form-input"
          onChange={(event) =>
            this.setState((prevState) => ({
              name: event.target.value,
            }))
          }
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(event) =>
            this.setState((prevState) => ({
              phone: event.target.value,
            }))
          }
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(event) =>
            this.setState((prevState) => ({
              email: event.target.value,
            }))
          }
          placeholder="E-mail"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(event) =>
            this.setState((prevState) => ({
              country: event.target.value,
            }))
          }
          placeholder="Country"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(event) =>
            this.setState((prevState) => ({
              about: event.target.value,
            }))
          }
          placeholder="About"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(event) =>
            this.setState((prevState) => ({
              age: event.target.value,
            }))
          }
          placeholder="Age"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(event) =>
            this.setState((prevState) => ({
              dob: event.target.value,
            }))
          }
          placeholder="Date of Birth"
          required
        />
        <input
          type="text"
          className="form-input"
          onChange={(event) =>
            this.setState((prevState) => ({
              address: event.target.value,
            }))
          }
          placeholder="Address"
          required
        />
        <button
          className="form-button"
          type="button"
          onClick={() => this.addUser()}
        >
          Add New User
        </button>
      </form>
    );
  };

  showDetails = (id) => {
    if (document.getElementById(id).style.height == '120px') {
      document.getElementById(id).style.height = '50px';
    } else {
      document.getElementById(id).style.height = '120px';
    }
  };
  EmployeeRow = (props) => {
    return (
      <div className="emp-row-ext ">
        <div
          className="employee-card"
          id={props.id}
          style={{ height: this.state.rowHeight }}
          onClick={() => this.showDetails(props.id)} >
          <p>
            <i className="fa fa-user row-icon" />
            {props.obj.name}
          </p>
          <div className="row-right">
            <p>
              <i className="fa fa-location-dot row-icon" />
              {props.obj.country}
            </p>
            <i
              className="fa fa-trash row-icon deleteIcon"
              onClick={props.obj.delUser}
            />
            <i
              className="fa fa-angle-down row-icon "
              onClick={() => this.showDetails(props.obj.id)}
            />
          </div>
        </div>

        <div>
          <ul className="detailList">
            <li>
              <i className="fa fa-phone row-icon"></i>
              {props.obj.phone}
            </li>
            <li>
              <i className="fa fa-envelope row-icon"></i>
              {props.obj.email}
            </li>
            <li>
              <i className="fa fa-map-marker row-icon"></i>
              {props.obj.address}
            </li>
            <li>
              <i className="fa fa-child row-icon"></i>
              {props.obj.age} years old
            </li>
          </ul>
        </div>
      </div>
    );
  };

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

  addUser = async () => {
    if (
      this.state.name.length > 3 &&
      this.state.phone.length == 10 &&
      this.state.email.length > 7 &&
      this.state.age > 18 &&
      this.state.address.length > 10 &&
      this.state.about.length > 5 &&
      this.state.dob.length > 4
    ) {
      const userObj = {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        country: this.state.country,
        about: this.state.about,
        age: this.state.age,
        dob: this.state.dob,
        address: this.state.address,
      };

      console.log(userObj);
      await fetch('https://mockrestapi.herokuapp.com/api/employee/', {
        method: 'POST',
        data: JSON.stringify(userObj),
      })
        .then((response) => response.json())
        .then((data) => alert(data.message));
    } else {
      alert('Data is not properly Filled');
    }
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
    alert('Employee Deleted');
  };

  render() {
    return (
      <div>
        <div className="btnContain">
          <h2 id="home-head">EmployeeAppReact</h2>
          <button
            onClick={() => {
              this.setState({ addingUser: !this.state.addingUser });
            }}
            className="click-button"
          >
            <i className="fa fa-plus row-icon"></i>
            {this.state.addingUser ? 'Add Employee' : 'View Employees'}
          </button>
        </div>
        <div className="mainDiv">
          {this.state.addingUser ? (
            this.state.users.map((item) => {
              return (
                <this.EmployeeRow
                  obj={item}
                  id={item._id}
                  delUser={() => this.delUser(item._id)}
                />
              );
            })
          ) : (
            <this.AddUserComp />
          )}
        </div>
      </div>
    );
  }
}
