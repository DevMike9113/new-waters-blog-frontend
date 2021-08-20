import { Typography } from "@material-ui/core";
import styled from "styled-components";

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonPadding = styled.div`
  padding: 2px;
`;

const Padding = styled.div`
  padding: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100px;
  padding: 5px;
`;

const Post = (props: any) => {
  const { title, content, editPost, id, deletePost } = props;
  return (
    <>
      <Padding>
        <section>
          <Typography variant="h4" display="block" align="center">
            {title}
          </Typography>
          {/* <p>{image}</p> */}
          <Typography variant="body1" display="block" align="center">
            {" "}
            {content}
          </Typography>
          <div>
            <CenterDiv>
              <ButtonPadding>
                {/* <ButtonDiv> */}
                <button onClick={() => editPost(id)}>Edit</button>
              </ButtonPadding>
              <ButtonPadding>
                {/* </ButtonDiv> */}
                {/* <ButtonDiv> */}
                <button onClick={() => deletePost(id)}>Delete</button>
                {/* </ButtonDiv> */}
              </ButtonPadding>
            </CenterDiv>
          </div>
        </section>
      </Padding>
    </>
  );
};
export default Post;
