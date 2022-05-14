import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Menu, Card } from "@material-ui/core"
import PlaceDetails from '../placedetails/PlaceDetails'

import useStyles from './styles'
import { useState, useEffect, createRef } from 'react'



const List = ({ places, childClicked, isLoading, rating, type, setType, setRating }) => {

  const classes = useStyles()
  const [eleRefs, seteleRefs] = useState([])

  console.log({ childClicked })

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => eleRefs[i] || createRef())
    seteleRefs(refs)
  }, [places])


  const handleChange = (event) => {
    setType(event.target.value)
  }

  const handleRatingChange = (event) => {
    setRating(event.target.value)
  }

  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurants, Hotels & Attractions around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size='40' />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={handleChange}>
              <MenuItem value='restaurants'>Restaurants</MenuItem>
              <MenuItem value='hotels'>Hotels</MenuItem>
              <MenuItem value='attractions'>Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={handleRatingChange}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid className={classes.list} container spacing={3}>

            {places?.map((place, i) => (
              <Grid ref={eleRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={eleRefs[i]} place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  )
}

export default List