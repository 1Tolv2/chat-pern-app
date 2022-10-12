import React, { useState, useContext, useEffect } from "react";
import { ModalContext } from "../../Layout";
import * as s from "./styles";
import * as t from "../../theme/typography";
import Paragraph from "../../atoms/Paragraph";
import SignForm from "../../molecules/SignForm";
import { theme } from "../../theme";

const { colors } = theme;

type Props = {};

const UserModal = (props: Props) => {
  const [formType, setFormType] = useState<"login" | "register">("login");
  const { modalVisible } = useContext(ModalContext);

  const toggleForm = () => {
    setFormType(formType === "login" ? "register" : "login");
  };

  return (
    <>
      {modalVisible && (
        <s.Wrapper>
          <s.Container>
            <SignForm type={formType}>
              <Paragraph
                color="lightGrey"
                editStyle={{ fontSize: "14px", mt: "4px", fontWeight: "700" }}
              >
                {formType === "register" ? (
                  <span style={{ color: colors.blue }} onClick={toggleForm}>
                    {"Already have an account?"}
                  </span>
                ) : (
                  <>
                    {"Need an account? "}
                    <span style={{ color: colors.blue }} onClick={toggleForm}>
                      {"Register"}
                    </span>
                  </>
                )}
              </Paragraph>
            </SignForm>
          </s.Container>
        </s.Wrapper>
      )}
    </>
  );
};

export default UserModal;
