import {InputBase, Box} from "@mui/material";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import useTranslation from "next-translate/useTranslation";

const SearchInputWrapper = styled(Box)(({ theme }) => {
  console.log(theme);
  return {
    "& .search": {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor:theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette.common.white,
      },
      width: "100%",
      height: "100%",
    },
    "& .searchIcon": {
      padding: theme.spacing(3, 0),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#8B939C",
    },
    "& .inputRoot": {
      color: "inherit",
      width: "100%",
      paddingTop: "0.1rem",
      paddingLeft: "1rem",
    },
    "& .inputInput": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      color: "#8B939C",
    },
  };
});
const SearchInput = () => {
  const { t } = useTranslation();
  return (
    <SearchInputWrapper>
      <div className="search">
        <div className="searchIcon">
          <SearchIcon />
        </div>
        <InputBase
          placeholder={t("dashboard:searchplaceholder")}
          classes={{
            root: "inputRoot",
            input: "inputInput"
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </SearchInputWrapper>
  );
};
export default SearchInput;
