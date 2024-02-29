import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import { toast } from "react-toastify";
import Post from "../../components/cards/Post";
import Link from "next/link";
import { Button } from "antd";
import { RollbackOutlined } from "@ant-design/icons";

const PostComments = () => {
  const [post, setPost] = useState({});
  const router = useRouter();
  const _id = router.query._id;

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeComment = async (postId, comment) => {
    // console.log(postId, comment);
    let answer = window.confirm("Are you sure?");
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      console.log("comment removed", data);
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1 style={{ color: "white" }}>TweetBuddy</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-1"></div>
        <div className="container col-md-6 offset-md-2 pt-5">
          <Post post={post} commentsCount={100} removeComment={removeComment} />
        </div>
      </div>

      <Link href="/user/dashboard" legacyBehavior>
        <a className="d-flex justify-content-center p-5">
          <Button icon={<RollbackOutlined />} type="primary">
            Go Back
          </Button>
        </a>
      </Link>
    </div>
  );
};

export default PostComments;
