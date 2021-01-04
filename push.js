let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BALKeb41SdkaEMne6KY8p3XeTDkldZkN7zSw0ekOtIkiqYVXaIRbH43WiyidAGf2K8akuj3pJ-XAd3YyaV4CiAY",
   "privateKey": "fG9MFKAxFK3MqlYk6AmtM9_St2NuMZHynb4uLrpw_pA"
};
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dJm-h9LPbP8:APA91bHIIGQL6x8_tNDi0zP4zb8Jynsade0hkRPjYBTUoiUELx8trgFiNstRJu3DMj4eBmx0nS2xgluUiHUGD6N7IGcdEz-E5RzGddR55W0Ue7Gg4hUeFjnw6iqYe69UvF5ljjPUNGzI",
   "keys": {
       "p256dh": "BONmNxpKUr+UaZ8msk43/IOCocUaUGWu5RgxVovf2zVvWEi0MXUWt+myHdLQu++ia2tyvuaAQYNWLxvg6/CFpgc=",
       "auth": "pqtPkSNFhQjlw+/mTrtmtw=="
   }
};
let payload = 'Check your favorite team match schedule now!';
 
let options = {
   gcmAPIKey: '32296374902',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);