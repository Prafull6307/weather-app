export const Weather=(props)=>{
    return <div>
        {props.weather?props.weather.main.temp:''}
    </div>
}