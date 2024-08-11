interface User {
  servers?: Server[];
  friends?: Friend[];
  friendRequests?: FriendRequest[];
}

interface Server {
  id: string;
  name: string;
}

interface Friend {
  id: string;
  name: string;
}

interface FriendRequest {
  from: string;
  to: string;
  status: string;
}

interface SaveToLocalStorageParams {
  user: User;
  token: string;
}

export const saveToLocalStorage = ({
  user,
  token
}: SaveToLocalStorageParams): void => {
  const userWithDefaults: User = {
    servers: user.servers || [],
    friends: user.friends || [],
    friendRequests: user.friendRequests || []
  };

  try {
    localStorage.setItem("@discord:user", JSON.stringify(userWithDefaults));
    localStorage.setItem("@discord:token", token); // Zapisz token osobno
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
};

export const getUserFromLocalStorage = (): User | null => {
  const userString = localStorage.getItem("@discord:user");
  return userString ? JSON.parse(userString) : null;
};

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("@discord:token");
};
