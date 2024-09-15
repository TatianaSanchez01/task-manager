"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import menu from "@/app/utils/menu";
import { usePathname, useRouter } from "next/navigation";

function Sidebar() {
    const { theme } = useGlobalState();
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (link: string) => {
        router.push(link);
    };

    return (
        <SidebarStyled
            theme={theme}
            className="relative rounded-2xl flex flex-col  justify-between"
        >
            <div className="profile m-6 relative py-4 px-3 rounded-2xl cursor-pointer font-medium flex items-center">
                <div className="profile-overlay absolute top-0 left-0 h-full w-full backdrop-blur-md z-0 rounded-2xl opacity-20"></div>

                <div className="image flex-shrink-0 inline-block overflow-hidden rounded-full w-[70px] h-[70px] relative z-1">
                    <Image
                        width={70}
                        height={70}
                        src="/avatar1.png"
                        alt="profile"
                        className="rounded-full"
                    />
                </div>
                <h1 className="text-xl flex flex-col ml-3 relative z-1">
                    <span>John</span>
                    <span>Doe</span>
                </h1>
            </div>
            <ul className="nav-items ">
                {menu.map((menuItem) => {
                    return (
                        <li
                            key={menuItem.id}
                            className={`nav-item pl-9 py-3 pr-4 my-2 mx-0 grid cursor-pointer relative  ${
                                pathname === menuItem.link ? "active" : ""
                            }`}
                            onClick={() => {
                                handleClick;
                            }}
                        >
                            {menuItem.icon}
                            <Link href={menuItem.link} className="font-medium">{menuItem.title}</Link>
                        </li>
                    );
                })}
            </ul>
            <button className="m-6">Sign out</button>
        </SidebarStyled>
    );
}
const SidebarStyled = styled.nav`
    width: ${(props) => props.theme.sidebarWidth};
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor};
    color: ${(props) => props.theme.colorGrey3};

    .profile {
        color: ${(props) => props.theme.colorGrey0};

        .profile-overlay {
            background: ${(props) => props.theme.colorBg3};
            transition: all 0.55s linear;
            border: 2px solid ${(props) => props.theme.borderColor2};
        }

        .image {
          transition: all 0.5s ease;

          img {
            transition: all 0.5s ease;
          }
        }

        > h1 {
          font-size: clamp(1.2rem, 4vw, 1.4rem);
          line-height: 100%;
        }

        &:hover {
          .profile-overlay {
            opacity: 1;
            border: 2px solid ${(props) => props.theme.borderColor2};
          }

          img {
            transform: scale(1.1);
          }
        }
    }

    .nav-item {
      grid-template-columns: 40px 1fr;

      &::after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background-color: ${(props) => props.theme.activeNavLinkHover};
        z-index: 1;
        transition: all 0.3s ease-in-out;
      }

      &::before {
        position: absolute;
        content: "";
        right: 0;
        top: 0;
        width: 0;
        height: 100%;
        background-color: ${(props) => props.theme.colorBlueDark};

        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;
      }

      a {
        transition: all 0.3s ease-in-out;
        z-index: 2;
      }

      i {
        display: flex:
        align-items: center;
        color: ${(props) => props.theme.colorIcons}
      }

      &:hover {
        &::after {
          width: 100%;
        }
      }
    }

    .active {
      backgroun-color: ${(props) => props.theme.activeNavLink};

      i, a {
        color: ${(props) => props.theme.colorIcons2}
      }
    }

    .active::before {
      width: 0.3rem
    }
`;
export default Sidebar;