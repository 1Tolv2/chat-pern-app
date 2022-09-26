import React from "react";
import { Member, ActivityData } from "../../../global/types";
import logo from "../../../logo.svg";
import * as t from "../../theme/typography";
import * as s from "./styles";

type Props = {
  data: ActivityData;
};

const MemberList = ({ data }: Props) => {
    const firstLetterToUppercase = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
  return (
    <s.Container>
      <s.SectionTitle>
        <t.H3 color="lightGrey">{`${data.title.toUpperCase()} - ${data.users.length}`}</t.H3>
      </s.SectionTitle>
      <s.MemberList>
        {data.users.map((user: Member, index) => {
          return (
            <s.MemberItem key={index} className={data.title}>
              <img src={logo} alt="avatar" />
              <t.H4 color="blue">{firstLetterToUppercase(user.user)}</t.H4>
            </s.MemberItem>
          );
        })}
      </s.MemberList>
    </s.Container>
  );
};

export default MemberList;
