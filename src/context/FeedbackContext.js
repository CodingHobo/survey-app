import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [ feedback, setFeedback ] = useState([
    {
      id: 1,
      text: `There is no backend in Version 1.0.0,
        so your reviews will disappear with page reload. This is
        for demo purposes only, as of now.`,
      rating: 10
    },
    {
      id: 2,
      text: 'Future versions will allow for data storage, among other features.',
      rating: 7
    },
    {
      id: 3,
      text: 'Come back for updates! And thanks for visiting :)',
      rating: 9
    },
  ])

  const [ feedbackEdit, setFeedbackEdit ] = useState({
    item: {},
    edit: false
  })

  // Add feedback item
  const addFeedback = (newFeedback) => {
    newFeedback.id = parseInt(uuidv4())
    setFeedback([newFeedback, ...feedback])
  }

  // Delete feedback item
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    };
  }

  const defaultEditState = {
    item: {},
    edit: false,
    }

  // Set feedback item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  // Update feedback item
  const updateFeedback = (id, updatedItem) => {
    setFeedback(
      feedback.map((item) =>
      (item.id === id
      ? { ...item, ...updatedItem }
      : item))
    )
    setFeedbackEdit(defaultEditState)
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >{children}
    </FeedbackContext.Provider>
  )
};

export default FeedbackContext

/**WORKING CODE FOR DEPLOYMENT,
 * FETCHING FROM FeedbackData rather than json-server */


// import { createContext, useState } from "react";
// import feedbackData from "../data/FeedbackData.js";

// const FeedbackContext = createContext();

// const defaultEditState = {
//   item: {},
//   edit: false,
// };

// export const FeedbackProvider = ({ children }) => {
//   const [feedback, setFeedback] = useState(feedbackData);
//   const [feedbackEdit, setFeedbackEdit] = useState(defaultEditState);

//   // Add feedback
//   const addFeedback = (newFeedback) => {
//     setFeedback([newFeedback, ...feedback]);
//   };

//   // Delete feedback
//   const deleteFeedback = (id) => {
//     if (window.confirm("Are you sure you want to delete?")) {
//       setFeedback(feedback.filter((item) => item.id !== id));
//     }
//   };

//   // Update feedback item
//   const updateFeedback = (id, updItem) => {
//     setFeedback(
//       feedback.map((item) => (item.id === id ? { ...updItem, id } : item))
//     );

//     setFeedbackEdit(defaultEditState);
//   };

//   // Set item to be updated
//   const editFeedback = (item) => {
//     setFeedbackEdit({
//       item,
//       edit: true,
//     });
//   };

//   return (
//     <FeedbackContext.Provider
//       value={{
//         feedback,
//         feedbackEdit,
//         deleteFeedback,
//         addFeedback,
//         editFeedback,
//         updateFeedback,
//       }}
//     >
//       {children}
//     </FeedbackContext.Provider>
//   );
// };

// export default FeedbackContext;