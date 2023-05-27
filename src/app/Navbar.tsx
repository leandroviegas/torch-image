'use client'
import Link from 'next/link'
import { styled } from 'styled-components'

import Container from '@/components/Container'

import Image from 'next/image'


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
        }

        a {
            font-size: 15px;
            text-decoration: none;
            color: #e6e6e6;
            font-weight: 600;
            
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
`

const Index = () => {
    return (
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
                        <li>
                            <Link href="/">SignIn</Link>
                        </li>
                        <li>
                            <button className='register'>SignUp</button>
                        </li>
                    </ul>
                </div>
            </Container>
        </Navbar>
    )
}

export default Index