/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
import { borrowBook as borrowBookService } from "../../services/book";
import { useState } from "react";
import { toast } from "react-toastify";

const BookCard = ({ book }) => {
  const { title, description, category, photo, available } = book;
  const imgUrl = `http://localhost:3001/api/v1/uploads/${photo}`;
  const [isAvailable, setIsAvailable] = useState(available);

  const handleBorrowBook = async () => {
    try {
      const response = await borrowBookService(book?._id);
      toast.success(response.data.message);
      setIsAvailable(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <Card sx={{ maxWidth: 300, minWidth: 300, m: 3 }}>
      <CardMedia sx={{ height: 160 }} image={imgUrl} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title} {"  "}{" "}
          <Chip
            size="small"
            label={category}
            variant="outlined"
            sx={{ backgroundColor: "var(--primary-color)", color: "white" }}
          />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="small"
          sx={{ color: "var(--primary-color)" }}
          disabled={!isAvailable}
          title={!isAvailable ? "Unavailable" : ""}
          onClick={handleBorrowBook}
        >
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
