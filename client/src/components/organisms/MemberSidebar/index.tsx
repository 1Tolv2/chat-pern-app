import React from "react";
import * as s from "./styles";
import MemberList from "../../molecules/MemberList";
import {ActivityData} from "../../../global/types";

type Props = {};

const activityData: ActivityData[] = [
  { title: "online", members: [{ username: "tolv" }, {username: "D!"}] },
  { title: "offline", members: [{ username: "Guldlock" }, {username: "Warhamster"}, {username:"Matte"}] }
];

const MemberSidebar = (props: Props) => {
  return (
    <s.MembersContainer>
      {activityData.map((list) => {
        return <MemberList data={list}/> 
      })}
    </s.MembersContainer>
  );
};

export default MemberSidebar;
