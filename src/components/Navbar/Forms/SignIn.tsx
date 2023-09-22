'use client'
import styled from 'styled-components'
import FloatingLabelInput from '@/components/FloatingLabelInput';
import { useState } from 'react';
import api from '@/services/api';
import { signIn } from 'next-auth/react';

const SignIn = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;

    hr {
        border-top: 1px solid #e3e3e3;
    }

    button.SignIn {
        margin-top: 30px;
        padding: 20px 0;
        font-size: 15px;
        font-weight: 600;
        background: #ff9500;
        color: white;
        transition: all 0.2s;
        border-radius: 10px;
    }
`

const Index = ({ ClosePopup }: { ClosePopup: () => void }) => {
    
    const [ form, setForm ] = useState<{ usernameOrEmail: string, password: string }>({ usernameOrEmail: "", password: "" });

    function HandleSignIn(event: React.FormEvent) {
        event.preventDefault();
        signIn("credentials", { ...form, redirect: false }).then(ClosePopup).catch(console.error)
        ClosePopup();
    }

    return (
        <SignIn onSubmit={HandleSignIn}>
            <FloatingLabelInput onChange={e => setForm({...form, usernameOrEmail: e.currentTarget.value })} name='usernameOrEmail' label='Username or email' status={"error"} />
            <FloatingLabelInput onChange={e => setForm({...form, password: e.currentTarget.value })} name='password' label='Password' type='password' status={"error"} />
            {/* <hr /> */}
            <button className='SignIn'>Sign In</button>
        </SignIn>
    )
}

export default Index