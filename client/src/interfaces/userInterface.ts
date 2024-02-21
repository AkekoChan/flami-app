interface UserInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  date: Date;
  metadata: {
    favorite_sport: string;
    origin: string;
    intent: string;
  };
}

export default UserInterface;
