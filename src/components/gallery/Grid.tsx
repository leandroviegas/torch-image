'use client'
import { useState, useEffect } from 'react';

import styled from 'styled-components'

import ImageCard from './ImageCard';

import Image from "@/types/Image";

const GridGallery = styled.div`
    margin: 30px auto;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    
    & .column {
        grid-column: span 12/span 12;
        gap: 20px;
        display: flex;
        flex-direction: column;
    }

    @media (min-width: 640px) {
        & .column {
            grid-column: span 6/span 6;
        }
    }

    @media (min-width: 1024px) {
        & .column {
            grid-column: span 3/span 3;
        }
    }  
`

export type ImagesGrid = {
    colHeight: number;
    images: Image[];
}

const Index = ({ images }: { images: Image[] }) => {
    const [imagesInGrid, setImagesInGrid] = useState<Image[]>(images);

    useEffect(()=> {
        setImagesInGrid(images)
    }, [images])

    function SeparateImagesInGrid({ images, cols }: { images: Image[], cols: number }) {
        let columns: ImagesGrid[] = [];

        for (let index = 0; index < cols; index++) {
            columns = [...columns,
            {
                colHeight: 0,
                images: []
            }]
        }

        images.forEach(image => {
            const lowestIndex = columns.findIndex(column => column.colHeight == Math.min(...columns.map(column => column.colHeight)));

            columns[lowestIndex] = { colHeight: columns[lowestIndex].colHeight + (image.imageHeight / image.imageWidth), images: [...columns[lowestIndex].images, image] };
        })

        return columns;
    }

    return (
        <GridGallery>
            {
                SeparateImagesInGrid({ images: imagesInGrid, cols: 4 }).map(column => {
                    return (
                        <div key={Math.random()} className="column">
                            {
                                column.images.map(image => {
                                    return (
                                        <ImageCard
                                            key={image.sourceId + image.provider}
                                            {...image}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </GridGallery>
    )
}

export default Index