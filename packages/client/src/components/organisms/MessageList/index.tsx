import React, { useEffect } from "react";
import { Post } from "../../../global/types";
import { getChannelPosts } from "../../../global/api";
import MessageItem from "../../molecules/MessageItem";
import * as s from "./styles";

type Props = {};

const MessageList = (props: Props) => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  const fetchData = async () => {
    try {
      const data = await getChannelPosts(
        "6c5b4071-7f0f-4f47-b5a7-ae74d6ca06cf"
      );
      setPosts(data.posts);
    } catch (err) {
      if (err instanceof Error) {
        console.error("ERROR", err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <s.MessageList>
      {posts.map((post: Post, index) => {
        return <MessageItem key={index} data={post} />;
      })}
    </s.MessageList>
  );
};

export default MessageList;
