import 'jsdom-global/register'
import * as chai from 'chai';
import Window from '../src/window';

const expect = chai.expect;

describe('Class - Window', () => {
  it('should have the window property be equal to current window object', () => {
    expect(Window.getWindow()).to.be.equal(window);
  });
  it('should have a property added to it after set property, and set window are called', () => {
    Window.pushNamespace('BOLD');
    Window.pushNamespace('BMS');
    Window.setNamespaceToWindow();
    Window.setWindow();
    Window.resetWindow();
    expect(Window.getReferenceWindow()).have.property("BOLD");
    expect(Window.getWindow()).have.property("BOLD");
    expect(window).have.property("BOLD");
  });
});
