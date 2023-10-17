import React, { useEffect, useCallback } from "react";

function OutClick({
  children,
  onOutClick = () => {},
  ignoreScrollBars = true,
}: {
  children: React.ReactNode;
  onOutClick: () => void;
  ignoreScrollBars?: boolean;
}) {
  const components = React.Children.toArray(children).map((child: any) =>
    React.isValidElement(child)
      ? React.cloneElement<any>(child, { ref: React.createRef() })
      : child
  );

  const HandleClickOutside = useCallback(
    (event: any) => {
      let outClickElements = 0;

      components.forEach((element) => {
        if (!element?.ref?.current?.contains(event.target)) outClickElements++;
      });

      if (
        (event.offsetX > event.target?.clientWidth ||
          event.offsetY > event.target?.clientHeight) &&
        ignoreScrollBars
      )
        return;

      if (components.length <= outClickElements) onOutClick();
    },
    [components, ignoreScrollBars, onOutClick]
  );

  useEffect(() => {
    document.addEventListener("mousedown", HandleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", HandleClickOutside, true);
    };
  }, [HandleClickOutside]);

  console.log(components)
  
  return <>{components}</>;
}

export default OutClick;
