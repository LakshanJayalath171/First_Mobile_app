import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>

      <Text className="text-light-100 font-bold text-sm">{value || "N/A"}</Text>
    </View>
  );
};

const Movie = () => {
  const { Id } = useLocalSearchParams<{ Id: string }>();
  const movieId = Number(Id);
  const fetchDetails = useCallback(() => {
    if (!Number.isInteger(movieId) || movieId <= 0) {
      return Promise.reject(new Error("Invalid movie ID"));
    }

    return fetchMovieDetails(movieId);
  }, [movieId]);
  const { data: movie, loading, error } = useFetch(fetchDetails);

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" className="mt-10" />
        ) : error ? (
          <Text className="text-white">Error {error.message}</Text>
        ) : movie ? (
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              resizeMode="stretch"
              className="w-full h-[550px]"
            />

            <View className="flex-col items-start justify-center mt-5 px-5">
              <Text className="text-white text-xl font-bold">
                {movie.title}
              </Text>

              {/* runtime */}
              <View className="flex-row items-center gap-x-5 mt-2">
                <Text className="text-light-200 text-sm ">
                  {movie?.release_date?.split("-")[0] ?? "N/A"}
                </Text>
                <Text className="text-light-200 text-sm ">
                  {movie.runtime} min
                </Text>
              </View>

              {/* vote count */}
              <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                <Image source={icons.star} className="size-6" />
                <Text className="text-white font-bold text-sm">
                  {Math.round(movie.vote_average * 10) / 10}
                </Text>

                <Text className="text-light-200 text-sm">
                  ({movie.vote_count})
                </Text>
              </View>

              {/*  */}

              <MovieInfo label="Overview" value={movie.overview} />
              <MovieInfo
                label="Genres"
                value={movie.genres.map((g) => g.name).join(", ")}
              />

              <View className="flex flex-row justify-between w-1/2 gap-3">
                <MovieInfo
                  label="Budget"
                  value={`$${movie.budget / 10000000} millon`}
                />

                <MovieInfo
                  label="Revenue"
                  value={`$${movie.revenue / 10000000} millon`}
                />
              </View>

              {/* production info */}

              <MovieInfo
                label="Production companies"
                value={
                  movie.production_companies.map((c) => c.name).join("_") ||
                  "N/A"
                }
              />
            </View>
          </View>
        ) : null}
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-purple-500 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Movie;
