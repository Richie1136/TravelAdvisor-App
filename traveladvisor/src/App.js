import Header from './components/header/Header';

import { CssBaseline, Grid } from '@material-ui/core'
import List from './components/list/List';
import Map from './components/map/Map';
import { getPlacesData } from './api/index'
import { useEffect, useState } from 'react'

function App() {

  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
  const [bounds, setBounds] = useState(null)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])


  useEffect(() => {
    console.log(coordinates, bounds)
    getPlacesData()
      .then((data) => {
        console.log(data)
        setPlaces(data)
      })
  }, [coordinates, bounds])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
