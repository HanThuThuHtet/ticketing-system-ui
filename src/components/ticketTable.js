import { Tab } from '@headlessui/react'
import { ArrowDropDown, Details, Edit } from '@mui/icons-material'
import { Button, InputLabel, Menu, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, createTheme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Chip } from "@mui/material"
import clsx from 'clsx'
import { ThemeProvider } from '@emotion/react'

const TicketTable = ({ latest, tickets, total , statusId }) => {
  console.log(tickets);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [isAdmin,setIsAdmin] = useState(false);
  const [queueName,setQueueName] = useState("");

  const statusLabels = {
    '': 'All',
    1: 'New',
    2: 'In Progress',
    3: 'Resolved',
  };

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if(auth){
        const authUser = JSON.parse(auth);
        setQueueName(authUser.queues[0].name);
        setIsAdmin(authUser.isAdmin);
    }
  }, []);

  //console.log(queues[0].name);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleStatusChange = (statusId) => {
    setFilterStatus(statusId);
    handleMenuClose();
  }

  const filteredTicket = filterStatus 
                          ? tickets.filter((ticket) => ticket.status_id === filterStatus)
                          : tickets;

  console.log(filteredTicket.length);

  const theme = createTheme({
  palette: {
    primary: {
      main: "#e0f7fa", 
      contrastText: "#01579b", 
    },
    background: {
      default: "#e0f7fa", 
    },
  },
});                        
  

  return (
    <>
      <h1 className="my-4 font-bold">
        <ThemeProvider theme={theme}>
          <Chip label={filterStatus ? filteredTicket.length : total} color='primary' className="px-1"></Chip>{latest ? " Latest" : ""} Tickets Found
        </ThemeProvider>
      </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>
                {
                  statusId
                  ? (
                      <Button
                        variant="outlined"
                        // onClick={handleButtonClick}
                      >
                        {statusLabels[statusId]}
                      </Button>
                    )
                  : (
                      <Button
                        variant="outlined"
                        onClick={handleButtonClick}
                      >
                        {filterStatus ? statusLabels[filterStatus] : "Status"}
                        <ArrowDropDown />
                      </Button>
                    )
                }
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleStatusChange('')}>All</MenuItem>
                  <MenuItem onClick={() => handleStatusChange(1)}>New</MenuItem>
                  <MenuItem onClick={() => handleStatusChange(2)}>In Progress</MenuItem>
                  <MenuItem onClick={() => handleStatusChange(3)}>Resolved</MenuItem>
                </Menu>
              </TableCell>
              <TableCell>Queue</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Updated at</TableCell>
              <TableCell>Action</TableCell>
              
            </TableRow>
          </TableHead>

          <TableBody>
            {
              filteredTicket.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <Link href={`/tickets/${encodeURIComponent(ticket.id)}`}>
                      {ticket.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {ticket.subject}
                  </TableCell>
                  <TableCell>
                    {ticket.customer}
                  </TableCell>
                  <TableCell>
                  <span
                    className={clsx(
                      'inline-flex items-center rounded-full px-2 py-1 text-xs',
                      {
                        'bg-green-100 text-green-800': ticket.status === 'new',
                        'bg-yellow-100 text-yellow-700': ticket.status === 'in progress',
                        'bg-purple-100 text-purple-800': ticket.status === 'resolved',
                      },
                    )}
                  >
                    {ticket.status}
                  </span>
                  </TableCell>
                  <TableCell>
                    {ticket.queue}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{ticket.created_date}</Typography>
                    <Typography variant="body2">{ticket.created_time}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{ticket.updated_date}</Typography>
                    <Typography variant="body2">{ticket.updated_time}</Typography>
                  </TableCell>
                  {
                    isAdmin == true || queueName == ticket.queue 
                    ?( 
                        <TableCell>
                          <Edit onClick={() => router.push(`/tickets/update/${ticket.id}`)} />
                      </TableCell>) 
                    : ""
                  }
                  
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TicketTable