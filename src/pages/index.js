import Layout from "@/components/layout";
import StatusCard from "@/components/statusCard";
import TicketTable from "@/components/ticketTable";
import Fetch from "@/lib/action";
import { Container, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Home(){

  const [tickets,setTickets] = useState([]);
  const [total,setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem('token')

    if(token){
      const fetchData = async () => {
        try {
          const data = await Fetch({uri:'tickets'});
          console.log(data);
          setTotal(data.meta.total);
          setTickets(data.data);
          setLoading(false);
        } catch (err) {
          console.error("Error Fetching Ticket:", err);
          setLoading(false);
        }
      };
      fetchData(); 
    }else{
      router.push('/user/login');
    }
  },[]);

  if(loading){
    return (
     <>
      <Skeleton variant="rectangular" width="100%" height={60} />
      <Container className="mt-4">
        <Skeleton variant="rectangular" width="100%" height={800} />
      </Container>
     </>
    );
}

  return (
    <Layout>
      <Container sx={{display: 'flex', justifyContent: 'space-between'}} className="my-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatusCard allTickets={total} title='All'/>
        <StatusCard id='1' title='New'/>
        <StatusCard id='2' title='In-Progress'/>
        <StatusCard id='3' title='Resolved'/>
      </Container>
      
      <TicketTable latest={true} tickets={tickets} total={tickets.length} />
      
    </Layout>
  );
}















