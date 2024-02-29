import { useContext, useState, useEffect } from "react";
import { Avatar, Card, Button } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Meta } = Card; //<Card.Meta>
const Username = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [user, setUser] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) fetchUser();
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      //   console.log("router.query.username => ", data);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/logo.png";
    }
  };

  return (
    <div className="row col-md-6 offset-md-3">
      {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
      <div className="pt-5 pb-5">
        <Card
          hoverable
          style={{
            textAlign: "center",
            backgroundColor: "#f0f0f0", // Set your desired background color
            transition:
              "background-color 0.3s, transform 0.3s, box-shadow 0.3s", // Add smooth transitions for color, scale, and box shadow changes
            transformOrigin: "center center", // Set the transform origin to the center
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#aec8e8"; // Change to a different color on hover
            e.currentTarget.style.transform = "scale(1.05)"; // Scale up the card on hover
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.3)"; // Add a box shadow on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f0f0f0"; // Reset to the default background color on leave
            e.currentTarget.style.transform = "scale(1)"; // Reset the scale on leave
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"; // Reset box shadow on leave
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={imageSource(user)}
              alt={user.name}
              style={{
                width: "300px",
                height: "250px",
                marginBottom: "6px", // Add margin at the bottom for spacing
              }}
            />
          </div>
          {/* <Meta title={user.name} description={user.about} /> */}
          <Meta
            title={user.name}
            description={
              <span style={{ color: "black", fontStyle: "italic" }}>
                {user.about}
              </span>
            }
          />

          <p className="pt-3 ">Joined {moment(user.createdAt).fromNow()}</p>

          <div className="d-flex justify-content-center">
            <span className="btn btn-sm  ">
              {user.followers && user.followers.length} Followers
            </span>

            <span className="btn btn-sm">
              {user.following && user.following.length} Following
            </span>
          </div>
        </Card>

        <Link href="/user/dashboard" legacyBehavior>
          <a className="d-flex justify-content-center pt-5">
            <Button icon={<RollbackOutlined />} type="primary">
              Go Back
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Username;
