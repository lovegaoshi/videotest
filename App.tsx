import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { customReqHeader } from "./utils";
import { biliNFTVideoFetch } from "./biliNFT";

export default function App() {
  const [identifier, setId] = React.useState<string>(
    "https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4"
  );

  /**
  React.useEffect(() => {
    biliNFTVideoFetch({ act_id: "100531", index: 0 }).then((v) => setId(v));
  }, []);
  */

  if (!identifier) return <View />;

  return (
    <Video
      source={{
        uri: identifier,
        headers: customReqHeader(identifier, {}),
      }}
      style={{ width: "100%", height: "100%", position: "absolute" }}
      onError={console.error}
      isLooping
      resizeMode={ResizeMode.COVER}
      shouldPlay
      isMuted
    ></Video>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
