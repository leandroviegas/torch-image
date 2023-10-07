"use client";
import { useState, useEffect, useRef } from "react";

import { GridGallery } from "./styles";
import ImageCard from "../ImageCard";

import Image, { Like } from "@/types/Image";
import useImageDetails from "@/hooks/useImageDetails";
import { FiLoader } from "react-icons/fi";

export type ImagesGrid = {
  colHeight: number;
  images: Image[];
};

export default function Index({
  images,
  LoadMore,
  loading = false,
}: {
  images: Image[];
  LoadMore: () => void;
  loading?: boolean;
}) {
  const [imagesInGrid, setImagesInGrid] = useState<Image[]>(images);
  const { setImage } = useImageDetails();

  useEffect(() => {
    setImagesInGrid(images);
  }, [images]);

  function ChangeLikes(likes: Like[], sourceId: string, provider: string) {
    setImagesInGrid(
      imagesInGrid.map((imageInGrid) =>
        `${sourceId}-${provider}` ==
        `${imageInGrid.sourceId}-${imageInGrid.provider.name}`
          ? { ...imageInGrid, likes }
          : imageInGrid
      )
    );

    setImage((img: any) => {
      return `${sourceId}-${provider}` == `${img.sourceId}-${img.provider.name}`
        ? { ...img, likes }
        : img;
    });
  }

  function SeparateImagesInGrid({
    images,
    cols,
  }: {
    images: Image[];
    cols: number;
  }) {
    let columns: ImagesGrid[] = [];

    for (let index = 0; index < cols; index++) {
      columns = [
        ...columns,
        {
          colHeight: 0,
          images: [],
        },
      ];
    }

    images.forEach((image) => {
      const lowestIndex = columns.findIndex(
        (column) =>
          column.colHeight ==
          Math.min(...columns.map((column) => column.colHeight))
      );
      columns[lowestIndex] = {
        colHeight:
          columns[lowestIndex].colHeight + image.imageHeight / image.imageWidth,
        images: [...columns[lowestIndex].images, image],
      };
    });

    return columns;
  }

  function getScrollParent(element: any, includeHidden = false) {
    var style = getComputedStyle(element);
    var excludeStaticParent = style.position === "absolute";
    var overflowRegex = includeHidden
      ? /(auto|scroll|hidden)/
      : /(auto|scroll)/;

    if (style.position === "fixed") return window;
    for (var parent = element; (parent = parent.parentElement); ) {
      style = getComputedStyle(parent);
      if (excludeStaticParent && style.position === "static") {
        continue;
      }
      if (
        overflowRegex.test(style.overflow + style.overflowY + style.overflowX)
      )
        return parent;
    }

    return window;
  }

  const grid = useRef<any>();

  const ScrollableParent =
    typeof window !== "undefined" && grid.current
      ? getScrollParent(grid.current)
      : undefined;

  useEffect(() => {
    if (grid.current && ScrollableParent) {
      (ScrollableParent == document.body
        ? window
        : ScrollableParent
      ).addEventListener("scroll", () => {
        const parentRect = ScrollableParent.getBoundingClientRect();
        const gridRect = grid.current.getBoundingClientRect();
        const distance = gridRect.height + gridRect.top - parentRect.height;
        if (distance < (parentRect.height * 2)) {
          LoadMore();
        }
      });
    }
  }, [grid, ScrollableParent]);

  return (
    <>
      <GridGallery ref={grid}>
        {SeparateImagesInGrid({ images: imagesInGrid, cols: 4 }).map(
          (column) => {
            return (
              <div key={Math.random()} className="column">
                {column.images.map((image) => {
                  return (
                    <ImageCard
                      key={image.sourceId + image.provider.name}
                      ChangeLikes={ChangeLikes}
                      {...image}
                    />
                  );
                })}
              </div>
            );
          }
        )}
      </GridGallery>
    </>
  );
}
