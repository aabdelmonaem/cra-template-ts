/**
 * @title React Packages
 */
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * @title Core Packages
 */
import {
  useAuthContext,
  ToggleTheme,
  useLangContext,
  useThemeContext,
  ToggleLanguage,
  SelectLanguage,
} from "@aabdelmonaem/core-lib";

/**
 * @title Custom Components
 */
import { MoonIcon, SunIcon } from "../iconComponents";



/**
 * @title Recoil
 */
import { useRecoilState } from "recoil";

/**
 * @title Styles
 */
import headerStyles from "./Header.module.css";

const HeaderView = () => {
  // Global Context State
  const auth = useAuthContext();

  const { t, isEnglish, lang } = useLangContext();

  const { theme } = useThemeContext();


  return (
    <>
      {/* <ToggleLanguage classNames="">
        <LanguageIcon
          color={`${theme === "dark" ? "#ffffff" : "#000000"}`}
        />
      </ToggleLanguage> */}
      <SelectLanguage toggleLanguage={function (lang: string): void {
        console.log(lang);
      }} />
      <ToggleTheme classNames="" toggleTheme={function (theme: string): void {
        console.log(theme);
      }}>
        {theme === "dark" ? (
          <>
            <SunIcon color="#ffffff" />
          </>
        ) : (
          <MoonIcon color="#000000" />
        )}
      </ToggleTheme>

    </>
  );
};

export default HeaderView;
