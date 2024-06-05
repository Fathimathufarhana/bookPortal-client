import { useRouter } from 'next/navigation'
import React from 'react'
import {Box, Card, Typography, CardContent, Button} from '@mui/material'
import { useDispatch } from 'react-redux'
import { fetchDeleteBook } from '@/redux/slices/bookSlice'


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

const BookDetailsTab = ({data}:Props)=> {

      const dispatch = useDispatch<any>()
      const router = useRouter()

      const handleDelete = () => {
        dispatch(fetchDeleteBook({bookid:data._id}))
        router.push("/books")
      }

  return (
   
    <Card sx={{ display: 'flex' }}>
  
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>

          <Typography  variant="h5">
            {data.name}
          </Typography>

          <Typography variant="subtitle1">
            Author : {data.author}
          </Typography>

          <Typography variant="subtitle1">
            Rating : {data.star_rating}
          </Typography>

          <Typography variant="subtitle1">
            Price : {data.price}
          </Typography>

          <Typography variant="subtitle1">
            Genre : {data.genre}
          </Typography>

          <Typography variant="subtitle1">
            Published date : {data.published}
          </Typography>

          <Typography variant="subtitle1">
            Language : {data.language}
          </Typography>

        </CardContent>

        <Box className='action-btn'>
          <Button
            onClick={() => router.push(`/books/view/${data._id}/edit`)}
            variant="contained"
            color="primary"
            sx={{
              '--variant-borderWidth': '2px',
              borderRadius: '20px',
              borderColor: 'primary.500',
              mx: 'auto',
            }}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            sx={{
              '--variant-borderWidth': '2px',
              borderRadius: '20px',
              borderColor: 'primary.500',
              mx: 'auto',
            }}
          >
            Delete
          </Button>
        </Box>

      </Box>
    </Card>
  )
}

export default BookDetailsTab
