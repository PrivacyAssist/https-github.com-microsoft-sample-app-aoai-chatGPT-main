import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Dialog } from "@fluentui/react";
import { useContext, useEffect } from "react";
import { AppStateContext } from "../../state/AppProvider";


const Layout = () => {
   
    const appStateContext = useContext(AppStateContext)
    const ui = appStateContext?.state.frontendSettings?.ui;

    useEffect(() => { }, [appStateContext?.state.isCosmosDBAvailable.status]);

    return (
        <div className={styles.layout}>
           
            <Outlet />
            <Dialog
               
                styles={{

                    main: [{
                        selectors: {
                            ['@media (min-width: 480px)']: {
                                maxWidth: '600px',
                                background: "#FFFFFF",
                                boxShadow: "0px 14px 28.8px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.2)",
                                borderRadius: "8px",
                                maxHeight: '200px',
                                minHeight: '0px',
                            }
                        }
                    }]
                }}
               
            >
               
            </Dialog>
        </div>
    );
};

export default Layout;
