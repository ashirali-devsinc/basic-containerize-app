import React from 'react'
import Form from '../../components/Form';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const params = useParams();

  return <Form formType={"Edit"} id={params.id} />;
};

export default EditPost;
