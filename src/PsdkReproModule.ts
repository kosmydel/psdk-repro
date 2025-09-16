import { NativeModule, requireNativeModule } from 'expo';

declare class PsdkReproModule extends NativeModule {
  isInitialized(): boolean;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PsdkReproModule>('PsdkRepro');
