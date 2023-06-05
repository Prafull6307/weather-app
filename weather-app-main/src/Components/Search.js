import React, { useState, useEffect } from 'react'
import { Weather } from './Weather';

export const Search = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [weather, setWeather] = useState();
    const openWeather = process.env.REACT_APP_OPEN_WEATHER;
    
    function handleChange(event) {
        setSearch(event.target.value);
    }
    
    useEffect(() => {
        const geoapify = process.env.REACT_APP_GEOAPIFY;
        if (search.length >= 3) {
            setResults([]);
            let url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&format=json&apiKey=${geoapify}`;
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    setResults(() => result.results.map(temp => {
                        let arr = {
                            formatted: temp.formatted,
                            lat: temp.lat, lon: temp.lon,
                            id: temp.place_id
                        };
                        return arr;
                    }));
                })
                .catch(error => console.log('error', error));
        }
    }, [search]);
    function handle(item) {
        let llurl = `https://api.openweathermap.org/data/2.5/weather?lat=${item.lat}&lon=${item.lon}&appid=${openWeather}`;
        fetch(llurl)
            .then(response => response.json())
            .then(result => {
                setWeather(result);
            })
            .catch(error => console.log('error', error));
    }
    function func() {
        return results.map((item) => {
            return <div key={item.id} className='SearchResults' onClick={() => handle(item)}>{item.formatted}</div>
        })
    }
    function handleClick(result) {
        if (search) {
            let llurl = `https://api.openweathermap.org/data/2.5/weather?lat=${result.lat}&lon=${result.lon}&appid=${openWeather}`;
            fetch(llurl)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                })
                .catch(error => console.log('error', error));
        }
    }
    return <div>
        <div className='top'>
            <form>
                <label>
                    <input className='Search'
                        id='Search'
                        type='text'
                        placeholder='Enter a location to get its weather'
                        value={search}
                        onChange={handleChange}
                    />
                    {func()}
                    <button className='Submit' type='button' onClick={() => handleClick(results)}>Submit</button>
                </label>
            </form>
        </div>
        <div className='weather'>
            {weather?weather.main.temp:'Nothing'}
            <Weather weather={weather} />
        </div>
    </div>
}