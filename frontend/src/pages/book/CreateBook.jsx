import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Input from "../../components/global/Input";
import { createBook } from "../../services/book";
import { toast } from "react-toastify";

const CreateBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
  });
  const [imgFile, setImgFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImgFile(file);
  };

  const handleChange = (e, name) => {
    setBook({
      ...book,
      [name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fileUpload", imgFile);
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("category", book.category);
    formData.append("description", book.description);

    try {
      const response = await createBook(formData);
      if (response) {
        setBook({
          title: "",
          author: "",
          category: "",
          description: "",
        });
        setImgFile(null);
        toast.success(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container sx={{ m: "1rem" }}>
      <Typography variant="h3" sx={{ mb: 3, color: "var(--primary-color)" }}>
        Create Book
      </Typography>
      <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={10} md={4}>
            <Input
              value={book.title}
              onChange={(e) => handleChange(e, "title")}
              placeholder="Title"
            />
          </Grid>
          <Grid item xs={10} md={4}>
            <Input
              value={book.author}
              onChange={(e) => handleChange(e, "author")}
              placeholder="Author"
            />
          </Grid>
          <Grid item xs={10} md={4}>
            <Input
              value={book.category}
              onChange={(e) => handleChange(e, "category")}
              placeholder="Category"
            />
          </Grid>
          <Grid item xs={10} md={4}>
            <Input
              value={book.description}
              onChange={(e) => handleChange(e, "description")}
              placeholder="Description"
            />
          </Grid>
          <Grid item xs={10} md={6}>
            <Stack direction="row" alignItems="center">
              <label htmlFor="upload-image">
                <Button
                  variant="contained"
                  component="span"
                  sx={{ backgroundColor: "var(--primary-color)" }}
                >
                  Upload
                </Button>
                <input
                  id="upload-image"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleFileUpload}
                />
              </label>
              {imgFile && (
                <Typography fontSize={"14px"} color={"gray"}>
                  {imgFile.name}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={10} md={6}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "var(--primary-color)" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateBook;
