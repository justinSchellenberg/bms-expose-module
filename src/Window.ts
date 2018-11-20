import JSON = Mocha.reporters.JSON;

class Window {
  private static instance: Window;
  private pointerWindow: any;
  private referenceWindow: any;
  private arrayNames: any;

  constructor() {
    if (!Window.instance) {
      // if an instance does not exist
      this.pointerWindow = window || {};
      this.referenceWindow = this.pointerWindow;
      this.arrayNames = [];
      Window.instance = this;
    }
    return Window.instance;
  }
  public pushNamespace(property: string) {
    this.arrayNames.push(property);
  }
  public setNamespaceToWindow() {
    this.arrayNames.forEach((key: string) => {
      this.pointerWindow[key] = this.pointerWindow[key] || {};
      this.pointerWindow = this.pointerWindow[key];
    });
    this.arrayNames = []; // clear the array after done
  }
  public getWindow() {
    return this.pointerWindow;
  }
  public getReferenceWindow() {
    return this.referenceWindow;
  }
  public resetWindow() {
    this.pointerWindow = window || {};
    this.referenceWindow = window || {};
  }
  public setModule(module: any, moduleName: string) {
    this.pointerWindow[moduleName] = module;
  }
}

const instance = new Window();
export default instance; // Singleton pattern. only exposing this one instance.
