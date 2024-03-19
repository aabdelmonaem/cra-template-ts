import { useState } from "react";

import { useAuthContext, ToggleLanguage, ToggleTheme, useLangContext, useThemeContext } from "@aabdelmonaem/core-lib";
import { useLocation, useNavigate } from "react-router-dom";

import styles from './login.module.css';

import { IconEyeFill, IconEyeSlashFill, MoonIcon, SunIcon } from "../../common/iconComponents";

const LoginView = () => {


    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const [errorMessages, setErrorMessages] = useState({} as any);
    const [loginMessages, setLoginMessages] = useState<string>("");


    const auth = useAuthContext();

    const { t, isEnglish } = useLangContext();


    const { theme } = useThemeContext();
    let from = location.state?.from?.pathname || "/";


    const [showPassword, setShowPassword] = useState(false);

    const handleUsernameChange = (e:any) => {
        setUsername(e.target.value);

    };

    const handlePasswordChange = (e:any) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setLoginMessages("");
        auth.signin(username, password, (message) => {
            if (message !== undefined && message !== null) {
                setLoginMessages(message);
            } else {
                navigate(from, { replace: true });
            }
        });

    };

    const renderErrorMessage = (name:any) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const loginErrorMessage = () =>
    (
        <div className="error">{loginMessages}</div>
    );

    return (

        <>
            <div className={styles.background}>
                {/* <div className={styles.shape}></div>
                <div className={styles.shape}></div> */}
            </div>
            <form className={styles.formStyle} onSubmit={handleSubmit}>
                <h3>{t("loginHeader")}</h3>
                <label htmlFor="username">{t("userNameLabel")}</label>
                <input type="text" id="username" value={username} required onChange={handleUsernameChange} />
                {renderErrorMessage("uname")}
                <label htmlFor="password">{t("passwordLabel")}</label>
                <div style={{ position: "relative" }}>
                    <input type={
                        showPassword ? "text" : "password"
                    } id="password" value={password} required onChange={handlePasswordChange} className={styles.passwordInput} />
                    <span className={styles.fieldIcon} onClick={(e) => setShowPassword(!showPassword)} >
                        {!showPassword ? <IconEyeFill /> : < IconEyeSlashFill />}
                    </span>
                </div>

                {renderErrorMessage("pass")}
                <button className={styles.buttonStyle} type="submit">{t("loginLabel")}</button>
                <div style={{ height: "50px", paddingTop: "10px" }}>
                    {loginErrorMessage()}
                </div>
                <div className={styles.option}>
                    <ToggleTheme classNames={styles.roundedContainer} toggleTheme={function (theme: string): void {
                        console.log(theme);
                    } }>
                        {theme === "dark" ? (
                            <SunIcon color="#ffffff" title={t("lightMode")} />
                        ) : (
                            <MoonIcon color="#000000" title={t("darkMode")} />
                        )}

                    </ToggleTheme>


                    <ToggleLanguage classNames={styles.roundedContainer} toggleLanguage={function (lang: string): void {
                        console.log(lang);
                    } }>
                        {isEnglish() ? (
                            <span title={t("LanguageLabel")}>ع</span>
                        ) : (
                            <span title={t("LanguageLabel")}>E</span>
                        )}
                    </ToggleLanguage>
                </div>
            </form>
        </>
    )
};

export default LoginView;
