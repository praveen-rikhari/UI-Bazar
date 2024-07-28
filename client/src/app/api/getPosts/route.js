import { NextResponse } from "next/server";
import dbConnect from "@/dbConnect";
import Post from "@/models/Post";

export async function GET() {
    try {
        dbConnect();
        const allPosts = await Post.find({});
        return NextResponse.json(allPosts);
    } catch (error) {
        console.log(error);
        return NextResponse.json("Error in getting the post.........");
    }
}

