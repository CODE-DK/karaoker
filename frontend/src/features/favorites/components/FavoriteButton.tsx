import { IconButton, Tooltip } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function FavoriteButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFavoritesPage = location.pathname === "/favorites";

  const handleClick = () => {
    navigate(isFavoritesPage ? "/" : "/favorites");
  };

  return (
    <Tooltip title={isFavoritesPage ? "На главную" : "Избранное"}>
      <IconButton
        onClick={handleClick}
        size="small"
        color={isFavoritesPage ? "warning" : "default"}
      >
        {isFavoritesPage ? <Star /> : <StarBorder />}
      </IconButton>
    </Tooltip>
  );
}
