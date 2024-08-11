import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import api from "../services/api";
import LoginMutation from "../graphql/mutations/login";
import store from "../Store/index";
import Label from "../components/label";
import ErrorMessage from "../components/errorMessage";
import Form, { Input } from "../components/form";
import Button from "../components/button";
import match, { MatchAny } from "../utils/Match";
import UserService from "../services/user.service";
import Background from "../assets/login-background.jpg";

async function validate(email: string, password: string) {
  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be a valid email")
      .min(5, "Email must be at least 5 characters long")
      .max(255),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(255)
  });


  return LoginSchema.validate({ email, password }, { abortEarly: false });
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [tryingToLogin, setTryingToLogin] = useState<boolean>(false);

  useEffect(() => {
    if (UserService.isLoggedIn()) {
      navigate("/lobby");
    }
  }, [navigate]);

  const tryToLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tryingToLogin || !email || !password) {
      return;
    }

    try {
      setTryingToLogin(true);

      await validate(email, password);

      const {
        data: {
          data: {
            login: { status, user, token }
          }
        }
      } = await api.post("/", LoginMutation(email, password));

      match(
        status,
        [
          200,
          () => {
            store.dispatch({ type: "SET_USER", user: { ...user, token } });
            navigate("/lobby");
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
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-96 h-[430px] bg-[#36393f] rounded-lg p-8">
          <div className="text-center mb-3">
            <h2 className="text-white text-2xl font-normal mb-2">
              Welcome Back!
            </h2>
            <h5 className="text-[#72767d] text-lg font-normal">
              We&apos;re excited to see you again!
            </h5>
          </div>

          <Form onSubmit={tryToLogin}>
            <Label className="block text-[#e0e0e0] mb-2">EMAIL</Label>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 rounded bg-[#202225] text-[#e0e0e0] border border-[#333] placeholder-[#72767d]"
              placeholder="Enter your email"
            />

            <Label className="block text-[#e0e0e0] mb-2">PASSWORD</Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-6 p-2 rounded bg-[#202225] text-[#e0e0e0] border border-[#333] placeholder-[#72767d]"
              placeholder="Enter your password"
            />

            <Button
              type="submit"
              className="w-full py-2 bg-[#677bc4] text-white rounded font-bold text-lg hover:bg-[#5467a1]"
            >
              Login
            </Button>
            {errorMessage && <ErrorMessage message={errorMessage} />}
          </Form>

          <div className="text-center mt-4 text-sm">
            <span className="text-[#63676e]">Need an account? </span>
            <Link
              to="/register"
              className="text-[#697ec6] font-bold hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
