import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/loginstyles.ts/login";
import Register from "./pages/registerstyles/register";
import Lobby from "./pages/lobbystyles.ts/lobby";
import Landing from "./pages/landing";
import api from "./services/api";
import UserQuery from "./graphql/queries/user";
import store from "./Store/index";
import Maybe from "./types/Maybe.d";
import NotFound from "./pages/notFound";
import UserService from "./services/user.service";

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  return UserService.isLoggedIn() ? element : <Navigate to="/login" replace />;
};

function RoutesComponent() {
  const refreshUser = async (): Promise<void> => {
    const _id: Maybe<string> = UserService.getUserId();

    if (!_id) {
      return;
    }

    try {
      // Upewnij się, że UserQuery(_id) zwraca poprawne zapytanie
      const response = await api.post("/user", UserQuery(_id)); 
      const { user } = response.data.data.user;

      store.dispatch({
        type: "SET_USER",
        user
      });
    } catch (ex) {
      console.error("Failed to refresh user:", ex);
    }
  };

  React.useEffect(() => {
    refreshUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/lobby" element={<PrivateRoute element={<Lobby />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesComponent;
