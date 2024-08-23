import { NextResponse } from "next/server";
import dbConnect from "@/dbConnect";
import Post from "@/models/Post";
import Comment from "@/models/Comment";

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
        await Comment.findOneAndDelete({ postId: params.id });
        return NextResponse.json("post deleted");
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in deleting")
    }
}

export async function PUT(req, { params }) {
    try {
        dbConnect();
        const { name, description, category, htmlCode, cssCode } = await req.json();

        const updatedPostData = await Post.findByIdAndUpdate(
            params.id,
            { name, description, category, htmlCode, cssCode },
        );
        return NextResponse.json(updatedPostData);
    } catch (error) {
        console.log("Error updating post:", error);
        return NextResponse.json("Error in updating post");
    }
}
