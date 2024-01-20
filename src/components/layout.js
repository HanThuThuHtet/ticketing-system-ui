import { Toaster } from 'react-hot-toast'
import Navbar from './navbar'
import { Container } from '@mui/material'

export default function Layout({ children }){
    
    return(
        <>
            <Navbar />
            <Container>
                <Toaster position="top-center"/>
                <main>{children}</main>
            </Container>
            
        </>
    )
}