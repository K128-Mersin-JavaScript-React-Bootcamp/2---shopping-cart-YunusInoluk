import { tsCallSignatureDeclaration } from "@babel/types";
import { Layout, List, Checkbox, Select } from "antd";
import { useEffect, useState } from "react";
const { Content, Sider } = Layout;
const { Option } = Select;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isAllFiltersCleared, setIsAllFiltersCleared] = useState(true);
  const [filter, setFilter] = useState({});
  const [selectedSort, setSelectedSort] = useState("mostPopular");

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
  const handleCheckbox = ({ target }) => {
    const filterName = target.name;
    const isChecked = target.checked;
    const newFilter = { ...filter, [filterName]: isChecked };
    let isAllFiltersCleared = true;
    for (const filter in newFilter) {
      if (newFilter[filter]) {
        isAllFiltersCleared = false;
      }
    }
    setIsAllFiltersCleared(isAllFiltersCleared);
    setFilter(newFilter);
    console.log(newFilter);
  };
  const handleFilterData = () => {
    let defaultProductList;
    if (isAllFiltersCleared) {
      defaultProductList = products;
    } else {
      defaultProductList = products.filter(
        (product) => filter[product.category]
      );
      console.log("Done");
    }
    return handleDataSort(defaultProductList);
  };
  const handleCheckedItem = (categoryName) => {
    return filter[categoryName];
  };
  const handleClearFilters = () => {
    setFilter({});
    setIsAllFiltersCleared(true);
  };
  const handleDataSort = (data) => {
    if (selectedSort === "mostPopular") {
      return data.sort((a, b) => (a.rating.rate > b.rating.rate ? -1 : 1));
    } else if (selectedSort === "leastPopular") {
      return data.sort((a, b) => (a.rating.rate > b.rating.rate ? 1 : -1));
    } else if (selectedSort === "highPrice") {
      return data.sort((a, b) => (a.price > b.price ? -1 : 1));
    } else if (selectedSort === "lowPrice") {
      return data.sort((a, b) => (a.price > b.price ? 1 : -1));
    }
  };
  const handleSelect = (selected) => {
    console.log(selected);
    setSelectedSort(selected);
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
                onClick={handleClearFilters}
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
              <Checkbox
                name={item}
                onChange={handleCheckbox}
                checked={handleCheckedItem(item)}
              >
                {item}
              </Checkbox>
            </List.Item>
          )}
        />
      </Sider>
      <Content style={{ padding: "3rem" }}>
        <div className="content-header">
          <Select
            defaultValue="mostPopular"
            style={{ width: 160 }}
            onChange={handleSelect}
          >
            <Option value="mostPopular">Most Popular</Option>
            <Option value="leastPopular">Least Popular</Option>
            <Option value="highPrice">High Price</Option>
            <Option value="lowPrice">Low Price</Option>
          </Select>
          <h4 style={{ marginTop: "0.5rem" }}>
            Showing {handleFilterData().length} products
          </h4>
        </div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
          }}
          dataSource={handleFilterData()}
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
