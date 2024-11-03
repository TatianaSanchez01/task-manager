"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes"
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {
    const { user } = useUser();
    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[selectedTheme];
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const allTasks = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get("/api/tasks");

            setTasks(res.data);
            setIsLoading(false);
        } catch (error) {
            toast.error("Error loading the tasks")
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`/api/tasks/${id}`);

            if (res) {
                toast.success("Task deleted");
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const completedTasks = tasks.filter((task) => task.isCompleted === true)

    const importantTasks = tasks.filter((task) => task.isImportant === true)

    const incompleteTasks = tasks.filter((task) => task.isCompleted === false)

    useEffect(() => {
        if (user) {
            allTasks();
        }

    }, [user])

    return (
        <GlobalContext.Provider value={{ theme, tasks, deleteTask, isLoading, completedTasks, importantTasks, incompleteTasks }}>
            <GlobalUpdateContext.Provider value={useGlobalState}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);