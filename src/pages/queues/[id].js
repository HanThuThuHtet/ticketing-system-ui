import Layout from "@/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TicketTable from "@/components/ticketTable";
import { Chip, Container, Pagination, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Search from "@/components/search";
import { Details, DetailsRounded } from "@mui/icons-material";
import useSWR from "swr";
import Breadcrumbs from "@/components/breadcrumbs";
import Fetch from "@/lib/action";

export default function Index(){


  const router = useRouter();
  const {id} = router.query;

  console.log(id);

  const [queue,setQueue] = useState();
  
  const [loading, setLoading] = useState(true);
  const [tickets ,setTickets] = useState([]);
  const [total,setTotal] = useState(0);

  useEffect(() => {

      const fetchData = async () => {
        try {
          const data = await Fetch({uri:`queues/${id}`});
          console.log(data);
          setQueue(data);
        } catch (err) {
          console.error("Error Fetching Ticket:", err);
        }
      };
      fetchData(); 

      if(queue){
          console.log(queue.data.tickets);
          setLoading(false);
          setTickets(queue.data.tickets);
          setTotal(queue.data.tickets.length);
          console.log(tickets);
          
      }
  },[queue]);


console.log(total);
  
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
      <Breadcrumbs 
                breadcrumbs={[
                    {
                        label: 'Queues' , 
                        href: '/queues'
                    },
                    {
                        label: `Queue #${id}`,
                        href: `/queues/${id}`,
                        active: true
                    }
                ]}
            />
      
      <TicketTable tickets={tickets} total={total}/>
    </Layout>
    
  );
}


