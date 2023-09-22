'use client'
import styled from 'styled-components'
import FloatingLabelInput from '@/components/FloatingLabelInput';
import { signIn } from 'next-auth/react';
import api from '@/services/api';
import { useState } from 'react';

const SignUp = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;

    hr {
        border-top: 1px solid #e3e3e3;
    }

    button.SignUp {
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
    const [form, setForm] = useState<{ username: string, email: string, password: string }>({ username: "", email: "", password: "" })

    const HandleSignUp = (event: React.FormEvent) => {
        event.preventDefault();
        api.post("/user", form).then(resp => {
            // signIn("credentials", { ...form, redirect: false }).then(ClosePopup).catch(console.error)
        })
    }

    return (
        <SignUp onSubmit={HandleSignUp}>
            <FloatingLabelInput label='Username' onChange={e => setForm({...form, username: e.currentTarget.value })} status={"error"} />
            <FloatingLabelInput label='Email' type='email' onChange={e => setForm({...form, email: e.currentTarget.value })} status={"error"} />
            <FloatingLabelInput label='Password' type='password' onChange={e => setForm({...form, password: e.currentTarget.value })} status={"error"} />
            {/* <hr /> */}
            <button className='SignUp'>Sign Up</button>
        </SignUp>
    )
}

export default Index