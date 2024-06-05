"use client"

import React, { useEffect, useState } from 'react'
import BookView from '@/components/book/BookView'
import Grid from '@mui/material/Grid';
import BookImage from '@/components/book/BookImage';
import axios from 'axios';

interface Props {
    params: {
        _id: string
        tab: string
    }
}
interface item  {
  _id : string
  author : string
  name : string
  start_rating : number
  genre : string
  published : string
  price : string
  language : string
  image : string
}


const BookTabView = ({params}: Props) => {
  const [books,setBooks] = useState<item>(
    {
      _id : "" ,
    author : "",
    start_rating : 0,
    genre : "",
    published : "",
    name : "",
    price : "" ,
    language : "",
    image : ""
    }
  )
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
  const headers = { Authorization: `Bearer ${storedToken}` };
  const fetchBooks = async () => {
    
        const response = await axios.post('http://localhost:3601/books/view',{ book_id:params },
        {headers})
        .then((res) => {
            const fetchData = res.data
            setBooks(fetchData.data);
        })
   
  };
  fetchBooks()
  },[])

  return (
    <>
    <Grid container>
      <Grid item xs={6}>
        <BookImage data={books}/>      
      </Grid>
      <Grid item xs={6}>
      <BookView id={params._id} tab={params.tab || 'details'} data={books}/>

      </Grid>
    </Grid>
    </>
   
  )
}

export default BookTabView
