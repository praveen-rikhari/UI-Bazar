import { NextResponse } from "next/server";
import dbConnect from "@/dbConnect";
import Post from "@/models/Post";

export async function POST(req) {
    try {
        dbConnect();
        const post = new Post({
            userId,
            title,
            description,
            category,
            htmlCode,
            cssCode,
        });
        await post.save();
    } catch (error) {
        console.log(error);
        return NextResponse.json("Error in creating the post.........");
    }
}

