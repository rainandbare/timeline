import React, { Component } from 'react';
import AddEvent from "./components/AddEvent";
import Timeline from "./components/Timeline";

// ________Done
// home page is the timeline (if you are signed in - we will add that later)
// sideways scroll
// plots all users events according to date on the timeline
// add event pop up box
// edit event 
// delete event
//add a bunch of events
//events are sorted by category

//+++++++++To Add
//when you hover on a spot on the timeline it tells the date and the major event before and after that date
//month and date markers at different scales
//the time line starts zoomed on today
//over lapping of today and the most recent year when completely zoomed in.
//when you hover on an event it shows the name, date, category(and any pictures available - we will add this later)
//make it look pretty


//---------Later Dreams
//events get importance markers that effects the before and after context and the size of the event
//You can add pictures even without an event they will show on the timeline and when you happen to hover on that date
//you can make an event public or private







class App extends Component {

  state = {
    showAddNew: false,
    showEdit: false,
    userSignedIn: true,
    eventID: false,
    userCategories: [
        { value: 'work', label: 'Work' },
      { value: 'option1', label: 'Theatre / Film' },
      { value: 'living', label: 'Living' },
      { value: 'travel', label: 'Travel' },
      { value: 'school', label: 'School' },
      { value: 'love', label: 'Love' }, 
      { value: 'bigLifeEvent', label: 'Big Life Event' },
    ], 
    hideCats: []
  }
  showAddEventPopup = (id) => {
    if (typeof(id) === 'string') {
      this.setState({
        showAddNew: id,
      })
    } else {
      this.setState({
        showAddNew: true,
      })
    }

  }
  hideAddEventPopup = () => {
    this.setState({
      showAddNew: false,
    })
  }
  toggleEdit = () => {
    this.setState({
      showEdit: !this.state.showEdit,
    })
  }
  onCheckboxClick = (e) => {
    // console.log(e.target.value);
    const hideCats = this.state.hideCats;
    if(hideCats.includes(e.target.value)){
      const index = hideCats.indexOf(e.target.value);
      hideCats.splice(index, 1);
    } else {
      hideCats.push(e.target.value)
    }
    this.setState({
      hideCats
    })
  }
  render() {
    return (
      <div>
        <h1>Timeline</h1>
        <ul>
          {this.state.userCategories.map(cat => {
            return  <label key={cat.value}>
                      <input 
                        value={cat.value} 
                        checked={!this.state.hideCats.includes(cat.value)}
                        type="checkbox"
                        onChange={this.onCheckboxClick}
                      />
                      {cat.label}
                    </label>
          })}
        </ul>
        <Timeline 
          edit={this.state.showEdit} 
          showEditScreen={this.showAddEventPopup}
          hideCats={this.state.hideCats}
        />
        {this.state.userSignedIn && <button onClick={this.showAddEventPopup}>Add Event</button>}
        {this.state.showAddNew && 
          <AddEvent 
            hidePopup = {this.hideAddEventPopup} 
            eventID={this.state.showAddNew}
            userCategories={this.state.userCategories}
          />
        }

        <button onClick={this.toggleEdit}>Toggle Edit Events</button>

      </div>
    );
  }
}

export default App;
