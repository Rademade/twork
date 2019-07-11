class AddToHomeScreen {
  constructor() {
    this.deferredPrompt = null;
  }

  initBeforeInstallPromptListener() {
    console.log('Lister to beforeInstallPrompt');

    window.addEventListener('beforeinstallprompt', (e) => {
      this.deferredPrompt = e;
      e.preventDefault();
    });
  }

  isPromptAllowed() {
    return !!this.deferredPrompt;
  }

  showPrompt() {
    if (this.isPromptAllowed()) {
      this.deferredPrompt.prompt();
      return this.deferredPrompt.userChoice;
    } else {
      return Promise.reject(null);
    }
  }
}

const addToHomeScreen = new AddToHomeScreen();
export default addToHomeScreen;