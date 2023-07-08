import { Box, Container, Typography } from "@mui/material";
import UserCard from "../../components/user/UserCard";
import { Fragment, useCallback, useEffect, useState } from "react";
import { getUsers } from "../../services/user";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    const response = await getUsers();
    setUsers(response.data?.userBookDetails);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  console.log(users);
  return (
    <Container>
      <Typography variant="h3" sx={{ ml: 3, color: "var(--primary-color)" }}>
        User List
      </Typography>
      <Box sx={{ m: 2, display: "flex", flexWrap: "wrap" }}>
        {users.map((user) => (
          <Fragment key={user.email}>
            <UserCard user={user} borrowedBooks={user.borrowedBooks} />
          </Fragment>
        ))}
      </Box>
    </Container>
  );
};

export default Users;
