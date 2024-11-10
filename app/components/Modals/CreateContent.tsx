"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import Button from "../button/Button";
import { plus } from "@/app/utils/icons";

function CreateContent() {
    const { theme, allTasks, closeModal } = useGlobalState();
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

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const task = {
            title,
            description,
            date,
            completed,
            important,
        };

        try {
            const res = await axios.post("/api/tasks", task);

            if (res.data.error) {
                toast.error(res.data.error);
            }

            if (!res.data.error) {
                toast.success("Task created successfully");
                closeModal();
                allTasks();
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    return (
        <CreateContentStyled onSubmit={onSubmit} theme={theme}>
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
                    placeholder="e.g. Do calculations for final project"
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
                    placeholder="e.g. Calculate how much is the necessary equipment."
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

            <div className="input-control toggler">
                <label htmlFor="completed">Toggle Completed</label>
                <input
                    type="checkbox"
                    name="completed"
                    id="completed"
                    value={completed.toString()}
                    onChange={handleChange("completed")}
                />
            </div>

            <div className="input-control toggler">
                <label htmlFor="important">Toggle Important</label>
                <input
                    type="checkbox"
                    name="important"
                    id="important"
                    value={important.toString()}
                    onChange={handleChange("important")}
                />
            </div>

            <div className="submit-btn flex justify-end">
                <Button
                    type="submit"
                    name="Create Task"
                    icon={plus}
                    padding={"0.8rem 1.5rem"}
                    borderRad={"0.8rem"}
                    color={theme.colorGrey1}
                    fw={"500"}
                    fs={"1.2rem"}
                    background={theme.colorPrimaryBlue}
                />
            </div>
        </CreateContentStyled>
    );
}

const CreateContentStyled = styled.form`
    > h1 {
        font-size: clamp(1.2rem, 5vw, 1.6rem);
        font-weight: 600;
    }

    color: ${(props) => props.theme.colorGrey1};

    .input-control {
        position: relative;
        margin: 1rem 0;
        font-weight: 500;

        label {
            margin-bottom: 0.5rem;
            display: inline-block;
            font-size: clamp(0.9rem, 5vh, 1.2rem);

            span {
                color: ${(props) => props.theme.colorGrey3};
            }
        }

        input,
        textarea {
            width: 100%;
            padding: 1rem;

            resize: none;
            background-color: ${(props) => props.theme.colorGreyDark};
            color: ${(props) => props.theme.colorGrey2};

            border-radius: 0.5rem;
        }
    }

    .toggler {
        display: flex;
        align-items: center;
        justify-content: space-between;

        label {
            flex: 1;
        }

        input {
            width: initial;
        }
    }

    .submit-btn button {
        transition: all 0.25s ease-in-out;

        i {
            color: ${(props) => props.theme.colorGrey0};
        }

        &:hover {
            background: ${(props) => props.theme.colorSuccess} !important;
            color: ${(props) => props.theme.colorWhite} !important;
        }
    }
`;
export default CreateContent;
