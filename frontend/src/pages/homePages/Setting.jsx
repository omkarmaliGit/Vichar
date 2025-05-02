import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";

const Setting = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div className="py-5 px-10">
        <h1 className="text-lg font-bold my-4">Settings</h1>
        <div>
          <div className="border border-gray-200 py-4 px-8 flex items-center justify-between dark:border-gray-800">
            <p>Dark mode</p>
            <button className="text-2xl" onClick={toggleTheme}>
              {theme === "light" ? "🌙" : "🌞"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
