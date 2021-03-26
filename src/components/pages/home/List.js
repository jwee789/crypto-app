import React, { useEffect, useState } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

import Coin from "./Coin";

import "./List.css";

const List = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    const data = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
    );

    setCryptoData(data.data);
  };

  const renderCoinData = () => {
    console.log(cryptoData);
    return cryptoData.map((coin, index) => {
      return <Coin key={index} coinData={cryptoData[index]} />;
    });
  };

  return (
    <div className="coin-list">
      <ReactBootStrap.Table variant="dark">
        <thead>
          <tr>
            <th>
              <span>Name</span>
            </th>
            <th>Price</th>
            <th>24h %</th>
            <th>Market Cap</th>
            <th>Total supply</th>
          </tr>
        </thead>
        {cryptoData.length > 0 ? <tbody>{renderCoinData()}</tbody> : null}
        <tbody>{renderCoinData()}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default List;
