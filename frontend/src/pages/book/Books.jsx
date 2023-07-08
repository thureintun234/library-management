import { Box, Typography } from "@mui/material";
import BookCard from "../../components/book/BookCard";
import { Fragment, useCallback, useEffect, useState } from "react";
import { getBooks } from "../../services/book";

const Books = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const response = await getBooks();
    setBooks(response.data?.books);
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ ml: 3, mb: 1, color: "var(--primary-color)" }}
      >
        Book List
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {books.map((book) => (
          <Fragment key={book._id}>
            <BookCard book={book} />
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Books;
