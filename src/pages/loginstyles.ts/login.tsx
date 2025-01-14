import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import api from "../../services/api";
import LoginMutation from "../../graphql/mutations/login";
import store from "../../Store/index";
import Label from "../../components/label/label";
import ErrorMessage from "../../components/errormessage/errorMessage";
import Form, { Input } from "../../components/form/form";
import Button from "../../components/button/button";
import match, { MatchAny } from "../../utils/Match";
import UserService from "../../services/user.service";
import * as S from "./styles";

async function validate(email: string, password: string) {
  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be a valid email")
      .min(5, "email must be at least 5 characters long")
      .max(255),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(255)
  });

  return await LoginSchema.validate({ email, password }, { abortEarly: false });
}

export default function Login({ history }:any) {
  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tryingToLogin, setTryingToLogin] = useState(false);

  useEffect(() => {
    if (UserService.isLoggedIn()) {
      history.push("/lobby");
    }
  }, []);

  const tryToLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (tryingToLogin || !email || !password) {
      return;
    }

    try {
      setTryingToLogin(true);

      await validate(email, password);

      console.log("merda");

      const {
        data: {
          data: {
            login: { status, user, token }
          }
        }
      } = await api.post("/", LoginMutation(email, password));

      console.log(status, user, token);

      match(
        status,
        [
          200,
          () => {
            store.dispatch({ type: "SET_USER", user: { ...user, token } });
            history.push("/lobby");
          }
        ],
        [401, () => setErrorMessage("Invalid credentials")],
        [
          MatchAny,
          () => setErrorMessage("Something went wrong, try again later")
        ]
      );
    } catch (e) {
      setErrorMessage("Email and password must be valid");
    } finally {
      setTryingToLogin(false);
    }
  };

  return (
    <S.Container>
      <S.LoginFormContainer>
        <S.WelcomeMessageContainer>
          <S.WelcomeBackMessage>Welcome Back!</S.WelcomeBackMessage>
          <S.HappyToSeeYouAgainMessage>
            We're excited to see you again!
          </S.HappyToSeeYouAgainMessage>
        </S.WelcomeMessageContainer>

        <Form onSubmit={tryToLogin}>
          <Label>EMAIL</Label>
          <Input type="email" onChange={(e: { target: { value: any; }; }) => setEmail(e.target.value)} />

          <Label>PASSWORD</Label>
          <Input
            type="password"
            onChange={(e: { target: { value: any; }; }) => setPassword(e.target.value)}
          />

          <Button
            style={{
              marginTop: "30px",
              fontSize: "16px",
              backgroundColor: "#677bc4",
              height: "40px"
            }}
          >
            Login
          </Button>
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Form>

        <S.RegisterLinkContainer>
          <S.NeedAnAccount>Need an account? </S.NeedAnAccount>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <S.RegisterLink>Register</S.RegisterLink>
          </Link>
        </S.RegisterLinkContainer>
      </S.LoginFormContainer>
    </S.Container>
  );
}
