import { useState } from "react";

import { Button, Text, View } from "react-native";
import { appwriteClient } from "../../services/appwrite";

const Profile = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  const pingAppwrite = async () => {
    setIsPinging(true);
    setStatus(null);

    try {
      await appwriteClient.ping();
      setStatus("Connected to Appwrite");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? `Connection failed: ${error.message}`
          : "Connection failed",
      );
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <View className="flex-1 justify-center bg-primary px-6">
      <Text className="mb-4 text-center text-2xl font-bold text-white">
        Appwrite connection
      </Text>
      <Button
        title={isPinging ? "Pinging..." : "Ping Appwrite"}
        onPress={pingAppwrite}
        disabled={isPinging}
      />
      {status ? (
        <Text className="mt-4 text-center text-white">{status}</Text>
      ) : null}
    </View>
  );
};

export default Profile;
