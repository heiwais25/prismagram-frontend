import React from "react";
import useInput from "../Hooks/useInput";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Logo, Compass, HomeEmpty, HeartEmpty, User } from "./Icons";
import Input from "./Input";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ME_QUERY } from "../SharedQueries";

const Header = styled.div`
  width: 100%;
  border: 0;
  top: 0;
  left: 0;
  position: fixed;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 1;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export default withRouter(({ history }) => {
  const search = useInput("");
  const { data } = useQuery(ME_QUERY);
  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search"
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/">
            <HomeEmpty />
          </HeaderLink>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {!data || !data.me ? (
            <HeaderLink to="/username">
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={data.me.username}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
