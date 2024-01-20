import useFetch from '@/lib/action';
import { Cancel, CancelOutlined, SearchOutlined } from '@mui/icons-material';
import { IconButton, InputBase, Paper } from '@mui/material';
import React, { useState } from 'react'

const Search = ({onSearch,onCancel}) => {
    const [ticketId , setTicketId] = useState('');
    
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(ticketId.trim());
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setTicketId('');
        onCancel();
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); 
          handleSearch(e);
        }
      };
  return (
    <>
    <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >

        <InputBase
            sx={{ ml: 1, flex: 1 }}
            type='text'
            placeholder='Ticket ID'
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            onKeyDown={handleKeyPress}
        />

        {ticketId ? (
          <IconButton
            type="submit"
            sx={{ p: '10px' }}
            onClick={handleCancel}
          >
            <CancelOutlined />
          </IconButton>
        ) :
        <IconButton 
                type="button" sx={{ p: '10px' }} 
                onClick={handleSearch} 
        >
                <SearchOutlined />
        </IconButton>
        }
        
    </Paper>


    </>
  )
}

export default Search