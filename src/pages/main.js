import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import axios from "axios";
import moment from "moment";
import queryString from "query-string";
import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Layout } from "../components";
import { BOT_TRANSACTION_URL } from "../constants";

const Main = () => {
  const history = useHistory();
  const location = useLocation();
  const inputSearch = useRef(null);
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    page: 1,
    bet: [],
    sort: "descend",
    q: "",
    filter: 50
  });

  useEffect(() => {
    getTransaction();
    initFilter();
  }, []);

  useEffect(() => {
    getTransaction();
    initFilter();
  }, [location.search]);

  async function getTransaction() {
    try {
      setIsLoading(true);
      const parsed = queryString.parse(location.search);
      const {
        data: { data },
      } = await axios.get(`${BOT_TRANSACTION_URL}`, { params: parsed });
      setTransaction(data);
    } catch (error) {
      console.log("Main Page | Error while call getTransaction()", error);
    }
    setIsLoading(false);
  }

  function initFilter() {
    const parsed = queryString.parse(location.search);
    let tmp = {
      bet: [],
      q: "",
      sort: "descend",
      page: 1,
      limit: 50
    };
    if (parsed?.bet) {
      tmp.bet = parsed.bet.split(",");
    }
    if (parsed?.sort_order) {
      tmp.sort = parsed.sort_order;
    }
    if (parsed?.q) {
      tmp.q = parsed.q;
    }
    if (parsed?.page) {
      tmp.page = parsed.page;
    }
    if (parsed?.limit) {
        tmp.limit = parsed.limit;
      }
    setFilter(tmp);
  }

  function handleSearch(q) {
    setFilter((prev) => ({ ...prev, q }));
    const parsed = queryString.parse(location.search);
    const stringified = queryString.stringify({ ...parsed, q });
    history.push("?" + stringified);
  }

  function handleTableChange(pagination, x, sort, extra) {
    const tmp = {
      bet: x?.bet?.length ? x.bet.join() : null,
      sort_order: sort.order,
      q: filter.q,
      limit: filter.limit,
      page: pagination.current,
      limit: pagination.pageSize
    };
    const stringified = queryString.stringify(tmp);
    history.push("?" + stringified);
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            ref={inputSearch}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                handleSearch(inputSearch.current.state.value);
              }}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                handleSearch("");
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filter.q ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "แทงฝั่ง",
      dataIndex: "bet",
      key: "bet",
      filteredValue: filter.bet,
      filters: [
        { text: "PLAYER", value: "PLAYER" },
        { text: "BANKER", value: "BANKER" },
      ],
    },
    {
      title: "โต๊ะ",
      dataIndex: "table_title",
      key: "table_title",
    },
    {
      title: "ผู้ชนะ",
      key: "winner",
      render: (_, record) => JSON.parse(record.result).winner,
    },
    {
      title: "สร้างเมื่อ",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => moment(data).locale("th").format("D MMM YY HH:mm:ss"),
      sorter: (a, b) =>
        moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf(),
      sortDirections: ["ascend", "descend", "ascend"],
      sortOrder: filter.sort,
    },
  ];

  return (
    <Layout>
      <Table
        rowKey="id"
        onChange={handleTableChange}
        dataSource={transaction}
        columns={columns}
        loading={isLoading}
        pagination={{ pageSize: filter.limit }}
      />
      ;
    </Layout>
  );
};

export default Main;
