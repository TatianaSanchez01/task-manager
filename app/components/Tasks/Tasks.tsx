"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import TaskItem from "../TaskItem/TaskItem";
import { plus } from "@/app/utils/icons";
import CreateContent from "../Modals/CreateContent";
import Modal from "../Modals/Modal";

interface Props {
    title: string;
    tasks: any[];
}

function Tasks({ title, tasks }: Props) {
    const { theme, isLoading, openModal, modal } = useGlobalState();

    return (
        <TasksStyled theme={theme}>
            {modal && <Modal content={<CreateContent />} />}
            <h1 className="font-extrabold relative">{title}</h1>
            {!isLoading ? (
                <div className="grid grid-cols-tasks gap-6 my-8">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} id={task.id} task={task} />
                    ))}
                    <button
                        className="create-task flex items-center justify-center gap-2 h-64 font-semibold pointer rounded-2xl"
                        onClick={openModal}
                    >
                        {plus}
                        Add new task
                    </button>
                </div>
            ) : (
                <div className="flex w-full h-full justify-center items-center">
                    <span className="loader"></span>
                </div>
            )}
        </TasksStyled>
    );
}

const TasksStyled = styled.main`
    width: 100%;
    heigth: 100%;
    padding: 2rem;
    border-radius: 1rem;
    overflow-y: auto;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};

    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    > h1 {
        font-size: clamp(1.5rem, 2vw, 2rem);

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 5rem;
            height: 0.2rem;
            background-color: ${(props) => props.theme.colorPrimaryBlue};
            border-radius: 0.5rem;
        }
    }

    .create-task {
        color: ${(props) => props.theme.colorGrey2};
        border: 3px solid ${(props) => props.theme.colorGrey5};
        transition: all 0.3s ease;

        &:hover {
            background-color: ${(props) => props.theme.colorGrey5};
            color: ${(props) => props.theme.colorGrey0};
        }
    }

    .grid-cols-tasks {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
    }
`;

export default Tasks;
