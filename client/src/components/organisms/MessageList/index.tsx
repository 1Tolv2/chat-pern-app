import React, { useEffect } from "react";
import MessageItem from "../../molecules/MessageItem";
import { Post } from "../../../global/types";
import { getChannelWithPosts } from '../../../global/api';
import * as s from "./styles";

type Props = {};

// const messageList: Message[] = [
//   { id: 1, username: "tolv", text: "Hello World", timeStamp: new Date() },
//   { id: 2, username: "test", text: "Hello World2", timeStamp: new Date() },
// ];

const MessageList = (props: Props) => {
const [posts, setPosts] = React.useState<Post[]>([]);

const fetchData = async () => {
  try {
  const data = await getChannelWithPosts("6c5b4071-7f0f-4f47-b5a7-ae74d6ca06cf")
  setPosts(data.posts)
  } catch(err) {
    console.log(err)
    setPosts([])
    console.log("Something went wrong when fetching my posts...")
  }
}

useEffect(()=> {
  fetchData()
}, [])

  return (
    <s.MessageList>
      {posts.map((post: Post, index) => {
        return (
          <MessageItem key={index} data={post}/>
        );
      })}
    </s.MessageList>
  );
};

export default MessageList;
