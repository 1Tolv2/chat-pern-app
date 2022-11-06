import styled from "styled-components";
import { theme } from "../../theme";

const { colors } = theme;

const Container = styled.li`
  width: 100%;
  &:hover {
    background-color: #34363d;
  }
`;

const ProfileImage = styled.img`
  position: absolute;
  left: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const MessageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 1.0625rem;
  min-height: 2.75rem;
  padding: 0.125rem 48px 0.125rem 72px;
`;

const Heading = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.375rem;
  display: inline;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
`;

const DateDivider = styled.div`
  position: relative;

  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  margin-left: 1rem;
  margin-right: 0.875rem;
  border-top: thin solid ${colors.grey};
`;

const DateText = styled.span`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2px 4px;
  background-color: ${colors.darkGrey};
  color: ${colors.lightGrey};
  line-height: 13px;
  font-size: 13px;
  margin-top: -1px;
  font-weight: 700;
  border-radius: 8px;
  width: fit-content;
`;

export {
  Container,
  ProfileImage,
  MessageWrapper,
  Heading,
  DateDivider,
  DateText,
};
