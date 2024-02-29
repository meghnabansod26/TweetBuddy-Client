import ParallaxBG from "../../../components/cards/ParallaxBG";
import axios from "axios";
import PostPublic from "../../../components/cards/PostPublic";
import Head from "next/head";
import { Button } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
const SinglePost = ({ post }) => {
  const head = () => (
    <Head>
      <title>TweetBuddy - A social network by devs for devs</title>
      <link rel="icon" type="image/png" href="/images/logo.png" />

      <meta name="description" content={post.content} />
      <meta
        property="og:description"
        content="A social network by developers for other web developers"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TweetBuddy" />
      <meta
        property="og:url"
        content={`http://tweetbuddy.com/post/view/${post._id}`}
      />
      <meta property="og:image:secure_url" content={imageSource(post)} />
    </Head>
  );

  const imageSource = (post) => {
    if (post.image) {
      return post.image.url;
    } else {
      return "/images/default.jpg";
    }
  };

  return (
    <>
      {head()}
      <ParallaxBG url="/images/home.jpg" />

      <div className="container">
        <div className="row pt-5">
          <div className="col-md-1"></div>
          <div className="col-md-6 offset-md-2">
            <PostPublic key={post._id} post={post} />
          </div>
        </div>
      </div>
      <Link href="/" legacyBehavior>
        <a className="d-flex justify-content-center pt-4">
          <Button icon={<RollbackOutlined />} type="primary">
            Go Back
          </Button>
        </a>
      </Link>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);
  // console.log(data);
  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
