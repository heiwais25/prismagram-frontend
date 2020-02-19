import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";
import { ME_QUERY } from "../../SharedQueries";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  location,
  caption,
  createdAt
}) => {
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [selfComments, setSelfComments] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const comment = useInput("");

  const { data: meQuery } = useQuery(ME_QUERY);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });

  const slide = () => {
    const totalFiles = files.length;
    let target = currentItem + 1;
    if (target === totalFiles) {
      target = 0;
    }
    setTimeout(() => setCurrentItem(target), 3000);
  };

  useEffect(() => {
    slide();
  }, [currentItem]);

  const toggleLike = async () => {
    toggleLikeMutation();
    if (localIsLiked) {
      setLocalIsLiked(false);
      setLocalLikeCount(localLikeCount - 1);
    } else {
      setLocalIsLiked(true);
      setLocalLikeCount(localLikeCount + 1);
    }
  };

  const onKeyPress = e => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
      setSelfComments([
        ...selfComments,
        {
          id: selfComments.length + comments.length + 1,
          text: comment.value,
          user: { username: meQuery.me.username }
        }
      ]);
      addCommentMutation();
      comment.setValue("");
    }
  };

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={localLikeCount}
      isLiked={localIsLiked}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      location={location}
      caption={caption}
      setIsLiked={setLocalIsLiked}
      setLikeCount={setLocalLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;
