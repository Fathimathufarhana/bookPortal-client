"use client"
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { fetchAddBook } from '@/redux/slices/bookSlice';
import { useDispatch } from "react-redux"

const schema = yup.object().shape({
  name: yup.string().required('Book title is required!!'),
  author: yup.string().required('Author name is required'),
  genre: yup.string().required('Genre is required'),
  star_rating: yup.number().required(),
  published: yup.string().required('Published date is required'),
  price: yup.number().required('Book price is required'),
  language: yup.string().required('Language is required'),
  image: yup.string().required('upload cover image')
})

interface Data  {
    name : string
    author : string
    genre : string
    published : string
    star_rating: number
    price : number
    language : string
    image : string
  }

const CreateBook = () => {
  const [image, setImage] = useState('');
  const [coverImageName, setCoverImageName] = useState("");
  const [preview, setPreview] = useState('');


  const router = useRouter()
  const dispatch = useDispatch<any>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onFormSubmit = async (data:Data) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("author", data.author);
    formDataToSend.append("genre", data.genre);
    formDataToSend.append("star_rating", data.star_rating.toString());
    formDataToSend.append("published", data.published);
    formDataToSend.append("price", data.price.toString());
    formDataToSend.append("language", data.language);
    formDataToSend.append("image", data.image[0]);
    dispatch(fetchAddBook(formDataToSend))
      router.push("/books")
    };

  const handleImageChange = (e:any) => {

    // if (!e.target.files) return
    //   setSelectedFile(e.target.files[0]);
    // const selectedFile = e.target.files[0];
    const selectedFile = URL.createObjectURL(e.target.files[0]);
    setPreview(selectedFile);
    // console.log(preview)
    // setImage(e.target.files[0]);
// console.log(image,"image")
    // setCoverImageName(selectedFile ? selectedFile.name : "");
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
          <form onSubmit={handleSubmit( onFormSubmit )}>
            <Typography variant="h4" style={{ textAlign: "center", marginBottom: "20px" }}>
              Add Book
            </Typography>
            {/* <Box style={{maxHeight:"100px", maxWidth:"100px"}} >
              <img src={image.toString()} alt={coverImageName} style={{width:"80%", height:"100px"}}/>
              <img src={selectedFile === null ? '' : URL.createObjectURL(selectedFile)} alt="preview"
              style={{width:"80%", height:"100px"}}
               />
            </Box> */}
            {preview && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                <img src={preview} alt="Preview" style={{width:"30%"}}/>
              </Grid>
            )}
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
              <p>{errors.image?.message}</p>
              {/* {coverImageName && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {coverImageName}
                </Typography>
              )} */}
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("name")}
                fullWidth
                label="Title"
                name="name"
                variant="outlined"
              />
              <p>{errors.name?.message}</p>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("author")}
                fullWidth
                label="Author"
                name="author"
                variant="outlined"
              />
              <p>{errors.author?.message}</p>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("genre")}
                fullWidth
                label="Genre"
                name="genre"
                variant="outlined"
              />
              <p>{errors.genre?.message}</p>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("language")}
                fullWidth
                label="Language"
                name="language"
                variant="outlined"
              />
              <p>{errors.language?.message}</p>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("price")}
                fullWidth
                label="Price"
                name="price"
                variant="outlined"
                type="number"
              />
              <p>{errors.price?.message}</p>
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
              />
              <p>{errors.published?.message}</p>
            </Box>

            <Box style={{ marginBottom: "20px" }}>
              <TextField
                {...register("star_rating")}
                fullWidth
                label="Rating"
                name="star_rating"
                variant="outlined"
                type="number"
              />
              <p>{errors.star_rating?.message}</p>
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

export default CreateBook;
