import Card from './Card';

function Cards({cards}) {

    return (
        <>
            {cards?.map((item, index) => (
                <Card key={index} user={item.user ? item.user : {'user_id': {'id': item?.sender?.id, 'user': item.sender}, type: 'sender'}} card={item}/>
            ))}
        </>
    );
}

export default Cards;
