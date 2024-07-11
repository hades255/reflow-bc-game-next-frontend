import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: any;
    Echo: Echo;
  }
}

if (typeof window !== "undefined") {
  window.Pusher = Pusher;
}

const myEcho = () => {
  window.Echo = new Echo({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_PUSHER_KEY, // same key used in the pusher key
    wsHost: process.env.NEXT_PUBLIC_LOCAL_HOST, // host when you deploy would be your domain
    wsPort: process.env.NEXT_PUBLIC_LOCAL_PORT, // same port
    wssPort: process.env.NEXT_PUBLIC_LOCAL_PORT,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
    disableStats: true, // don't send stats to pusher because we aren't using pusher
  });
};
export default myEcho;