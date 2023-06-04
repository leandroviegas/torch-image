'use client'
import styled from 'styled-components'

const FloatingLabelInput = styled.div`
    position: relative;
    padding-top: 13px;

    input{
        border: 0;
        border-bottom: 2px solid #e5e7eb;
        outline: none;
        min-width: 180px;
        width: 100%;
        font-size: 14px;
        padding-bottom: 7px;
        padding-top: 7px;
        transition: all .2s ease-out;
        -webkit-transition: all .2s ease-out;
        -moz-transition: all .2s ease-out;
        -webkit-appearance: none;
        border-radius:0;

        &:focus{
            border-bottom: 2px solid black;
        }

        &::placeholder{
            color:transparent;
        }

        &:required:invalid + label{
            color: red;
        }

        &:focus:required:invalid{
            border-bottom: 2px solid red;
        }

        &:required:invalid + label:before{
            content: '*';
        }

        &:focus + label,
        &:not(:placeholder-shown) + label{
            font-size: 11px;
            margin-top: 0;
        }
    }

    label{
        color: #9b9b9b;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 14px;
        margin-top: 13px;
        transition: all .3s ease-out;
        -webkit-transition: all .3s ease-out;
        -moz-transition: all .3s ease-out;
    }
`
type ValueType = string | number | readonly string[] | undefined

type InputProperties = {
    status: "error" | "info",
    messages?: string[],
    onChange?: React.ChangeEventHandler<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement> | undefined,
    defaultValue?: ValueType,
    value?: ValueType,
    name?: string,
    label: string,
    autoComplete?: "on" | "off",
    type?: "text" | "email" | "number" | "password" | "tel" | "datetime" | "textarea" | "datetime-local" | "url" | "select",
    children?: React.ReactNode
}

const Index = ({ status, label, type, name, value, defaultValue, onChange }: InputProperties) => {
    return (
        <FloatingLabelInput>
            <input {...{ type, name, value, defaultValue, onChange }} placeholder=" " />
            <label htmlFor=''>{label}</label>
        </FloatingLabelInput>
    )
}


Index.defaultProps = {
    status: "info",
    messages: [],
    autoComplete: "off",
    onChange: () => { },
    defaultValue: "",
    name: "",
    type: "text"
}


export default Index