import React from 'react'
import { Message } from '../../../global/types'
import logo from "../../../logo.svg";
import Paragraph from '../../atoms/Paragraph';
import * as s from './styles'

type Props = {
    data: Message,
}

const MessageItem = ({data}: Props) => {
    const firstLetterToUppercase = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
    
      const renderDateString = (date: Date): string => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day < 10 ? "0" + day : day}/${
          month < 10 ? "0" + month : month
        }/${year}`;
      };
  return (
    <s.Container>
            <s.MessageWrapper>
              <s.ProfileImage src={logo} />
              <div>
                <div>
                  <s.Heading>
                    {firstLetterToUppercase(data.username)}
                  </s.Heading>
                  <Paragraph fontSize="0.75rem" color="lighterGrey">
                    {renderDateString(data.timeStamp)}
                  </Paragraph>
                </div>
                <Paragraph>{data.text}</Paragraph>
              </div>
            </s.MessageWrapper>

    </s.Container>
  )
}

export default MessageItem