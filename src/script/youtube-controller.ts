import { YoutubeDisplay } from './display';
import { YoutubeVideo } from './video';

export class YoutubeController {
  constructor(
    private video: YoutubeVideo,
    private display: YoutubeDisplay) {
    this.init();
  }
  init() {
    this.addKeybindings();
    if (this.video.video !== undefined) {
      console.log('video was already defined yay!');
      // this.setup();
    }
    document.addEventListener('DOMContentLoaded', () => {
      console.log('dom loaded');
      // this.setup();
    });
    // Youtube page change event
    // document.addEventListener('spfdone', () => this.setup());
  }
  addKeybindings() {
    document.onkeypress = e => this.onKeypress(e);
  }
  onKeypress(e: KeyboardEvent) {
    const keyMap = {
      '99': 'bitFaster',     // c
      '100': 'speedUp',      // d
      '101': 'bitForwards',  // e
      '113': 'backwards',    // q
      '114': 'forwards',     // r
      '115': 'slowDown',     // s
      '116': 'setCurrent',   // t
      '118': 'toggle',       // v
      '119': 'bitBackwards', // w
      '120': 'bitSlower'     // x
    };
    const target: any = e.target || e.srcElement;
    if ( target.tagName === 'INPUT' ) { return; }
    if (e.keyCode in keyMap) {
      const methodName = keyMap[e.keyCode];
      this.video[methodName]();
    }
  }
  private setup() {
    this.video.setup();
    this.display.setup();
    this.video.newSpeed.subscribe(speed => this.display.update('speed', speed));
    this.video.newStart.subscribe(start => this.display.update('start', start));
  }
}
