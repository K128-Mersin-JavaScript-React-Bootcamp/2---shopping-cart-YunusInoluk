import React from "react";
import { Typography } from "antd";
import "./home.css";
const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "75px", fontSize: "22px" }}>
      <Title>Better clothing for the planet</Title>
      <Paragraph style={{ marginTop: "20px" }}>
        Deserunt in fugiat et cupidatat. Exercitation Lorem ad duis aute.
        <br />
        Commodo est officia sit magna proident dolore id ex cupidatat fugiat
        fugiat.
      </Paragraph>
      <img
        style={{ marginTop: "30px" }}
        src="https://picsum.photos/900/500"
        alt=""
      ></img>
    </div>
  );
};

export default Home;
