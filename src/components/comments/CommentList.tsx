import React, { useContext, useEffect } from "react";
import ItemsContext from "./Context";
import Item from "./Comments";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const CommentStyling = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const Name = styled.div`
  // display: flex;
  // justify-content: flex-start;
`;

const CommentList = () => {
  const { items } = useContext(ItemsContext);
  const name = window.localStorage.getItem("username");

  useEffect(() => {
    console.log(name);
  }, []);

  

  return (
    <div className="itemsContainer">
      <ul>
        <CommentStyling>
          {items.map((item) => (
            <Name>
              <Typography variant="h6">{name}</Typography>
              <Item key={item} item={item} />
            </Name>
          ))}
        </CommentStyling>
      </ul>
    </div>
  );
};

export default CommentList;
