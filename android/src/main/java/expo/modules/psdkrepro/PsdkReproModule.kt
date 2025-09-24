package expo.modules.psdkrepro

import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.meta.horizon.platform.ovr.Core;
import com.meta.horizon.platform.ovr.requests.PushNotification
import com.meta.horizon.platform.ovr.requests.Users
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.functions.Coroutine
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

class PsdkReproModule : Module() {

  val appID = "31229554193356425"

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

    Function("getLoggedInUserID") {
      Core.getLoggedInUserID()
    }

    AsyncFunction("registerNotifications") Coroutine { ->
      return@Coroutine registerNotificationsLogic()
    }

    AsyncFunction("getLoggedInUserFriends") Coroutine { ->
      return@Coroutine getLoggedInUserFriendsLogic()
    }
  }

  private suspend fun registerNotificationsLogic(): String = suspendCoroutine { continuation ->
    Log.d(TAG, "Registering for push notifications...")
    val pnr = PushNotification.register()

    pnr.onError { error ->
      Log.e(TAG, "Push notification registration failed: ${error.message}")
      continuation.resumeWithException(Exceptions.IllegalStateException("Push notification registration failed: ${error.message}"))
    }

    pnr.onSuccess { success ->
      Log.d(TAG, "Push notification registration successful: ${success.id}")
      continuation.resume(success.id)
    }
  }

  private suspend fun getLoggedInUserFriendsLogic(): List<String> = suspendCoroutine { continuation ->
    Log.d(TAG, "Getting logged in user friends...")
    val friends = Users.getLoggedInUserFriends()
    friends.onSuccess { success ->
      Log.d(TAG, "Logged in user friends: ${success.elements}")
      continuation.resume(success.elements.map { it.displayName })
    }

    friends.onError { error ->
      Log.e(TAG, "Error getting logged in user friends: ${error.message}")
      continuation.resumeWithException(Exceptions.IllegalStateException("Error getting logged in user friends: ${error.message}"))
    }
  }
}
