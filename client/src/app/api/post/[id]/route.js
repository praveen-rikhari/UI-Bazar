import { NextResponse } from "next/server";
import dbConnect from "@/dbConnect";
import Post from "@/models/Post";

export async function GET(req, { params }) {
    try {
        dbConnect();
        const singlePost = await Post.findById(params.id);
        return NextResponse.json(singlePost);
    } catch (error) {
        console.log(error);
        return NextResponse.json("Error in getting the post.........");
    }
}

export async function DELETE(req, { params }) {
    try {
        dbConnect();
        await Post.findByIdAndDelete(params.id);
        return NextResponse.json("post deleted");
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in deleting")
    }
}