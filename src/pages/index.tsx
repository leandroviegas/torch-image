"use client"
import { useEffect, useState } from "react";

import api from "@/services/api";

import { getServerSession } from "next-auth/next"
import Head from "next/head";
import { authOptions } from "./api/auth/[...nextauth]"

import type { GetServerSidePropsContext } from "next"

import Header from "@/components/HomePage/Header";
import Container from "@/components/Container";
import GridGallery from "@/components/gallery/Grid";

import Image from "@/types/Image";

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);

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
      <Header SearchCallback={query => Search({ query })} />
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