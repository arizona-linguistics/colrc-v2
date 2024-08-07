const texts = [
  {
    id: 1,
    title: "Boy Takes Food",
    speaker: "Julia Antelope Nicodemus",
    cycle: "Tales with Historical Elements",
    rnumber: "46",
    tnumber: "47",
  },
  {
    id: 2,
    title: "Calling One's Kind",
    speaker: "Dorothy Nicodemus",
    cycle: "Coyote Cycle",
    rnumber: "17",
    tnumber: "9",
  },
  {
    id: 3,
    title: "Calling One's Kind",
    speaker: "Tom Miyal",
    cycle: "Coyote Cycle",
    rnumber: "17",
    tnumber: "9",
  },
  {
    id: 4,
    title: "Calling the Deer",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Coyote Cycle",
    rnumber: "16",
    tnumber: "5",
  },
  {
    id: 5,
    title: "Catbird",
    speaker: "Dorothy Nicodemus",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "22",
    tnumber: "23",
  },
  {
    id: 6,
    title: "Chief Child of the Root (Transformer)",
    speaker: "Dorothy Nicodemus",
    cycle: "Chief Child of the Root (Transformer)",
    rnumber: "1",
    tnumber: "1",
  },
  {
    id: 7,
    title: "Chipmunk and Snake (Contest for Winter and Spring)",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "32",
    tnumber: "33",
  },
  {
    id: 8,
    title: "Contest Between Cold and Heat",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "34",
    tnumber: "35",
  },
  {
    id: 9,
    title: "Coyote and Badger",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Coyote Cycle",
    rnumber: "15",
    tnumber: "17",
  },
  {
    id: 10,
    title: "Coyote and Fox Gamble with Fish",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Coyote Cycle",
    rnumber: "12",
    tnumber: "12",
  },
  {
    id: 11,
    title: "Coyote and Nighthawk Change Coats",
    speaker: "Dorothy Nicodemus",
    cycle: "Coyote Cycle",
    rnumber: "19",
    tnumber: "11",
  },
  {
    id: 12,
    title: "Coyote devours his own Children",
    speaker: "Dorothy Nicodemus",
    cycle: "Coyote Cycle",
    rnumber: "6",
    tnumber: "7",
  },
  {
    id: 13,
    title: "Coyote hunts with Crane and releases Salmon",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Coyote Cycle",
    rnumber: "8",
    tnumber: "19",
  },
  {
    id: 14,
    title: "Coyote imitates Magpie (Bungling Host)",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Coyote Cycle",
    rnumber: "14",
    tnumber: "14",
  },
  {
    id: 15,
    title: "Coyote kills Cricket with elk fat",
    speaker: "Dorothy Nicodemus",
    cycle: "Coyote Cycle",
    rnumber: "18",
    tnumber: "15",
  },
  {
    id: 16,
    title: "Coyote loses his Eyes (Eye Juggling)",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Coyote Cycle",
    rnumber: "7",
    tnumber: "8",
  },
  {
    id: 17,
    title: "Coyote marries Squirrel, sister of Goose",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed) ",
    cycle: "Coyote Cycle",
    rnumber: "13",
    tnumber: "13",
  },
  {
    id: 18,
    title: "Coyote overpowers Sun",
    speaker: "Dorothy Nicodemus",
    cycle: "Coyote Cycle",
    rnumber: "3",
    tnumber: "3",
  },
  {
    id: 19,
    title: "Coyote snares the Wind",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Coyote Cycle",
    rnumber: "12",
    tnumber: "18",
  },
  {
    id: 20,
    title: "Coyote steals his daughter-in-law",
    speaker: "Dorothy Nicodemus",
    cycle: "Coyote Cycle",
    rnumber: "4",
    tnumber: "4",
  },
  {
    id: 21,
    title: "Cricket rides Coyote",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Coyote Cycle",
    rnumber: "20",
    tnumber: "16",
  },
  {
    id: 22,
    title: "Dog goes for Fire",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "36",
    tnumber: "36",
  },
  {
    id: 23,
    title: "Dog husband",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Coyote Cycle",
    rnumber: "11",
    tnumber: "25",
  },
  {
    id: 24,
    title: "Elk and Snowshoe",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "33",
    tnumber: "34",
  },
  {
    id: 25,
    title: "Flathead Chief sends his daughter to Chief Waxane",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Tales with Historical Elements",
    rnumber: "41",
    tnumber: "42",
  },
  {
    id: 26,
    title: "Grizzly and his brothers-in-law",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "29",
    tnumber: "31",
  },
  {
    id: 27,
    title: "Little Beaver",
    speaker: "Dorothy Nicodemus",
    cycle: "Coyote Cycle",
    rnumber: "5",
    tnumber: "6",
  },
  {
    id: 28,
    title: "Little Mosquito",
    speaker: "Dorothy Nicodemus",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "28",
    tnumber: "30",
  },
  {
    id: 29,
    title: "Man caught in fire corral",
    speaker: "Dorothy Nicodemus",
    cycle: "Tales with historical elements",
    rnumber: "40",
    tnumber: "41",
  },
  {
    id: 30,
    title: "Muskrat trespasses",
    speaker: "Dorothy Nicodemus or Tom Miyal",
    cycle: "Texts not in Coyote cycle",
    rnumber: "30",
    tnumber: "",
  },
  {
    id: 31,
    title: "Origin of Indian Tribes (from Parts of Monster)",
    speaker: "Dorothy Nicodemus or Tom Miyal (uncomfirmed)",
    cycle: "Coyote Cycle",
    rnumber: "2",
    tnumber: "2",
  },
  {
    id: 32,
    title: "Rabbit and Jack Rabbit",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "35",
    tnumber: "37",
  },
  {
    id: 33,
    title: "Skunk and Fisher",
    speaker: "Dorothy Nicodemus or Tom Miyal (uncomfirmed)",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "23",
    tnumber: "22",
  },
  {
    id: 34,
    title: "Story of Lynx",
    speaker: "Tom Miyal",
    cycle: "Coyote Cycle",
    rnumber: "9a",
    tnumber: "20",
  },
  {
    id: 35,
    title: "Story of Lynx",
    speaker: "Dorothy Nicodemus",
    cycle: "Coyote Cycle",
    rnumber: "9b",
    tnumber: "21",
  },
  {
    id: 36,
    title: "The Coeur d'Alene attacked",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Tales with historical elements",
    rnumber: "45",
    tnumber: "46",
  },
  {
    id: 37,
    title: "The Couer d'Alene fight the Kutenai",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Tales with historical elements",
    rnumber: "45",
    tnumber: "46",
  },
  {
    id: 38,
    title: "The dwarf",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Tales with historical elements",
    rnumber: "39",
    tnumber: "49",
  },
  {
    id: 39,
    title: "The girls who stole dentalia (Kidnapping)",
    speaker: "Dorothy Nicodemus or Tom Miyal (uncomfirmed)",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "24",
    tnumber: "24",
  },
  {
    id: 40,
    title: "The practical joker",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Tales with historical elements",
    rnumber: "47",
    tnumber: "49",
  },
  {
    id: 41,
    title: "Thunder",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "25",
    tnumber: "26",
  },
  {
    id: 42,
    title: "Toad saves children",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "31",
    tnumber: "22",
  },
  {
    id: 43,
    title: "Turtle's war party",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Tales with historical elements",
    rnumber: "37",
    tnumber: "38",
  },
  {
    id: 44,
    title: "Two-headed snakes",
    speaker: "Dorothy Nicodemus",
    cycle: "Tales with historical elements",
    rnumber: "38",
    tnumber: "39",
  },
  {
    id: 45,
    title: "Two women overcome Nez Perce man",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Tales with historical elements",
    rnumber: "43",
    tnumber: "44",
  },
  {
    id: 46,
    title: "War between Blackfoot and the Coeur d'Alene",
    speaker: "Dorothy Nicodemus or Tom Miyal",
    cycle: "Tales with historical elements",
    rnumber: "48",
    tnumber: "43",
  },
  {
    id: 47,
    title: "War between Land and Water People",
    speaker: "Tom Miyal",
    cycle: "Coyote Cycle",
    rnumber: "10",
    tnumber: "29",
  },
  {
    id: 48,
    title: "Waterbird contests for women (Gift Test)",
    speaker: "Tom Miyal",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "26",
    tnumber: "27",
  },
  {
    id: 49,
    title: "Water Monster Woman",
    speaker: "Dorothy Nicodemus or Tom Miyal (unconfirmed)",
    cycle: "Myths not in the Coyote cycle",
    rnumber: "27",
    tnumber: "28",
  },
  {
    id: 50,
    title: "Woman saved by loose saddle cinch",
    speaker: "Julia Antelope Nicodemus",
    cycle: "Tales with historical elements",
    rnumber: "44",
    tnumber: "45",
  },
];
module.exports = {
  texts: texts,
};
