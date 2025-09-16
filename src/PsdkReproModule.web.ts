import { registerWebModule, NativeModule } from 'expo';

import { PsdkReproModuleEvents } from './PsdkRepro.types';

class PsdkReproModule extends NativeModule<PsdkReproModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(PsdkReproModule, 'PsdkReproModule');
