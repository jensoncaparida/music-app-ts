import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import GradientLayout from "@/components/gradientLayout";
const inter = Inter({ subsets: ["latin"] });
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { useMe } from "@/lib/hooks";
import prisma from "@/lib/prisma";

export default function Home({ artists }: any) {
  const { user, isLoading } = useMe();

  return (
    <GradientLayout
      color="red"
      roundImage
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      image="/profile.jpg"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2x1" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist: any) => (
            <Box paddingX="20px" key={artist.id} width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="15px">
                <Image
                  alt="img"
                  src="http://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  return {
    props: JSON.parse(JSON.stringify({ artists })),
  };
};
