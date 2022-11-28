import React from "react";

export const useSearch = () => {
  const [searchValue, setSearchValue] = React.useState('');

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return {searchValue, setSearchValue, onChangeSearchInput};
}

// const {searchValue, setSearchValue, onChangeSearchInput} = useSearch();