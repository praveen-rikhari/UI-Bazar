import dbConnect from "@/dbConnect";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

// '/api/comment/'
export async function POST(req) {
    try {
        dbConnect();
        const fromReq = await req.json();
        const newComment = await new Comment(fromReq);
        await newComment.save();
        return NextResponse.json(newComment);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in creating comment");
    }
}