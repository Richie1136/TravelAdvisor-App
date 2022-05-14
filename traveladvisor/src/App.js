import Header from './components/header/Header';

import { CssBaseline, Grid } from '@material-ui/core'
import List from './components/list/List';
import Map from './components/map/Map';
import { getPlacesData } from './api/index'
import { useEffect, useState } from 'react'

function App() {

  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')
  const [autoComplete, setAutoComplete] = useState(null)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filtered = places.filter((place) => place.rating > rating)
    setFilteredPlaces(filtered)
  }, [rating])



  useEffect(() => {
    if (bounds.sw && bounds.ne) {

      setIsLoading(true)
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
          setFilteredPlaces([])
          setIsLoading(false)
        })
    }
  }, [bounds, type])

  const onLoad = (autoc) => setAutoComplete(autoc)

  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat()
    const lng = autoComplete.getPlace().geometry.location.lng()
    setCoordinates({ lat, lng })
  }


  return (
    <>
      <CssBaseline />
      <Header onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List isLoading={isLoading} places={filteredPlaces.length ? filteredPlaces : places} childClicked={childClicked} rating={rating} type={type} setType={setType} setRating={setRating} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map places={filteredPlaces.length ? filteredPlaces : places} setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} setChildClicked={setChildClicked} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;