"use client";
import { createRef, useEffect } from "react";
import styled from "styled-components";

const OpaqueBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: #0000007d;
  backdrop-filter: blur(3px);
  overflow-y: auto;
`;

const Index = ({ children, BackgroundClick }: { children: React.ReactNode, BackgroundClick: () => void }) => {
  const opbgRef = createRef<HTMLDivElement>(); 

  function HandleBackgroundClick(event: MouseEvent) {
    event.stopPropagation();
    
    if(event.target == opbgRef.current) {
      BackgroundClick();
    }
  }

  useEffect(() => {
      opbgRef.current?.addEventListener("click", HandleBackgroundClick, true)

    return () => {
        opbgRef.current?.removeEventListener("click", HandleBackgroundClick, true)
    }
  }, [opbgRef])

  return <OpaqueBackground ref={opbgRef}>{children}</OpaqueBackground>;
};

export default Index;
