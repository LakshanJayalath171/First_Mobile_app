import Movie_card from "@/components/Movie_card";
import { images } from "@/constants/images";

import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import SearchBar from "@/components/SearchBar";
import { fetchMovie } from "../../services/api";
import useFetch from "../../services/useFetch";

const Search = () => {
  const [searchQuerry, setSearchQuery] = useState("");

  const fetchPopularMovies = useCallback(() => fetchMovie({ query: "" }), []);
  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovie({ query: searchQuerry }));

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0 "
        resizeMode="cover"
      />

      <FlatList
        data={movieLoading || movieError ? [] : (movies ?? [])}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Movie_card {...item} />}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <SearchBar
                placeholder="Search movies ..."
                onChangeText={(text: string) => setSearchQuery(text)}
                value={searchQuerry}
              />
            </View>

            {movieError && (
              <View className="flex-1 justify-center items-center mt-10">
                <Text className="text-white">Error {movieError.message}</Text>
              </View>
            )}

            {!movieLoading &&
              !movieError &&
              "SEARCH TERM".trim() &&
              movies?.length > 0 &&
              searchQuerry && (
                <Text className="text-white font-bold text-lg my-2">
                  Search results for {""}
                  <Text className="text-purple-600">{searchQuerry}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          movieLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : movieError ? (
            <Text className="text-white">Error {movieError.message}</Text>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
