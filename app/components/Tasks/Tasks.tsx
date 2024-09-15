"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";

function Tasks() {
    const { theme } = useGlobalState();

    return <TasksStyled theme={theme}>Tasks
        <CreateContent></CreateContent>
    </TasksStyled>;
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
`;

export default Tasks;
