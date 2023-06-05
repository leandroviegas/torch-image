'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from "next-auth/react"
import styled from 'styled-components';

import { TiArrowSortedDown } from 'react-icons/ti';

import { useSession } from "next-auth/react";

import OpaqueBackground from "@/components/OpaqueBackground";
import Container from '@/components/Container';
import AuthPopup from '@/components/auth/AuthPopup';
import useOutsideClick from '@/hooks/useOutsideClick';

const Navbar = styled.nav`
    padding: 30px 0;
    width: 100%;
    flex-shrink: 0;

    & > div {
        display: flex;
        justify-content: space-between;
    }

    & > div > div {
        margin: auto 15px;
    }

    & .logo {
        color: white;
        font-size: 25px;
        -webkit-filter: drop-shadow(2px 2px 0 white)
                drop-shadow(-2px 2px 0 white)
                drop-shadow(2px -2px 0 white)
                drop-shadow(-2px -2px 0 white);
        filter: drop-shadow(2px 2px 0 white)
        drop-shadow(-2px 2px 0 white)
        drop-shadow(2px -2px 0 white)
        drop-shadow(-2px -2px 0 white);
    }

    & .nav-list {
        display: flex;
        justify-items: center;
        gap: 30px;
        
        li {
            align-self: center;
            position: relative;
        }

        a, button, span {
            font-size: 15px;
            text-decoration: none;
            color: #e6e6e6;
            font-weight: 600;
            background-color: #00000000;
            cursor: pointer;

            &:hover {
                color: white;
            }
        }

        button.register {
            background: #ff9500;
            padding: 10px 20px;
            color: white;
            font-size: 17px;
            font-weight: 600;
            border: none;
            border-radius:7px;
        } 
    }

    .dropdown-menu {
        position: absolute;
        right: 0;
        height: auto;
        background: white;
        border-radius: 5px;
        margin-top: 10px;

        button {
            font-size: 12px;
            padding: 7px 12px;
            color: #818181;

            &:hover {
                color: #2a2a2a;
            }
        }
    }
`

const Index = () => {
    const { data: session, status } = useSession();
    const [popup, setPopup] = useState<string>("");
    const loading = status === "loading";

    const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({ user: false });

    const [dropdownRef] = useOutsideClick(() => setDropdowns({ ...dropdowns, user: false }));

    useEffect(() => {
        document.body.style.overflowY = popup !== "" ? "hidden" : "auto";
    }, [popup])

    return (
        <>
            <OpaqueBackground opened={popup !== ""}>
                <AuthPopup ChangePopup={setPopup} popup={popup} onOutsideClick={() => setPopup("")} />
            </OpaqueBackground>
            <Navbar>
                <Container>
                    <div className='logo'>
                        <Image width={40} height={40} src="/flame.svg" alt="Torch-Image logo" />
                    </div>
                    <div>
                        <ul className='nav-list'>
                            <li>
                                <Link href="/">Explore</Link>
                            </li>
                            {!loading &&
                                !session ?
                                <>
                                    <li>
                                        <span onClick={() => setPopup("SignIn")}>Sign In</span>
                                    </li>
                                    <li>
                                        <button onClick={() => setPopup("SignUp")} className='register'>Sign Up</button>
                                    </li>
                                </> :
                                <>
                                    <li ref={dropdownRef} onClick={() => setDropdowns({ ...dropdowns, user: true })}>
                                        <span>{session?.user?.name} <TiArrowSortedDown /></span>
                                        {dropdowns["user"] &&
                                            <div className='dropdown-menu'>
                                                <button onClick={() => signOut()} className='item'>Sign Out</button>
                                            </div>
                                        }
                                    </li>
                                </>
                            }

                        </ul>
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default Index