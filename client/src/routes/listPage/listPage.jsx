import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { LoaderIcon } from "lucide-react";

import Card from "../../components/card/card";
import Filter from "../../components/filter/filter";
import Map from "../../components/map/map";

import "./listPage.scss";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />

          <Suspense fallback={<LoaderIcon className="loader" />}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error Loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <div className="wrapper">
          <Suspense fallback={<LoaderIcon className="loader" />}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error Loading posts!</p>}
            >
              {(postResponse) => <Map items={postResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
