'use client'
import styled from 'styled-components'

import { BiCollection, BiLike } from 'react-icons/bi'
import Image from '@/types/Image'

const ImageCard = styled.div`
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
                    gap: 5px;
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
                        border: 1px solid #ff9500;
                        border-radius: 999999px;
                    }
                }
            }
        }

        &:hover .info-card {
            opacity: 1;
        }
    }

    .informations {
        box-shadow: 0px 4px 4px #44444416;
        padding: 7px;
        border-bottom: 1px solid #d7d7d7;
        border-left: 1px solid #d7d7d7;
        border-right: 1px solid #d7d7d7;
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;

        .buttons {
            display: flex;
            gap: 5px;
            
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
                border: 1px solid #9c9c9c;
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
    }
`

const Index = ({ previewLink, owner }: Image) => {
    return (
        <ImageCard>
            <div className='image'>
                <div className='info-card'>
                    <div className='user-info'>
                        <a href={owner.userLink} target='_blank'>
                            <img src={owner.profilePicture} alt={owner.username} />
                            <span>{owner.username}</span>
                        </a>
                    </div>
                </div>
                <img src={previewLink} alt='' />
            </div>
            <div className='informations'>
                <div className='buttons'>
                    <button><BiCollection /></button>
                    <button className='selected'><BiLike /></button>
                </div>
            </div>
        </ImageCard>
    )
}

export default Index