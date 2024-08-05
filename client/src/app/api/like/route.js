import dbConnect from "@/dbConnect";
import Like from "@/models/Like";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        dbConnect();
        const { userId, postId } = await req.json();
        const existingLike = await Like.findOne({ userId, postId });
        if (existingLike) {
            await Like.findByIdAndDelete(existingLike._id);
            await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
        } else {
            const newLike = new Like({ userId, postId });
            await newLike.save();
            await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
        }

        return NextResponse.json("like updated");
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in like route")
    }
}