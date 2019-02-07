import React, { Component } from 'react';
import { dbRef } from '../utils/firebase';
import Form from './Form'




class AddEvent extends Component {
  addEvent = (data) => {
    dbRef.push(data);
    this.props.hidePopup();
  }
  editEvent = (data) => {
    dbRef.child(this.props.eventID).set(data);
    this.props.hidePopup();
  }
  render() {
    return (
      <div>
        <Form 
          addEvent={this.addEvent} 
          editEvent={this.editEvent}
          eventID={this.props.eventID}
          userCategories={this.props.userCategories}
        />
        <button onClick={this.props.hidePopup}>Cancel</button>
      </div>
    );
  }
}

export default AddEvent;