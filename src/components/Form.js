import React, { Component } from 'react';
import { dbRef } from '../utils/firebase';

class Form extends Component {
  constructor(props){
    super(props);
    //there is only an eventID if we are editing an event
    if (typeof(props.eventID) === 'string'){
    dbRef.child(props.eventID).once('value', (snapshot) => {
      this.state = {
        title: snapshot.val().title ,
        date: snapshot.val().date,
        category: snapshot.val().category,
      }
    })
    } else {
      //this is a new event
      this.state = {
        title: '',
        date: '',
        category: '',
      }
    }
    
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })

  }
  handleSelect = (e) => {
    console.dir(e.target.value)
  }
  handleClick = (e) => {
    e.preventDefault();
    if (typeof (this.props.eventID) === 'string') {
      this.props.editEvent(this.state)
    } else {
      this.props.addEvent(this.state)
    }
  }
  render() {
    return (
      <form onSubmit={this.handleClick}>
          <fieldset>
            <label htmlFor="title">
              What Happened?
              <input
                type="text"
                name="title"
                id="title"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </label>
            <label htmlFor="date">
              When did it happen?
              <input
                type="date"
                name="date"
                id="date"
                onChange={this.handleChange}
                value={this.state.date}
              />
            </label>
            <label htmlFor="category">
              Category
              <select 
                onChange={this.handleChange}
                value={this.state.category}
                name="category" 
                id="category"
              >
              {this.props.userCategories.map(cat => {
                return <option key={cat.value} value={cat.value}>{cat.label}</option>
              })}
              </select>
            </label>
            <input type="Submit" defaultValue="Add Event"/>
          </fieldset>
        </form>
    );
  }
}

export default Form;