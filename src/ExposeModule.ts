import { IsEmptyObject, IsFunction, IsObject, IsObjectContainSpecifiedKeys } from 'bms-utility-helper-functions';
import Window from './Window';

export default function ExposeModule(namespace: any): void {
  if (!IsObjectContainSpecifiedKeys(namespace, 1) || !IsObject(namespace) || IsEmptyObject(namespace)) {
    // Object must contain one key, and not be empty, or else we break..
    throw new Error('The namespace object provided is Malformed! Cannot expose module to Window!');
  }

  for (const key of Object.keys(namespace)) {
    if (IsFunction(namespace[key])) {
      Window.setNamespaceToWindow();
      Window.setModule(namespace[key], key);
      Window.resetWindow();
      return;
    }
    Window.pushNamespace(key);
    ExposeModule(namespace[key]); // one deeper, and I liked it.
  }
}
