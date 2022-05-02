import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Menu, Card } from "@material-ui/core"
import PlaceDetails from '../placedetails/PlaceDetails'

import useStyles from './styles'
import { useState } from 'react'



const List = () => {

  const classes = useStyles()

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  const places = [
    { name: 'Cool Place' },
    { name: 'Best Place' },
    { name: 'Best Steak' },
    { name: 'Cool Place' },
    { name: 'Best Place' },
    { name: 'Best Steak' },

  ]


  const handleChange = (event) => {
    setType(event.target.value)
  }

  const handleRatingChange = (event) => {
    setRating(event.target.value)
  }

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={handleChange}>
          <MenuItem value='restaurants'>Restaurants</MenuItem>
          <MenuItem value='hotels'>Hotels</MenuItem>
          <MenuItem value='attractions'>Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={handleRatingChange}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid className={classes.list} container spacing={3}>
        {places?.map((place, i) => {
          return <Grid item key={i} xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        })}
      </Grid>
    </div>
  )
}

export default List