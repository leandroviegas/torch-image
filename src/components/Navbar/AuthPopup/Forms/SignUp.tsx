'use client'
import { useState } from 'react';
import { signIn } from 'next-auth/react';

import api from '@/services/api';

import FloatingLabelInput from '@/components/FloatingLabelInput';
import { toast } from 'react-toastify';

const Index = ({ ClosePopup }: { ClosePopup: () => void }) => {
    const [form, setForm] = useState<{ username: string, email: string, password: string }>({ username: "", email: "", password: "" })

    const HandleSignUp = (event: React.FormEvent) => {
        event.preventDefault();
        api.post("/user", form).then(resp => {
            signIn("credentials", { ...form, redirect: false }).then(ClosePopup).catch(err => {
                toast(`Error to sign in: ${err}`, {
                    type: "error",
                }); 
            })
        })
    }

    return (
        <form className='sign-form' onSubmit={HandleSignUp}>
            <FloatingLabelInput label='Username' onChange={e => setForm({...form, username: e.currentTarget.value })} status={"error"} />
            <FloatingLabelInput label='Email' type='email' onChange={e => setForm({...form, email: e.currentTarget.value })} status={"error"} />
            <FloatingLabelInput label='Password' type='password' onChange={e => setForm({...form, password: e.currentTarget.value })} status={"error"} />
            {/* <hr /> */}
            <button className='sign'>Sign Up</button>
        </form>
    )
}

export default Index