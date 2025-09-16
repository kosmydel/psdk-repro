import { NativeModule, requireNativeModule } from 'expo';

import { PsdkReproModuleEvents } from './PsdkRepro.types';

declare class PsdkReproModule extends NativeModule<PsdkReproModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PsdkReproModule>('PsdkRepro');
