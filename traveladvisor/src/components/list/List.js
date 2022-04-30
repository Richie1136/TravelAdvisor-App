import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Menu } from "@material-ui/core"

import useStyles from './styles'
import { useState } from 'react'



const List = () => {

  const classes = useStyles()

  const [type, setType] = useState('restaurants')

  const handleChange = (event) => {
    setType(event.target.value)
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
    </div>
  )
}

export default List