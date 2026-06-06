import Card from "./Card";

function Cards({ cards }) {

  return (
    <>
      {cards?.map((item) => (
        <Card key={item?.user?.id} user={item.user} card={item}/>
      ))}
    </>
  );
}

export default Cards;
