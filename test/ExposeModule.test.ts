import * as chai from 'chai';
import 'jsdom-global/register';
import ExposeModule from '../src/ExposeModule';
import Window from '../src/Window';

const expect = chai.expect;

describe('Function - ExposeModule', () => {
  const module = (a: number, b: number) => {
    return a + b;
  };
  it('should Throw an error if namespace is a malformed object', () => {
    const emptyNameSpace = {keyone:'hi',keytwo:'broken'};
    try {
      expect(ExposeModule(emptyNameSpace)).to.throw(Error)
    } catch (err) {
      expect(err.message).to.be.equal("The namespace object provided is Malformed! Cannot expose module to Window!");
    }
  });
  
  it('should set the module to the correct namespace', () => {
    const nameSpace = {BOLD: {BMS: {BUILDS: {test: module}}}};
    ExposeModule(nameSpace);
    expect(Window.getWindow().BOLD.BMS.BUILDS['test']).to.be.equal(module);
  });
});
