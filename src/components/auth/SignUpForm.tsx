'use client'
import styled from 'styled-components'
import FloatingLabelInput from '@/components/FloatingLabelInput';

const SignUp = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;

    hr {
        border-top: 1px solid #e3e3e3;
    }

    button.SignUp {
        padding: 20px 0;
        font-size: 15px;
        font-weight: 600;
        background: #ff9500;
        color: white;
        transition: all 0.2s;
        border-radius: 10px;
    }
`

const Index = () => {
    return (
        <SignUp>
            <FloatingLabelInput label='Username' status={"error"} />
            <FloatingLabelInput label='Email' status={"error"} />
            <FloatingLabelInput label='Password' type='password' status={"error"} />
            <hr />
            <button className='SignUp'>SignUp</button>
        </SignUp>
    )
}

export default Index