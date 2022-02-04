import './custom-time-select.styles.css'
const CustomTimeSelect = ({selectOptions=[], id, label, handleChange, index}) => {
return (
    <div className="custom-time-select">
        <label htmlFor={id}>{label}</label>
            <select id={id} onChange={e=>handleChange(e)} defaultValue={selectOptions[index]} value={selectOptions[index]} >
            {
            selectOptions.map((selectOption,i)=>{
              return  (<option value={selectOption} key={i}>{selectOption.toLocaleTimeString('en-US',{ hour12: true,hour: '2-digit', minute: '2-digit' })}</option>)
            
            }
                
            )
            }
            </select>
    </div>
    
)
};

export default CustomTimeSelect;
