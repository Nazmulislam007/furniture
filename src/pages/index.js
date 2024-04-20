export default function Home() {
   return <div />;
}

export const getServerSideProps = async () => ({
   redirect: {
      destination: '/vanities',
      permanent: true,
   },
});
