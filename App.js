
import React from 'react';
import { useState , useEffect } from 'react';

const api = {

   key : "a26b997b648c1eb9b528dee1b5ae8621",
   base : "https://api.openweathermap.org/data/2.5/"


}


function App() {

   const[query , setQuery] = useState('');
   const[weather , setWeather] = useState({});


    const search =  async (evt) =>{

      if(evt.key === "Enter")
      {
        const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
        const data = await response.json();
        setWeather(data);
        setQuery('');
        console.log(data);
        
         
      }
    }

   const dateBuilder = (d)=>{

      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
   }

   const  inputHandler = (e) =>{
      setQuery(e.target.value);
      }

    return(
    

      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
         <div className='search-box'>
            <input type="text" className='search-bar' placeholder='Search..'
            onChange={inputHandler}
            value={query}
            onKeyPress={search}></input>
         </div>
         
        { 
             (typeof weather.main != "undefined") ?
             (
               <>
                  <div className='location-box'>
            <div className='location'>{weather.name} ,{weather.sys.country}</div>
            <div className='date'>
             {
             dateBuilder(new Date())
             }
            </div>

         </div>

         <div className='weather-box'>
            <div className='temp'> {
             Math.round(weather.main.temp)}<span>&#8451;</span></div>
            <div className='weather'>{weather.weather[0].main}</div>

         </div>
               </>
             ) : (' ')

        }

      
      </div>
       
   
     );
   
  
 
}


export default App;
