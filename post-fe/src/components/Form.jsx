import React, { useEffect, useState } from 'react'
import {
  Card,
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
    <div className="flex justify-center mt-52">
      <Card className="flex items-center border-2 rounded-md w-1/3 shadow-md">
        <Typography className="font-serif mt-1 font-normal text-3xl text-gray-900">
          {formType} Post
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              className="-mb-3 font-medium text-gray-900"
            >
              Title <span className="text-red-500">*</span>
            </Typography>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="lg"
              placeholder="Post X"
              className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-blue-300 focus:border-blue-600 focus:outline-none"
            />
            <Typography
              variant="h6"
              className="-mb-3 font-medium text-gray-900"
            >
              Content <span className="text-red-500">*</span>
            </Typography>
            <input
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              size="lg"
              placeholder="Xst Post"
              className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-blue-300 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="flex justify-center">
            <Button
              className="w-1/2 mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              type="submit"
              fullWidth
            >
              {formType === "Create" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Form;
