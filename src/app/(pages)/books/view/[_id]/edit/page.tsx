"use client"
import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchEditBook } from "@/redux/slices/bookSlice";

const schema = yup.object().shape({
  name: yup.string(),
  author: yup.string(),
  genre: yup.string(),
  star_rating: yup.string(),
  published: yup.date(),
  price: yup.number(),
  language: yup.string(),
  image: yup.string(),
})


interface Data  {
  // name : string
  // author : string
  // genre : string
  // star_rating : number | null
  // published : string
  // price : number
  // language : string
  // image : string
}


const EditBook = ({params}: {params: {_id:string}}) => {
  const [image, setImage] = useState('');
  const [coverImageName, setCoverImageName] = useState("");

  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    _id: null,
    author: "",
    genre: "",
    star_rating: "",
    published: "",
    price: "",
    language: "",
    image : "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const storedToken = localStorage.getItem("access_token");
  const headers = { Authorization: `Bearer ${storedToken}` };
  const dispatch = useDispatch<any>()


    useEffect(() => {
      const fetchBooks = async () => {
    
        await axios.post('http://localhost:3601/books/view',{book_id:params},
        {headers})
        .then((res) => {
            const fetchData = res.data
            setFormData(fetchData.data);
        })
      };
      fetchBooks()
    },[])

  const onFormSubmit = async (data:Data) => {
    const formDataToSend = new FormData();
    formDataToSend.append("bookid", params._id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("genre", formData.genre);
    formDataToSend.append("star_rating", formData.star_rating);
    formDataToSend.append("published", formData.published);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("language", formData.language);
    formDataToSend.append("image", image );
    dispatch(fetchEditBook(formDataToSend))
    router.push("/books")
  };

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e:any) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    console.log(image)
    setCoverImageName(selectedFile ? selectedFile.name : "");
  };

  return (

    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            margin: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            width: "400px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Typography variant="h4" style={{ textAlign: "center", marginBottom: "20px" }}>
              Edit Book
            </Typography>
            <Box className="preview" style={{maxHeight:"100px", maxWidth:"100px"}} >
              <img src={formData.image} alt="preview image" style={{width:"80%", height:"100px"}}/>
            </Box>
            <Box style={{ marginBottom: "20px" }}>
              <input
                {...register("image")}
                name="image"
                accept="image/*"
                style={{ display: "none" }}
                id="image"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image">
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload Cover Image
                </Button>
              </label>
              <Typography>{errors.image?.message}</Typography>
              {coverImageName && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {coverImageName}
                </Typography>
              )}
            </Box>
            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("name")}
                fullWidth
                label="Title"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
              />
              <Typography>{errors.name?.message}</Typography>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("author")}
                fullWidth
                label="Author"
                name="author"
                variant="outlined"
                value={formData.author}
                onChange={handleChange}
              />
              <Typography>{errors.author?.message}</Typography>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("genre")}
                fullWidth
                label="Genre"
                name="genre"
                variant="outlined"
                value={formData.genre}
                onChange={handleChange}
              />
              <Typography>{errors.genre?.message}</Typography>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("language")}
                fullWidth
                label="Language"
                name="language"
                variant="outlined"
                value={formData.language}
                onChange={handleChange}
              />
              <Typography>{errors.language?.message}</Typography>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("price")}
                fullWidth
                label="Price"
                name="price"
                variant="outlined"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
              <Typography>{errors.price?.message}</Typography>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("published")}
                fullWidth
                label="Published Date"
                name="published"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.published}
                onChange={handleChange}
              />
              <Typography>{errors.published?.message}</Typography>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("star_rating")}
                fullWidth
                label="Rating"
                name="star_rating"
                variant="outlined"
                type="number"
                value={formData.star_rating}
                onChange={handleChange}
              />
              <Typography>{errors.star_rating?.message}</Typography>
            </Box>

            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Box>
  
    </>
  );
};

export default EditBook;
