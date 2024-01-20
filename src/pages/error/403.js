import BackButton from "@/components/backButton";
import Layout from "@/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom403(){
    // const router = useRouter();
    // router.push('/');
    return (
        <Layout>
            <h1>403</h1>
            <Link href='/'>Back to Home Page</Link>
        </Layout>
    )
}