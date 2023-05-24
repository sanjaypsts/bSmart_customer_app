import PushNotification from "react-native-push-notification"
import { Platform } from "react-native";
PushNotification.createChannel(
    {
      channelId: 'fcm_fallback_notification_channel', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'notification.mp3', // (optional) See `soundName` parameter of `localNotification` function
     // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  
   //let checklocal=false
class Local { 
   
    configure = (onOpenNotification) => {
        PushNotification.getChannels(function(channel_ids){
            console.log(channel_ids)
           })
        PushNotification.configure({
            onRegister : function (token) {
               // console.log("[LocalNotificationService] onRegister:",token);
            },
            onNotification: function (notification) {
             //  console.log('hgfh',notification,Object.keys(notification.data).length)
            //    console.log("[LocalNotificationService] onNotification:",notification);
                if(!notification?.data) {
                    return
                }
                notification.userInteraction = true;
                if (Platform.OS === 'ios') {
                    notification = notification
                } else {
                    notification = notification
                }
                if(Platform.OS === 'ios' && Object.keys(notification.data).length==3){
                   // console.log('heheh')
                    onOpenNotification(notification);
                }
                else if(Platform.OS === 'android' && notification.vibration==300){ 
                  //  console.log('jhyhgj',notification)
                    onOpenNotification(notification.data);
                }
                
                
            },
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        })
    }
    unregister = () => {
        PushNotification.unregister();
    }
    showNotification = (id, title, message, data = {}, options = {}) => {
       // console.log('hello',data)
        PushNotification.localNotification({
            /* Android Only Properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            title : title || "",
            message : message || "",
            playSound : options.playSound || false,
            soundName : options.soundName || 'default',
            userInteraction : false , // BOOLEAN : If notification was opened by the user from notification
            badge : true, 
            userInfo:data.data ||''
        });
    }
    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            channelId: 1,
            autoCancel : true,
            largeIcon: "ic_launcher_round",
            smallIcon: "ic_launcher_round",
            bigText : message || '',
            subText : title || '',
            vibrate : options.vibrate || true,
            vibration :  300,
            priority : options.priority || 'high',
            importance : options.importance || 'high',
            data : data,
        }
    }
    cancelAllLocalNotifications = () => {
        PushNotification.cancelAllLocalNotifications();
    }
    removeDeliveredNotificationByID = (notificationId) => {
     //   console.log("[LocalNotificationService] removeDeliveredNotificationByID:", notificationId);
        PushNotification.cancelLocalNotifications({id: `${notificationId}`})
    }
    // applicationBadge = () => {
    //     // PushNotification.setApplicationIconBadgeNumber(2);
    //     // const ShortcutBadger = NativeModules.ShortcutBadger;
    //     // let count = 1;
    //     // ShortcutBadger.applyCount(count);
    // }
}
export const localNotificationService = new Local();