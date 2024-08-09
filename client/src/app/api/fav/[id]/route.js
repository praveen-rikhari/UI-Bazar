import dbConnect from "@/dbConnect";
import Fav from "@/models/Fav";
import { NextResponse } from "next/server";

// '/api/fav/${postId}'
export async function GET({ params }) {
    try {
        dbConnect();
        const allFavs = await Fav.find({ postId: params.id });
        return NextResponse.json(allFavs);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in fetching favs")
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