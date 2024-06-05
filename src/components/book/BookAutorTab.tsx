"use client"
import React from 'react'
import { Typography, Box } from "@mui/material"

interface Props  {
  data : {
    author : string
    name : string 
  }
  }

const BookAutorTab = ({data}:Props) => {
  return (
    <Box>
     <Typography variant="h4">
        {data.author}
      </Typography>
       <Typography variant="subtitle1">
        {data.name}
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sed provident voluptate.
         Quia aperiam sint odit commodi ea, voluptate repudiandae repellendus, beatae accusamus
          debitis autem dicta fugiat. Fugit dolor nam, ab, doloremque omnis commodi non earum harum 
          inventore voluptatum, dolorem officia ratione saepe deserunt itaque beatae quos error
           ipsa est ad veritatis atque sit quae. Quos dicta soluta sit doloribus, possimus aliquid,
            corporis dolorum adipisci cum doloremque velit quibusdam saepe.
      </Typography>
    </Box>
  )
}

export default BookAutorTab
