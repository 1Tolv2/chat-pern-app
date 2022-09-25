import React from "react";
import logo from "../../../logo.svg";
import * as s from "./styles";
import * as t from "../../theme/typography";

type Props = {};

const MemberSidebar = (props: Props) => {
  return (
    <s.MembersContainer>
      <s.SectionTitle>
        <t.H3 color="lightGrey">Online - #</t.H3>
      </s.SectionTitle>
      <s.MemberList>
        <s.MemberItem>
          <img src={logo} />
          <t.H4>Username</t.H4>
        </s.MemberItem>
      </s.MemberList>
      <s.SectionTitle>
        <t.H3 color="lightGrey">Offline - #</t.H3>
      </s.SectionTitle>
      <s.MemberList>
        <s.MemberItem>
          <img src={logo} />
          <t.H4>Username</t.H4>
        </s.MemberItem>
      </s.MemberList>
    </s.MembersContainer>
  );
};

export default MemberSidebar;
