const size = {
    Small:'Small',
    Full:'Full'
}

const mealType = {
    Veg: 'එළවළු කෑම',
    Egg: 'බිත්තර කෑම',
    Fish: 'මාළු කෑම',
    Chicken: 'කුකුල් මස් කෑම',
    ChickenFriedRice: 'Chicken Fried Rice'
}
export const pricesList = [
    {
        id: 1,
        type:mealType.Veg,
        size:size.Small,
        enoughFor:1,
        price:150,
    },

    {
        id: 2,
        type:mealType.Veg,
        size:size.Full,
        enoughFor:2,
        price:200,
    },

    {
        id: 3,
        type:mealType.Egg,
        size:size.Small,
        enoughFor:1,
        price:220,
    },

    {
        id: 4,
        type:mealType.Egg,
        size:size.Full,
        enoughFor:2,
        price:280,
    },

    {
        id: 5,
        type:mealType.Fish,
        size:size.Small,
        enoughFor:1,
        price:230,
    },

    {
        id: 6,
        type:mealType.Fish,
        size:size.Full,
        enoughFor:2,
        price:280,
    },

    {
        id: 7,
        type:mealType.Chicken,
        size:size.Small,
        enoughFor:1,
        price:260,
    },

    {
        id: 8,
        type:mealType.Chicken,
        size:size.Full,
        enoughFor:2,
        price:320,
    },
    {
        id: 9,
        type:mealType.ChickenFriedRice,
        size:size.Small,
        enoughFor:1,
        price:250,
    },

]