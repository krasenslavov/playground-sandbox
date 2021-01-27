import server from "../../../config/index";
import Link from "next/link";
import Meta from "../../../components/Meta";
import { useRouter } from "next/router";

const article = ({ article }) => {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <>
      <Meta title={article.title} description={article.excerpt} />
      <h1>{article.title}</h1>
      <p>{article.body}.</p>
      <hr />
      <Link href="/">&larr; Go Back</Link>
    </>
  );
};

// export const getServerSideProps = async (context) => {
// Get the content for all 100 posts and create
// them as static site with getStaticProps and GetStaticPaths
export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  );
  const article = await res.json();

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
  const articles = await res.json();

  const ids = articles.map((article) => article.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths: paths,
    fallback: false,
  };
};

// Using our own API to fetch articles /api

// export const getStaticProps = async (context) => {
//   const res = await fetch(`${server}/api/articles/${context.params.id}`);
//   const article = await res.json();

//   return {
//     props: {
//       article,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch(`${server}/api/articles/`);
//   const articles = await res.json();

//   const ids = articles.map((article) => article.id);
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }));

//   return {
//     paths: paths,
//     fallback: false,
//   };
// };

export default article;
