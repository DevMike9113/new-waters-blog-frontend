import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import {
  Box as MuiBox,
  Paper as MuiPaper,
  Typography,
  Card as MuiCard,
  makeStyles,
  CardContent,
} from "@material-ui/core";
import CommentList from "./comments/CommentList";
import Context from "./comments/Context";
import Reducer from "./comments/Reducer";
import AddComment from "./comments/AddComment";
import DisplayAllPosts from "./content/DisplayAllPosts";

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
`;

const Wrapper = styled(MuiPaper)`
  display: flex  
  padding: 1rem 3rem;
  margin: 2rem;
  max-width: 85rem;
  `;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  // max-width: 85rem;
  // min-width: 50rem;
`;

const StyledPaper = styled(MuiPaper)`
  display: flex;
  margin: 1rem;
`;

const Card = styled(MuiCard)`
  padding: 1rem;
`;

const ListRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
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
            {/* <StyledPaper elevation={3}> */}
            <Card className={classes.root}>
              <DisplayAllPosts />
            </Card>
            {/* </StyledPaper> */}

            {/* <StyledPaper elevation={3}> */}
            {/* <Typography> */}
              <Context.Provider value={{ items, Dispatch }}>
                <Card className={classes.root}>
                  <CardContent>
                    <ListRow>
                      <div>
                        <AddComment />
                      </div>
                      <div>
                        <CommentList />
                      </div>
                    </ListRow>
                  </CardContent>
                </Card>
              </Context.Provider>
            {/* </Typography> */}
            {/* </StyledPaper> */}
          </Row>
        </Wrapper>
      </Box>
    </>
  );
};

export default Blog;
