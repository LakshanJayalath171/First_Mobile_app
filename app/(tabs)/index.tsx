import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { fetchMovie } from "../../services/api";
import useFetch from "../../services/useFetch";

const Index = () => {
  const router = useRouter();
  const fetchPopularMovies = useCallback(() => fetchMovie({ query: "" }), []);

  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
  } = useFetch(fetchPopularMovies);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <FlatList
        data={movieLoading || movieError ? [] : (movies ?? [])}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Text className="text-white">{item.title}</Text>
        )}
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        ListHeaderComponent={
          <View>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
            />
            <Text className="text-white text-lg font-bold mt-5 mb-3">
              Popular Movies
            </Text>
          </View>
        }
        ListEmptyComponent={
          movieLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          ) : movieError ? (
            <Text className="text-white">Error {movieError.message}</Text>
          ) : null
        }
      />
    </View>
  );
};

export default Index;
