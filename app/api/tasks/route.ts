import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // const { userId } = auth();
        // console.log(userId)

        // if (!userId) {
        //     return NextResponse.json({ error: "Unauthorized", status: 401 });
        // }

        const { title, description, date, completed, important } =
            await req.json();

        

        if (!title || !description || !date) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400,
            });
        }

        

        if (title.length < 3) {
            return NextResponse.json({
                error: "Title must be at least 3 characters long",
                status: 400,
            });
        }
        
        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                // userId
            },
        });
        return NextResponse.json({message: "Task created", status: 201});
    } catch (error) {
        console.log("Error creating task", error);
        return NextResponse.json({ error: "Error creating task", status: 500 });
    }
}

export async function GET(req: Request) {
    try {
    } catch (error) {
        console.log("Error getting tasks", error);
        return NextResponse.json({ error: "Error getting task", status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
    } catch (error) {
        console.log("Error updating task", error);
        return NextResponse.json({ error: "Error updating task", status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
    } catch (error) {
        console.log("Error deleting task", error);
        return NextResponse.json({ error: "Error deleting task", status: 500 });
    }
}
