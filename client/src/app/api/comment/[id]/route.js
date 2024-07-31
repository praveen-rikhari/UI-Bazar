import dbConnect from "@/dbConnect";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// '/api/comment/${postId}'
export async function GET(req, { params }) {
    try {
        dbConnect();
        const allCommentsOfPost = await Comment.find({ postId: params.id });
        return NextResponse.json(allCommentsOfPost);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in getting comments");
    }
}

// '/api/comment/${commentId}'
export async function DELETE(req, { params }) {
    try {
        dbConnect();
        await Comment.findByIdAndDelete(params.id);
        return NextResponse.json("deleted comment");
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in deleting");
    }
}