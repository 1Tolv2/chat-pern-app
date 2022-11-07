import React, { useEffect } from "react";
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

  const renderDividerDate = (date: Date) => {
    return `
      ${date.getDate()}
      ${date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
      })}
    `;
  };

  useEffect(() => {
    const element = document.getElementById("message_list");
    if (element?.lastElementChild) {
      element.lastElementChild?.scrollIntoView();
    }
  }, [data]);

  return (
    <>
      {data.length > 0 && (
        <ul id="message_list">
          {data?.map((post: PostItem, index) => {
            let isStartOfDay = false;
            if (index === 0) {
              isStartOfDay = true;
            } else if (index > 0) {
              const previousPostDate = new Date(data[index - 1].created_at);
              const currentPostDate = new Date(post.created_at);
              isStartOfDay =
                previousPostDate.getDate() !== currentPostDate.getDate() ||
                (previousPostDate as unknown as number) -
                  (currentPostDate as unknown as number) >
                  864000;
            }

            return (
              <s.Container key={index}>
                {isStartOfDay && (
                  <s.DateDivider>
                    <s.DateText>
                      {renderDividerDate(new Date(post?.created_at))}
                    </s.DateText>
                  </s.DateDivider>
                )}
                <s.MessageWrapper>
                  <s.ProfileImage src={logo} alt="avatar" />
                  <div>
                    <div>
                      <s.Heading>
                        {firstLetterToUppercase(post?.username || "")}
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
      )}
    </>
  );
};

export default MessageList;
