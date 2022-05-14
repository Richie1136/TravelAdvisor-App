import { Autocomplete } from "@react-google-maps/api"
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './styles'
import { useState } from 'react'


const Header = ({ onPlaceChanged, onLoad }) => {
  const classes = useStyles()
  const [autocomplete, setAutoComplete] = useState(null)


  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h5">
          Travel Advisor
        </Typography>
        <Box display='flex'>
          <Typography className={classes.title} variant="h6">
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase classes={{ root: classes.inputRoot, input: classes.inputInput }} placeholder="Search Place" />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header