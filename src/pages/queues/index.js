import Layout from "@/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Chip, Container, Pagination, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Details, DetailsRounded } from "@mui/icons-material";
import Fetch from "@/lib/action";


export default function Index(){

  const router = useRouter();
  const [queues,setQueues] = useState([]);
  const [queueLen,setQueueLen] = useState(0);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if(auth){
        const queueList = JSON.parse(auth);
        setQueues(queueList.queues);
        setLoading(false);   
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Fetch({uri:'queues'});
        console.log(data);
        setQueueLen(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error Fetching Queues:", err);
        setLoading(false);
      }
    };
    fetchData(); 
      
  },[]);

  console.log(queueLen[0]);

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
      <h1 className="my-4 font-bold">
        <Chip label={queues.length} color="primary" className="px-1"></Chip> Queues Found
      </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Queues</TableCell>
              <TableCell>Number of Tickets</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              queues.map((queue) => (
                <TableRow key={queue.id}>
                  <TableCell>
                    <Link href={`/queues/${encodeURIComponent(queue.id)}`}>
                      {queue.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {queue.name}
                  </TableCell>
                  <TableCell>
                    {/* {queueLen[0].tickets.length} */}
                    {
                      queueLen? 
                      queueLen.find((queueLenId) => queueLenId.id === queue.id)?.tickets.length || 0
                      : "0"
                    }
                  </TableCell>
                  <TableCell>
                    {/* <DetailsRounded onClick={() => router.push(`/queues/${queue.id}`)} /> */}
                      <svg  onClick={() => router.push(`/queues/${queue.id}`)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>

                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}


