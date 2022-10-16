import { PostItem } from '@chat-app-typescript/shared';
import React from 'react'
import logo from "../../../logo.svg";
import Paragraph from '../../atoms/Paragraph';
import * as s from './styles'

type Props = {
    data: PostItem,
}

const MessageItem = ({data}: Props) => {
    const firstLetterToUppercase = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
    
      const renderDateString = (date: Date): string => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${day < 10 ? "0" + day : day}/${
          month < 9 ? "0" + (month+1) : (month+1)
        }/${year} - ${hours<10 ? "0" + hours : hours }.${minutes < 10 ? "0" + minutes : minutes}`;
      };
  return (
    <s.Container>
            <s.MessageWrapper>
              <s.ProfileImage src={logo} alt="avatar" />
              <div>
                <div>
                  <s.Heading>
                    {firstLetterToUppercase(data?.user || "")}
                  </s.Heading>
                  <Paragraph editStyle={{fontSize: "0.75rem"}} color="lighterGrey">
                    {renderDateString(new Date(data?.created_at || "11/10/2022"))}
                  </Paragraph>
                </div>
                <Paragraph>{data?.text}</Paragraph>
              </div>
            </s.MessageWrapper>

    </s.Container>
  )
}

export default MessageItem