import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../components/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKETIO,
  { path: "/socket.io" },
  {
    reconnection: true,
  }
);

const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);
  const [newsFeed, setNewsFeed] = useState([]);

  // useEffect(()=>{
  //   // console.log("SOCKETIO ON JOIN", socket);
  //   socket.on("receive-message", (newMessage)=>{
  //     alert(newMessage);
  //   });
  // }, []);

  useEffect(() => {
    socket.on("new-post", (newPost) => {
      setNewsFeed([newPost, ...posts]);
    });
  }, []);

  const head = () => (
    <Head>
      <title>TweetBuddy - A social network by devs for devs</title>
      <link rel="icon" type="image/png" href="/images/logo.png" />

      <meta
        name="description"
        content="A social network by developers for other web developers"
      />
      <meta
        property="og:description"
        content="A social network by developers for other web developers"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TweetBuddy" />
      <meta property="og:url" content="http://tweetbuddy.com" />
      <meta
        property="og:image:secure_url"
        content="http://tweetbuddy.com/images/default.jpg"
      />
    </Head>
  );

  const collection = newsFeed.length > 0 ? newsFeed : posts;

  return (
    <>
      {head()}
      <ParallaxBG url="/images/home.jpg" />

      <div className="container">
        {/* <button onClick={()=>{
      socket.emit("send-message", "This is Meghna!!!");
    }}>
      Send message

    </button> */}

        <div className="row pt-5">
          {collection.map((post) => (
            <div key={post._id} className="col-md-4">
              <Link href={`/post/view/${post._id}`} legacyBehavior>
                <a>
                  <PostPublic post={post} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get("/posts");
  // console.log(data);
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;
