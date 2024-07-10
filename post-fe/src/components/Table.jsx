import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import { deletePost } from "../../services/PostService";

const Table = ({ TABLE_ROWS }) => {
  const TABLE_HEAD = ["Title", "Content", "", ""];
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
      <table className="w-full min-w-max table-auto text-left">
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
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                    onClick={() => handleEditPost(id)}
                  >
                    Edit
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                    onClick={() => handleDeletePost(id)}
                  >
                    Delete
                  </Typography>
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
