import React, { Component } from 'react';
import { dbRef } from '../utils/firebase';

class SingleEvent extends Component {
  deleteEvent = (id) => {
    dbRef.child(id).remove();
  } 
  render() {
    return (
      <li>
        {this.props.event.title}
        {
          this.props.edit 
          && 
          <>
          <button onClick={() => this.deleteEvent(this.props.event.id)}>Delete</button>
          <button onClick={() => this.props.showEditScreen(this.props.event.id)}>Edit</button>
          </>
        }

        

      </li>
    );
  }
}

export default SingleEvent;