import dbConnect from "@/dbConnect";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        dbConnect();
        const allPostsOfUser = await Post.find({ userId: params.userId });
        return NextResponse.json(allPostsOfUser);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in gettin all posts")
    }
}