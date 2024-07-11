import { useNavigate } from "react-router-dom"
import PostIndexContainer from "./pages/IndexPost/PostIndexContainer"
import { Button } from "@material-tailwind/react";

function App() {
  const navigate = useNavigate();
  const handleAddPost = () => {
    navigate("new");
  };

  return (
    <div className="flex flex-col items-end">
      <PostIndexContainer />
      <Button
        className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 m-2 rounded-lg w-[10%]"
        onClick={() => handleAddPost()}
      >
        Add Post
      </Button>
    </div>
  );
}

export default App
