import { useState, useEffect } from 'react';
import axios from 'axios';


export default function IpFetchinator() {
    const [ipAdress, setIpAdress] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('https://api.ipify.org?format=json');
            const ip = response.data.ip;
            // console.log(response);
            setIpAdress(ip);
        }
        fetchData();
    }, []);

    return(
    <div>
        <h1>Your IPv4 is: {ipAdress}</h1>
    </div>
    )
}