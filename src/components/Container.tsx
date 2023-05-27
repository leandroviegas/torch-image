'use client'
import styled from 'styled-components'

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    
    @media (min-width: 1280px) {
        max-width: 1280px;    
    }
`

const Index = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Index