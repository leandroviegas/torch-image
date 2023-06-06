'use client'
import styled from 'styled-components'
import FloatingLabelInput from '@/components/FloatingLabelInput';
import { signIn } from 'next-auth/react';

const SignIn = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;

    hr {
        border-top: 1px solid #e3e3e3;
    }

    button.SignIn {
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
    const HandleSignIn = (event: React.FormEvent) => {
        event.preventDefault();
        // signIn("credentials", { usernameOrPassword: "", password: "" })
    }

    return (
        <SignIn onSubmit={HandleSignIn}>
            <FloatingLabelInput label='Username or email' status={"error"} />
            <FloatingLabelInput label='Password' type='password' status={"error"} />
            {/* <hr /> */}
            <button className='SignIn'>Sign In</button>
        </SignIn>
    )
}

export default Index