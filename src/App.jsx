import './App.css';
import React, {useState, useEffect} from 'react';
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

  useEffect(() => {
        // initial data loaded here
        let fetchedCountryList  = [
          { id: 1, name: 'United States', medals: [{id: 1, type: "gold", count: 4},{id: 2,type:"sliver", count: 2},{id: 3,type:"bronze", count: 0}]},
          { id: 2, name: 'China', medals: [{id: 1, type: "gold", count: 3},{id: 2,type:"sliver",  count: 2},{id: 3,type:"bronze", count: 1}]},
          { id: 3, name: 'Germany', medals: [{id: 1, type: "gold", count: 0},{id: 2,type:"sliver",  count: 1},{id: 3,type:"bronze", count: 1}]},
        ]
        setCountries(fetchedCountryList);
      }, []);  

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
      // setCountries({countryList:newcountryList});
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
    
    const addCountry = (countryName) => {
      const countryListCopy = [...countries];
      countryListCopy.push({ id: Math.random(), name: countryName, medals: [{id: 1, type: "gold", count: 0},{id: 2,type:"sliver",  count: 0},{id: 3,type:"bronze", count: 0}]});
      setCountries(countryListCopy);
    }

    const onDelete = (countryId) => {
      const newcountryList = countries.filter(country => country.id !== countryId);
      setCountries(newcountryList);
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
