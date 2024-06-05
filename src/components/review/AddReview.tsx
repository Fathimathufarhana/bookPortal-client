import React from 'react'
import { 
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField
 } from "@mui/material"
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchAddReview } from '@/redux/slices/reviewSlice';


interface Props  {
  open : boolean
  handleClose : () => void,
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

interface reviewsData {
  _id: string,
  user: {
    first_name : string,
    last_name : string,
      _id : string
  },
  book: {
      name : string
  },
  rating: number,
  review: string,
  createdAt: string;
  updatedAt: string;
}
  const AddReview = ({ open,handleClose,data }:Props) => {

    const dispatch = useDispatch<any>()
    const router = useRouter()
    const {
      register,
      handleSubmit,
    } = useForm<reviewsData>()

    const onSubmit = handleSubmit((value) =>{
      dispatch(fetchAddReview({book_id:data._id, ...value }))
      router.push(`/books/view/${data._id}/details`)
      handleClose()
    })

    return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <TextField  {...register('review')}
            required
            margin='dense'
            name='review'
            label="Add your review"
            type='text'
            fullWidth
            variant='standard'
          /> 
          <TextField
            autoFocus
            required
            margin="dense"
            id="rating"
            label="Rating"
            type="number"
            InputProps={{ inputProps: { max: 5, min: 1 } }}
            fullWidth
            variant="standard"
            {...register("rating")}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={onSubmit} >Submit</Button>
        </DialogActions>
      </Dialog>
    )
  }

export default AddReview
