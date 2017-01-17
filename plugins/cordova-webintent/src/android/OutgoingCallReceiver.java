package com.borismus.webintent;

import java.util.HashMap;
import java.util.Map;

import org.apache.cordova.CordovaActivity;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.content.Context;
import android.content.BroadcastReceiver;
import android.net.Uri;
import android.text.Html;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaResourceApi;
import org.apache.cordova.PluginResult;

public class OutgoingCallReceiver extends BroadcastReceiver {

    public void onReceive(Context context, Intent intent) {

	String phoneURI = intent.getStringExtra("android.phone.extra.ORIGINAL_URI");
	String phoneNumber = getResultData();

        if (phoneURI == null) {
      	    // No reformatted number, use the original
    	    phoneURI = intent.getStringExtra(Intent.EXTRA_PHONE_NUMBER);      
        }
	
        Log.d("PG FluentCloud phoneURI", phoneURI);
        Log.d("PG FluentCloud phoneNumber", phoneNumber);

        Intent callIntent = new Intent(Intent.ACTION_CALL);         
        callIntent.setData(Uri.parse(phoneNumber+",,0000"));
        callIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        Intent chooser = Intent.createChooser(callIntent, "Call");
        chooser.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(chooser);
        setResultData(null);  

    }

}

