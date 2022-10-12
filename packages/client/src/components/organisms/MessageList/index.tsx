import React, { useEffect, useContext } from "react";
import { getChannelPosts } from "../../../global/api";
import MessageItem from "../../molecules/MessageItem";
import * as s from "./styles";
import {ModalContext} from "../../Layout";
import { ChannelItem, PostItem } from "@chat-app-typescript/shared";


type Props = {
  activeChannel: ChannelItem | null;
};

const MessageList = ({activeChannel}: Props) => {
  const {modalVisible} = useContext(ModalContext);
  const [posts, setPosts] = React.useState<PostItem[]>([]);

  const fetchData = async () => {
    if (!modalVisible) {
    try {
      const data = await getChannelPosts(
        activeChannel?.id || 1
      );
      setPosts(data.posts || []);
    } catch (err) {
      if (err instanceof Error) {
        console.error("ERROR", err);
      }
    }}
  };

  useEffect(() => {
    fetchData();
  }, [modalVisible, activeChannel]);

  return (
    <s.MessageList>
      {activeChannel && posts.map((post: PostItem, index) => {
        return <MessageItem key={index} data={post} />;
      })}
    </s.MessageList>
  );
};

export default MessageList;
