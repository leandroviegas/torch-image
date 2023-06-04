'use client'
import { useState } from 'react'
import styled from 'styled-components';

import { FiSearch } from 'react-icons/fi'

import Container from '@/components/Container'
import Navbar from './Navbar'

const Header = styled.header`
    height: 600px;
    width: 100%;
    position: relative;

    & > img {
        filter: brightness(40%);
        position: absolute;
        z-index: -1;
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    & .content{
        height: 100%;
        display: flex;
        flex-direction: column;

        & > div:last-child {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            div {
                margin: 0 20px;
                max-width: 640px;

                h1 {
                    font-size: 25px;
                    color: white;
                    padding: 20px 0;
                    font-weight: 600;
                }

                form {
                width: 100%;
                background: white;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;

                    input.search {
                        border-bottom-left-radius: 20px;
                        border-top-left-radius: 20px;
                        border: none;
                        background: none;
                        padding: 10px 15px;
                        font-size: 20px;
                        width: 100%;
                    }

                    button.send {
                        display: flex;
                        align-items: center;
                        background: none;
                        text-decoration: none;
                        border: none;
                        font-size: 20px;
                        padding: 10px 15px;
                        border-bottom-right-radius: 20px;
                        border-top-right-radius: 20px;

                        &:hover{
                            
                            background-color: #f1f1f1;
                        }
                    }
                }
            }
        }
    }
`

const Index = ({ SearchCallback }: { SearchCallback: (search: string) => void }) => {

    const [search, setSearch] = useState<string>('');

    return (
        <Header>
            <img src={'https://images.pexels.com/photos/2310641/pexels-photo-2310641.jpeg'} alt="Background image" />
            <div className='content'>
                <Navbar />
                <div>
                    <Container>
                        <div>
                            <h1>The combination of what you already love.</h1>
                            <form onSubmit={(evt) => {
                                evt.preventDefault()
                                SearchCallback(search);
                            }}>
                                <input onChange={evt => setSearch(evt.currentTarget.value)} className='search' placeholder='Search' type='text' />
                                <button className='send' type='submit'><FiSearch /></button>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        </Header>
    )
}

export default Index