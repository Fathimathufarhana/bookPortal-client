'use client'
import React, { SyntheticEvent, useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import BookAutorTab from './BookAutorTab';
import BookDetailsTab from './BookDetailsTab';
import BookReviewTab from './BookReviewTab';

interface Props {
    id : string
    tab: string
    data: {
        _id : string
  author : string
  name : string
  star_rating : number
  genre : string
  published : string
  price : string
  language : string
  image : string
    }
}

export default function BookView({ id, tab, data }: Props) {

    const [activeTab, setActiveTab] = useState('details')
    const router = useRouter()

    const handleChange = (event: SyntheticEvent, value: string)=> {
        setActiveTab(value)
        router.push(`/books/view/${id}/${value}`)
    }
    useEffect(()=> {
        if (tab && tab !== activeTab ) {
            setActiveTab(tab)
        }
    }, [])
  return (
    <TabContext value={activeTab}>
    <MuiTabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
    >
        <Tab value='details' label='Details' />
        <Tab value='author' label='Author'  />
        <Tab value='review' label='Review'  />

    </MuiTabList>
    <Box sx={{ mt: 4 }}>
            <>
                <TabPanel sx={{ p: 0 }} value='details'>
                   <BookDetailsTab  data={data}/>
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='author'>
                   <BookAutorTab data={data}/>
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='review'>
                   <BookReviewTab data={data}/>
                </TabPanel>
            </>
    </Box>
</TabContext>
  );
}
