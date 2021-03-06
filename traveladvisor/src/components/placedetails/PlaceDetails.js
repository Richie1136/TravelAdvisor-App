import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOnOutlined'
import PhoneIcon from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating'
import './PlaceDetails.css'

import useStyles from './styles'

const PlaceDetails = ({ place, refProp, selected }) => {
  const classes = useStyles()

  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <Card elevation={6}>
      <CardMedia className='cardMedia'
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h4'>
          {place.name}
        </Typography>
        <Box display='flex' justifyContent='space-between'>
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews} reviews</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cusine?.map(({ name }) => (
          <Chip className={classes.chip} key={name} size='small' label={name} />
        ))}
        {place?.address && (
          <Typography className={classes.subtitle} gutterBottom variant='subtitle2' color="textSecondary">
            <LocationOnIcon /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography className={classes.spacing} gutterBottom variant='subtitle2' color="textSecondary">
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button onClick={() => window.open(place.web_url, '_blank')} size='small' color='primary'>
            Trip Advisor
          </Button>
          <Button onClick={() => window.open(place.website, '_blank')} size='small' color='primary'>
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default PlaceDetails