import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../api/comments";

const useComments = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: comments,
  } = useQuery("comments", getComments);

  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });

  const updateMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });

  return {
    isLoading,
    isError,
    comments,
    addMutation,
    deleteMutation,
    updateMutation,
  };
};

export default useComments;
