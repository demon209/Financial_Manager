import { graphQLrequest } from "./request";

export const foldersLoader = async () => {
  const query = `query Folders {
                      folders {
                        id
                        name
                        financial
                        createAt
                      }
                    }`;
  const data = await graphQLrequest({query})
  
  // const res = await fetch("http://localhost:4000/graphql", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   body: JSON.stringify({
  //     query,
  //   }),
  // });
  // const { data } = await res.json();
  return data;
};
