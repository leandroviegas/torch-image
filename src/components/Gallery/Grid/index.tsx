"use client";
import React, {
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
  { AddImages: (images: Image[]) => void; ClearImages: () => void },
  { LoadMore: () => void; loading?: boolean }
>(({ LoadMore }, ref) => {
  const [imagesInGrid, setImagesInGrid] = useState<Image[]>([]);

  const { setImageDetails } = useUserGalley();

  function AddImages(images: Image[]) {
    setImagesInGrid((prevImagesInGrid) => [...prevImagesInGrid, ...images]);
  }

  function SetImages(images: Image[]) {
    setImagesInGrid((prevImagesInGrid) => [
      ...prevImagesInGrid.filter((image) => {
        return images.some((img) => {
          return (
            `${image.sourceId}-${image.provider.name}` ==
            `${img.sourceId}-${img.provider.name}`
          );
        });
      }),
      ...images.filter((image) => {
        return !prevImagesInGrid.some((img) => {
          return (
            `${image.sourceId}-${image.provider.name}` ==
            `${img.sourceId}-${img.provider.name}`
          );
        });
      }),
    ]);
  }

  function ClearImages() {
    setImagesInGrid([]);
  }

  useImperativeHandle(
    ref,
    () => ({
      AddImages,
      ClearImages,
      SetImages,
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

  const [gridCols, setGridCols] = useState<number>(-1);

  useEffect(() => {
    if (gridCols < 0) {
      if (window.innerWidth < 1024) {
        if (gridCols != 2) setGridCols(2);
      } else {
        if (gridCols != 4) setGridCols(4);
      }
    }
    
    window.addEventListener(
      "resize",
      (event) => {
        if (window.innerWidth < 1024) {
          if (gridCols != 2) setGridCols(2);
        } else {
          if (gridCols != 4) setGridCols(4);
        }
      },
      true
    );
  }, [gridCols]);

  return (
    <React.Fragment>
      <GridGallery ref={gridRef}>
        {SeparateImagesInGrid({ images: imagesInGrid, cols: gridCols }).map(
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
    </React.Fragment>
  );
});

Index.displayName = "GridGallery";

export default Index;
