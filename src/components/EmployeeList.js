import React, { useState } from 'react';
// import axios from 'axios';
import './Employee.css';

export default class EmployeeList extends React.Component {
  //class Constructor
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      addingUser: true,
      name: '',
      phone: '',
      email: '',
      country: '',
      age: '',
      address: '',
      page: 1,
      btnText1: 'fa fa-angle-left',
      btnText2: 'fa fa-angle-right',
      formBtnText: 'Add New Employee',
    };
    this.loadUsers();
  }

  //Form and Row Components
  AddUserForm = () => {
    return (
      <form
        action="https://mockrestapi.herokuapp.com/api/employee/"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          this.addUser();
        }}
      >
        <h2 className="form-head">Add a Employee</h2>
        <input
          type="text"
          name="name"
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
          type="Number"
          name="phone"
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
          name="email"
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
          name="country"
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
          type="number"
          name="age"
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
          name="address"
          className="form-input"
          onChange={(event) =>
            this.setState((prevState) => ({
              address: event.target.value,
            }))
          }
          placeholder="Address"
          required
        />
        <button className="form-button" type="submit">
          {this.state.formBtnText}
        </button>
      </form>
    );
  };

  EmployeeRow = (props) => {
    return (
      <tr className="" id={props.id}>
        <td>
          <i className="fa fa-user row-icon" />
          {props.obj.name}
        </td>
        <td>
          <i className="fa fa-phone row-icon"></i>
          {props.obj.phone}
        </td>
        <td>
          <i className="fa fa-envelope row-icon"></i>
          {props.obj.email}
        </td>
        <td>
          <i className="fa fa-child row-icon"></i>
          {props.obj.age} years old
        </td>
        <td>
          <i className="fa fa-location-dot row-icon" />
          {props.obj.country}
        </td>
        <td>{props.obj.address}</td>
        <td>
          <button className="deleteIcon">
            <i className="fa fa-trash row-icon " onClick={props.delUser} />
          </button>
        </td>
      </tr>
    );
  };

  //Handler Functions for API's
  loadUsers = (stri) => {
    fetch(
      `https://mockrestapi.herokuapp.com/api/employee?pageNo=${this.state.page}&limit=9`
    )
      .then((response) => response.json())
      .then((data) => {
        if (stri == 'btnText1') {
          this.setState({
            users: data.data,
            btnText1: 'fa fa-angle-left',
          });
        } else {
          this.setState({
            users: data.data,
            btnText2: 'fa fa-angle-right',
          });
        }
        document.body.style.opacity = 1;
      });
  };

  addUser = async () => {
    this.setState({
      formBtnText: <i className="fa fa-spinner fa-spin"></i>,
    });
    const userObj = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      country: this.state.country,
      age: this.state.age,
      address: this.state.address,
    };

    console.log(userObj);

    fetch('https://mockrestapi.herokuapp.com/api/employee/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('New Employee Added');
        this.loadUsers();
        this.setState({
          addingUser: !this.state.addingUser,
          formBtnText: `Add New User`,
        });
      });
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
    alert('Employee Deleted');
  };

  //render function of Component
  render() {
    return (
      <div>
        <div className="btnContain">
          <h2 id="home-head">EmployeeAppReact</h2>
          <div className="header-btn">
            <div className="pagination">
              <button
                className="click-button"
                onClick={() => {
                  if (this.state.page > 1) {
                    this.setState({ btnText1: `fa fa-spinner fa-spin` });
                    this.setState({ page: this.state.page - 1 });
                    this.loadUsers('btnText1');
                  } else {
                    alert('No pages Back!');
                  }
                }}
              >
                <i className={this.state.btnText1}></i>
              </button>
              <p className="pageNum"> {this.state.page} </p>
              <button
                className="click-button"
                onClick={() => {
                  this.setState({ btnText2: `fa fa-spinner fa-spin` });
                  this.setState({ page: this.state.page + 1 });
                  this.loadUsers('btnText2');
                }}
              >
                <i className={this.state.btnText2}></i>
              </button>
            </div>
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
        </div>
        <div className="mainDiv">
          {this.state.addingUser ? (
            <table className="data-table">
              <tr>
                <th>Name</th>
                <th>phone</th>
                <th>email</th>
                <th>age</th>
                <th>country</th>
                <th>address</th>
                <th>Delete</th>
              </tr>

              {this.state.users.map((item) => {
                return (
                  <this.EmployeeRow
                    obj={item}
                    id={item._id}
                    delUser={() => this.delUser(item._id)}
                  />
                );
              })}
            </table>
          ) : (
            <this.AddUserForm />
          )}
        </div>
      </div>
    );
  }
}
