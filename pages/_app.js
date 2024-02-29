// import { UserProvider } from "../context";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Nav from "../components/Nav";
// import Footer from "../components/Footer";
// import Head from "next/head";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "antd/dist/antd.css";
// import { useRouter } from "next/router";

// function MyApp({ Component, pageProps }) {
//   const router = useRouter();

//   // List of pages where you want to exclude the Footer
//   const pagesWithoutFooter = [
//     "/user/following",
//     "/user/[username]",
//     "/user/post/[_id]",
//     "/post/[_id]",
//     "/post/view/[_id]",

//   ];

//   const shouldShowFooter = !pagesWithoutFooter.includes(router.pathname);

//   return (
//     <UserProvider>
//       <Head />
//       <Nav />
//       <ToastContainer position="top-center" />
//       <Component {...pageProps} />
//       {shouldShowFooter && <Footer />}
//     </UserProvider>
//   );
// }
// export default MyApp;

import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // List of pages where you want to exclude the Footer
  const pagesWithoutFooter = [
    "/user/following",
    // "/user/[username]",
    "/user/post/[_id]",
    "/post/[_id]",
    "/post/view/[_id]",
    "/user/dashboard",
  ];

  // Determine whether to show the Footer based on the current page
  const shouldShowFooter = !pagesWithoutFooter.includes(router.pathname);

  return (
    <UserProvider>
      {/* Set the head metadata for the entire application */}
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

      {/* Render the navigation bar */}
      <Nav />

      {/* Display toast notifications at the top-center */}
      <ToastContainer position="top-center" />

      {/* Render the main content of the page */}
      <Component {...pageProps} />

      {/* Render the Footer if shouldShowFooter is true */}
      {shouldShowFooter && <Footer />}
    </UserProvider>
  );
}

export default MyApp;
