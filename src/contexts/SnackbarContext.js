import { createContext, useContext, useState } from "../imports/React-Imports";
import SnackbarAlert from "../components/alerts/SnackbarAlert";

const SnackbarContext = createContext({});

// CUSTOM HOOK:
export const useSnackbar = () => useContext(SnackbarContext);

// PROVIDER COMPONENT:
export const SnackbarProvider = ({ children }) => {
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    message: "",
    severity: "info",
    counterIsOn: false,
  });

  const showSnackbarAlert = (message = "", severity = "info") => {
    setSnackbarAlert({
      ...snackbarAlert,
      open: true,
      message: message,
      severity: severity,
    });

    if (!snackbarAlert.counterIsOn) {
      setSnackbarAlert((latestValue) => ({
        ...latestValue,
        counterIsOn: true,
      }));

      setTimeout(() => {
        setSnackbarAlert((latestValue) => ({
          ...latestValue,
          open: false,
          counterIsOn: false,
        }));
      }, 3000);
    }
  };

  const closeSnackbarAlert = () => {
    setSnackbarAlert({ ...snackbarAlert, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbarAlert }}>
      <SnackbarAlert
        open={snackbarAlert.open}
        close={closeSnackbarAlert}
        message={snackbarAlert.message}
        severity={snackbarAlert.severity}
      />
      {children}
    </SnackbarContext.Provider>
  );
};
