import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [ feedback, setFeedback ] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [ feedbackEdit, setFeedbackEdit ] = useState({
    item: {},
    edit: false
  })

  const defaultEditState = {
    item: {},
    edit: false,
    }

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch('feedback?_sort=id&_order=desc');
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  // Add feedback item
  const addFeedback = async (newFeedback) => {
    const response = await fetch('feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    });

    const data = await response.json()

    setFeedback([data, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = async (id, updatedItem) => {
    const response = await fetch(`feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })

    const data = await response.json()

    setFeedback(
      feedback.map((item) =>
      (item.id === id
      ? { ...item, ...data }
      : item))
    )
    setFeedbackEdit(defaultEditState)
    fetchFeedback()
  }

  // Set feedback item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
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