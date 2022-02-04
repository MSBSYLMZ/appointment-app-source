import { Navigate } from "react-big-calendar";
import moment from "moment";

import './calendar-toolbar.styles.css'

const CalendarToolbar = (event) => { 
 let eventDate=new Date(event.date);
 let today=moment(eventDate).format("YYYY-MM-DD");
 let todayAsString=eventDate.toLocaleDateString('en-US',  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
 
  return ( 
    <div className="toolbar">
    <input type="date" defaultValue={today} onChange={e=>{
      let selectedDate=moment(e.target.value).format('LLLL')
      event.onNavigate(Navigate.DATE,selectedDate)
    }} ></input>
    <h4>{todayAsString}</h4>
    </div>
  ) 
}

export default CalendarToolbar;