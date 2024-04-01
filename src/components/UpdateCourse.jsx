/* eslint-disable react/prop-types */
import { Button, Card, Switch, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const UpdateCourse = ({ course, setCourse }) => {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [isPublished, setIsPublished] = useState(course.published);
  const update = async () => {
    const res = await axios.put(
      `http://localhost:3000/admin/courses/${course._id}`,
      {
        title,
        description,
        price,
        published: isPublished,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setCourse(res.data.data);
  };
  return (
      <Card
        style={{ width: 500, padding: "20px" }}
        variant="outlined"
      >
        <Typography>Edit Course</Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginTop: "10px" }}
          variant="outlined"
          label="Title"
          fullWidth={true}
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth={true}
          style={{ marginTop: "10px" }}
          variant="outlined"
          label="Description"
        />
        <TextField
          fullWidth={true}
          value={price}
          variant="outlined"
          label="Price"
          style={{ marginTop: "10px" }}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Switch
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <Typography>Published</Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            style={{ margin: 5 }}
            onClick={() => {
              update();
            }}
            variant="contained"
          >
            Update
          </Button>
        </div>
      </Card>
  );
};

export default UpdateCourse;