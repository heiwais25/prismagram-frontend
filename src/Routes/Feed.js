import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Helmet from "react-helmet";
import Loader from "../Components/Loader";
import styled from "styled-components";
import Post from "../Components/Post";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      locations
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      caption
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  console.log(data, loading);
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
            caption={post.caption}
            location={post.locations}
          />
        ))}
    </Wrapper>
  );
};
