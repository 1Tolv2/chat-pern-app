import React, {
  useEffect,
  useState,
  useContext,
  BaseSyntheticEvent,
  MouseEventHandler,
} from "react";
import { addMemberToServer, getAllUsers } from "../../../global/api";
import Avatar from "../../atoms/Avatar";
import Button from "../../atoms/Button";
import InputField from "../../atoms/InputField";
import * as s from "./styles";
import { UserContext } from "../../Layout";
import { UserItem } from "@chat-app-typescript/shared";

type Props = {
  serverId: string | null;
};

const FriendSearch = ({ serverId }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [memberList, setMemberList] = useState<UserItem[]>([]);
  const [unfilteredMemberList, setUnfilteredMemberList] = useState<UserItem[]>(
    []
  );
  const { user } = useContext(UserContext);

  const fetchMembers = async () => {
    const data = await getAllUsers();
    const filteredData = data.filter(
      (member) =>
        member.id !== user?.id &&
        !member.servers?.find((server) => server.id === serverId)
    );

    setUnfilteredMemberList(filteredData);
    setMemberList(filteredData);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const searchMember = (value: string) => {
    setSearchTerm(value);
    setMemberList(
      unfilteredMemberList.filter((member) =>
        new RegExp(value, "i").test(member.username)
      )
    );
  };

  const firstLetterToUpperCase = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleOnInvite: MouseEventHandler<HTMLButtonElement> = async (
    e: BaseSyntheticEvent
  ): Promise<void> => {
    await addMemberToServer(serverId || "", e.currentTarget.id);
  };

  return (
    <s.Container>
      <s.InputContainer>
        <InputField
          placeholder="Search for members"
          type="text"
          id="search"
          value={searchTerm}
          setValue={searchMember}
          bgColor="darkestGrey"
        />
      </s.InputContainer>
      <s.MemberList>
        {memberList &&
          memberList.map((member) => {
            return (
              <s.MemberItem key={member.id}>
                <Avatar size="30px" />
                <h4>{firstLetterToUpperCase(member.username)}</h4>
                <Button
                  id={member.id}
                  type="outlined"
                  fontSize="14px"
                  bgColor="green"
                  width="72px"
                  height="32px"
                  onClick={handleOnInvite}
                >
                  Invite
                </Button>
              </s.MemberItem>
            );
          })}
      </s.MemberList>
    </s.Container>
  );
};

export default FriendSearch;
