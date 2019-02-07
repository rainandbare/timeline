import React, { Component } from 'react';
import { dbRef } from '../utils/firebase';
import SingleEvent from './SingleEvent';


class Timeline extends Component {
  constructor(){
    super();
    this.state = {
      events: [],
      scale: 0.5,

    };
  }
  componentDidMount(){
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      let minDate;
      const eventsFormatted = Object.keys(data)
        .map((id) => {
          data[id].id = id;  
          return data[id];
        })
        .sort((a, b) => parseInt(a.date.replace(/-/gi, '')) - parseInt(b.date.replace(/-/gi, '')))
        .map((event, i) => {
          if (i === 0){
            minDate = new Date(`${event.date.toString().split('-')[0]}-01-01`);
          }
          const date = new Date(event.date);
          const timeDiff = Math.abs(date.getTime() - minDate.getTime());
          const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          event.diffDays = diffDays;
          return event;
        });
        console.log(eventsFormatted)
      this.setState({
        events: eventsFormatted 
      })
    });
  }
  getDays = () => {
    if (this.state.events[0] !== undefined) {
      const minDate = new Date(`${this.state.events[0].date.toString().split('-')[0]}-01-01`);

      //get the total amount of days from the first Date to now
      const now = new Date();
      const timeDiff = Math.abs(now.getTime() - minDate.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      return { 
        diffDays, 
        yearOne: this.state.events[0].date.toString().split('-')[0]
      }
    } else {
      return 0;
    }
  }
  changeScale = (e) => {
    this.setState({
      scale: (e.target.value / 10)
    })
  }
  render() { 
    const numDays = this.getDays();
    const diffDayArray = this.state.events
                          .filter(event => {
                            return !this.props.hideCats.includes(event.category)
                          })
                          .map(event => event.diffDays);
    return (
      <div>
        <label htmlFor="scale">Scale</label>
        <input id="scale" type="number" value={(this.state.scale * 10)} onChange={this.changeScale} min={1} max={20}/>
       
        <ul className="timeline" style={{ width: (numDays.diffDays * this.state.scale)+ 'px' }} >
          {
            [...Array(numDays.diffDays)].map((e, i) => {
              
              if(i === 0){
                //first day
                return <span className="oneDay dot" style={{ width: this.state.scale + 'px' }} key={i}><span>{numDays.yearOne}</span></span>
              } else if (i === (numDays.diffDays - 1)) {
                //last day
                return <span className="oneDay dot" style={{ width: this.state.scale + 'px' }} key={i}><span>Today</span></span>
              } else if (i % 365 === 0){
                //year markers
                numDays.yearOne = parseInt(numDays.yearOne) + 1;
                return <span className="oneDay dot" style={{ width: this.state.scale + 'px' }} key={i} > <span>{numDays.yearOne}</span></span>
              } else if (diffDayArray.includes(i) && this.state.events){
                //event markers
                const event = this.state.events.filter(event => event.diffDays === i)
                return <span className={`oneDay dot eventDot ${event[0].category}`} style={{ width: this.state.scale + 'px' }} key={i} ></span>
              }
              return <span className="oneDay" style={{ width: this.state.scale + 'px' }} key={i}></span>
          })}
        </ul>
        <ul>
          {this.state.events.map((event) => {
            if (this.props.hideCats.includes(event.category)){ return };
            return (

              <SingleEvent
                key={event.id}
                event={event}
                edit={this.props.edit}
                showEditScreen={this.props.showEditScreen}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Timeline;