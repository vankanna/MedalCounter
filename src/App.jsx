import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Login from './components/Login';
import Country from './components/Country';
import NewCountry from './components/NewCountry';



const App = () => {

  const apiEndpoint = "https://medalcounter202302.azurewebsites.net/api/country";
  const hubEndpoint = "https://medalcounter202302.azurewebsites.net/medalsHub"
  const usersEndpoint = "https://medalcounter202302.azurewebsites.net/api/users/login";
  //const hubEndpoint = "https://localhost:5001/medalsHub"
  //const apiEndpoint = "https://localhost:5001/api/country"
  // const usersEndpoint = "https://localhost:5001/api/users/login";
  const [countries, setCountries] = useState([]);
  const [connection, setConnection] = useState(null);

  const setupCountries = (flatCountries) => {
    return flatCountries.map(country => {
      return { id: country.id, name: country.name, medals: [{ id: 1, type: "gold", count: country.gold }, { id: 2, type: "silver", count: country.silver }, { id: 3, type: "bronze", count: country.bronze }] }
    });
  };

  const [ user, setUser ] = useState(
    {
      name: null,
      canPost: false,
      canPatch: false,
      canDelete: false
    }
  );

  const latestCountries = useRef(null);
  // latestCountries.current is a ref variable to countries
  // this is needed to access state variable in useEffect w/o dependency
  latestCountries.current = countries;

  useEffect(() => {

    async function fetchCountries() {
      const { data: fetchedCountries } = await axios.get(apiEndpoint);
      setCountries(setupCountries(fetchedCountries));
    }

    fetchCountries();

    const encodedJwt = localStorage.getItem("token");
    // check for existing token
    if (encodedJwt) {
      setUser(getUser(encodedJwt));
    }


    // signalR
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubEndpoint)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  // componentDidUpdate (changes to connection)
  useEffect(() => {

    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected!')
          connection.on('ReceiveAddMessage', country => {
            console.log(`Add: ${country.name}`);
            let mutableCountries = [...latestCountries.current];
            mutableCountries = mutableCountries.concat(setupCountries([country]));
            setCountries(mutableCountries);
          });
          connection.on('ReceiveDeleteMessage', id => {
            console.log(`Delete id: ${id}`);
            let mutableCountries = [...latestCountries.current];
            mutableCountries = mutableCountries.filter(c => c.id !== id);
            setCountries(mutableCountries);
          });

          connection.on('ReceivePatchMessage', country => {
            console.log(`Patch: ${country.name}`);
            let mutableCountries = [...latestCountries.current];
            const idx = mutableCountries.findIndex(c => c.id === country.id);
            mutableCountries[idx] = setupCountries([country])[0];

            setCountries(mutableCountries);
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
    // useEffect is dependent on changes connection
  }, [connection]);

  const IncrementMedal = (countryId, medalId) => handleUpdate(countryId, medalId, 1);
  const DecreaseMedal = (countryId, medalId) => handleUpdate(countryId, medalId, -1)

  const handleUpdate = async (countryId, medalId, factor) => {
    const newcountryList = countries.map((country) => {
      // const idx = countries.findIndex(c => c.id === countryId);
      if (country.id === countryId) {
        country.medals.map((medal) => {
          if (medal.id === medalId) {
            medal.count += (1 * factor);
          } return medal;
        });
      }
      return country;
    });
    setCountries(newcountryList);
    
    const countryToPatchIndex = countries.findIndex(x => x.id === countryId);
    const country = countries[countryToPatchIndex];
    const medalType = country.medals[medalId - 1].type;
    const medalCount = country.medals[medalId - 1].count;
    const jsonPatch = [{ op: "replace", path: medalType, value: medalCount }];    
    console.log(`json patch for id: ${countryId}: ${JSON.stringify(jsonPatch)}`);

    try {
      await axios.patch(`${apiEndpoint}/${countryId}`, jsonPatch, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // country already deleted
        console.log("The record does not exist - it may have already been deleted");
      } else if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) { 
        // in order to restore the defualt medal counts, we would need to save 
        // the page value and saved value for each medal (like in the advanced example)
        alert('You are not authorized to complete this request');
        // to simplify, I am reloading the page instead
        window.location.reload(false);
      } else if (ex.response) {
        console.log(ex.response);
      } else {
        console.log("Request failed");
      }
    }
  }
  const handleLogin = async (username, password) => {
    try {
      const resp = await axios.post(usersEndpoint, { username: username, password: password });
      const encodedJwt = resp.data.token;
      localStorage.setItem('token', encodedJwt);
      setUser(getUser(encodedJwt));
    } catch (ex) {
      if (ex.response && (ex.response.status === 401 || ex.response.status === 400 )) {
        alert("Login failed");
      } else if (ex.response) {
        console.log(ex.response);
      } else {
        console.log("Request failed");
      }
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    console.log('logout');
    localStorage.removeItem('token');
    setUser({
      name: null,
      canPost: false,
      canPatch: false,
      canDelete: false
    });
    return false;
  }

  const getUser = (encodedJwt) => {
    // return unencoded user / permissions
    const decodedJwt = jwtDecode(encodedJwt);
    return {
      name: decodedJwt['username'],
      canPost: decodedJwt['roles'].indexOf('medals-post') === -1 ? false : true,
      canPatch: decodedJwt['roles'].indexOf('medals-patch') === -1 ? false : true,
      canDelete: decodedJwt['roles'].indexOf('medals-delete') === -1 ? false : true,
    };
  }
  const totalMedal = () => {
    const countryListCopy = [...latestCountries.current];
    let total = 0;
    countryListCopy.forEach(country => {
      total += country.medals.reduce((count, medal) => count + medal.count, 0);
    })
    return total;
  };


  const addCountry = async (name) => {
    try {
      await axios.post(apiEndpoint, {
        name: name
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (ex) {
      if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) {
        alert("You are not authorized to complete this request");
      } else if (ex.response) {
        console.log(ex.response);
      } else {
        console.log("Request failed");
      }
    }
  }

  const onDelete = async (countryId) => {
    const originalCountries = countries;
    setCountries(countries.filter(country => country.id !== countryId));
    try {
      await axios.delete(`${apiEndpoint}/${countryId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Both options work, one is just more efficient
      
      //fetchCountries();
    } catch (ex) {      
      setCountries(originalCountries);
      if (ex.response && (ex.response.status === 401 || ex.response.status === 403)) {
        alert("You are not authorized to complete this request");
      } else if (ex.response) {
        console.log(ex.response);
      } else {
        console.log("Request failed");
      }
    }

  }

  return (
    <Router>
      <div className='appHeading'>
          Olympic Medals: 
          <span className='badge'>{totalMedal()}</span>
          {user.name ? 
          <span className='logout'><a href="/" onClick={handleLogout} className='logoutLink'>Logout</a> [{user.name}]</span>
          :
          <Link to="/login" className='loginLink'>Login</Link>
          }
      </div>
        <Route exact path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <div className='countries'>
            {countries.map(country => (
              <Country
                key={country.id}
                country={country}
                canDelete={ user.canDelete }
                canPatch={ user.canPatch }
                increment={IncrementMedal}
                decrease={DecreaseMedal}
                onDelete={onDelete}
              />)
            )}
            { user.canPost && <NewCountry countryName={ addCountry } /> }
          </div>      
    </Router>
  );
}


export default App;
