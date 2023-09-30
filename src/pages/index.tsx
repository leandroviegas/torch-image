"use client"
import { useEffect, useState } from "react";

import styled from "styled-components";

import api from "@/services/api";

import { getServerSession } from "next-auth/next"
import Head from "next/head";
import { authOptions } from "./api/auth/[...nextauth]"

import type { GetServerSidePropsContext } from "next"

import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import GridGallery from "@/components/gallery/Grid";

import Image from "@/types/Image";

import { FiSearch } from "react-icons/fi";

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

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);

  const [search, setSearch] = useState<string>('');

  function Search({ query }: { query: string }) {
    api.get('/images/search', { params: { query } }).then(response => {
      setImages(response.data.images)
    })
  }

  useEffect(() => {
    Search({ query: "" });
  }, [])

  return (
    <>
      <Head>
        <title>All the images you already love in one place</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Header>
        <img src={'https://images.pexels.com/photos/2310641/pexels-photo-2310641.jpeg'} alt="Background image" />
        <div className='content'>
          <Navbar isIndex={true} />
          <div>
            <Container>
              <div>
                <h1>The combination of what you already love.</h1>
                <form onSubmit={(evt) => {
                  evt.preventDefault()
                  Search({ query: search });
                }}>
                  <input onChange={evt => setSearch(evt.currentTarget.value)} className='search' placeholder='Search' type='text' />
                  <button className='send' type='submit'><FiSearch /></button>
                </form>
              </div>
            </Container>
          </div>
        </div>
      </Header>
      <Container>
        <GridGallery images={images} />
      </Container>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  }
}