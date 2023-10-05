'use client'
import { useEffect } from 'react';
import styled from 'styled-components'

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
`

const Index = ({ opened, children }: { opened: boolean, children: React.ReactNode }) => {
    useEffect(() => {
        document.body.style.overflowY = opened ? "hidden" : "auto";
      }, [opened]);

    return opened ?
        <OpaqueBackground>
            {children}
        </OpaqueBackground>
        : <></>
}

export default Index