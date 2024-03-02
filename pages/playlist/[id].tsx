import GradientLayout from "@/components/gradientLayout";
import SongTable from "@/components/songsTable";
import { validateToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

const getBackground = (id: any) => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "gray",
    "purple",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }: any) => {
  const color = getBackground(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs}></SongTable>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }: any) => {
  let user: any;

  try {
    user = validateToken(req.cookies.AUTH_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: JSON.parse(JSON.stringify({ playlist })),
  };
};

export default Playlist;
