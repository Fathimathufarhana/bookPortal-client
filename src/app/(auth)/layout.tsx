import React, { ReactNode } from 'react'
import Box from '@mui/material/Box';

interface Props {
    children?: ReactNode
}

const layout = ({ children, ...props }: Props) => {
  return (
    <Box>
      <main {...props}>{ children }</main>
    </Box>
  )
}

export default layout
