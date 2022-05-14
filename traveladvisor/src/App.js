import Header from './components/header/Header';

import { CssBaseline, Grid } from '@material-ui/core'
import List from './components/list/List';
import Map from './components/map/Map';
import { getPlacesData, getWeatherData } from './api/index'
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
  const [weatherData, setWeatherData] = useState([])
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
      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => {
          setWeatherData(data)
        })
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
          <Map weatherData={weatherData} places={filteredPlaces.length ? filteredPlaces : places} setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} setChildClicked={setChildClicked} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;







// import React, { useState, useEffect } from 'react';
// import { CssBaseline, Grid } from '@material-ui/core';

// const App = () => {
//   const [type, setType] = useState('restaurants');
//   const [rating, setRating] = useState('');

//   const [coordinates, setCoordinates] = useState({});
//   const [bounds, setBounds] = useState(null);

//   const [weatherData, setWeatherData] = useState([]);
//   const [filteredPlaces, setFilteredPlaces] = useState([]);
//   const [places, setPlaces] = useState([]);

//   const [autocomplete, setAutocomplete] = useState(null);
//   const [childClicked, setChildClicked] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
//       setCoordinates({ lat: latitude, lng: longitude });
//     });
//   }, []);

//   useEffect(() => {
//     const filtered = places.filter((place) => Number(place.rating) > rating);

//     setFilteredPlaces(filtered);
//   }, [rating]);

//   useEffect(() => {
//     if (bounds) {
//       setIsLoading(true);

//       getWeatherData(coordinates.lat, coordinates.lng)
//         .then((data) => setWeatherData(data));

//       getPlacesData(type, bounds.sw, bounds.ne)
//         .then((data) => {
//           setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
//           setFilteredPlaces([]);
//           setRating('');
//           setIsLoading(false);
//         });
//     }
//   }, [bounds, type]);

//   const onLoad = (autoC) => setAutocomplete(autoC);

//   const onPlaceChanged = () => {
//     const lat = autocomplete.getPlace().geometry.location.lat();
//     const lng = autocomplete.getPlace().geometry.location.lng();

//     setCoordinates({ lat, lng });
//   };

//   return (
//     <>
//       <CssBaseline />
//       <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
//       <Grid container spacing={3} style={{ width: '100%' }}>
//         <Grid item xs={12} md={4}>
//           <List
//             isLoading={isLoading}
//             childClicked={childClicked}
//             places={filteredPlaces.length ? filteredPlaces : places}
//             type={type}
//             setType={setType}
//             rating={rating}
//             setRating={setRating}
//           />
//         </Grid>
//         <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Map
//             setChildClicked={setChildClicked}
//             setBounds={setBounds}
//             setCoordinates={setCoordinates}
//             coordinates={coordinates}
//             places={filteredPlaces.length ? filteredPlaces : places}
//             weatherData={weatherData}
//           />
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default App;