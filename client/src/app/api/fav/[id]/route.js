import dbConnect from "@/dbConnect";
import Fav from "@/models/Fav";
import { NextResponse } from "next/server";

// '/api/fav/${userId}'
export async function GET(req, { params }) {
    try {
        dbConnect();
        const allFavs = await Fav.find({ userId: params.id }, { postId: true}).populate('postId');
        return NextResponse.json(allFavs);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in fetching favs");
    }
}

// '/api/fav/${favid}'
export async function DELETE({ params }) {
    try {
        dbConnect();
        const deleted = await Fav.findByIdAndDelete(params.id);

        return NextResponse.json(deleted);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in deleting")
    }
}