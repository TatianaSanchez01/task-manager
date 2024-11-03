"use client";

import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../components/Tasks/Tasks";

function page() {
    const { incompleteTasks } = useGlobalState();
    return <Tasks tasks={incompleteTasks} title="Incomplete Tasks" />;
}

export default page;
