import React, { useState, useEffect } from "react";
import { Link as RedirectLink } from "react-router-dom";
import * as S from "./styles";
import * as yup from "yup";
import RegisterMutation from "../../graphql/mutations/register";
import api from "../../services/api";
import store from "../../Store/index";
import Label from "../../components/label/label";
import ErrorMessage from "../../components/errormessage/errorMessage";
import Form, { Input } from "../../components/form/form";
import Button from "../../components/button/button";
import match, { MatchAny } from "../../utils/Match";
import formatYupError from "../../utils/FormatYupError";
import UserService from "../../services/user.service";


async function validate(
  username: string,
  email: string,
  password: string
): Promise<any> {
  const RegisterSchema = yup.object().shape({
    username: yup
      .string()
      .min(6, "Username must be at least 5 characters long")
      .max(255),
    email: yup
      .string()
      .email("Email must be a valid email")
      .min(6, "email must be at least 5 characters long")
      .max(255),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(255)
  });

  return await RegisterSchema.validate(
    { username, email, password },
    { abortEarly: false }
  );
}

export default function Register({ history }:any): JSX.Element {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tryingToRegister, setTryingToRegister] = useState(false);

  useEffect(() => {
    if (UserService.isLoggedIn()) {
      history.push("/lobby");
    }
  }, []);

  const register = async (event: { preventDefault: () => void; }): Promise<void> => {
    event.preventDefault();

    if (tryingToRegister || !email || !username || !password) {
      return;
    }

    try {
      setTryingToRegister(true);

      await validate(username, email, password);

      const {
        data: {
          data: {
            register: { status, user, token }
          }
        }
      } = await api.post("/", RegisterMutation(username, email, password));
      match(
        status,
        [
          201,
          () => {
            store.dispatch({ type: "SET_USER", user, token });
            history.push("/lobby");
          }
        ],
        [422, () => setErrorMessage("Email is already being used")],
        [
          MatchAny,
          () => setErrorMessage("Something went wrong, try again later")
        ]
      );
    } catch (ex) {
      console.error(ex);
      setErrorMessage(formatYupError(ex as yup.ValidationError)[0].message);
    } finally {
      setTryingToRegister(false);
    }
  }


  return (
    <S.Container>
      <S.RegisterFormContainer>
        <S.WelcomeMessageContainer>
          <S.WelcomeBackMessage>Create an Account!</S.WelcomeBackMessage>
        </S.WelcomeMessageContainer>

        <Form onSubmit={register}>
          <Label>Email</Label>
          <Input
            type="email"
            onChange={(e: any): void => setEmail(e.target.value)}
          />

          <Label>Username</Label>
          <Input
            type="text"
            onChange={(e: any): void => setUsername(e.target.value)}
          />

          <Label>Password</Label>
          <Input
            type="password"
            onChange={(e: any): void => setPassword(e.target.value)}
          />

          <Button
            style={{
              marginTop: "30px",
              fontSize: "16px",
              backgroundColor: "#677bc4",
              height: "40px"
            }}
          >
            Continue
          </Button>
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Form>

        <S.LinkContainer>
          <RedirectLink to="/login" style={{ textDecoration: "none" }}>
            <S.Link>Already have an account? </S.Link>
          </RedirectLink>
        </S.LinkContainer>

        <S.LinkContainer>
          <S.Info>
            By registering, you agree to Discord's
            <S.InfoLink> Terms of service</S.InfoLink> and{" "}
            <S.InfoLink>Privacy Policy.</S.InfoLink>
          </S.Info>
        </S.LinkContainer>
      </S.RegisterFormContainer>
    </S.Container>
  );
}
