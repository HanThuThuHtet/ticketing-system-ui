import Layout from "@/components/layout";
import StatusCard from "@/components/statusCard";
import Fetch from "@/lib/action";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Index(){
  
  return (
    <Layout>
      <h1 className="my-4 ml-6 font-bold text-md md:text-lg">
        Statuses
      </h1>
      <Container sx={{display: 'flex', justifyContent: 'space-between'}} className="my-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatusCard id='1' title='New'/>
        <StatusCard id='2' title='In-Progress'/>
        <StatusCard id='3' title='Resolved'/>
      </Container>
    </Layout>
  );
}















