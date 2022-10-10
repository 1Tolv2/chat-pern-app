import React, { useEffect, useContext } from "react";
import { Post } from "../../../global/types";
import { getChannelPosts } from "../../../global/api";
import MessageItem from "../../molecules/MessageItem";
import * as s from "./styles";
import {ModalContext} from "../../Layout";


type Props = {};

const MessageList = (props: Props) => {
  const {modalVisible} = useContext(ModalContext);
  const [posts, setPosts] = React.useState<Post[]>([]);

  const fetchData = async () => {
    if (!modalVisible) {
    try {
      const data = await getChannelPosts(
        "1"
      );
      setPosts(data.posts);
    } catch (err) {
      if (err instanceof Error) {
        console.error("ERROR", err);
      }
    }}
  };

  useEffect(() => {
    fetchData();
  }, [modalVisible]);

  return (
    <s.MessageList>
      {posts.map((post: Post, index) => {
        return <MessageItem key={index} data={post} />;
      })}
    </s.MessageList>
  );
};

export default MessageList;
