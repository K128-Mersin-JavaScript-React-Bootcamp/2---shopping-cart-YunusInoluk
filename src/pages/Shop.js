import { Layout, List, Checkbox } from "antd";

import { useEffect, useState } from "react";
const { Content, Sider } = Layout;
export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    fetch("https://api.npoint.io/2443c7a7d9e0b37aec99/products")
      .then((res) => res.json())
      .then((data) => handleData(data));
  }, []);
  const handleData = (data) => {
    console.log(data);
    setProducts(data);
    handleCatList(data);
  };
  const handleCatList = (data) => {
    const categorySet = new Set();
    data.forEach((d) => {
      categorySet.add(d.category);
    });
    setCategoryList(categorySet);
    console.log(categorySet);
  };
  return (
    <Layout>
      <Sider theme={"light"} style={{ flex: "0 0 300px", maxWidth: "300px" }}>
        <List
          header={
            <div>
              <h2 style={{ display: "inline-block", marginRight: "15px" }}>
                Filters
              </h2>
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                Clear filters
              </button>
              <h3>Categories</h3>
            </div>
          }
          bordered
          dataSource={categoryList}
          renderItem={(item) => (
            <List.Item>
              <Checkbox name={item}>{item}</Checkbox>
            </List.Item>
          )}
        />
      </Sider>
      <Content style={{ padding: "3rem" }}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <div className="card">
                <img alt="example" src={item.image} />
                <h3>{item.title}</h3>
                <span style={{ marginRight: "20px" }}>
                  Price: <strong>{item.price}$</strong>
                </span>
                <span>
                  Rate: <strong>{item.rating.rate}</strong>
                </span>
              </div>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
}
