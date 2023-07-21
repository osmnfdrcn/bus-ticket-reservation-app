import React from "react";

type Props = {
  searchParams: any;
};

const SearchPage = ({ searchParams }: Props) => {
  const url = createUrl(searchParams);

  return <div>{url}</div>;
};

export default SearchPage;

const createUrl = (searchParams: any) => {
  let url = "http://localhost:3000/api/service?";

  for (const param in searchParams) {
    if (searchParams.hasOwnProperty(param)) {
      url += `${param}=${searchParams[param]}&`;
    }
  }
  return url;
};
