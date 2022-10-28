import React from "react";
import { PostItem } from "@chat-app-typescript/shared";
import logo from "../../../logo.svg";
import Paragraph from "../../atoms/Paragraph";
import * as s from "./styles";

type Props = {
  data: PostItem[];
};

const MessageList = ({ data }: Props) => {
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
      month < 9 ? "0" + (month + 1) : month + 1
    }/${year} - ${hours < 10 ? "0" + hours : hours}.${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  };
  return (
    <ul>
      {data?.map((post: PostItem, index) => {
        return (
          <s.Container key={index}>
            <s.MessageWrapper>
              <s.ProfileImage src={logo} alt="avatar" />
              <div>
                <div>
                  <s.Heading>
                    {firstLetterToUppercase(post?.user || "")}
                  </s.Heading>
                  <Paragraph
                    editStyle={{ fontSize: "0.75rem" }}
                    color="lighterGrey"
                  >
                    {renderDateString(
                      new Date(post?.created_at || "11/10/2022")
                    )}
                  </Paragraph>
                </div>
                <Paragraph>{post?.text}</Paragraph>
              </div>
            </s.MessageWrapper>
          </s.Container>
        );
      })}
    </ul>
  );
};

export default MessageList;
