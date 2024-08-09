import dbConnect from "@/dbConnect";
import Fav from "@/models/Fav";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        dbConnect();
        const fromReq = await req.json();
        const newFav = await new Fav(fromReq);
        await newFav.save();

        return NextResponse.json(newFav);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in saving")
    }
}