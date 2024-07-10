import React, { useEffect, useState } from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { createPost, getPost, updatePost } from '../../services/PostService';
import { useNavigate } from 'react-router-dom';

const Form = ({formType, id = 0}) => {
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const fetchPost = async () => {
    const response = await getPost(id);
    setPost(response);
    setTitle(response.title);
    setContent(response.content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content };

    try {
      const response =
        formType === "Create"
          ? await createPost(newPost)
          : await updatePost(post.id, newPost);

      await navigate("/");
    } catch (err) {
      formType === "Create"
        ? console.error("Error creating post:", error)
        : console.error("Error updating post:", error);
    }

    setTitle("");
    setContent("");
  };


  useEffect(() => {
      if (formType === "Edit") {
        fetchPost();
      }
  }, []);

  return (
    <Card color="transparent" shadow={false}>
      <Typography color="gray" className="mt-1 font-normal">
        {formType} Post
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Title
          </Typography>
          <Input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="lg"
            placeholder="Post X"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Content
          </Typography>
          <Input
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            size="lg"
            placeholder="Xst Post"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button className="mt-6" type="submit" fullWidth>
          {formType === "Create" ? "Create" : "Update"}
        </Button>
      </form>
    </Card>
  );
}

export default Form;
