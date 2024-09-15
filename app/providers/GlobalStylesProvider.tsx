"use client";
import React from "react";

interface Props {
    children: React.ReactNode;
}
function GlobalStylesProvider({ children }: Props) {
    return <div className="p-10 flex gap-10 h-full">{children}</div>;
}

export default GlobalStylesProvider;
