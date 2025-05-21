import React, { useState } from "react";

const Avatar = ({
  name,
  imageUrl,
  size = 40,
  backgroundColor = "#4A90E2",
  textColor = "#fff",
}) => {
  const [imgError, setImgError] = useState(false);

  const initials = (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const style = {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor,
    color: textColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: size * 0.4,
    userSelect: "none",
    overflow: "hidden",
  };

  return (
    <div style={style}>
      {!imgError && imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={() => setImgError(true)}
        />
      ) : (
        initials
      )}
    </div>
  );
};

export default Avatar;
