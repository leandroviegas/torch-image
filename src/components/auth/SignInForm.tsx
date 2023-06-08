'use client'
import styled from 'styled-components'
import FloatingLabelInput from '@/components/FloatingLabelInput';
import { signIn } from 'next-auth/react';
import useForm from '@/hooks/useForm';

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

const Index = ({ ClosePopup }: { ClosePopup: () => void }) => {
    const [form, setForm] = useForm<{ usernameOrEmail: string, password: string }>({ usernameOrEmail: "", password: "" })

    const HandleSignIn = (event: React.FormEvent) => {
        event.preventDefault();
        signIn("credentials", { ...form, redirect: false }).then(ClosePopup).catch(console.error)
    }

    return (
        <SignIn onSubmit={HandleSignIn}>
            <FloatingLabelInput label='Username or email' status={"error"} />
            <FloatingLabelInput label='Password' type='password' onChange={e => setForm({ ...form, password: e.currentTarget.value })} status={"error"} />
            {/* <hr /> */}
            <button className='SignIn'>Sign In</button>
        </SignIn>
    )
}

export default Index