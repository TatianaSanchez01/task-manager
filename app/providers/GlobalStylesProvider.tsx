"use client";
import React from "react";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}
function GlobalStylesProvider({ children }: Props) {
    return <GlobalStyles>{children}</GlobalStyles>;
}

const GlobalStyles = styled.div`
    padding: 2.5rem;
    display: flex;
    gap: 2.5rem;
    height: 100%;
    transition: all 0.3s ease-in-out;

    @media screen and (max-width: 768px){
        padding: 1rem;
        gap:1rem;
    }
`

export default GlobalStylesProvider;
