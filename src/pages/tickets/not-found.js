import Layout from "@/components/layout";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import Link from "next/link";

export default function NotFound(){
    return (
        <div className="mt-4">
            <SentimentVeryDissatisfied className="w-10 text-gray-400" />
            <span>Could not find the requested ticket</span>
        </div>
    )
}