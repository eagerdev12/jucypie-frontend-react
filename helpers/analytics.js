import Analytics from "analytics";
import snowplowPlugin from "@analytics/snowplow";
// console.log(mydata)
const analytics = Analytics({
  app: "Juicypie-app",
  plugins: [
    // Minimal recommended configuration
    snowplowPlugin({
      name: "Juicypie",
      scriptSrc: "/js/jp_analytics.js",
      collectorUrl:
        "ab6ecacd3af5a4d8c815402485051c79-1728690269.us-east-2.elb.amazonaws.com:8080",
      trackerSettings: {
        appId: "juicypieApp",
        contexts: {
          webPage: true,
        },
        anonymousTracking: true,
      },
    }),
  ],
});

analytics.on("initialize:snowplow", ({ instance }) => {
  instance.plugins.snowplow.enableActivityTracking(10, 10);
  instance.plugins.snowplow.enableLinkClickTracking();
});

export default analytics;
