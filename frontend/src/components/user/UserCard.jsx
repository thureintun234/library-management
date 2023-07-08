/* eslint-disable react/prop-types */
import { Card, CardContent, Chip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    minWidth: 260,
    marginTop: "2rem",
    marginRight: "1rem",
    backgroundColor: "#3094c9 !important",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  content: {
    padding: "1.5rem",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "white",
  },
  subtitle: {
    color: "var(--primary-color-blur)",
  },
  bookList: {
    marginTop: ".2rem",
    marginLeft: "1rem",
    color: "#ebebeb",
  },
});

const UserCard = ({ user, borrowedBooks }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h5" className={classes.title}>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Borrowed Books:
        </Typography>
        <ul className={classes.bookList}>
          {borrowedBooks.slice(0, 5).map((book) => (
            <li key={book.id}>
              {book.title}{" "}
              <Chip
                label={book.category}
                sx={{ backgroundColor: "white", color: "var(--primary-color)" }}
                size="small"
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UserCard;
