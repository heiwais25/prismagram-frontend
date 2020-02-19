import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Button from "./Button";
import FollowButton from "./FollowButton";
import { Link } from "react-router-dom";

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EAVatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;

const UserCard = ({ username, isFollowing, url, isSelf, id }) => (
  <Card>
    <EAVatar url={url} size="md" />
    <ELink to={`/${username}`}>
      <FatText text={username} />
    </ELink>
    {!isSelf && <FollowButton isFollowing={isFollowing} id={id} />}
  </Card>
);

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default UserCard;
