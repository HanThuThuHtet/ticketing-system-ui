import BackButton from "@/components/backButton";
import Breadcrumbs from "@/components/breadcrumbs";
import Layout from "@/components/layout";
import { MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function Create(){
    
    const router = useRouter();
    const [ subject, setSubject ] = useState('');
    const [ description, setDescription ] = useState('');
    const [statusId,setStatusId] = useState('');
    const [customerId,setCustomerId] = useState('');
    const [queueId,setQueueId] = useState('');

    const[queues,setQueues] = useState([]);
    const [createError , setCreateError] = useState(false);
    

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
      };
    
      const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
      };
    
      const handleStatusIdChange = (e) => {
        setStatusId(e.target.value);
      };
    
      const handleCustomerIdChange = (e) => {
        setCustomerId(e.target.value);
      };

      const handleQueueIdChange = (e) => {
        setQueueId(e.target.value);
      }
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            "Content-Type" : 'application/json',
        }


        const formData = {
            subject: subject,
            description: description,
            status_id: statusId,
            customer_id: customerId,
            queue_id: queueId
        };

        console.log(formData);

        try {
            const result = await fetch(`http://localhost:8080/api/tickets/`, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(formData)
            });
            const response = await result.json();
      
            if (response.success) {
              console.log("Ticket Created Successfully");
              toast.success("Ticket Created Successfully");
              const id = response.ticket.id;
              router.push(`/tickets/${id}`);
            } else {
              setCreateError(true);
              console.log("Failed to Create Ticket");
            }
          } catch (error) {
            console.error('An error occurred during the ticket create', error);
          }
    }

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if(auth){
            const queueList = JSON.parse(auth);
            setQueues(queueList.queues);
            console.log(queues);
        }
      }, []);
    
    return (
        <Layout> 
            <Breadcrumbs 
                breadcrumbs={[
                    {
                        label: 'Tickets' , 
                        href: '/tickets'
                    },
                    {
                        label: 'Create Tickets',
                        href: '/tickets/create',
                        active: true
                    }
                ]}
            />
            <div  className="mx-auto w-full max-w-2xl border rounded-md px-6 py-4 my-8">
                <h2 className="text-2xl font-bold mb-6 text-sky-500">
                    Create Ticket
                </h2>
                {createError && (
                    <p className="text-red-500 text-sm bg-red-100 p-4 my-2 rounded-md">Failed to create ticket. Please try again.</p>
                )}
                    <form  onSubmit={(e) => handleSubmit(e)} action="" method="post"
                         className="space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <label htmlFor="subject" className="text-sm font-medium leading-6 text-black-500">
                                Subject
                            </label>
                            <input onChange={handleSubjectChange}
                                    type="text" id="subject" name="subject" value={subject}  required
                                    className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-sky-300 sm:text-sm sm:leading-6"
                            />    
                        </div>
        
                        <div className="flex items-center justify-between">
                            <label htmlFor="description"  className="text-sm font-medium leading-6 text-black-500">
                                Description
                            </label>
                            <input onChange={handleDescriptionChange} 
                                type="text" id="description" name="description" value={description} required
                                className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-sky-300 sm:text-sm sm:leading-6"/>
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="status_id" className="text-sm font-medium leading-6 text-black-500">
                                Status
                            </label>

                            <Select
                                onChange={handleStatusIdChange} 
                                type="text" id="status_id" name="status_id" value={statusId} required
                                className="w-2/3 rounded-md  border px-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-sky-300 sm:text-sm sm:leading-6"  
                            >
                                <MenuItem value={1}>New</MenuItem>
                                <MenuItem value={2} disabled>In Progress</MenuItem>
                                <MenuItem value={3} disabled>Resolved</MenuItem>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="queue_id" className="text-sm font-medium leading-6 text-black-500">
                                Queue
                            </label>

                            
                            <Select
                                    onChange={handleQueueIdChange} 
                                    type="text" id="queue_id" name="queue_id" value={queueId} required
                                    className="w-2/3 rounded-md  border px-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-sky-300 sm:text-sm sm:leading-6"  
                                    >
                                        {
                                            queues.map((queue) => (
                                                <MenuItem key={queue.id} value={queue.id}>{queue.name}</MenuItem>
                                            ))
                                        }
                                        
                                        
                            </Select>
                        
                        </div>

                        <div className="flex items-center justify-between">
                            <label htmlFor="customer_id" className="text-sm font-medium leading-6 text-black-500">
                                Customer_id
                            </label>
                            <input onChange={handleCustomerIdChange} 
                                type="text" id="customer_id" name="customer_id" value={customerId} required
                                className="w-2/3 rounded-md  border px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-sky-300 sm:text-sm sm:leading-6"    />
                        </div>

                        <div className="flex justify-end">
                            <input type="submit" value="Create"  
                                    className="rounded-md bg-sky-600 px-3 py-1.5 mt-8  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                            />
                        </div>
                        
                    </form>
                
            </div>
        </Layout>
    );
}