package expo.modules.psdkrepro

import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.meta.horizon.platform.ovr.Core;
import expo.modules.kotlin.exception.Exceptions

class PsdkReproModule : Module() {

  val appID = "1234567890"

  val TAG = "PSDK_REPRO_MODULE"
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('PsdkRepro')` in JavaScript.
    Name("PsdkRepro")

    OnCreate {
      Log.d(TAG, "Getting context...")
      val context = appContext.reactContext ?: throw Exceptions.ReactContextLost()
      Log.d(TAG, "Initializing the PSDK...")
      Core.asyncInitialize(appID, context);
    }

    Function("isInitialized") {
      Core.isInitialized()
    }
  }
}
