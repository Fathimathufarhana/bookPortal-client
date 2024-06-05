"use client"
import React, { useEffect } from 'react'
import { 
  Typography, 
  Card, 
  CardActionArea, 
  Grid, 
  CardContent, 
  Rating,
  Box,
  Button,
 } from "@mui/material"
import EditReview from '../review/EditReview'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviews } from '@/redux/slices/reviewSlice'
import AddReview from '../review/AddReview'

interface Props  {
  data : {
    _id : string
    author : string
    name : string
    star_rating : number
    genre : string
    published : string
    price : string
    language : string
    // image : string 
  }
  }

const BookReviewTab = ({data}:Props) => {

  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const userId = localStorage.getItem("user_id")
  const dispatch = useDispatch<any>()
  const fetchReview = useSelector((state:any) => state.allReviews.reviewData)

    useEffect(() => {
        dispatch(fetchReviews({_id:data._id}))
    }, [data._id])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  return (
    <Box
      key={data._id}
    >
       <Button
            onClick={handleClickOpen}
            variant="contained"
            color="primary"
            sx={{
              '--variant-borderWidth': '2px',
              borderRadius: '20px',
              borderColor: 'primary.500',
              mx: 'auto',
            }}
          >
             Add Review
          </Button>
      {fetchReview.length === 0 ? 
      <Grid><Typography variant='h5' sx={{ color: "red"}}>No reviews</Typography></Grid> :
      
      fetchReview.map((review: any, index: string) => {
        
        return (
          <>
            <AddReview 
            open={ open } 
            handleClose={ handleClose } 
            data={data}
            />

            <Card key={review._id}  style={{ maxWidth: "350px", marginBottom: "20px"}}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h4">
                  { review.user.first_name } { review.user.last_name }
                  </Typography>
                  <Typography variant="subtitle1">
                    {data.author}
                  </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                    </Typography> 
                    <Grid sx={{ display: "flex" , justifyContent: "center"}}>
                        <Typography variant="body2" color="text.secondary">Rating : </Typography>
                        <Rating value={review.rating} name="read-only" readOnly />
                    </Grid> <br />
                    <Typography variant="body2" color="text.secondary">
                      { review.review } 
                    </Typography> <br />
                </CardContent>
              </CardActionArea>

              <CardActionArea>
                { userId === review.user._id ? 
                  <Button
                    onClick={handleClickEditOpen}
                    variant="contained"
                    color="primary"
                    sx={{
                      '--variant-borderWidth': '2px',
                      borderRadius: '20px',
                      borderColor: 'primary.500',
                      mx: 'auto',
                      mb: '10px',
                      ml: '10px'
                    }}
                  >
                    Edit Review
                  </Button> : 
                    null
                }
              </CardActionArea>
            </Card> 

            <EditReview
              open={ editOpen } 
              handleClose={ handleEditClose } 
              review={ review }
              data={data}
            />
          </>
        )
      })}
    </Box>
  )
}

export default BookReviewTab

