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
      age: '',
      salary: '',
      page: 1,
      btnText1: 'fa fa-angle-left',
      btnText2: 'fa fa-angle-right',
      formBtnText: 'Add New Employee',
      dltText: 'fa fa-trash row-icon',
    };
    this.loadUsers();
  }

  //Form and Row Components
  AddUserForm = (props) => {
    return (
      <form
        action="https://dummy.restapiexample.com/api/v1/create"
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
          value={this.state.name}
          onChange={(event) =>
            this.setState((prevState) => ({
              name: event.target.value,
            }))
          }
          placeholder="Full Name"
          required
        />

        <input
          type="number"
          name="age"
          className="form-input"
          value={this.state.age}
          onChange={(event) =>
            this.setState((prevState) => ({
              age: event.target.value,
            }))
          }
          placeholder="Age"
          required
        />

        <input
          type="number"
          name="address"
          className="form-input"
          value={this.state.salary}
          onChange={(event) =>
            this.setState((prevState) => ({
              salary: event.target.value,
            }))
          }
          placeholder="Salary"
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
          <button className="deleteIcon" onClick={props.delUser}>
            <i className={this.state.dltText} />
          </button>
          <button className="deleteIcon" onClick={props.editUser}>
            <i className="fa fa-pen row-icon" />
          </button>
        </td>
      </tr>
    );
  };

  //Handler Functions for API's
  loadUsers = async (stri) => {
    await fetch(
      `https://dummy.restapiexample.com/api/v1/employees`
    )
      .then((response) => response.json())
      .then((data) => {
        if (stri == 'btnText1') {
          this.setState({
            users: data.data,
            btnText1: 'fa fa-angle-left',
          });
          this.loadUsers('');
        } else if (stri == 'btnText2') {
          this.setState({
            users: data.data,
            btnText2: 'fa fa-angle-right',
          });
          this.loadUsers('');
        } else {
          this.setState({
            users: data.data,
          });
          this.loadUsers('');
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
      age: this.state.age,
      salary: this.state.salary,
    };

    console.log(userObj);

    fetch('https://dummy.restapiexample.com/api/v1/create', {
      method: 'POST', // or 'POST'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('New Employee Added');
        this.loadUsers('');
        this.setState({
          addingUser: !this.state.addingUser,
          formBtnText: `Add New User`,
        });
      });
  };

  editUser = async (data) => {
    this.setState({
      formBtnText: 'Update User', //<i className="fa fa-spinner fa-spin"></i>,
    });

    this.setState({
      name: data.name,
      phone: data.phone,
      email: data.email,
      country: data.country,
      age: data.age,
      address: data.address,
      addingUser: false,
    });

    this.delUser(data._id);
  };

  delUser = async (userId) => {
    this.setState({
      dltText: 'fa fa-spinner fa-spin row-icon',
    });
    await fetch(`https://dummy.restapiexample.com/api/v1/delete/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        this.loadUsers('');
        this.setState({
          dltText: 'fa fa-trash row-icon',
        });
        // alert('Employee Deleted');
      });
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
                this.setState({
                  addingUser: !this.state.addingUser,
                  name: '',
                  age: '',
                  salary: '',
                });
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
                <th>age</th>
                <th>salary</th>
                <th>Delete</th>
              </tr>

              {this.state.users.data.map((item) => {
                return (
                  <this.EmployeeRow
                    obj={item}
                    id={item._id}
                    delUser={() => this.delUser(item.id)}
                    editUser={() => this.editUser(item)}
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
