'use client'
import { useState, useEffect } from 'react';

import { GridGallery } from './styles';
import ImageCard from '../ImageCard';

import Image, { Like } from "@/types/Image";

export type ImagesGrid = {
    colHeight: number;
    images: Image[];
}

const Index = ({ images }: { images: Image[] }) => {
    const [imagesInGrid, setImagesInGrid] = useState<Image[]>(images);

    useEffect(() => {
        setImagesInGrid(images)
    }, [images])

    function ChangeLikes(likes: Like[], sourceId: string, provider: string) {
        setImagesInGrid(imagesInGrid.map(imageInGrid => `${sourceId}-${provider}` == `${imageInGrid.sourceId}-${imageInGrid.provider.name}` ? { ...imageInGrid, likes } : imageInGrid))
    }

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
            const lowestIndex = columns.findIndex(column => column.colHeight == Math.min(...columns.map(column => column.colHeight)))
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
                                            ChangeLikes={ChangeLikes}
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