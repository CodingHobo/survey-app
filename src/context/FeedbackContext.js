import { createContext, useState } from "react";
import feedbackData from "../data/FeedbackData.js";

const FeedbackContext = createContext();

const defaultEditState = {
  item: {},
  edit: false,
};

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(feedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState(defaultEditState);

  // Add feedback
  const addFeedback = (newFeedback) => {
    setFeedback([newFeedback, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...updItem, id } : item))
    );

    setFeedbackEdit(defaultEditState);
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

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
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;