import React, { useEffect, useState } from 'react'
import { getPosts } from '../../../services/PostService'
import Table from '../../components/Table';

const PostIndexContainer = () => {
  const [posts, setPosts] = useState([]);

  const  fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return <Table TABLE_ROWS={posts} />;
};

export default PostIndexContainer;
