import { NextResponse } from "next/server";
import dbConnect from "@/dbConnect";
import Post from "@/models/Post";

export async function POST(req) {
    try {
        dbConnect();
        const postData = await req.json();
        const post = new Post(postData);
        await post.save();
        return NextResponse.json("post created");
    } catch (error) {
        console.log(error);
        return NextResponse.json("Error in creating the post.........");
    }
}

