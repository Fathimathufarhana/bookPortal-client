"use client"
import React, { useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Rating, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Carousel } from 'react-responsive-carousel'
import axios from 'axios';

interface Props {
    book : {
      name : string
    }
    user: {
      username : string
    }
    rating : number
    review : string
}[]

const defaultData = 
[{
    book : {
      name : ""
    },
    user: {
      username : ""
    },
    rating : 0 ,
    review : ""
}]


const Slider = () => {
  const [reviews, setReviews] = useState<Props[]>(defaultData)
  const storedToken = localStorage.getItem("access_token");
  const headers = { Authorization: `Bearer ${storedToken}` };

  const fetchReviews = async () => {
    await axios.post('http://localhost:3601/review/list',null,
    {headers})
    .then((res) => {
      const fetchReviews = res.data
      setReviews(fetchReviews.data);
    })
  };

  useEffect(() => {
    fetchReviews()
  },[])

  return (
    <Carousel autoPlay infiniteLoop centerMode  >
      {reviews.map((review, index) => {
        return(
          <>
            <Box key={index} component="p">

              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography >
                  {review.user.username}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" >
                  {review.book.name}
                </Typography>
              </CardContent>

              <Box>
                <Typography variant="caption" color="text.secondary">Total rating : </Typography>
                <Typography fontSize="lg" fontWeight="lg" variant='subtitle2'>
                  <Rating name="read-only" value={review.rating} readOnly />       
                </Typography>
              </Box>

              <Box>
                <Typography component="p" style={{padding:"10px 0 30px 0"}}>
                  {review.review}     
                </Typography>
              </Box>
              
            </Box>
         </>
      
        )}
      )}
    
    </Carousel>
  )
}

export default Slider