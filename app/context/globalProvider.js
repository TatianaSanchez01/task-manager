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
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const theme = themes[selectedTheme];


    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const collapseMenu = () => {
        setCollapsed(!collapsed);
    };

    const allTasks = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get("/api/tasks");

            const sorted = res.data.sort((a, b) => {
                return (
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            });

            setTasks(sorted);
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
                allTasks();
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const updateTask = async (task) => {
        try {
            const res = await axios.put(`/api/tasks/${task.id}`, task)

            if (res) {
                toast.success("Task updated");
                allTasks();
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

    }, [user]);

    return (
        <GlobalContext.Provider value={{ theme, tasks, allTasks, deleteTask, updateTask, isLoading, completedTasks, importantTasks, incompleteTasks, openModal, closeModal, modal, collapsed, collapseMenu }}>
            <GlobalUpdateContext.Provider value={useGlobalState}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);