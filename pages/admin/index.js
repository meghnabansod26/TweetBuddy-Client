import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import AdminRoute from "../../components/routes/AdminRoute";
import { useRouter, userRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import renderHTML from "react-render-html";
import { DeleteOutlined } from "@ant-design/icons";

const Admin = () => {
  const [state, setState] = useContext(UserContext);
  // posts
  const [posts, setPosts] = useState([]);

  // route
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token]);

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      // console.log("user posts => ", data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
      toast.error("Post deleted");
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1 style={{ color: "white" }}>Admin</h1>
          </div>
        </div>

        {/* <div className="row py-4">
  <div className="col-md-8 offset-md-2">
    {posts &&
      posts.map((post) => (
        <div key={post._id} className="d-flex justify-content-between align-items-center mb-3">
          <div>{renderHTML(post.content)} 
        </div>
       
          <div onClick={() => handleDelete(post)} className="text-danger" style={{ cursor: 'pointer' }}>
            <DeleteOutlined />   
          </div>
       
        </div>
     
      ))}
  </div>
</div> */}
        <div className="row py-4">
          <div className="col-md-8 offset-md-2">
            <table className="table table-bordered ">
              <thead className="text-center">
                <tr>
                  <th>Post List</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {posts &&
                  posts.map((post) => (
                    <tr key={post._id}>
                      <td>{renderHTML(post.content)} </td>
                      <td className="text-center">
                        <div
                          onClick={() => handleDelete(post)}
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                        >
                          <DeleteOutlined />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
