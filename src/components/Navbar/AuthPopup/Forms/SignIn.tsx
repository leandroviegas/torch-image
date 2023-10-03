'use client'
import { useState } from 'react';
import { signIn } from 'next-auth/react';

import FloatingLabelInput from '@/components/FloatingLabelInput';

const Index = ({ ClosePopup }: { ClosePopup: () => void }) => {
    
    const [ form, setForm ] = useState<{ usernameOrEmail: string, password: string }>({ usernameOrEmail: "", password: "" });

    function HandleSignIn(event: React.FormEvent) {
        event.preventDefault();
        signIn("credentials", { ...form, redirect: false }).then(ClosePopup)
    }

    return (
        <form className='sign-form' onSubmit={HandleSignIn}>
            <FloatingLabelInput onChange={e => setForm({...form, usernameOrEmail: e.currentTarget.value })} name='usernameOrEmail' label='Username or email' status={"error"} />
            <FloatingLabelInput onChange={e => setForm({...form, password: e.currentTarget.value })} name='password' label='Password' type='password' status={"error"} />
            {/* <hr /> */}
            <button className='sign'>Sign In</button>
        </form>
    )
}

export default Index