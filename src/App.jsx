import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Country from './components/Country';
import NewCountry from './components/NewCountry';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Roboto',
      textTransform: 'none',
    },
  },
});

const App = () => {  

  const [ countries, setCountries ] = useState([]);
  const apiEndpoint = "https://medalcounter202302.azurewebsites.net/api/country";
  // const apiEndpoint = "http://localhost:5001"

    useEffect(() => {
      // initial data loaded here
      fetchCountries();
    }, []); 
    
    async function fetchCountries() {
      const { data: fetchedCountries } = await axios.get(apiEndpoint);
      const prepcountries = fetchedCountries.map(country => {
        return { id: country.id, name: country.name, medals: [{id: 1, type: "gold", count: country.gold},{id: 2,type:"sliver", count: country.silver},{id: 3,type:"bronze", count: country.bronze}]}
      });
      setCountries(prepcountries);
    }
    
    const DecreaseItem = (countryId, medalId) => {
      const newcountryList = countries.map((country) => {
        if(country.id === countryId) {
          country.medals.map((medal) => {
            if(medal.id === medalId && medal.count > 0) {
              medal.count -= 1;
            } 
            return medal;
          });
        } 
        return country;
      })
      
      setCountries(newcountryList)
    }
    const IncrementItem = (countryId, medalId) => {
      const newcountryList = countries.map((country) => {
        if(country.id === countryId) {
          country.medals.map((medal) => {
            if(medal.id === medalId){
              medal.count += 1;
            } return medal;
          });
        }
        return country;
      });
      setCountries(newcountryList);
    }

    const totalMedal = () => {
      const countryListCopy = [...countries];
      let total = 0;
      countryListCopy.forEach(country => {
        total += country.medals.reduce((count, medal) => count + medal.count, 0);
      })
      return total;
    };
    
    
    const addCountry = async (name) => {
      const { data: post } = await axios.post(apiEndpoint, { name: name });
      console.log(post);
      fetchCountries();
    }
    
    const onDelete = async (countryId) => {
      const originalCountries = countries;

      try {
        await axios.delete(`${apiEndpoint}/${countryId}`);
        // Both options work, one is just more efficient
        setCountries(countries.filter(country => country.id !== countryId));
        //fetchCountries();
      } catch(ex) {
        alert('An error occurred while deleting a country');
        setCountries(originalCountries);
      }
    }

    return ( 
    <>     
      <ThemeProvider theme={theme}>
        <Typography variant="h5" component="h5" align='center'>
          Olympic Medals: {totalMedal()}
        </Typography>
        
        <Grid container
        spacing={4}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        >
        
          <Grid item xs={4} style={{textAlign: "center"}}>
            {countries.map(country => (
                                        <Country
                                        key={country.id}
                                        country={country}                                    
                                        increment={IncrementItem}
                                        decrease={DecreaseItem}                                      
                                        onDelete={onDelete}
                                        />
                                    ))
            }
            <NewCountry
            countryName={addCountry}/>
          </Grid>        
        </Grid>  
    </ThemeProvider>  
    </>
    );
  }


export default App;
