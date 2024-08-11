import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import RegisterMutation from '../graphql/mutations/register';
import api from '../services/api';
import store from '../Store/index';
import Label from '../components/label';
import ErrorMessage from '../components/errorMessage';
import Form, { Input } from '../components/form';
import Button from '../components/button';
import formatYupError from '../utils/FormatYupError';
import UserService from '../services/user.service';
import { AxiosError } from 'axios';  // Ensure this is imported correctly

// Validation schema
const registerSchema = yup.object().shape({
  username: yup.string().min(5, "Username must be at least 5 characters long").max(255).required(),
  email: yup.string().min(5, "Email must be at least 5 characters long").max(255).email("Email must be a valid email").required(),
  password: yup.string().min(6, "Password must be at least 6 characters long").max(255).required()
});

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tryingToRegister, setTryingToRegister] = useState(false);

  useEffect(() => {
    if (UserService.isLoggedIn()) {
      navigate("/lobby");
    }
  }, [navigate]);

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tryingToRegister || !email || !username || !password) {
      return;
    }

    try {
      setTryingToRegister(true);
      await registerSchema.validate({ username, email, password }, { abortEarly: false });

      const response = await api.post("/", RegisterMutation(username, email, password));
      const { status, user, token } = response.data.data.register;

      if (status === 201) {
        store.dispatch({ type: "SET_USER", user, token });
        navigate("/lobby");
      } else if (status === 422) {
        setErrorMessage("Email is already being used");
      } else {
        setErrorMessage("Something went wrong, try again later");
      }
    } catch (ex: unknown) {
      if (ex instanceof yup.ValidationError) {
        const errors = formatYupError(ex);
        setErrorMessage(errors.length ? errors[0].message : "Validation error");
      } else if (ex instanceof Error && (ex as AxiosError).isAxiosError) {
        const axiosError = ex as AxiosError;
        setErrorMessage(`Registration failed: ${axiosError.message}`);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setTryingToRegister(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8">
        <div className="mb-4 text-center">
          <h2 className="text-white text-2xl">Create an Account!</h2>
        </div>
        <Form onSubmit={register}>
          <Label>Email</Label>
          <Input 
            type="email" 
            value={email} // Dodano `value`
            onChange={(e) => setEmail(e.target.value)} 
          />

          <Label>Username</Label>
          <Input 
            type="text" 
            value={username} // Dodano `value`
            onChange={(e) => setUsername(e.target.value)} 
          />

          <Label>Password</Label>
          <Input 
            type="password" 
            value={password} // Dodano `value`
            onChange={(e) => setPassword(e.target.value)} 
          />

          <Button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Continue
          </Button>
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-indigo-500 hover:underline">
            Already have an account?
          </Link>
        </div>

        <div className="mt-2 text-center text-gray-600 text-sm">
          By registering, you agree to Discord&apos;s{" "}
          <span className="text-indigo-500 cursor-pointer hover:underline">
            Terms of service
          </span>{" "}
          and{" "}
          <span className="text-indigo-500 cursor-pointer hover:underline">
            Privacy Policy.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
