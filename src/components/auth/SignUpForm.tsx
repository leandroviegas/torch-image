'use client'
import styled from 'styled-components'
import FloatingLabelInput from '@/components/FloatingLabelInput';
import { signIn } from 'next-auth/react';
import useForm from '@/hooks/useForm';
import api from '@/services/api';

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

const Index = ({ ClosePopup }: { ClosePopup: () => void }) => {
    const [form, setForm] = useForm<{ username: string, email: string, password: string }>({ username: "", email: "", password: "" })

    const HandleSignUp = (event: React.FormEvent) => {
        event.preventDefault();
        api.post("/user", form).then(resp => {
            signIn("credentials", { usernameOrEmail: form.email, password: form.password, redirect: false }).then(ClosePopup).catch(console.error)
        })
    }

    return (
        <SignUp onSubmit={HandleSignUp}>
            <FloatingLabelInput label='Username' onChange={e => setForm({ username: e.currentTarget.value })} status={"error"} />
            <FloatingLabelInput label='Email' onChange={e => setForm({ email: e.currentTarget.value })} status={"error"} />
            <FloatingLabelInput label='Password' type='password' onChange={e => setForm({ password: e.currentTarget.value })} status={"error"} />
            {/* <hr /> */}
            <button className='SignUp'>Sign Up</button>
        </SignUp>
    )
}

export default Index