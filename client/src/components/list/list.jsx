import Card from "../card/card";
import "./list.scss";

function List({ posts }) {
  // console.log("LIST:", posts);
  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
