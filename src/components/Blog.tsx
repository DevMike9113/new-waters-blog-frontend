import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import {
  Box as MuiBox,
  Paper as MuiPaper,
  Card,
  makeStyles,
  // Typography,
  // CardContent,
} from "@material-ui/core";
import Reducer from "./comments/Reducer";
import DisplayAllPosts from "./content/DisplayAllPosts";
// import Context from "./comments/Context";
// import AddComment from "./comments/AddComment";
// import CommentList from "./comments/CommentList";
// import Drawer from "./Drawer";

const useStylesCard = makeStyles((theme) => ({
  root: {
    minWidth: 616,
    maxWidth: 225,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const Box = styled(MuiBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  // background-color: red;
`;

const Wrapper = styled(MuiPaper)`
  display: flex  
  padding: 1rem 3rem;
  margin: 2rem;
  max-width: 85rem;
  border-radius: 50px;
  background-color: black;
  `;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
  max-width: 85rem;
  min-width: 50rem;
`;

const StyledPaper = styled(MuiPaper)`
  display: flex;
  margin: 1rem;
`;

const Blog = () => {
  const classes = useStylesCard();

  const name = window.localStorage.getItem("username");
  const title = window.localStorage.getItem("title");
  const content = window.localStorage.getItem("content");
  const comments = window.localStorage.getItem("items");

  const [items, Dispatch] = useReducer(Reducer, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items") || "{}");
    if (items) {
      Dispatch({ type: "POPULATE", items });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    console.log(name);
    console.log(title);
    console.log(content);
    console.log(comments);
  }, []);

  return (
    <>
      <Box>
        <Wrapper>
          <Row>
            <div>Hi</div>
            <StyledPaper elevation={3}>
              <Card className={classes.root}>
                <DisplayAllPosts />
              </Card>
            </StyledPaper>

            {/* <StyledPaper elevation={3}>
              <Card className={classes.root}>
                <Drawer />
              </Card>
            </StyledPaper> */}
          </Row>
        </Wrapper>
      </Box>
    </>
  );
};

export default Blog;
