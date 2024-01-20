import Fetch from '@/lib/action';
import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const StatusCard = ({id="",title,allTickets}) => {

  const [numOfTickets,setNumOfTickets] = useState(null);
  const [cardStyle,setCardStyle] = useState({});

  console.log(id);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await Fetch({uri:`statuses/${id}`});
        console.log(data);
        setNumOfTickets(data.data.tickets.length);
        setCardStyle(getColorById(id));
      } catch (err) {
        console.log("Error Fetching Status:",err);
      }
    };
    fetchData(); 
  },[]);

  const getColorById = (id) => {
    switch (id) {
      case "1":
        return { backgroundColor: '#c5e1a5', color: '#1b5e20' };
      case "2":
        return { backgroundColor: '#fff9c4', color: '#ffc107' }; 
      case "3":
        return { backgroundColor: '#f3e5f5', color: '#673ab7' }; 
      default:
        return { backgroundColor: '#e0f7fa', color: '#01579b' }; 
    }
  }

  return (
    <>
      {allTickets ? (
        <Link href={`/tickets/`} passHref>
        <Card sx={{ minWidth: 250, backgroundColor: '#e0f7fa', color: '#01579b' }}>
          <CardContent>
            <Typography variant="h6" component="div" textAlign='center'>
              {title}
            </Typography>
            <Typography variant="h5"  textAlign='center' sx={{ fontWeight: 'bold' }}>
              {allTickets}
            </Typography>
          </CardContent>
        </Card>
      </Link>
      ) : 
      <Link href={`/statuses/${encodeURIComponent(id)}`} passHref>
      <Card sx={{ minWidth: 250, ...cardStyle }}>
        <CardContent>
          <Typography variant="h6" textAlign='center' component="div">
            {title}
          </Typography>
          <Typography variant="h5" textAlign='center' sx={{ fontWeight: 'bold' }}>
            {numOfTickets}
          </Typography>
        </CardContent>
      </Card>
    </Link> 
    }
    </>
  );
};

export default StatusCard;