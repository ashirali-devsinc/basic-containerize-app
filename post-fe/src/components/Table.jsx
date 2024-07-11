import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "@material-tailwind/react";
import { deletePost } from "../../services/PostService";

const Table = ({ TABLE_ROWS }) => {
  const TABLE_HEAD = ["Title", "Content", ""];
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const handleEditPost = (id) => {
    navigate(`edit/${id}`);
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Failed to delete the post:", err);
    }
  };

  useEffect(() => {
    setPosts(TABLE_ROWS);
  }, [TABLE_ROWS]);

  return (
    <Card className="h-full w-full overflow-scroll">
      <Typography
        variant="large"
        className="text-4xl font-serif underline underline-offset-4 ml-3 mb-2"
      >
        Posts Table
      </Typography>
      <table className="w-full min-w-max table-fixed text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map(({ id, title, content }, index) => {
            const isLast = index === posts.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {content}
                  </Typography>
                </td>
                <td className={`${classes} flex justify-end`}>
                  <div className="flex gap-x-2 w-1/2">
                    <Button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
                      onClick={() => handleEditPost(id)}
                      fullWidth
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded-lg"
                      onClick={() => handleDeletePost(id)}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default Table;
