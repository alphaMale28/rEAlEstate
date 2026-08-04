import axiosInstance from "./axios";

export const SinglePageLoader = async ({ request, params }) => {
  const res = await axiosInstance("/posts/" + params.id);
  return res.data;
};

export const ListPageLoader = async ({ request, params }) => {

  const url = new URL(request.url);
  const query = url.search;

  //   const res = await axiosInstance("/posts" + query);
  //   return res.data;

  const postPromise = axiosInstance("/posts" + query);
  return {
    postResponse: postPromise,
  };
};

export const ProfilePageLoader = async () => {
  const postPromise = axiosInstance("/users/profilePosts");
  return {
    postResponse: postPromise,
  };
};
