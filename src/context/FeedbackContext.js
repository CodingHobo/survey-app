import { createContext, useState, useEffect } from 'react';
import { doc, collection, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../utils/firebaseConfig.js'

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
    setIsLoading(true);
    try {
        const feedbackCollection = collection(db, 'feedback');
        const snapshot = await getDocs(feedbackCollection);

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        setFeedback(data);
    } catch (error) {
        console.error("Error fetching feedback: ", error);
    }
    setIsLoading(false);
  }


  // Add feedback item
  const addFeedback = async (newFeedback) => {
    try {
      const docRef = await addDoc(collection(db, "feedback"), newFeedback);
      // Add the newly created feedback item to the state.
      setFeedback([{ id: docRef.id, ...newFeedback }, ...feedback]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  // Delete feedback
  const deleteFeedback = async (id) => {
      if (window.confirm('Are you sure you want to delete?')) {
          try {
              await deleteDoc(doc(db, "feedback", id));
              setFeedback(feedback.filter((item) => item.id !== id));
          } catch (e) {
              console.error("Error deleting document: ", e);
          }
      }
  }


  // Update feedback item
  const updateFeedback = async (id, updatedItem) => {
    try {
        const feedbackRef = doc(db, "feedback", id);
        await updateDoc(feedbackRef, updatedItem);
        setFeedback(
            feedback.map((item) =>
                item.id === id ? { ...item, ...updatedItem } : item
            )
        );
        setFeedbackEdit(defaultEditState);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
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