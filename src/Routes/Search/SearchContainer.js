import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

export default withRouter(({ location: { search } }) => {
  const searchTerm = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: !searchTerm,
    variables: { term: decodeURI(searchTerm) }
  });

  return (
    <SearchPresenter searchTerm={searchTerm} loading={loading} data={data} />
  );
});
