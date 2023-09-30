import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar";
import api from "@/services/api";

function Collection() {

    const router = useRouter()

    const { link } = router.query

    const [collection, setCollection] = useState()

    function GetData() {
        console.log(link)
        if (link)
            api.get('/collection', { params: { link: (link as string[])[0] || "" } })
                .then(res => {

                })
    }

    useEffect(() => {
        GetData()
    }, [link])

    return (
        <>
            <Head>
                <title>All the images you already love in one place</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <Navbar />
        </>
    )
}

export default Collection