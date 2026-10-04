package com.clock

import android.os.Build
import android.service.dreams.DreamService
import android.view.View
import android.view.WindowInsets
import android.view.WindowInsetsController
import com.facebook.react.ReactRootView

class RNDreamService : DreamService() {

    private var reactRootView: ReactRootView? = null

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        
        isInteractive = true
        isFullscreen = true // Native DreamService full-screen flag

        val reactNativeHost = (application as MainApplication).reactNativeHost
        reactRootView = ReactRootView(this).apply {
            startReactApplication(
                reactNativeHost.reactInstanceManager,
                "Klock",
                null
            )
        }

        setContentView(reactRootView)
        
        // Hide System and Navigation Bars
        hideSystemUI()
    }

    private fun hideSystemUI() {
        window?.let { win ->
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                // Modern Android 11+ (API 30+) approach
                win.setDecorFitsSystemWindows(false)
                win.insetsController?.let { controller ->
                    controller.hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
                    // Keeps bars hidden even if user swipes near the edges
                    controller.systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
                }
            } else {
                // Legacy Android approach
                @Suppress("DEPRECATION")
                win.decorView.systemUiVisibility = (
                    View.SYSTEM_UI_FLAG_FULLSCREEN
                    or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                    or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                )
            }
        }
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        reactRootView?.unmountReactApplication()
        reactRootView = null
    }
}