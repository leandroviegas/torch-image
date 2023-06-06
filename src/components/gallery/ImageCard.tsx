'use client'
import styled from 'styled-components'

import { HiCollection } from 'react-icons/hi'
import { MdThumbUpAlt } from 'react-icons/md'

import ImageType from '@/types/Image'
import Image from 'next/image'

const ImageCard = styled.div`
    box-shadow: 0px 4px 4px #44444416;
    border-bottom: 1px solid #f1f1f1;
    border-left: 1px solid #f1f1f1;
    border-right: 1px solid #f1f1f1;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;

    .image {
        position: relative;
        width: auto;
        height: auto;

        & img {
            width: 100%;
            z-index: -1;
            display: block;
        }

        .info-card {
            height: 100%;
            width: 100%;
            position: absolute;
            background: #00000050;
            opacity: 0;
            transition: opacity 0.5s;
            display: flex;
            flex-direction: column-reverse;

            .user-info {
                margin: 10px;
                a {
                    display: flex;
                    gap: 7px;
                    align-items: center;
                    
                    span {
                        color: #e0e0e0;
                        font-weight: 600;
                        font-size: 12px;

                        &:hover {
                            color: white;
                        }
                    }

                    img {
                        z-index: 2;
                        width: 30px;
                        height: 30px;
                        border-radius: 999999px;
                    }
                }
            }
        }

        &:hover .info-card {
            opacity: 1;
        }
    }

    .footer {
        padding: 7px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .buttons {
            display: flex;
            gap: 7px;
            
            span {
                font-size: 15px;
                text-align: center;
                width: 100%;
            }

            button {
                cursor: pointer;
                display: flex;
                align-items: center;
                background: #00000000;
                color: #575757;
                border: 1px solid #c7c7c7;
                font-size: 20px;
                border-radius: 7px;
                padding: 7px 7px;
                transition: 0.2s;
                
                &:hover {
                    color: #1d1d1d;
                    border: 1px solid #373737;
                }
            }

            button.selected {
                background: #fdaf41;
                color: #ffffff;
                border: 1px solid #fdaf41;

                &:hover {
                    background: #ff9500;
                    border: 1px solid #ff9500;
                }
            }
        }

        .provider {
            a {
                display: flex;
                gap: 7px;
                align-items: center;
                
                span {
                    color: #7e7e7e;
                    font-weight: 600;
                    font-size: 12px;

                    &:hover {
                        color: #373737;
                    }
                }

                img {
                    z-index: 2;
                    width: 25px;
                    height: 25px;
                    border-radius: 999999px;
                }
            }
        }
    }
`

const Index = ({ previewLink, owner, provider }: ImageType) => {
    return (
        <ImageCard>
            <div className='image'>
                <div className='info-card'>
                    <div className='user-info'>
                        <a href={owner.userLink} target='_blank'>
                            <Image width={30} height={30} src={owner.profilePicture} alt={owner.username} />
                            <span>{owner.username}</span>
                        </a>
                    </div>
                </div>
                <img src={previewLink} alt='' />
            </div>
            <div className='footer'>
                <div className='buttons'>
                    <button><HiCollection /></button>
                    <button><MdThumbUpAlt /></button>
                </div>
                <div className="provider">
                    <a href={provider.URL} target='_blank'>
                        <span>{provider.name}</span>
                        <Image width={25} height={25} src={provider.providerPicture} alt={provider.name} />
                    </a>
                </div>
            </div>
        </ImageCard>
    )
}

export default Index