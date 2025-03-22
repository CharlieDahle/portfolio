const users = [
    {
      email: "charliedahle161@gmail.com",
      password: "password"
    },
    {
      email: "cdahle@charlie.com",
      password: "password"
    },
    {
      email: "hi",
      password: "password"
    }
  ]
  
  export const getUserByEmail = (email: string) => {
    const found = users.find(user => user.email === email);
    return found;
  }