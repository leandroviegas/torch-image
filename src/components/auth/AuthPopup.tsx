'use client'
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from "next-auth/react"
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import useOutsideClick from '@/hooks/useOutsideClick';

const AuthPopup = styled.div`
    width: 100vw;
    max-width: 760px;
    background: white;
    border-radius: 5px;
    padding: 30px;
    margin: 40px auto;

    .separators {
        margin: 35px auto;
        margin-bottom: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;

        hr {
            width: 100%;
            border-top: 1px solid #e5e7eb;
        }

        span {
            font-size: 12px;
            color: #747474;
            position: relative;
            transform: translateY(-50%);
            background-color: white;
            padding: 0 7px;
            margin: 0 auto;
        }
    }

    .tab-buttons {
        display: flex;
        flex-wrap: nowrap;
        border-radius: 10px;
    
        button {
            width: 100%;
            padding: 20px 0;
            background: #00000000;
            font-size: 15px;
            font-weight: 600;
            color: #565656;
            transition: all 0.2s;
            border: 1px solid #e3e3e3;
        }
        
        button.active {
            background: #ff9500;
            color: white;
            border: 1px solid #ff9500;
        }

        button:first-child {
            border-top-left-radius: 10px;  
            border-bottom-left-radius: 10px;
            border-right: 0;
        }
        button:last-child {
            border-top-right-radius: 10px;  
            border-bottom-right-radius: 10px;  
            border-left: 0;
        }
    }

    .social-auth {
        width: 100%;
        display: flex;
        justify-content: center;    

        button.google-auth {
            background-color: white;
            color:#565656;
            display: flex;
            justify-content: center;
            font-weight: 600;
            gap: 8px;
            border: 1px solid #e3e3e3;
            width: 100%;
            max-width: 300px;
            font-size: 17px;
            padding: 10px 7px;
            border-radius: 7px;
            transition: all 0.2s;

            &:hover {
                background-color: #fbfbfb;
            }
        }
    }
`

const Index = ({ ChangePopup, popup, onOutsideClick }: { ChangePopup: (newPopup: string) => void, popup: string, onOutsideClick: () => void }) => {
    const [authProviderRef] = useOutsideClick(onOutsideClick);

    return (
        <AuthPopup ref={authProviderRef}>
            <div className='tab-buttons'>
                <button className={`${popup == "SignIn" && 'active'}`} onClick={() => ChangePopup("SignIn")}>Sign In</button>
                <button className={`${popup == "SignUp" && 'active'}`} onClick={() => ChangePopup("SignUp")}>Sign Up</button>
            </div>
            <div className='separators'>
                <hr />
                <span>Social Media</span>
            </div>
            <div className='social-auth'>
                <button onClick={() => signIn('google')} className='google-auth'><FcGoogle size={20} /> Sign In with Google</button>
            </div>
            <div className='separators'>
                <hr />
                <span>Or</span>
            </div>
            <div>
                {popup == "SignIn"
                    ? <SignInForm />
                    : <SignUpForm />}
            </div>
        </AuthPopup>
    )
}

export default Index