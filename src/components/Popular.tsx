"use client"
import axios from 'axios'
import { Box } from "@mui/material"
import React, { useEffect, useState } from 'react'
import PopularBookCard from '@/components/PopularBookCard';
import "./card.css"

interface BookData {
  _id: string,
  name: string,
  author: string,
  genre: string,
  star_rating: number,
  published: string,
  price: number,
  language: string,
  image: string,
  isDeleted: Boolean,
  createdAt: string;
  updatedAt: string;
}[]

const defaultBookData =[{
  _id: "",
  name: "",
  author: "",
  genre: "",
  star_rating: 0,
  published: "",
  price: 0,
  language: "",
  image: "",
  isDeleted: false,
  createdAt: "",
  updatedAt: ""
}]
const Popular =  () => {
    const [topBooks , setTopBooks] = useState<BookData[]>(defaultBookData)
    const [fetchBooks, setFetchBook] = useState<BookData[]>(defaultBookData)

  const storedToken = localStorage.getItem("access_token");
  const headers = { Authorization: `Bearer ${storedToken}` };

  const fetchBooksData =  () => {
          axios.post('http://localhost:3601/books/list',null,
          {headers})
          .then((res) => {
            const fetchData = res.data
            setFetchBook(fetchData.data);
          })
  };

  useEffect(() => {
    fetchBooksData()
  },[])
  
  useEffect(() => {
    const filteredList = fetchBooks.sort((a,b) => b.star_rating - a.star_rating  ).slice(0, 2)
    setTopBooks(filteredList)
  },[fetchBooks])

  return (
    <Box sx={{ 
      display: 'flex' ,
      gap: "30px"
    }}>
      {topBooks.map((items:BookData, index) => {
        return <PopularBookCard data={items} key={index} />;
      })}
    </Box>
  )
}

export default Popular
