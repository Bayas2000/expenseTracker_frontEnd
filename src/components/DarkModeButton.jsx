import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Store/themeSlice";

const DarkModeToggle = () => {
  const mode = useSelector((state) => state.theme.mode);

  console.log(mode , 'mode');
  
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`relative w-[44px] h-[28px] rounded-full p-[2px] transition-colors duration-300 ${
        mode === "dark" ? "bg-gray-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-[2px] left-[2px] h-[24px] w-[20px] rounded-full bg-blue-900 flex items-center justify-center transform transition-transform duration-300 ${
          mode === "dark" ? "translate-x-[20px]" : "translate-x-0"
        }`}
      >
        <span
          className="block h-[16px] w-[16px] bg-no-repeat bg-center"
          style={{
            backgroundImage:
              mode === "dark"
                ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 20 20"><path fill="%23fff" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
                : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 20 20"><path fill="%23fff" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
          }}
        ></span>
      </div>
    </button>
  );
};

export default DarkModeToggle;
