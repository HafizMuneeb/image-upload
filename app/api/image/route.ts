import { connect } from "@/dbConfig/dbConfig";
import Image from "@/models/Image-mdels";
import { NextRequest, NextResponse } from "next/server";


connect();

export  async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const {imageId, description, tags} = reqBody;

     

    const newUser = new Image ({
      imageId,
      description,
      tags,
    })

   const savedUser =  await newUser.save();
    console.log(savedUser);

    return NextResponse.json({message: "Image Uploaded Succesfully", success: true}, {status: 201})
    
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 400})
  }
}