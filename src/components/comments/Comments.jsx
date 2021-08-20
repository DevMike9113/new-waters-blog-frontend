// import React, { useContext } from "react";
// import ItemsContext from "./items-context";

// interface RemoveItem {
//   type: any;
//   itemToBeDeleted: any;
//   item: any;
// }

// const blah = ""

// const Item = (props: RemoveItem) => {
//   const { itemsDispatch } = useContext();

//   return (
//     <div>
//       <span>{props.item}</span>
//       <button
//         onClick={() =>
//           itemsDispatch(ItemsContext)
//         }
//       >

//       </button>
//     </div>
//   );
// };

// export default Item;

import React, { useContext } from "react";
import Context from "./Context";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { Button, Typography, IconButton } from "@material-ui/core";
import styled from "styled-components";

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
`;

const Comments = ({ item }: { item: string }) => {
  ///const { Dispatch } = useContext(Context);
  const { itemsDispatch } = useContext(Context);
  return (
    <div>
      <CenterDiv>
        <Typography variant="h5">{item}</Typography>
        <Button>
          <IconButton
            onClick={() =>
              itemsDispatch({ type: "REMOVE", itemToBeDeleted: item })
            }
          >
            <ClearOutlinedIcon />
          </IconButton>
        </Button>
      </CenterDiv>
    </div>
  );
};

export default Comments;

// import React, { useContext } from "react";
// import ItemsContext from "./items-context";
// import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
// import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
// import { Button, Typography } from "@material-ui/core";
// import styled from "styled-components";

// const CenterDiv = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 0.25rem;
// `;

// interface RemoveItem {
//   type: any;
//   itemToBeDeleted: any;
// }

// function Item({type: "REMOVE", itemToBeDeleted: item}: RemoveItem) {
//   const { itemsDispatch } = useContext(ItemsContext);

//   return (
//     <div>
//       <CenterDiv>
//         <Typography variant="h3">{item}</Typography>
//         <Button>
//           <button
//             onClick={() =>
//               itemsDispatch(RemoveItem)
//             }
//           >
//             <ClearOutlinedIcon />
//           </button>
//         </Button>
//       </CenterDiv>
//     </div>
//   );
// };

// export default Item;
