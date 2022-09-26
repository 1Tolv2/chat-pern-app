import React, { useEffect, useState } from "react";
import * as s from "./styles";
import MemberList from "../../molecules/MemberList";
import { ActivityData } from "../../../global/types";
import {getChannelUsers} from '../../../global/api'

type Props = {};

const MemberSidebar = (props: Props) => {
  const [members, setMembers] = useState<ActivityData[]>([]);

  const fetchData = async () => {
    const data = await getChannelUsers('6c5b4071-7f0f-4f47-b5a7-ae74d6ca06cf')
    setMembers([data])
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <s.MembersContainer>
      {members.map((list, index) => {
        return <MemberList key={index} data={list} />;
      })}
    </s.MembersContainer>
  );
};

export default MemberSidebar;
