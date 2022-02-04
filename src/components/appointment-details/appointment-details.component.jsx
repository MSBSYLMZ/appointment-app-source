import React from 'react';
import { useState, useEffect } from 'react';
import './appointment-details.styles.css'

import CustomTimeSelect from '../custom-time-select/custom-time-select.component';
import CustomButton from '../custom-button/custom-button.component';



const AppointmentDetails = ({ eventDetails, updateEvents, deleteEvent, slotsInfo, closeAppointmentDetails }) => {
  let {start,end,title}=eventDetails
  let eventId= eventDetails.eventId?eventDetails.eventId:null;
  const [eventInfo,setEventInfo] = useState({
  eventId,
  start,
  end,
  title
})
const [selectOptions, setSelectOptions]=useState({});

// This function gets start date of an event and sets select options based on slots info object

const prepareSelectOptions=(startDate)=>{
    startDate=new Date(startDate);
    let currentDate= new Date(startDate);
    currentDate.setHours(0,0,0,0);
    let startSlot=(startDate.getTime()- currentDate.getTime())/(30*60000)+1;
    let startOptions=[];

    for (let i = 1; i <= Object.keys(slotsInfo).length; i++) {
        if(slotsInfo[i]!==false){
            startOptions[i]=slotsInfo[i];
            startOptions[i]=new Date(startOptions[i]*(i-1)*30*60000+currentDate.getTime());
        }
    }

    let endOptions=[];

    for (let i = startSlot; i < Object.keys(slotsInfo).length+1; i++) {
        if(slotsInfo[i]!==true)
        break
        endOptions[i]=slotsInfo[i];
        endOptions[i]=new Date(endOptions[i]*i*30*60000+currentDate.getTime());
        
    }

    let optionsObj={
        startOptions,
        endOptions,
        startIndex:startSlot,
        endIndex:startSlot
    }

    if(eventInfo.eventId){
        let startIndex=new Date(startDate.getTime()-currentDate.getTime())/(30*60000)+1;
        let endIndex= new Date(eventInfo.end.getTime()-currentDate.getTime())/(30*60000);
        optionsObj.startIndex=startIndex
        optionsObj.endIndex=endIndex
    }
   setSelectOptions(optionsObj)
}
  const handleStartChange=(e)=>{
    prepareSelectOptions(e.target.value)
    // This next two line is there because of preventing a time-range bug  
    let startValue= new Date(e.target.value);
    let endValue = new Date(startValue.getTime()+(60000*30));
    setEventInfo({...eventInfo,start:new Date(e.target.value),end:endValue})
    
  }
  const handleEndChange=(e)=>{
    setEventInfo({...eventInfo,end:new Date(e.target.value)})
  }
  const handleTitleChange=(e)=>{
    setEventInfo({...eventInfo,title:e.target.value})
  }
 
 useEffect(() => {
    prepareSelectOptions(eventInfo.start);
 }, [eventInfo,slotsInfo]);

  return (
    
    <div id='appointment-details-container'>
    {console.log(eventInfo)}
      <div className='close-icon' onClick={closeAppointmentDetails}>&#10006;</div>
      <h2>Event Details</h2>
      <input type="text" onChange={handleTitleChange} />
      <CustomTimeSelect label="From" id="start" selectOptions={selectOptions.startOptions} index={selectOptions.startIndex} handleChange={handleStartChange}/>
      <CustomTimeSelect label="To" id="end" selectOptions={selectOptions.endOptions} index={selectOptions.endIndex} minIndexLimit={selectOptions.endIndex} handleChange={handleEndChange} />
      <div className='buttons-container'>
      {
          eventInfo.eventId?
        <CustomButton onClick={()=>{closeAppointmentDetails(); deleteEvent(eventInfo.eventId)}} style={{backgroundColor:'#FFF',color:'#BB2929', border:'1px solid #E43131'}}>Delete</CustomButton>
        :
        <div></div>
      }
      
      <CustomButton onClick={()=>{closeAppointmentDetails(); updateEvents(eventInfo); }} style={{backgroundColor:'#731054',color:'#FFFFFF'}}>Add</CustomButton>

      </div>
    </div>
  );
};

export default AppointmentDetails;
