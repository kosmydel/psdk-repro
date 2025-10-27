package expo.modules.psdkrepro

import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.functions.Coroutine
import horizon.core.android.binding.HorizonPlatformJavaBridge
import horizon.core.android.driver.coroutines.HorizonServiceConnection
import horizon.platform.pushnotification.PushNotification
import kotlinx.coroutines.flow.StateFlow
import java.lang.reflect.Field

// Extension function to read a private field from any object
fun Any.getPrivateField(fieldName: String): Any? {
    return try {
        val field: Field = this::class.java.getDeclaredField(fieldName)
        field.isAccessible = true
        field.get(this)
    } catch (e: Exception) {
        Log.e("PSDK_REPRO_MODULE", "Failed to read private field: $fieldName", e)
        null
    }
}

class PsdkReproModule : Module() {

    val appID = "31229554193356425"

    val TAG = "PSDK_REPRO_MODULE"

    override fun definition() = ModuleDefinition {
        Name("PsdkRepro")

        val context = appContext.reactContext ?: throw Exceptions.ReactContextLost()

        OnCreate {
            Log.d(TAG, "Initialization...")
            HorizonServiceConnection.connect(appID, context)
        }

        AsyncFunction("isInitialized") Coroutine { ->
            Log.d(TAG, "Initializing the PSDK...")
            try {
                // Get the singleton instance and access the initialization StateFlow
                // This is a private field, so we need to use reflection to access it.
                val hscInstance = HorizonServiceConnection.instance
                val initializationStateFlow = hscInstance.getPrivateField("initialization") as? StateFlow<*>
                val currentInitializationState = initializationStateFlow?.value

                Log.d(TAG, "StateFlow object: $initializationStateFlow")
                Log.d(TAG, "StateFlow class: ${initializationStateFlow?.javaClass}")
                Log.d(TAG, "Current initialization state: $currentInitializationState")
                Log.d(TAG, "State class: ${currentInitializationState?.javaClass}")
                Log.d(TAG, "State toString: ${currentInitializationState?.toString()}")
                // End of private field access

                return@Coroutine currentInitializationState.toString()
            } catch (e: Exception) {
                Log.e(TAG, "Couldn't init HPJB...", e)
                throw Exceptions.IllegalStateException(e.message.toString())
            }
        }

        AsyncFunction("register") Coroutine { ->
            Log.d(TAG, "Registering for push notifications...")
            try {
                val pn = PushNotification()
                return@Coroutine pn.register()
            } catch (e: Exception) {
                Log.e(TAG, "Couldn't register for push notifications...", e)
                throw Exceptions.IllegalStateException(e.message.toString())
            }
        }
    }
}
