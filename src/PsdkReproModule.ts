import { NativeModule, requireNativeModule } from 'expo';

declare class PsdkReproModule extends NativeModule {
  isInitialized(): Promise<boolean>;
  register(): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PsdkReproModule>('PsdkRepro');
