
import './home.css'
import { Box, Grid, Typography } from '@mui/material';
import Popular from '@/components/Popular';
import Slider from '@/components/Slider';

const Home = () => { 

  return (
    <Box>

    <Grid className='home-banner'>
        <Box className="title">
          <Typography variant="h1">Welcome to Limenzy book portal</Typography>
        </Box>
    </Grid>

    <Box className='most-picked container'>
      <Typography className='section-title'>Our Most picked</Typography>
      <Popular/>
    </Box>

    <Box className='container'>
      <Typography className='section-title'>Reviews</Typography>
      <Slider />
    </Box>
    
    </Box>
  )
}

export default Home

