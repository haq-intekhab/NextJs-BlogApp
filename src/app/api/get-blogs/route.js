import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import connectToDB from '@/database';

export async function GET(req) {
    try {
        await connectToDB();

        const fetchedBlogs = await Blog.find({});
        if (fetchedBlogs) {
            return NextResponse.json({
                success: true,
                data: fetchedBlogs,
                message: "Blogs fetched successfully"
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Data not found! Please try again"
            });
        }
    } catch (err) {
        console.error('Server Error:', err);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again"
        });
    }
}
