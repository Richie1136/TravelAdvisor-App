import Header from './components/header/Header';

import { CssBaseline, Grid } from '@material-ui/core'
import List from './components/list/List';
import Map from './components/map/Map';
import { getPlacesData } from './api/index'
import { useEffect, useState } from 'react'

function App() {

  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState(null)


  useEffect(() => {
    getPlacesData()
      .then((data) => {
        console.log(data)
        setPlaces(data)
      })
  }, [])

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
