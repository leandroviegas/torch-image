"use client"
import { useEffect, useState } from "react";
import axios from "axios";

import Container from "@/components/Container";
import Header from "@/app/Header";
import GridGallery from "@/components/gallery/Grid";
import ImageCard from "@/components/gallery/ImageCard";

import api from "@/services/api";
import Image from "@/types/Image";

export const metadata = {
  title: 'Home Page - Torch Image',
  description: 'Torch Image image is the community where you can get all of everything you already love and know.',
}

export default function Home() {

  const [images, setImages] = useState<Image[]>([]);

  const [gridImages, setGridImages] = useState<{ colHeight: number, images: Image[] }[]>([]);

  function GridImageSepare(images: Image[]) {
    let columns: { colHeight: number, images: Image[] }[] = [
      {
        colHeight: 0,
        images: []
      },
      {
        colHeight: 0,
        images: []
      },
      {
        colHeight: 0,
        images: []
      },
      {
        colHeight: 0,
        images: []
      },
    ];

    images.forEach(image => {
      const lowestHeight = Math.min(...columns.map(column => column.colHeight));

      const lowestIndex = columns.findIndex(column => column.colHeight == lowestHeight);

      const simulatedHeight = (image.imageHeight / image.imageWidth) * 500;

      columns[lowestIndex] = { colHeight: columns[lowestIndex].colHeight + simulatedHeight, images: [...columns[lowestIndex].images, image] };
    })

    return columns;
  }

  useEffect(() => {
    setGridImages(GridImageSepare(images));

  }, [images])

  useEffect(() => {
    api.get('/images').then(response => {
      setImages(response.data)
    })
    axios.get('https://pixabay.com/api', { params: { key: "11416713-b1d03c6ef9480357418546451", q: "" } })
  }, [])

  return (
    <>
      <Header />
      <Container>
        <GridGallery>
          {
            gridImages.map(column => {
              return (
                <div className="column">
                  {
                    column.images.map(image => {
                      return (
                        <ImageCard {...image} key={image.sorceId + image.provider} />
                      )
                    })
                  }
                </div>
              )
            })
          }
        </GridGallery>
      </Container>
    </>
  )
}