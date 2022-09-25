import React from "react";
import * as s from "./styles";
import * as t from "../../theme/typography";
import logo from "../../../logo.svg";

type Props = {};

const Header = (props: Props) => {


  const handleOnClick = () => {
console.log("clicked");
  }
  return (
    <s.ChannelBar>
      <div style={{display: "flex"}}>
        <img src={logo} />
        <t.H2
          fontSize="20px"
          lineHeight="22px"
          fontWeight="600"
          mb="3px"
          mt="0"
        >
          {"#general"}
        </t.H2>
      </div>
      <div>
        <img src={logo} onClick={handleOnClick} style={{cursor: "pointer"}}/>
      </div>
    </s.ChannelBar>
  );
};

export default Header;
