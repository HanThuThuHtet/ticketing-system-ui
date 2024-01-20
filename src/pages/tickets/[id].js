import BackButton from "@/components/backButton";
import Breadcrumbs from "@/components/breadcrumbs";
import Layout from "@/components/layout";
import Fetch from "@/lib/action";
import { ArrowBackIos, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";


export default function Show(){

    const router = useRouter();
    const {id} = router.query;

    const[ticket,setTicket] = useState();

    const [ subject, setSubject ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ status,setStatus ] = useState('');
    const [ customerId,setCustomerId ] = useState('');
    const [ queue,setQueue ] = useState('');

    const [ createdDate, setCreatedDate] = useState('');
    const [ createdTime, setCreatedTime] = useState('');
    const [ updatedDate, setUpdatedDate] = useState('');
    const [ updatedTime, setUpdatedTime] = useState('');
    
    const [ isAdmin,setIsAdmin ] = useState(false);
    const [ queueName,setQueueName ] = useState("");

    
    useEffect(() => {

        const fetchData = async () => {
            try {
              const data = await Fetch({uri:`tickets/${id}`});
              console.log(data);
              setTicket(data);
            } catch (err) {
              console.error("Error Fetching Ticket:", err);
            }
          };
          fetchData(); 
        
        if(ticket){
            setSubject(ticket.data.subject);
            setDescription(ticket.data.description);
            setStatus(ticket.data.status);
            setCustomerId(ticket.data.customer_id);
            setQueue(ticket.data.queue);

            setCreatedDate(ticket.data.created_date);
            setCreatedTime(ticket.data.created_time);
            setUpdatedDate(ticket.data.updated_date);
            setUpdatedTime(ticket.data.updated_time);
        }
    },[ticket]);

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if(auth){
            const authUser = JSON.parse(auth);
            setQueueName(authUser.queues[0].name);
            setIsAdmin(authUser.isAdmin);
        }
      }, []);
    //console.log(authQueues.name);
      

    const handleEdit = () => {
        router.push(`/tickets/update/${id}`);
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
                                label: 'Tickets' , 
                                href: '/tickets'
                            },
                            {
                                label: `Ticket Details #${id}`,
                                href: `/tickets/${id}`,
                                active: true
                            }
                        ]}
                    />
                </div>
            </div>
            <div className="mx-auto w-full max-w-2xl border rounded-md px-6 py-4 my-8">
                <div className="flex justify-end">
                    {
                        isAdmin == true || queueName == queue 
                        ? 
                        (
                            <Edit 
                                onClick={handleEdit}
                                variant="outlined"
                            />
                        )
                        : ""
                    }
                   
                </div>
                <h2 className="text-2xl font-bold mb-6 text-sky-500">
                    Ticket Details
                </h2>
                    <form  action="" method=""
                           className="space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <label htmlFor="id" className="text-sm font-medium leading-6 text-black-500">
                                Ticket ID
                            </label>
                            <input 
                                    type="text" id="id" name="id" value={id}  disabled
                                    className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                            />    
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="subject" className="text-sm font-medium leading-6 text-black-500">
                                Subject
                            </label>
                            <input
                                    type="text" id="subject" name="subject" value={subject}  disabled
                                    className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                            />    
                        </div>
        
                        <div className="flex items-center justify-between">
                            <label htmlFor="description"  className="text-sm font-medium leading-6 text-black-500">
                                Description
                            </label>
                            <input 
                                type="text" id="description" name="description" value={description} disabled
                                className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="status" className="text-sm font-medium leading-6 text-black-500">
                                Status
                            </label>
                            <input
                                type="text" id="status" name="status" value={status} disabled
                                className="w-2/3 capitalize rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="queue" className="text-sm font-medium leading-6 text-black-500">
                                Queue
                            </label>
                            <input
                                type="text" id="queue" name="queue" value={queue} disabled
                                className="w-2/3 capitalize rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6" />
                        </div>


                        <div className="flex items-center justify-between">
                            <label htmlFor="customer_id" className="text-sm font-medium leading-6 text-black-500">
                                Customer ID
                            </label>
                            <input 
                                type="text" id="customer_id" name="customer_id" value={customerId} disabled
                                className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6" />
                        </div>
                    </form>    
            </div>

            <div className="mx-auto w-full max-w-2xl border rounded-md px-6 py-4 my-8">
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="customer_id" className="text-sm font-medium leading-6 text-black-500">
                        Created At
                    </label>
                    <input 
                        type="text" id="customer_id" name="customer_id" value={createdDate} disabled
                        className="w-1/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6" />
                        <input 
                        type="text" id="customer_id" name="customer_id" value={createdTime} disabled
                        className="w-1/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6" />
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="customer_id" className="text-sm font-medium leading-6 text-black-500">
                        Updated At
                    </label>
                    <input 
                        type="text" id="customer_id" name="customer_id" value={updatedDate} disabled
                        className="w-1/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6" />
                    <input 
                        type="text" id="customer_id" name="customer_id" value={updatedTime} disabled
                        className="w-1/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6" />
                </div>
            </div>
        </Layout>
    );
};