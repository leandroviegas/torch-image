'use client'
import styled from 'styled-components'
import Container from './Container'
import { SiPytorch } from 'react-icons/si'
import Link from 'next/link'

const Navbar = styled.nav`
    padding: 13px 0;
    width: 100vw;

    & > div {
        display: flex;
        justify-content: space-between;
    }

    & .logo {
        color: #161616;
    }

    & .nav-list {
        display: flex;
        gap: 20px;

        a {
            text-decoration: none;
            font-size: 14px;
            color: #656565;
            font-weight: 600;
            
            &:hover {
                color: black;
            }
        }
    }
`

const Index = () => {
    return (
        <Navbar>
            <Container>
                <div className="logo">
                    <SiPytorch />
                </div>
                <div>
                    <ul className='nav-list'>
                        <li>
                            <Link href="/">Explore</Link>
                        </li>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </Navbar>
    )
}

export default Index