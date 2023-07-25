// YourComponent.js
import React from "react";
import styles from "./Spinner.module.css";

const YourComponent = () => {
    return (
        <div className={styles["spinner-container"]}>
            {/* Add the spinner div with the "spinner" class */}
            <div className={styles.spinner}></div>
            {/* Your other content */}
        </div>
    );
};

export default YourComponent;
