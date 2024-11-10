"use client";
import React from "react";
import { edit, trash } from "@/app/utils/icons";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import formatDate from "@/app/utils/formatDate";

interface Props {
    id: string;
    task: any;
}

function TaskItem({ id, task }: Props) {
    const { theme, deleteTask, updateTask } = useGlobalState();

    return (
        <TaskItemStyled className="task" key={id} theme={theme}>
            <h1 className="font-semibold text-2xl">{task.title}</h1>
            <p className="">{task.description}</p>
            <p className="date mt-auto">{formatDate(task.date)}</p>
            <div className="task-footer flex items-center justify-between gap-5">
                {task.isCompleted ? (
                    <button
                        className="completed"
                        onClick={() => {
                            const updatedTask = {
                                id: id,
                                isCompleted: !task.isCompleted,
                            };

                            updateTask(updatedTask);
                        }}
                    >
                        Completed
                    </button>
                ) : (
                    <button
                        className="incomplete"
                        onClick={() => {
                            const updatedTask = {
                                id: id,
                                isCompleted: !task.isCompleted,
                            };

                            updateTask(updatedTask);
                        }}
                    >
                        Incomplete
                    </button>
                )}

                <button
                    className="delete"
                    onClick={() => {
                        deleteTask(id);
                    }}
                >
                    {trash}
                </button>
            </div>
        </TaskItemStyled>
    );
}

const TaskItemStyled = styled.div`
    padding: 1.2rem 1rem;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.borderColor2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: ${(props) => props.theme.shadow7};

    height: 16rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .task-footer {
        button {
            border: none;
            outline: none;
            cursor: pointer;

            i {
                font-size: 1.4rem;
                color: ${(props) => props.theme.colorGrey2};
            }
        }

        .edit {
            margin-left: auto;
        }

        .completed,
        .incomplete {
            display: inline-block;
            padding: 0.4rem 1rem;
            background: ${(props) => props.theme.colorDanger};
            border-radius: 30px;
        }

        .completed {
            background: ${(props) => props.theme.colorSuccess};
        }
    }
`;

export default TaskItem;
