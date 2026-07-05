import { useState, useEffect, useRef } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream.js";
import { sessionApi } from "../api/sessions.js";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  const cleanupDoneRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    let videoCall = null;
    let chatClientInstance = null;

    const initCall = async () => {
      if (!session?.callId) {
        setIsInitializingCall(false);
        return;
      }

      if (!isHost && !isParticipant) {
        setIsInitializingCall(false);
        return;
      }

      if (session.status === "completed") {
        setIsInitializingCall(false);
        return;
      }

      try {
        const { token, userId, userName, userImage } = await sessionApi.getStreamToken();

        if (!isMounted) return;

        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        );

        if (!isMounted) return;
        setStreamClient(client);

        videoCall = client.call("default", session.callId);
        await videoCall.join({ create: true });

        if (!isMounted) return;
        setCall(videoCall);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        // connect only if not already connected
        if (!chatClientInstance.userID) {
          await chatClientInstance.connectUser(
            {
              id: userId,
              name: userName,
              image: userImage,
            },
            token
          );
        }

        if (!isMounted) return;
        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel("messaging", session.callId);
        await chatChannel.watch();

        if (!isMounted) return;
        setChannel(chatChannel);
      } catch (error) {
        console.error("Error init call:", error);
        toast.error("Failed to join video call");
      } finally {
        if (isMounted) {
          setIsInitializingCall(false);
        }
      }
    };

    if (session && !loadingSession) {
      cleanupDoneRef.current = false;
      initCall();
    }

    return () => {
      isMounted = false;

      if (cleanupDoneRef.current) return;
      cleanupDoneRef.current = true;

      (async () => {
        try {
          // clear React state first so UI stops using disconnected resources
          setChannel(null);
          setChatClient(null);
          setCall(null);

          // leave only if call exists
          if (videoCall) {
            try {
              await videoCall.leave();
            } catch (err) {
              console.warn("Call already left or failed to leave:", err.message);
            }
          }

          // IMPORTANT:
          // do NOT disconnect chat client here if your UI still relies on it
          // and especially not on every session-page cleanup.
          // Only disconnect at app logout / full teardown if needed.

          await disconnectStreamClient();
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, [session?.callId, session?.status, loadingSession, isHost, isParticipant]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;