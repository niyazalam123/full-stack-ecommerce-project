import { mongoDbConnect } from "@/dbconfig/DbConfig";
import Products from "@/models/Products";
import { NextRequest, NextResponse } from "next/server";

mongoDbConnect();

export async function GET(){
    try {
        const products = await Products.find();
        if (!products){
            return NextResponse.json({error:"No Data Found!"},{status:400})
        }
        return NextResponse.json({message:"Product found sucessfully!",products},{status:200})
    } catch (error) {
        return NextResponse.json({error:error},{status:500});
    }
}