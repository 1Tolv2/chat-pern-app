import React from "react";
import * as s from "./styles";
import * as t from "../../theme/typography";
import {ChannelItem} from "@chat-app-typescript/shared"; 

type Props = {
  activeChannel: ChannelItem | null;
};

const Header = ({activeChannel}: Props) => {

  const handleOnClick = () => {
console.log("clicked");
  }
  return (
    <s.ChannelBar>
      <div style={{display: "flex"}}>
        <img src={"tag.svg"} alt="hashtag icon"/>
        <t.H2
          fontSize="20px"
          lineHeight="22px"
          fontWeight="600"
          mb="3px"
          mt="0"
        >
          {`${activeChannel?.name||""}`}
        </t.H2>
      </div>
      <div>
        <img src={"/group.svg"} onClick={handleOnClick} style={{cursor: "pointer"}}/>
      </div>
    </s.ChannelBar>
  );
};

export default Header;
