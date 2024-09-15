"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


function CreateContent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);

    const handleChange = (name: string) => (e: any) => {
        switch (name) {
            case "title":
                setTitle(e.target.value);
                break;

            case "description":
                setDescription(e.target.value);
                break;

            case "date":
                setDate(e.target.value);
                break;

            case "completed":
                setCompleted(e.target.checked);
                break;

            case "important":
                setImportant(e.target.checked);
                break;

            default:
                break;
        }
    };

    const onSubmit = async(e:any) => {
        e.preventDefault();
        
        const task = {
            title, description, date, completed, important
        };

        
        try{
            const res = await axios.post("/api/tasks", task);

            if(res.data.error){
                toast.error(res.data.error);
            }

            toast.success("Task created successfully");
        } catch(error){
            toast.error("Something went wrong");
            console.log(error);

        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Create task</h1>
            <div className="input-control">
                <label htmlFor="title">
                    Title <span className="required">*</span>
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={handleChange("title")}
                />
            </div>
            <div className="input-control">
                <label htmlFor="description">
                    Description <span className="required">*</span>
                </label>
                <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={handleChange("description")}
                    rows={4}
                ></textarea>
            </div>

            <div className="input-control">
                <label htmlFor="date">
                    Date <span className="required">*</span>
                </label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    placeholder="dd/mm/yyyy"
                    onChange={handleChange("date")}
                />
            </div>

            <div className="input-control">
                <label htmlFor="completed">Toggle Completed</label>
                <input
                    type="checkbox"
                    name="completed"
                    id="completed"
                    value={completed.toString()}
                    onChange={handleChange("completed")}
                />
            </div>

            <div className="input-control">
                <label htmlFor="important">Toggle Important</label>
                <input
                    type="checkbox"
                    name="important"
                    id="important"
                    value={important.toString()}
                    onChange={handleChange("important")}
                />
            </div>

            <div className="submit-btn">
                <button type="submit">Create Task</button>
            </div>
        </form>
    );
}

export default CreateContent;
