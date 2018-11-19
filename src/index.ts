import {IsEmptyObject, IsObjectContainSpecifiedKeys} from 'bms-utility-helper-functions';
import Window from './window';


export default function ExposeModule(module: any, moduleName: string, namespace: any) : void {
  if(IsEmptyObject(namespace)){ // finally hit the bottom of the object. time to build window obj
    Window.setNamespaceToWindow();
    Window.setModule(module, moduleName);
    Window.setWindow();
    Window.resetWindow();
    return;
  }
  if(!IsObjectContainSpecifiedKeys(namespace, 1)){
    throw new Error("The namespace object provided is Malformed! Cannot expose module to Window!");
  }
  
  for(const key in namespace){
    Window.pushNamespace(key);
    ExposeModule(module, moduleName, namespace[key]); // one deeper, and I liked it.
  }
}
