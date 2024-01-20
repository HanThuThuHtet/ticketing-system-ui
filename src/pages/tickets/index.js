import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import TicketTable from "@/components/ticketTable";
import { Container, Pagination, Skeleton, Stack } from "@mui/material";
import Search from "@/components/search";
import NotFound from "./not-found";
import Fetch from "@/lib/action";

export default function Index(){

  const [tickets,setTickets] = useState([]);
  const [total,setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchedTickets,setSearchedTickets] = useState("");
  const [notFound,setNotFound] = useState(false);
  const [page,setPage] = useState(1);
  const [ticketId, setTicketId] = useState('');
  const ticketsPerPage = 8;


  const fetchData = async () => {
    try {
      const data = await Fetch({uri:'all-tickets', page, ticketsPerPage});
      console.log(data);
      setTotal(data.meta.total);
      setTickets(data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error Fetching Ticket:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  },[page, ticketsPerPage])

  const handleSearch = async(ticketId,page) => {
    
    setTicketId(ticketId.trim());
    
    if(ticketId.trim() === ""){
      setSearchedTickets([]);
      setNotFound(false);
      setPage(page);
      fetchData();
    }

    try {
      const data = await Fetch({ uri: 'ticket-search', page, ticketsPerPage, search: ticketId });
      setTotal(data.meta.total);
      setNotFound(data.meta.total === 0);
      setSearchedTickets(data.data);
    } catch (err) {
      console.error("Error Fetching Ticket:", err);
    } finally {
      setLoading(false);
    }

  };

  const handleCancel = () => {
    setTicketId('');
    setSearchedTickets([]);
    setNotFound(false);
    setPage(page);
    fetchData();
  };


  const handlePageChange = (e , value) => {
    e.preventDefault();
    setSearchedTickets([]);
    setPage(value);
  }
  
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
      <div className="my-8">
        <Search onSearch={handleSearch} onCancel={handleCancel}/>
        {notFound 
        ? <NotFound /> 
        : (
          <>
            <TicketTable tickets={searchedTickets.length > 0 ? searchedTickets : tickets} total={total}/>
            <Stack spacing={2} direction="row" justifyContent="center" className="mt-6">
              <Pagination 
                //count={2}
                count={Math.ceil(total / ticketsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </>
        )}
        
      </div>
    </Layout>
  );
}


