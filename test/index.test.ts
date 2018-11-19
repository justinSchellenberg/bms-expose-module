import 'jsdom-global/register'
import * as chai from 'chai';
import ExposeModule from '../src/index';
import Window from '../src/window';

const expect = chai.expect;

describe('Function - ExposeModule', () => {
  const module = (a: number, b: number) => {
    return a + b;
  };
  it('should Throw an error if namespace is a malformed object', () => {
    const emptyNameSpace = {keyone:'hi',keytwo:'broken'};
    try {
      expect(ExposeModule(module, 'testModule', emptyNameSpace)).to.throw(Error)
    } catch (err) {
      expect(err.message).to.be.equal("The namespace object provided is Malformed! Cannot expose module to Window!");
    }
  });
  
  it('should set the module to the correct namespace', () => {
    const nameSpace = {BOLD: {BMS: {BUILDS: {}}}};
    ExposeModule(module, 'testModule',  nameSpace);
    expect(Window.getWindow().BOLD.BMS.BUILDS['testModule']).to.be.equal(module);
  });
});
