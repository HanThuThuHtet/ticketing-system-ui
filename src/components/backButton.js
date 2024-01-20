import { ArrowBackIos, ArrowBackSharp } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'



const BackButton = () => {
    const router= useRouter();
    const handleClick = () => {
        router.back();
    }
  return (
    <Button variant='outline' color='primary' onClick={handleClick}>
        <ArrowBackIos />
    </Button>
  )
}

export default BackButton