'use client'

import styled from 'styled-components'

import Image from "@/types/Image";
import ImageCard from './ImageCard';

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
            const lowestHeight = Math.min(...columns.map(column => column.colHeight));

            const lowestIndex = columns.findIndex(column => column.colHeight == lowestHeight);

            columns[lowestIndex] = { colHeight: columns[lowestIndex].colHeight + (image.imageHeight / image.imageWidth), images: [...columns[lowestIndex].images, image] };
        })

        return columns;
    }

    return (
        <GridGallery>
            {
                SeparateImagesInGrid({ images, cols: 4 }).map(column => {
                    return (
                        <div key={Math.random()} className="column">
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
    )
}

export default Index