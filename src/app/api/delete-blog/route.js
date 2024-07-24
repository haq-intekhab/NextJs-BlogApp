import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import connectToDB from '@/database';

export async function DELETE(req) {
    try {
        await connectToDB();

        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Blog ID is required"
            });
        }

        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (deletedBlog) {
            return NextResponse.json({
                success: true,
                message: "Blog deleted successfully"
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Blog not found"
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