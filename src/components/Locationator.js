import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Locationator() {
    const [location, setLocation] = useState({
        ip: '',
  location: {
    region: '',
    country: '',
    city: ''
  },
  isp: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                // Get the user's IP address
                const ipResponse = await axios.get('https://api.ipify.org?format=json');
                const userIp = ipResponse.data.ip;

                // Get the user's location information
                const locationResponse = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}&ipAddress=${userIp}`);
                const data = locationResponse.data;

                setLocation(data);
            } catch (error) {
                setError('Sorry, something went horribly wrong. OMG!!! Initializing self destruction....self destruction in 3, 2,....');
            }
        }
        fetchData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return(
        <div>
            <h1>Your IP address is: {location.ip}</h1>
            <h2>What else do I know about you?</h2>
            <ul>
                <li>You live in {location.location.region}, {location.location.country} </li>
                <li>You are most likely in {location.location.city} right now (at least your browser thinks you are)</li>
                <li>Your internet provider is {location.isp}</li>
            </ul>
        </div>
    )
}
