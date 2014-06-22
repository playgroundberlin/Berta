package com.playgroundberlin.berta;

import android.os.Bundle;
import org.apache.cordova.DroidGap;
import android.view.WindowManager;
import android.view.Window;

public class Berta extends DroidGap {
	
	public JScall mc;
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.init();
        mc = new JScall(this, appView);
        appView.addJavascriptInterface(mc, "MyCls");
        // this is the specific line that prevents the screen from sleeping
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
		super.loadUrl("file:///android_asset/www/index.html");
	}
}