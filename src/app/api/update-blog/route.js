import Joi from "joi";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import connectToDB from "@/database";

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;

    const { error } = EditBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const UpdatedBlogItem = await Blog.findOneAndUpdate(
      {
        _id: id,
      },
      { title, description },
      { new: true }
    );
    
    if (UpdatedBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Data not created! Please try again",
      });
    }
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
