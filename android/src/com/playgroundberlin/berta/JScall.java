package com.playgroundberlin.berta;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;

import org.apache.cordova.DroidGap;

import android.webkit.WebView;

public class JScall {
	  private WebView mAppView;
	  private DroidGap mGap;
	  public static int servoValue;
	  public static int UDP_SERVER_PORT = 50000;
	  //public static String UDP_SERVER_IP = "192.168.2.190";
	  public static String UDP_SERVER_IP = "192.168.42.10";
	  
	  // Broadcast to 255.255.255.255
	  //public static String UDP_SERVER_IP = "255.255.255.255";
	  String messageStr="Hello Android!";
	  public JScall(DroidGap gap, WebView view)
	  {
	    mAppView = view;
	    mGap = gap;
	    //runUdpClient();
	  }

	  public String setServoValue(String value){
		  //servoValue = value;
		  //HelloIOIOService.write();
		  //MainActivity.randomNum = value;
		  //System.out.println(servoValue);
		  runUdpClient(value);
		  String success = "Set servo to: " +String.valueOf(servoValue);
		  return success;
	  }
	  
	  public void log(String message){ 
		  System.out.println(message);
	  }
	  
	  private void runUdpClient(String udpMsg)  {
		    //String udpMsg = "hello world from UDP client " + UDP_SERVER_PORT;
		    DatagramSocket ds = null;
		    try {
		        ds = new DatagramSocket();
		        InetAddress serverAddr = InetAddress.getByName(UDP_SERVER_IP);
		        DatagramPacket dp;
		        dp = new DatagramPacket(udpMsg.getBytes(), udpMsg.length(), serverAddr, UDP_SERVER_PORT);
		        ds.send(dp);
		        System.out.println("Sent UDP message.");
		    } catch (SocketException e) {
		        e.printStackTrace();
		    }catch (UnknownHostException e) {
		        e.printStackTrace();
		    } catch (IOException e) {
		        e.printStackTrace();
		    } catch (Exception e) {
		        e.printStackTrace();
		    } finally {
		        if (ds != null) {
		            ds.close();
		        }
		    }
		}
	}