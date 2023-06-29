import React, { useEffect, useState } from 'react';
const InstallButton = () => {
    const [showButton, setShowButton] = useState(false);
  
    useEffect(() => {
      const handleBeforeInstallPrompt = (event) => {
        event.preventDefault();
        window.deferredInstallPrompt = event;
        setShowButton(true);
      };
  
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }, []);
  
    const handleInstallButtonClick = () => {
      if (window.deferredInstallPrompt) {
        window.deferredInstallPrompt.prompt();
        window.deferredInstallPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          window.deferredInstallPrompt = null;
        });
      }
    };
  
    return showButton ? (
      <button onClick={handleInstallButtonClick} style={installButtonStyle}>
        Install App
      </button>
    ) : null;
  };
  
export default InstallButton;

const installButtonStyle = {
  background: "#f5f5f5",
  color: "#333",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};
