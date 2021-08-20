import React, { useState, useRef, useEffect } from "react";
import CreateNewPost from "./CreateNew";
import Post from "./Submitted";
import ModifyPost from "./Edit";
import styled from "styled-components";
import { Typography, Button } from "@material-ui/core";

const ButtonAdjuster = styled.div`
  padding-top: 2px;
  padding-left: 8px;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;



const DisplayAllPosts = () => {
  const [title, setTitle] = useState("");
  //   const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [isCreateNewPost, setIsCreateNewPost] = useState(false);
  const [isModifyPost, setIsModifyPost] = useState(false);
  const [editPostId, setEditPostId] = useState("");

  // Initialize useRef
  const getTitle = useRef();
  // const getImage = useRef();
  const getContent = useRef();

  const savePostTitleToState = (event) => {
    setTitle(event.target.value);
  };

  //   const savePostImageToState = (event) => {
  //     setImage(event.target.value);
  //   };

  const savePostContentToState = (event) => {
    setContent(event.target.value);
  };

  const toggleCreateNewPost = () => {
    setIsCreateNewPost(!isCreateNewPost);
  };

  // EDIT POST
  const editPost = (id) => {
    setEditPostId(id);
    console.log(id);
    toggleModifyPostComponent();
  };

  const toggleModifyPostComponent = () => {
    setIsModifyPost(!isModifyPost);
  };

  // DELETE POST
  const deletePost = (id) => {
    const modifiedPost = allPosts.filter((eachPost) => {
      return eachPost.id !== id;
    });
    setAllPosts(modifiedPost);
  };

  // SUBMIT UPDATE POST
  const updatePost = (event) => {
    event.preventDefault();
    const updatedPost = allPosts.map((eachPost) => {
      if (eachPost.id === editPostId) {
        console.log([eachPost.id, editPostId]);
        return {
          ...eachPost,
          title: title || eachPost.title,
          //   image: image || eachPost.image,
          content: content || eachPost.content,
        };
      }
      console.log(eachPost);
      return eachPost;
    });
    setAllPosts(updatedPost);
    toggleModifyPostComponent();
  };

  // SAVE POST
  const savePost = (event) => {
    event.preventDefault();
    const id = Date.now();
    setAllPosts([...allPosts, { title, content, id }]);
    console.log(allPosts);
    setTitle("");
    // setImage("");
    setContent("");
    getTitle.current.value = "";
    // getImage.current.value = "";
    getContent.current.value = "";
    toggleCreateNewPost();
  };

  const name = window.localStorage.getItem("username")

  useEffect(() => {
    console.log(name)
  }, [])

  // const name = window.localStorage.getItem(username)

  if (isCreateNewPost) {
    return (
      <>
        <CreateNewPost
          savePostTitleToState={savePostTitleToState}
          //   savePostImageToState={savePostImageToState}
          savePostContentToState={savePostContentToState}
          getTitle={getTitle}
          //   getImage={getImage}
          getContent={getContent}
          savePost={savePost}
        />
      </>
    );
  } else if (isModifyPost) {
    const post = allPosts.find((post) => {
      return post.id === editPostId;
    });
    return (
      <ModifyPost
        title={post.title}
        // image={post.image}
        content={post.content}
        updatePost={updatePost}
        savePostTitleToState={savePostTitleToState}
        // savePostImageToState={savePostImageToState}
        savePostContentToState={savePostContentToState}
      />
    );
  }

  return (
    <>
      {!allPosts.length ? (
        <CenterDiv>
          <div>{name}</div>
          <div>
            <h3>There is nothing to see here!</h3>
          </div>
        </CenterDiv>
      ) : (
        allPosts.map((eachPost) => {
          return (
            <Post
              id={eachPost.id}
              key={eachPost.id}
              title={eachPost.title}
              // image={eachPost.image}
              content={eachPost.content}
              editPost={editPost}
              deletePost={deletePost}
            />
          );
        })
      )}
      {/* <ButtonAdjuster> */}
      <CenterDiv>
        <Button>
          <button size="large" onClick={toggleCreateNewPost}>
            Create New Post
          </button>
        </Button>
      </CenterDiv>
      {/* </ButtonAdjuster> */}
    </>
  );
};

export default DisplayAllPosts;
