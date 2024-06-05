import React, { useEffect } from 'react'
import { 
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    TextField
   } from "@mui/material"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchEditReview } from '@/redux/slices/reviewSlice'
import { useRouter } from 'next/navigation'



   interface Props {
    open : boolean
    handleClose : () => void,
    review : {
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
    data : {
      _id : string
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

const EditReview = ({open,handleClose,review,data}:Props) => {

    const user = localStorage.getItem("user_id")
    const dispatch = useDispatch<any>()
    const router = useRouter()
    const {
      register,
      handleSubmit,
      reset
    } = useForm<reviewsData>()
    const onSubmit = handleSubmit((value) =>{
      dispatch(fetchEditReview({...value, user,_id:review._id}))
      router.push(`/books/view/${data._id}/details`)
      handleClose()
    })

  const initialValue = (review: reviewsData) => {
    reset({
          rating : review.rating,
          review : review.review
      })
  }

useEffect(() => {
 initialValue(review)
},[review])

  return (
    <>
    <Dialog
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>Edit Review</DialogTitle>
    <DialogContent>
      <TextField  {...register("review")}
        required
        margin='dense'
        name='review'
        label="Add your review"
        type='text'
        fullWidth
        variant='standard'
        /> 
          <TextField {...register("rating")}
            autoFocus
            required
            margin="dense"
            id="rating"
            label="Rating"
            type="number"
            InputProps={{ inputProps: { max: 5, min: 1 } }}
            fullWidth
            variant="standard"
          />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button type="submit" onClick={onSubmit} >Submit</Button>
    </DialogActions>
  </Dialog>
  </>
  )
}

export default EditReview
