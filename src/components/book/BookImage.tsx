import React from 'react'
import { CardMedia } from "@mui/material"

interface Props  {
  data : {
    image : string
    name : string 
  }
  }

const BookImage = ({data}:Props) => {
  return (
      <div>
        <CardMedia
          style={{objectFit:'contain'}}
          component="img"
          width={400}
          height={400}
          image={data.image}
          alt={data.name}
        />
      </div>
  )
}

export default BookImage
