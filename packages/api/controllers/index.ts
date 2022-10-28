import {
  ChannelItem,
  PostItem,
  ServerItem,
  UserItem,
} from "@chat-app-typescript/shared";

interface DynamicObject {
  input: UserItem | PostItem | ServerItem | ChannelItem;
}
export const requiredFieldsCheck = (
  requestBody: DynamicObject,
  requiredFields: string[]
): string[] => {
  return requiredFields.filter((key) => !requestBody.hasOwnProperty(key));
};
