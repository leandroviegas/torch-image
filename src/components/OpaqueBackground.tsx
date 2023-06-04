'use client'
import styled from 'styled-components'
import Outclick from './Outclick'

const OpaqueBackground = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 200;
    background-color: #0000005a;
    backdrop-filter: blur(3px);
    overflow-y: auto;
`

const Index = ({ opened, children, OutclickCallback }: { opened: boolean, children: React.ReactNode, OutclickCallback: () => void }) => {
    return opened ?
        <OpaqueBackground>
            <Outclick Callback={OutclickCallback}>
                {children}
            </Outclick>
        </OpaqueBackground>
        : <></>
}

export default Index