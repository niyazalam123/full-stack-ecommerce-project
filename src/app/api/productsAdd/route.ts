import {mongoDbConnect} from "@/dbconfig/DbConfig";
import Products from "@/models/Products"
import { NextResponse,NextRequest } from "next/server";

mongoDbConnect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();

        // condition check
        const product = await Products.findOne({title:reqBody.title});
        if (product){
            return NextResponse.json({error:"product already exist"});
        };

        const savedProduct = new Products(reqBody);
        await savedProduct.save();

        return NextResponse.json({message:"product added successfully!",success:true},{status:200})
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}