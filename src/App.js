import { useState, useEffect } from 'react';

import  './App.css';

import AppointmentCalendar from './components/appointment-calendar/appointment-calendar.component';
import AppointmentDetails from './components/appointment-details/appointment-details.component';

function App() {

  const [events, setEvents]=useState({});
  const [currentDateEvents,setCurrentDateEvents]=useState([]);
  const [hiddenEventDetails, setHiddenEventDetails]=useState(true);
  const [eventDetails, setEventDetails] = useState({})
  const [slotsInfo, setSlotsInfo]=useState({});
  const [currentDate, setCurrentDate ]=useState(new Date())
  
  const openAppointmentDetails=(slots)=>{
    setEventDetails(slots)
    setHiddenEventDetails(false)
    if(slots.eventId)
      prepareSlotObj(slots.eventId);
    else
    prepareSlotObj();
  }
  const closeAppointmentDetails=()=>{
    setHiddenEventDetails(true)
    prepareSlotObj();
  }
  const generateEventId=(startDate)=>{
    let eventId=startDate.getTime().toString();
    return eventId;
  }
  const generateDateId=(currentDate)=>{
    let currentDateId=new Date(currentDate)
    currentDateId.setHours(0,0,0,0)
    currentDateId=typeof currentDateId == 'number' ? currentDateId : currentDateId.getTime();
    return currentDateId;
  }

// Slot Object is an object that represents each slot on the calendar
// By default it's an object with 48 properties that returns true
// True means that slot is empty. 
// Slot object answers the question of "is empty"

const initializeSlotObj=(numOfSlots)=>{
    let initSlotObj={}
    for (let i = 1; i <= numOfSlots; i++) {
        initSlotObj[i]=true
    }
    return initSlotObj;
}

// This function changes the default value of the slot object 
// Iterates through all the events
// for each events changes the value of slot that represent it.

const prepareSlotObj=(eventId=null)=>{
  let tmpCurrentDateEvents=[...currentDateEvents]

  // For existing event updates 
  if(eventId){
    let eventIndex=tmpCurrentDateEvents.findIndex(item=>(item.eventId===eventId));
    tmpCurrentDateEvents.splice(eventIndex,1);
  }

  let activeDate= new Date(currentDate);
  let tmpSlotsInfo=initializeSlotObj(48);
  activeDate= typeof activeDate != 'number' ? activeDate.getTime(): activeDate;

  for (let i = 0; i < tmpCurrentDateEvents.length; i++) {
      let slotStartIndex=(new Date(tmpCurrentDateEvents[i].start).getTime()-activeDate)/(30*60000)+1;
      let slotEndIndex=(new Date(tmpCurrentDateEvents[i].end).getTime()-activeDate)/(30*60000)

      for (let j = slotStartIndex; j <= slotEndIndex; j++) {
        tmpSlotsInfo[j]=false;
      };

  }
  setSlotsInfo(tmpSlotsInfo);
}
  const getEvents=(date=currentDate)=>{
    date.setHours(0,0,0,0);
    let dateTime=date.getTime();
    setCurrentDateEvents(events[dateTime]?events[dateTime]:[])
  }

  const updateEvents=(event)=>{
    let { title, start, end } = event;
    let durationInMs= end-start;
    let eventObj={};
    let eventId=generateEventId(start);

      if(event.eventId){
        let eventIndex=currentDateEvents.findIndex(item=>(item.eventId===event.eventId));

          eventObj={
            eventId,
            title,
            start,
            end,
            durationInMs
          }
        currentDateEvents[eventIndex]=eventObj;
        setCurrentDateEvents(currentDateEvents);
      }else{
        eventObj={
           eventId,
           title,
           start,
           end,
           durationInMs
        }
        setCurrentDateEvents([...currentDateEvents,eventObj]); 
      }
    prepareSlotObj();
  }

  const deleteEvent=(eventId)=>{
    let eventIndex=currentDateEvents.findIndex(item=>(item.eventId===eventId));
    currentDateEvents.splice(eventIndex,1);
    setCurrentDateEvents(currentDateEvents);
  }

  useEffect(() => {
    setSlotsInfo(initializeSlotObj(48));
      if(currentDateEvents.length>0){
        prepareSlotObj();
      }
    getEvents()
  },[currentDate]);
  
  useEffect(() => {
    let currentDayId= generateDateId(currentDate)
    events[currentDayId]=currentDateEvents;
    setEvents(events);
  }, [currentDateEvents]);
  
  return (
    <div className='App'>
    <h1>Schedule an Appointment</h1>
    <AppointmentCalendar openAppointmentDetails={openAppointmentDetails} events={currentDateEvents} setCurrentDate={setCurrentDate} getEvents={getEvents} />
    {
      console.log(events)
    }
    {
      !hiddenEventDetails?
      <AppointmentDetails eventDetails={eventDetails} updateEvents={updateEvents} deleteEvent={deleteEvent} currentDateEvents={currentDateEvents} slotsInfo={slotsInfo} closeAppointmentDetails={closeAppointmentDetails}/>
      :
      null
    }
    </div>
  );
}

export default App;
