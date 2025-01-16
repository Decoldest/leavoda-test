import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { Container, Paper, Typography, Button, Box, Avatar } from "@mui/material";

export default function Dashboard() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const {
    firstName,
    lastName,
    image,
    gender,
    address,
    age,
    company,
    email,
    phone,
  } = user;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div>
      <section>
        <h2>Information</h2>
        <h3> 
          {firstName} {lastName}
        </h3>
        <img src={image} alt="Profile Photo" />
        <div>{gender}</div>
      </section>
      <section>
        <h2>Address</h2>
        {address.address}, {address.city}, {address.stateCode}{" "}
        {address.postalCode}
      </section>
      <section>
        <h2>Employer Information</h2>
        <div>{company.name}</div>

        <div>{company.department}</div>
        <div>{company.title}</div>
      </section>
      <section>
        <h2>Contact Information</h2>
        <h3>
          {firstName} {lastName}
        </h3>
        <div>{phone}</div>
        <div>{email}</div>
      </section>
    </div>
  );
}
