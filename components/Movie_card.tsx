import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Movie_card = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="mb-6 w-[31%]">
        <Image
          source={
            poster_path
              ? { uri: `https://image.tmdb.org/t/p/w500${poster_path}` }
              : undefined
          }
          className="h-52 w-full rounded-lg bg-secondary"
          resizeMode="cover"
        />
        <Text className="mt-2 text-sm font-bold text-white" numberOfLines={2}>
          {title}
        </Text>
        <View className="mt-1 flex-row items-center justify-between">
          <Text className="text-xs text-light-200">
            {release_date ? release_date.slice(0, 4) : "Unknown year"}
          </Text>
          <Text className="text-xs text-light-200">
            {vote_average ? vote_average.toFixed(1) : "N/A"}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default Movie_card;
