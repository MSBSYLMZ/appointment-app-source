import {useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './appointment-calendar.styles.css'

import CalendarToolbar from '../calendar-toolbar/calendar-toolbar.component';

const components={
    toolbar:CalendarToolbar
}

const localizer = momentLocalizer(moment)

const AppointmentCalendar = ({ events, openAppointmentDetails, setCurrentDate}) =>{
    useEffect(() => {
      setCurrentDate(new Date());
    }, []);

return (
  <div style={{height:'336px',width:'389px'}}>
      <Calendar
      localizer={localizer}
      step={30}
      events={events}
      view='day'
      onView={()=>{}}
      selectable={true}
      components={components}
      onNavigate={(date)=>{
          let currentDate=new Date(date);
          setCurrentDate(currentDate);
      }}
      dayPropGetter={
        ()=>({style:{backgroundColor:'#FAFAFA'}})
      }   
      slotGroupPropGetter={
          ()=>({style:{backgroundColor:'#FAFAFA',fontSize:'16px',fontWeight:'normal'}})
      }
      eventPropGetter={
          ()=>({style:{background:'rgba(115, 16, 84, 0.8)'}})
      }
      onSelectSlot={(slotInfo)=>{
        openAppointmentDetails(slotInfo);
      }}
      onSelectEvent={(event)=>{
        openAppointmentDetails(event);
      }}
      onSelecting={(range)=>{
            return false;
      }}
      timeslots={1}
      popup={true}
      />
  </div>
  )
}

export default AppointmentCalendar;
