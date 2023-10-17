"use client";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

import { GridGallery } from "./styles";
import ImageCard from "../Grid/Image";

import Image, { Like } from "@/types/Gallery";
import useUserGalley from "@/hooks/useUserGalley";

const Index = forwardRef<
  { AddImages: (images: Image[]) => void, ClearImages: () => void },
  { LoadMore: () => void }
>(({ LoadMore }, ref) => {
  const [imagesInGrid, setImagesInGrid] = useState<Image[]>([]);

  const { setImageDetails } = useUserGalley();

  function AddImages(images: Image[]) {
    setImagesInGrid((prevImagesInGrid) => [...prevImagesInGrid, ...images]);
  }

  useImperativeHandle(
    ref,
    () => ({
      AddImages,
      ClearImages: () => setImagesInGrid([]),
    }),
    []
  );

  const ChangeLikes = useCallback(
    (likes: Like[], sourceId: string, provider: string) => {
      setImagesInGrid((prevImagesInGrid) =>
        prevImagesInGrid.map((imageInGrid) =>
          `${sourceId}-${provider}` ==
          `${imageInGrid.sourceId}-${imageInGrid.provider.name}`
            ? { ...imageInGrid, likes }
            : imageInGrid
        )
      );

      setImageDetails((img: any) => {
        return `${sourceId}-${provider}` ==
          `${img?.sourceId}-${img?.provider?.name}`
          ? { ...img, likes }
          : img;
      });
    },
    []
  );

  function SeparateImagesInGrid({
    images,
    cols,
  }: {
    images: Image[];
    cols: number;
  }) {
    let columns: {
      colHeight: number;
      images: Image[];
    }[] = [];

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

    if (style.position === "fixed") return document.body;
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

    return document.body;
  }

  const gridRef = useRef<any>();

  const ScrollableParent =
    typeof window !== "undefined" && gridRef.current
      ? getScrollParent(gridRef.current)
      : undefined;

  useEffect(() => {
    if (gridRef.current && ScrollableParent) {
      (ScrollableParent == document.body
        ? window
        : ScrollableParent
      ).addEventListener("scroll", () => {
        try {
          const parentRect = ScrollableParent.getBoundingClientRect();
          const gridRect = gridRef.current.getBoundingClientRect();
          const distance = gridRect.height + gridRect.top - parentRect.height;
          if (distance < parentRect.height * 2) {
            LoadMore();
          }
        } catch (e) {}
      });
    }
  }, [gridRef, ScrollableParent]);

  return (
    <>
      <GridGallery ref={gridRef}>
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
});

Index.displayName = "GridGallery";

export default Index;
