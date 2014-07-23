package com.playgroundberlin.berta.udp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;

public class UDPClient extends CordovaPlugin {
	/**
		* Executes the request and returns whether the action was valid.
		*
		* @param action		The action to execute.
		* @param args		JSONArray of arguments for the plugin.
		* @param callback	The callback context used when calling back into JavaScript.
		* @return			True if the action was valid, false otherwise.
		*/
	public boolean execute(String action, final JSONArray args, final CallbackContext callback) throws JSONException {
		if (action.equals("send")) {
			final String address = args.getString(0);
			final Integer port = args.getInt(1);
			final String message = args.getString(2);
			this.send(address, port, message, callback);
		} else {
			return false; // unrecognized action
		}

		return true;
	}

	public void send(String address, Integer port, String message, final CallbackContext callback) {
		cordova.getThreadPool().execute(new Runnable() {
			public void run() {
				DatagramSocket ds = null;
				try {
					ds = new DatagramSocket();
					InetAddress addr = InetAddress.getByName(address);
					DatagramPacket dp = new DatagramPacket(message.getBytes(), message.length(), addr, port);
					ds.send(dp);
					callback.success();
				} catch (Exception e) {
					e.printStackTrace();
					callback.error(e.getMessage());
				} finally {
					if (ds != null) {
						ds.close();
					}
				}
			}
		});
	}
}
