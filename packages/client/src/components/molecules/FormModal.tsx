import React from 'react'
import styled from 'styled-components'
import Button from '../atoms/Button';
import {theme } from '../theme'
import FriendSearch from './FriendSearch/';
import InputWithLabel from './InputWithLabel';
const { colors } = theme;

const ModalContainer = styled.div`
position: absolute;
top: 0;
left: 105%;
width: 350px;
height: fit-content;
padding-bottom: 16px;
background-color: ${colors.darkGrey};
border-radius: 5px;
box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.5);
z-index: 10;
h3 {
  position: relative;
  padding: 16px;
  color:${colors.white};
  margin: 0;

}
`

const ButtonContainer = styled.div`
display: flex;
justify-content: flex-end;
background-color: ${colors.darkerGrey};
margin: 16px -16px -16px -16px;
padding: 16px;
`

const InputContainer = styled.div`
padding: 0 16px;
`

const CloseIcon = styled.img`
position: absolute;
top: 10px;
right: 10px;
height: 24px !important;
width: 24px;
transform: rotate(45deg);
cursor: pointer;
z-index: 1;
`

type Props = {
    exitModal: () => void;
    handleOnSubmit: () => void;
    title: string;
    serverId?: number | null;
    input: {
        labelText?: string;
        textColor?: string;
        id: string;
        type: "input" | "search";
        value: any | any[];
        setValue: (e: any) => void;
        bgColor?: string;
        placeholder?: string;
    }
}

const FormModal = ({ serverId, input, title, handleOnSubmit, exitModal }: Props) => {
  return (
    <ModalContainer>
      <CloseIcon src="/add.svg" alt="close icon" onClick={exitModal}/>
        <h3>{title}</h3>
        {input.type === "search" 
        ? <FriendSearch serverId={serverId || null}/> 
        : (<InputContainer><InputWithLabel placeholder={input.placeholder} labelText={input.labelText} textColor={input.textColor} id={input.id} type="text" value={input.value} setValue={input.setValue} bgColor={input?.bgColor || ""}/><ButtonContainer>
            <Button type="outlined" width="fit-content" bgColor="darkerGrey" onClick={exitModal}>Cancel</Button>
            <Button type="filled" width="fit-content" onClick={handleOnSubmit}>{title}</Button>
        </ButtonContainer></InputContainer>)}
    </ModalContainer>
  )
}

export default FormModal