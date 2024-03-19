import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../header/Header";




/**
 * @title Recoil
 */
import { useRecoilState } from "recoil";


import parentLayout from "./ParentLayout.module.css";

import { Link } from "react-router-dom";
import { useAuthContext, useLangContext } from "@aabdelmonaem/core-lib";

const ParentLayout = (props:any) => {
  const auth = useAuthContext();
  const { t, lang } = useLangContext();

  const { children, ...rest } = props;

  const location = useLocation();



  return (
    <div
      className={`d-flex ${parentLayout.mainContainer} ${location.pathname === "/login"
        ? `${parentLayout["authentication-screen"]}`
        : ""
        }`}
      {...rest}
    >

      {/* Parent Layout */}
      <div className={` ${parentLayout.content}`}>
        {location.pathname === "/login" ? <></> : <Header />}
        <div
          className={`${parentLayout.pageTemplateContainer} ${lang === "en"
            ? `${parentLayout.pageTemplateEN}`
            : `${parentLayout.pageTemplateAR}`
            }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ParentLayout;
