"use client"
import React, { useEffect, useState } from 'react'
import { Button, 
  Box, 
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputLabel,
 } from "@mui/material";
import BasicCard from "@/components/BookCard"
import "../../../components/card.css"
import { useRouter } from 'next/navigation';
import StarIcon from '@mui/icons-material/Star';
import { fetchBooks } from '@/redux/slices/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';



const page = () => {
  const [priceFilter, setPriceFilter] = useState<number>(0);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [role, setRole] = useState<string | null>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3)

  const router = useRouter()
  const dispatch = useDispatch<any>()
  const fetchBook = useSelector((state:any) => state.allBooks.bookData)
  
  useEffect(() => {
    const role_user = localStorage.getItem("role")
    setRole(role_user)
    dispatch(fetchBooks({ q:searchValue, price:priceFilter, star_rating:ratingFilter }))
  },[searchValue, priceFilter, ratingFilter])
  

  const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = fetchBook.slice(indexOfFirstPost, indexOfLastPost);
 
  interface Paginate {
    selected : number
  }

  const paginate = ({ selected }: Paginate) => {
		setCurrentPage(selected + 1);
	};
  return (
    <>
      <Box className='add-btn container'>
      { 
        role === "admin" ?
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => router.push('/books/add')} >
            Add New
          </Button>   
          : 
        null
      }
      <Grid className="container book-filtres"  sx={{ display: "flex", alignItems: "center" }}>
        <FormControl
          variant="filled"
          sx={{ m: 1 ,width: "100%" }}
        >
          <InputLabel id="demo-simple-select-label">All Price</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e)=> setPriceFilter(e.target.value as number)}
              value={priceFilter}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={1000}>Below &#x20B9;1000</MenuItem>
                <MenuItem value={500}>Below &#x20B9;500</MenuItem>
                <MenuItem value={200}>Below &#x20B9;200</MenuItem>
                <MenuItem value={100}>Below &#x20B9;100</MenuItem>
            </Select>
        </FormControl>

        <FormControl
          variant="filled"
          sx={{ m: 1, width: "100%" }}
        >
          <InputLabel id="demo-simple-select-label">All Ratings</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Star Ratings"
              value={ratingFilter}
              onChange={(e)=> setRatingFilter(e.target.value as number)}
            >
                <MenuItem value="">All Ratings</MenuItem>
                <MenuItem value={1}>1 <StarIcon /></MenuItem>
                <MenuItem value={2}>2 <StarIcon /></MenuItem>
                <MenuItem value={3}>3 <StarIcon /></MenuItem>
                <MenuItem value={4}>4 <StarIcon /></MenuItem>
                <MenuItem value={5}>5 <StarIcon /></MenuItem>
            </Select>
        </FormControl>

          <TextField
            id="search"
            name="search"
            label="Search"
            sx={{ width: "100%" }}
            onChange={(e)=> setSearchValue(e.target.value)}
          />
      </Grid>

      </Box>
      <Box className="books container">
        {currentPosts.map((items:any, index:string) => {
            return <BasicCard data={items} key={index}/>;
          })
        }
      </Box>
      <ReactPaginate
						onPageChange={paginate}
						pageCount={Math.ceil(fetchBook.length / postsPerPage)}
						previousLabel={'Prev'}
						nextLabel={'Next'}
						containerClassName={'pagination'}
						pageLinkClassName={'page-number'}
						previousLinkClassName={'page-number'}
						nextLinkClassName={'page-number'}
						activeLinkClassName={'active'}
			/>
    </>
  )
}

export default page
