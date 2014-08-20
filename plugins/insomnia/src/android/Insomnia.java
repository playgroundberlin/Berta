package com.playgroundberlin.berta.insomnia;

import android.view.WindowManager;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;

public class Insomnia extends CordovaPlugin {
	/**
	 * Executes the request and returns whether the action was valid.
	 *
	 * @param action	The action to execute.
	 * @param args		JSONArray of arguments for the plugin.
	 * @param callback	The callback context used when calling back into JavaScript.
	 * @return		True if the action was valid, false otherwise.
	 */
	public boolean execute(String action, final JSONArray args, final CallbackContext callback) throws JSONException {
		if (action.equals("enable")) {
			this.enable(callback);
		} else if (action.equals("disable")) {
			this.disable(callback);
		} else {
			return false; // unrecognized action
		}

		return true;
	}

	public void enable(final CallbackContext callback) {
		cordova.getActivity().runOnUiThread(new Runnable() {
			@Override
			public void run() {
				cordova.getActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
			}
		});
	}

	public void disable(final CallbackContext callback) {
		cordova.getActivity().runOnUiThread(new Runnable() {
			@Override
			public void run() {
				cordova.getActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
			}
		});
	}
}
