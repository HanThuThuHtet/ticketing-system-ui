import BackButton from "@/components/backButton";
import Breadcrumbs from "@/components/breadcrumbs";
import Layout from "@/components/layout";
import TicketTable from "@/components/ticketTable";
import Fetch from "@/lib/action";
import { Container, Skeleton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Show(){

    const router = useRouter();
    const {id} = router.query;
    const [status,setStatus] = useState([]);
    const [total,setTotal] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
          try {
            const data = await Fetch({uri:`statuses/${id}`});
            console.log(data);
            setStatus(data.data);
            setTotal(data.data.tickets.length)
            setLoading(false);
          } catch (err) {
            console.log("Error Fetching Status:",err);
            setLoading(false);
          }
        };
        fetchData(); 
    },[id]);

    if(loading){
        return (
         <>
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Container className="mt-4">
            <Skeleton variant="rectangular" width="100%" height={500} />
          </Container>
         </>
        );
    }

    return (
        <Layout>
            <div className="flex items-center">
                <div>
                    <BackButton />
                </div>
                <div className="ml-4">
                    <Breadcrumbs
                        breadcrumbs={[
                            {
                                label: 'Statuses' , 
                                href: '/statuses'
                            },
                            {
                                label: `${status.name} Status Details`,
                                href: `/statuses/${id}`,
                                active: true
                            }
                        ]}
                    />
                </div>
            </div>
            <TicketTable tickets={status.tickets} total={total} statusId={id} />
        </Layout>
    );
};