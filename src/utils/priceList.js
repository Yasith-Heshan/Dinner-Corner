const size = {
  Small: 'Small',
  Full: 'Full',
};

const mealType = {
  Veg: 'එළවළු කෑම (Vegi Rice and Curry)',
  Egg: 'බිත්තර කෑම (Egg Rice and Curry)',
  Omelet: 'ඔම්ලට් (Omelet Rice and Curry)',
  Fish: 'මාළු කෑම (Fish Rice and Curry)',
  Chicken: 'කුකුල් මස් කෑම (Chicken Rice and Curry)',
  ChickenFriedRice: 'Chicken Fried Rice',
  YellowRice: 'කහබත්(Chicken)',
  EggKottu: 'Egg Kottu',
  ChickenKottu: 'Chicken Kottu',
};
export const pricesList = [
  {
    id: 1,
    type: mealType.Veg,
    size: size.Small,
    enoughFor: 1,
    price: 200,
  },

  {
    id: 2,
    type: mealType.Veg,
    size: size.Full,
    enoughFor: 2,
    price: 260,
  },

  {
    id: 3,
    type: mealType.Egg,
    size: size.Small,
    enoughFor: 1,
    price: 280,
  },

  {
    id: 4,
    type: mealType.Egg,
    size: size.Full,
    enoughFor: 2,
    price: 340,
  },

  {
    id: 5,
    type: mealType.Omelet,
    size: size.Small,
    enoughFor: 1,
    price: 300,
  },

  {
    id: 6,
    type: mealType.Omelet,
    size: size.Full,
    enoughFor: 2,
    price: 360,
  },

  {
    id: 7,
    type: mealType.Fish,
    size: size.Small,
    enoughFor: 1,
    price: 320,
  },

  {
    id: 8,
    type: mealType.Fish,
    size: size.Full,
    enoughFor: 2,
    price: 380,
  },

  {
    id: 9,
    type: mealType.Chicken,
    size: size.Small,
    enoughFor: 1,
    price: 320,
  },

  {
    id: 10,
    type: mealType.Chicken,
    size: size.Full,
    enoughFor: 2,
    price: 380,
  },

  {
    id: 11,
    type: mealType.ChickenFriedRice,
    size: size.Small,
    enoughFor: 1,
    price: 400,
  },
  {
    id: 12,
    type: mealType.ChickenFriedRice,
    size: size.Full,
    enoughFor: 2,
    price: 460,
  },
  {
    id: 13,
    type: mealType.YellowRice,
    size: size.Small,
    enoughFor: 1,
    price: 340,
  },
  {
    id: 14,
    type: mealType.YellowRice,
    size: size.Full,
    enoughFor: 2,
    price: 400,
  },
  // {
  //   id: 15,
  //   type: mealType.EggKottu,
  //   size: size.Small,
  //   enoughFor: 1,
  //   price: 350,
  // },
  // {
  //   id: 16,
  //   type: mealType.EggKottu,
  //   size: size.Full,
  //   enoughFor: 2,
  //   price: 400,
  // },
  // {
  //   id: 17,
  //   type: mealType.ChickenKottu,
  //   size: size.Small,
  //   enoughFor: 1,
  //   price: 450,
  // },
  // {
  //   id: 18,
  //   type: mealType.ChickenKottu,
  //   size: size.Full,
  //   enoughFor: 2,
  //   price: 500,
  // },
];
