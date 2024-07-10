import { useNavigate } from "react-router-dom"
import PostIndexContainer from "./pages/IndexPost/PostIndexContainer"

function App() {
  const navigate = useNavigate();
  const handleAddPost = () => {
    navigate("new");
  };

  return (
    <>
      <button onClick={handleAddPost}>Add Post</button>
      <PostIndexContainer />
    </>
  );
}

export default App
