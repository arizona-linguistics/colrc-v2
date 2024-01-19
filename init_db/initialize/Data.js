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
    rnumber: "21",
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
    rnumber: "9",
    tnumber: "20",
  },
  {
    id: 35,
    title: "Story of Lynx",
    speaker: "Dorothy Nicodemus",
    cycle: "Coyote Cycle",
    rnumber: "9",
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
const textfiles = [
  {
    id: 1,
    textId: 1,
    subdir: "BoyTakesFood",
    src: "BoyTakesFood_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 2,
    textId: 1,
    subdir: "BoyTakesFood",
    src: "BoyTakesFood_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 3,
    textId: 1,
    subdir: "BoyTakesFood",
    src: "BoyTakesFood_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 4,
    textId: 2,
    subdir: "CallingOnesKind",
    src: "CallingOnesKind__Dorthy_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 5,
    textId: 2,
    subdir: "CallingOnesKind",
    src: "CallingOnesKind__Dorthy_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 6,
    textId: 3,
    subdir: "CallingOnesKind",
    src: "CallingOnesKind__Tom_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 7,
    textId: 3,
    subdir: "CallingOnesKind",
    src: "CallingOnesKind__Tom_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 8,
    textId: 4,
    subdir: "CallingTheDeer",
    src: "CallingTheDeer_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 9,
    textId: 4,
    subdir: "CallingTheDeer",
    src: "CallingTheDeer_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 10,
    textId: 4,
    subdir: "CallingTheDeer",
    src: "CallingTheDeer_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 11,
    textId: 5,
    subdir: "Catbird",
    src: "Catbird_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 12,
    textId: 5,
    subdir: "Catbird",
    src: "Catbird_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 13,
    textId: 5,
    subdir: "Catbird",
    src: "Catbird_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 14,
    textId: 6,
    subdir: "ChiefChildOfTheRoot",
    src: "ChiefChildOfTheRoot_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 15,
    textId: 6,
    subdir: "ChiefChildOfTheRoot",
    src: "ChiefChildOfTheRoot_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 16,
    textId: 7,
    subdir: "ChipmunkAndSnake",
    src: "ChipmunkAndSnake_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 17,
    textId: 7,
    subdir: "ChipmunkAndSnake",
    src: "ChipmunkAndSnake_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 18,
    textId: 7,
    subdir: "ChipmunkAndSnake",
    src: "ChipmunkAndSnake_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 19,
    textId: 8,
    subdir: "ContestBetweenColdAndHeat",
    src: "ContestBetweenColdAndHeat_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 20,
    textId: 8,
    subdir: "ContestBetweenColdAndHeat",
    src: "ContestBetweenColdAndHeat_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 21,
    textId: 8,
    subdir: "ContestBetweenColdAndHeat",
    src: "ContestBetweenColdAndHeat_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 22,
    textId: 9,
    subdir: "CoyoteAndBadger",
    src: "CoyoteAndBadger_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 23,
    textId: 9,
    subdir: "CoyoteAndBadger",
    src: "CoyoteAndBadger_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 24,
    textId: 9,
    subdir: "CoyoteAndBadger",
    src: "CoyoteAndBadger_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 25,
    textId: 10,
    subdir: "CoyoteAndFoxGambleWithFish",
    src: "CoyoteAndFoxGambleWithFish_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 26,
    textId: 10,
    subdir: "CoyoteAndFoxGambleWithFish",
    src: "CoyoteAndFoxGambleWithFish_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 27,
    textId: 11,
    subdir: "CoyoteAndNighthawkChangeCoats",
    src: "CoyoteAndNighthawkChangeCoats_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 28,
    textId: 11,
    subdir: "CoyoteAndNighthawkChangeCoats",
    src: "CoyoteAndNighthawkChangeCoats_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 29,
    textId: 11,
    subdir: "CoyoteAndNighthawkChangeCoats",
    src: "CoyoteAndNighthawkChangeCoats_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 30,
    textId: 12,
    subdir: "CoyoteDevoursHisOwnChildren",
    src: "CoyoteDevoursHisOwnChildren_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 31,
    textId: 12,
    subdir: "CoyoteDevoursHisOwnChildren",
    src: "CoyoteDevoursHisOwnChildren_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 32,
    textId: 12,
    subdir: "CoyoteDevoursHisOwnChildren",
    src: "CoyoteDevoursHisOwnChildren_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 33,
    textId: 13,
    subdir: "CoyoteHuntsWithCraneAndReleasesSalmon",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 34,
    textId: 13,
    subdir: "CoyoteHuntsWithCraneAndReleasesSalmon",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 35,
    textId: 13,
    subdir: "CoyoteHuntsWithCraneAndReleasesSalmon",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 36,
    textId: 14,
    subdir: "CoyoteImitatesMagpie",
    src: "CoyoteImitatesMagpie_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 37,
    textId: 14,
    subdir: "CoyoteImitatesMagpie",
    src: "CoyoteImitatesMagpie_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 38,
    textId: 14,
    subdir: "CoyoteImitatesMagpie",
    src: "CoyoteImitatesMagpie_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 39,
    textId: 15,
    subdir: "CoyoteKillsCricketWithElkFat",
    src: "CoyoteKillsCricketWithElkFat_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 40,
    textId: 15,
    subdir: "CoyoteKillsCricketWithElkFat",
    src: "CoyoteKillsCricketWithElkFat_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 41,
    textId: 15,
    subdir: "CoyoteKillsCricketWithElkFat",
    src: "CoyoteKillsCricketWithElkFat_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 42,
    textId: 16,
    subdir: "CoyoteLosesHisEyes",
    src: "CoyoteLosesHisEyes_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 43,
    textId: 16,
    subdir: "CoyoteLosesHisEyes",
    src: "CoyoteLosesHisEyes_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 44,
    textId: 17,
    subdir: "CoyoteMarriesSquirrelSisterOfGoose",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 45,
    textId: 17,
    subdir: "CoyoteMarriesSquirrelSisterOfGoose",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 46,
    textId: 17,
    subdir: "CoyoteMarriesSquirrelSisterOfGoose",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 47,
    textId: 18,
    subdir: "CoyoteOverpowersSun",
    src: "CoyoteOverpowersSun_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 48,
    textId: 18,
    subdir: "CoyoteOverpowersSun",
    src: "CoyoteOverpowersSun_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 49,
    textId: 18,
    subdir: "CoyoteOverpowersSun",
    src: "CoyoteOverpowersSun_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 50,
    textId: 19,
    subdir: "CoyoteSnaresTheWind",
    src: "CoyoteSnaresTheWind_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 51,
    textId: 19,
    subdir: "CoyoteSnaresTheWind",
    src: "CoyoteSnaresTheWind_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 52,
    textId: 19,
    subdir: "CoyoteSnaresTheWind",
    src: "CoyoteSnaresTheWind_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 53,
    textId: 20,
    subdir: "CoyoteStealsHisDaughterInLaw",
    src: "CoyoteStealsHisDaughterInLaw_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 54,
    textId: 20,
    subdir: "CoyoteStealsHisDaughterInLaw",
    src: "CoyoteStealsHisDaughterInLaw_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 55,
    textId: 20,
    subdir: "CoyoteStealsHisDaughterInLaw",
    src: "CoyoteStealsHisDaughterInLaw_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 56,
    textId: 21,
    subdir: "CricketRidesCoyote",
    src: "CricketRidesCoyote_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 57,
    textId: 21,
    subdir: "CricketRidesCoyote",
    src: "CricketRidesCoyote_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 58,
    textId: 21,
    subdir: "CricketRidesCoyote",
    src: "CricketRidesCoyote_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 59,
    textId: 22,
    subdir: "DogGoesForFire",
    src: "DogGoesForFire_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 60,
    textId: 22,
    subdir: "DogGoesForFire",
    src: "DogGoesForFire_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 61,
    textId: 22,
    subdir: "DogGoesForFire",
    src: "DogGoesForFire_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 62,
    textId: 23,
    subdir: "DogHusband",
    src: "DogHusband_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 63,
    textId: 23,
    subdir: "DogHusband",
    src: "DogHusband_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 64,
    textId: 24,
    subdir: "ElkAndSnowshoe",
    src: "ElkAndSnowshoe_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 65,
    textId: 24,
    subdir: "ElkAndSnowshoe",
    src: "ElkAndSnowshoe_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 66,
    textId: 24,
    subdir: "ElkAndSnowshoe",
    src: "ElkAndSnowshoe_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 67,
    textId: 25,
    subdir: "FlatheadChiefSendsHisDaughterToChiefWaxane",
    src: "FlatheadChiefSendsHisDaugherToChiefWaxane_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 68,
    textId: 25,
    subdir: "FlatheadChiefSendsHisDaughterToChiefWaxane",
    src: "FlatheadChiefSendsHisDaugherToChiefWaxane_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 69,
    textId: 25,
    subdir: "FlatheadChiefSendsHisDaughterToChiefWaxane",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 70,
    textId: 26,
    subdir: "GrizzlyAndHisBrothersInLaw",
    src: "GrizzlyAndHisBrothersInLaw_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 71,
    textId: 26,
    src: "GrizzlyAndHisBrothersInLaw_Hand.pdf",
    subdir: "GrizzlyAndHisBrothersInLaw",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 72,
    textId: 26,
    subdir: "GrizzlyAndHisBrothersInLaw",
    src: "GrizzlyAndHisBrothersInLaw_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 73,
    textId: 27,
    subdir: "LittleBeaver",
    src: "LittleBeaver_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 74,
    textId: 27,
    subdir: "LittleBeaver",
    src: "LittleBeaver_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 75,
    textId: 27,
    subdir: "LittleBeaver",
    src: "LittleBeaver_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 76,
    textId: 28,
    subdir: "LittleMosquito",
    src: "LittleMosquito_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 77,
    textId: 28,
    subdir: "LittleMosquito",
    src: "LittleMosquito_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 78,
    textId: 28,
    subdir: "LittleMosquito",
    src: "LittleMosquito_Typed.pdf ",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 79,
    textId: 29,
    subdir: "ManCaughtInFireCorral",
    src: "ManCaughtInFireCorral_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 80,
    textId: 29,
    subdir: "ManCaughtInFireCorral",
    src: "ManCaughtInFireCorral_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 81,
    textId: 29,
    subdir: "ManCaughtInFireCorral",
    src: "ManCaughtInFireCorral_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 82,
    textId: 30,
    subdir: "MuskratTrespasses",
    src: "MuskratTrespasses_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 83,
    textId: 30,
    subdir: "MuskratTrespasses",
    src: "MuskratTrespasses_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 84,
    textId: 31,
    subdir: "OriginOfIndianTribes",
    src: "OriginOfIndianTribes_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 85,
    textId: 31,
    subdir: "OriginOfIndianTribes",
    src: "OriginOfIndianTribes_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 86,
    textId: 31,
    subdir: "OriginOfIndianTribes",
    src: "OriginOfIndianTribes_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 87,
    textId: 32,
    subdir: "RabbitAndJackRabbit",
    src: "RabbitAndJackRabbit_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 88,
    textId: 32,
    subdir: "RabbitAndJackRabbit",
    src: "RabbitAndJackRabbit_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 89,
    textId: 32,
    subdir: "RabbitAndJackRabbit",
    src: "RabbitAndJackRabbit_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 90,
    textId: 33,
    subdir: "SkunkAndFisher",
    src: "SkunkAndFisher_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 91,
    textId: 33,
    subdir: "SkunkAndFisher",
    src: "SkunkAndFisher_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 92,
    textId: 33,
    subdir: "SkunkAndFisher",
    src: "SkunkAndFisher_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 93,
    textId: 35,
    subdir: "StoryOfLynx",
    src: "StoryOfLynx__Dorthy_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 94,
    textId: 35,
    subdir: "StoryOfLynx",
    src: "StoryOfLynx__Dorthy_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 95,
    textId: 35,
    subdir: "StoryOfLynx",
    src: "StoryOfLynx__Dorthy_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 96,
    textId: 34,
    subdir: "StoryOfLynx",
    src: "StoryOfLynx__Tom_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 97,
    textId: 34,
    subdir: "StoryOfLynx",
    src: "StoryOfLynx__Tom_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 98,
    textId: 34,
    subdir: "StoryOfLynx",
    src: "StoryOfLynx__Tom_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 99,
    textId: 36,
    subdir: "TheCoeurDAleneAttacked",
    src: "TheCoeurDAleneAttacked_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 100,
    textId: 36,
    subdir: "TheCoeurDAleneAttacked",
    src: "TheCoeurDAleneAttacked_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 101,
    textId: 36,
    subdir: "TheCoeurDAleneAttacked",
    src: "TheCoeurDAleneAttacked_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 102,
    textId: 37,
    subdir: "TheCouerDAleneFightTheKutenai",
    src: "TheCoeurDAleneFightTheKutenai_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 103,
    textId: 37,
    subdir: "TheCouerDAleneFightTheKutenai",
    src: "TheCoeurDAleneFightTheKutenai_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 104,
    textId: 37,
    subdir: "TheCouerDAleneFightTheKutenai",
    src: "TheCoeurDAleneFightTheKutenai_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 105,
    textId: 38,
    subdir: "TheDwarf",
    src: "TheDwarf_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 106,
    textId: 38,
    subdir: "TheDwarf",
    src: "TheDwarf_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 107,
    textId: 39,
    subdir: "TheGirlsWhoStoleDentalia",
    src: "TheGirlsWhoStoleDentalia_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 108,
    textId: 39,
    subdir: "TheGirlsWhoStoleDentalia",
    src: "TheGirlsWhoStoleDentalia_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 109,
    textId: 39,
    subdir: "TheGirlsWhoStoleDentalia",
    src: "TheGirlsWhoStoleDentalia_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 110,
    textId: 40,
    subdir: "ThePracticalJoker",
    src: "ThePracticalJoker_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 111,
    textId: 40,
    subdir: "ThePracticalJoker",
    src: "ThePracticalJoker_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 112,
    textId: 40,
    subdir: "ThePracticalJoker",
    src: "ThePracticalJoker_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 113,
    textId: 41,
    subdir: "Thunder",
    src: "Thunder_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 114,
    textId: 41,
    subdir: "Thunder",
    src: "Thunder_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 115,
    textId: 41,
    subdir: "Thunder",
    src: "Thunder_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 116,
    textId: 42,
    subdir: "ToadSavesChildren",
    src: "ToadSavesChildren_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 117,
    textId: 42,
    subdir: "ToadSavesChildren",
    src: "ToadSavesChildren_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 118,
    textId: 42,
    subdir: "ToadSavesChildren",
    src: "ToadSavesChildren_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 119,
    textId: 43,
    subdir: "TurtlesWarParty",
    src: "TurtlesWarParty_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 120,
    textId: 43,
    subdir: "TurtlesWarParty",
    src: "TurtlesWarParty_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 121,
    textId: 43,
    subdir: "TurtlesWarParty",
    src: "TurtlesWarParty_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 122,
    textId: 44,
    subdir: "TwoHeadedSnakes",
    src: "TwoHeadedSnakes_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 123,
    textId: 44,
    subdir: "TwoHeadedSnakes",
    src: "TwoHeadedSnakes_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 124,
    textId: 44,
    subdir: "TwoHeadedSnakes",
    src: "TwoHeadedSnakes_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 125,
    textId: 45,
    subdir: "TwoWomenOvercomeNezPerceMan",
    src: "TwoWomenOvercomeNezPerceMan_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 126,
    textId: 45,
    subdir: "TwoWomenOvercomeNezPerceMan",
    src: "TwoWomenOvercomeNezPerceMan_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 127,
    textId: 45,
    subdir: "TwoWomenOvercomeNezPerceMan",
    src: "TwoWomenOvercomeNezPerceMan_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 128,
    textId: 46,
    subdir: "WarBetweenBlackfootAndTheCoeurDAlene",
    src: "WarBetweenBlackfootAndTheCoeurDAlene_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 129,
    textId: 46,
    subdir: "WarBetweenBlackfootAndTheCoeurDAlene",
    src: "WarBetweenBlackfootAndTheCoeurDAlene_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 130,
    textId: 47,
    subdir: "WarBetweenLandAndWaterPeople",
    src: "WarBetweenLandAndWaterPeople_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 131,
    textId: 47,
    subdir: "WarBetweenLandAndWaterPeople",
    src: "WarBetweenLandAndWaterPeople_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 132,
    textId: 47,
    subdir: "WarBetweenLandAndWaterPeople",
    src: "WarBetweenLandAndWater_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 133,
    textId: 48,
    subdir: "WaterbirdContestsForWomen",
    src: "WaterbirdContestsForWomen_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 134,
    textId: 48,
    subdir: "WaterbirdContestsForWomen",
    src: "WaterbirdContestsForWomen_Hand.pdf",
    resType: "Handwritten Fieldnotes",
    msType: "Handwritten",
    fileType: "pdf",
  },
  {
    id: 135,
    textId: 48,
    subdir: "WaterbirdContestsForWomen",
    src: "WaterbirdContestsForWomen_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 136,
    textId: 49,
    subdir: "WaterMonsterWoman",
    src: "WaterMonsterWoman_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 137,
    textId: 49,
    subdir: "WaterMonsterWoman",
    src: "WaterMonsterWoman_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
  {
    id: 138,
    textId: 50,
    subdir: "WomanSavedByLooseSaddleCinch",
    src: "WomanSavedByLooseSaddleCinch_Engl.pdf",
    resType: "English Translation",
    msType: "English",
    fileType: "pdf",
  },
  {
    id: 139,
    textId: 50,
    subdir: "WomanSavedByLooseSaddleCinch",
    src: "WomanSavedByLooseSaddleCinch_Typed.pdf",
    resType: "Typed Manuscript",
    msType: "Typed",
    fileType: "pdf",
  },
];

const textimages = [
  {
    textfileId: 1,
    subdir: "BoyTakesFood/BoyTakesFood_Engl_Images",
    src: "BoyTakesFood_Engl_Images1.png",
  },
  {
    textfileId: 1,
    subdir: "BoyTakesFood/BoyTakesFood_Engl_Images",
    src: "BoyTakesFood_Engl_Images2.png",
  },
  {
    textfileId: 2,
    subdir: "BoyTakesFood/BoyTakesFood_Hand_Images",
    src: "BoyTakesFood_Hand_Images1.png",
  },
  {
    textfileId: 2,
    subdir: "BoyTakesFood/BoyTakesFood_Hand_Images",
    src: "BoyTakesFood_Hand_Images2.png",
  },
  {
    textfileId: 2,
    subdir: "BoyTakesFood/BoyTakesFood_Hand_Images",
    src: "BoyTakesFood_Hand_Images3.png",
  },
  {
    textfileId: 2,
    subdir: "BoyTakesFood/BoyTakesFood_Hand_Images",
    src: "BoyTakesFood_Hand_Images4.png",
  },
  {
    textfileId: 2,
    subdir: "BoyTakesFood/BoyTakesFood_Hand_Images",
    src: "BoyTakesFood_Hand_Images5.png",
  },
  {
    textfileId: 2,
    subdir: "BoyTakesFood/BoyTakesFood_Hand_Images",
    src: "BoyTakesFood_Hand_Images6.png",
  },
  {
    textfileId: 2,
    subdir: "BoyTakesFood/BoyTakesFood_Hand_Images",
    src: "BoyTakesFood_Hand_Images7.png",
  },
  {
    textfileId: 3,
    subdir: "BoyTakesFood/BoyTakesFood_Typed_Images",
    src: "BoyTakesFood_Typed_Images1.png",
  },
  {
    textfileId: 3,
    subdir: "BoyTakesFood/BoyTakesFood_Typed_Images",
    src: "BoyTakesFood_Typed_Images2.png",
  },
  {
    textfileId: 3,
    subdir: "BoyTakesFood/BoyTakesFood_Typed_Images",
    src: "BoyTakesFood_Typed_Images3.png",
  },
  {
    textfileId: 3,
    subdir: "BoyTakesFood/BoyTakesFood_Typed_Images",
    src: "BoyTakesFood_Typed_Images4.png",
  },
  {
    textfileId: 4,
    subdir: "CallingOnesKind/CallingOnesKind__Dorthy_Engl_Images",
    src: "CallingOnesKind__Dorthy_Engl_Images.png",
  },
  {
    textfileId: 5,
    subdir: "CallingOnesKind/CallingOnesKind__Dorthy_Typed_Images",
    src: "CallingOnesKind__Dorthy_Typed_Images1.png",
  },
  {
    textfileId: 5,
    subdir: "CallingOnesKind/CallingOnesKind__Dorthy_Typed_Images",
    src: "CallingOnesKind__Dorthy_Typed_Images2.png",
  },
  {
    textfileId: 5,
    subdir: "CallingOnesKind/CallingOnesKind__Dorthy_Typed_Images",
    src: "CallingOnesKind__Dorthy_Typed_Images3.png",
  },
  {
    textfileId: 5,
    subdir: "CallingOnesKind/CallingOnesKind__Dorthy_Typed_Images",
    src: "CallingOnesKind__Dorthy_Typed_Images4.png",
  },
  {
    textfileId: 5,
    subdir: "CallingOnesKind/CallingOnesKind__Dorthy_Typed_Images",
    src: "CallingOnesKind__Dorthy_Typed_Images5.png",
  },
  {
    textfileId: 6,
    subdir: "CallingOnesKind/CallingOnesKind__Tom_Engl_Images",
    src: "CallingOnesKind__Tom_Engl_Images.png",
  },
  {
    textfileId: 7,
    subdir: "CallingOnesKind/CallingOnesKind__Tom_Typed_Images",
    src: "CallingOnesKind__Tom_Typed_Images1.png",
  },
  {
    textfileId: 7,
    subdir: "CallingOnesKind/CallingOnesKind__Tom_Typed_Images",
    src: "CallingOnesKind__Tom_Typed_Images2.png",
  },
  {
    textfileId: 7,
    subdir: "CallingOnesKind/CallingOnesKind__Tom_Typed_Images",
    src: "CallingOnesKind__Tom_Typed_Images3.png",
  },
  {
    textfileId: 7,
    subdir: "CallingOnesKind/CallingOnesKind__Tom_Typed_Images",
    src: "CallingOnesKind__Tom_Typed_Images4.png",
  },
  {
    textfileId: 8,
    subdir: "CallingTheDeer/CallingTheDeer_Engl_Images",
    src: "CallingTheDeer_Engl_Images1.png",
  },
  {
    textfileId: 8,
    subdir: "CallingTheDeer/CallingTheDeer_Engl_Images",
    src: "CallingTheDeer_Engl_Images2.png",
  },
  {
    textfileId: 8,
    subdir: "CallingTheDeer/CallingTheDeer_Engl_Images",
    src: "CallingTheDeer_Engl_Images3.png",
  },
  {
    textfileId: 9,
    subdir: "CallingTheDeer/CallingTheDeer_Hand_Images",
    src: "CallingTheDeer_Hand_Images1.png",
  },
  {
    textfileId: 9,
    subdir: "CallingTheDeer/CallingTheDeer_Hand_Images",
    src: "CallingTheDeer_Hand_Images2.png",
  },
  {
    textfileId: 9,
    subdir: "CallingTheDeer/CallingTheDeer_Hand_Images",
    src: "CallingTheDeer_Hand_Images3.png",
  },
  {
    textfileId: 9,
    subdir: "CallingTheDeer/CallingTheDeer_Hand_Images",
    src: "CallingTheDeer_Hand_Images4.png",
  },
  {
    textfileId: 9,
    subdir: "CallingTheDeer/CallingTheDeer_Hand_Images",
    src: "CallingTheDeer_Hand_Images5.png",
  },
  {
    textfileId: 9,
    subdir: "CallingTheDeer/CallingTheDeer_Hand_Images",
    src: "CallingTheDeer_Hand_Images6.png",
  },
  {
    textfileId: 9,
    subdir: "CallingTheDeer/CallingTheDeer_Hand_Images",
    src: "CallingTheDeer_Hand_Images7.png",
  },
  {
    textfileId: 9,
    subdir: "CallingTheDeer/CallingTheDeer_Hand_Images",
    src: "CallingTheDeer_Hand_Images8.png",
  },
  {
    textfileId: 9,
    subdir: "CallingTheDeer/CallingTheDeer_Hand_Images",
    src: "CallingTheDeer_Hand_Images9.png",
  },
  {
    textfileId: 10,
    subdir: "CallingTheDeer/CallingTheDeer_Typed_Images",
    src: "CallingTheDeer_Typed_Images1.png",
  },
  {
    textfileId: 10,
    subdir: "CallingTheDeer/CallingTheDeer_Typed_Images",
    src: "CallingTheDeer_Typed_Images10.png",
  },
  {
    textfileId: 10,
    subdir: "CallingTheDeer/CallingTheDeer_Typed_Images",
    src: "CallingTheDeer_Typed_Images2.png",
  },
  {
    textfileId: 10,
    subdir: "CallingTheDeer/CallingTheDeer_Typed_Images",
    src: "CallingTheDeer_Typed_Images3.png",
  },
  {
    textfileId: 10,
    subdir: "CallingTheDeer/CallingTheDeer_Typed_Images",
    src: "CallingTheDeer_Typed_Images4.png",
  },
  {
    textfileId: 10,
    subdir: "CallingTheDeer/CallingTheDeer_Typed_Images",
    src: "CallingTheDeer_Typed_Images5.png",
  },
  {
    textfileId: 10,
    subdir: "CallingTheDeer/CallingTheDeer_Typed_Images",
    src: "CallingTheDeer_Typed_Images6.png",
  },
  {
    textfileId: 10,
    subdir: "CallingTheDeer/CallingTheDeer_Typed_Images",
    src: "CallingTheDeer_Typed_Images7.png",
  },
  {
    textfileId: 10,
    subdir: "CallingTheDeer/CallingTheDeer_Typed_Images",
    src: "CallingTheDeer_Typed_Images8.png",
  },
  {
    textfileId: 10,
    subdir: "CallingTheDeer/CallingTheDeer_Typed_Images",
    src: "CallingTheDeer_Typed_Images9.png",
  },
  {
    textfileId: 12,
    subdir: "Catbird/Catbird_Engl_Images",
    src: "Catbird_Engl_Images0.png",
  },
  {
    textfileId: 12,
    subdir: "Catbird/Catbird_Engl_Images",
    src: "Catbird_Engl_Images1.png",
  },
  {
    textfileId: 12,
    subdir: "Catbird/Catbird_Engl_Images",
    src: "Catbird_Engl_Images2.png",
  },
  {
    textfileId: 12,
    subdir: "Catbird/Catbird_Engl_Images",
    src: "Catbird_Engl_Images3.png",
  },
  {
    textfileId: 12,
    subdir: "Catbird/Catbird_Engl_Images",
    src: "Catbird_Engl_Images4.png",
  },
  {
    textfileId: 12,
    subdir: "Catbird/Catbird_Engl_Images",
    src: "Catbird_Engl_Images5.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images1.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images10.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images11.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images12.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images13.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images14.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images15.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images16.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images17.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images18.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images19.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images2.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images20.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images21.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images22.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images23.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images24.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images25.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images26.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images27.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images28.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images29.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images3.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images30.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images31.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images32.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images33.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images4.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images5.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images6.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images7.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images8.png",
  },
  {
    textfileId: 13,
    subdir: "Catbird/Catbird_Hand_Images",
    src: "Catbird_Hand_Images9.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images39.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images40.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images41.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images42.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images43.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images44.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images45.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images46.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images47.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images48.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images49.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images50.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images51.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images52.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images53.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images54.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images55.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images56.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images57.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images58.png",
  },
  {
    textfileId: 11,
    subdir: "Catbird/Catbird_Typed_Images",
    src: "Catbird_Typed_Images59.png",
  },
  {
    textfileId: 14,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Engl_Images",
    src: "ChiefChildOfTheRoot_Engl_Images60.png",
  },
  {
    textfileId: 14,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Engl_Images",
    src: "ChiefChildOfTheRoot_Engl_Images61.png",
  },
  {
    textfileId: 14,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Engl_Images",
    src: "ChiefChildOfTheRoot_Engl_Images62.png",
  },
  {
    textfileId: 14,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Engl_Images",
    src: "ChiefChildOfTheRoot_Engl_Images63.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images64.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images65.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images66.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images67.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images68.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images69.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images70.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images71.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images72.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images73.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images74.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images75.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images76.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images77.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images78.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images79.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images80.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images81.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images82.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images83.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images84.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images85.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images86.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images87.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images88.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images89.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images90.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images91.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images92.png",
  },
  {
    textfileId: 15,
    subdir: "ChiefChildOfTheRoot/ChiefChildOfTheRoot_Typed_Images",
    src: "ChiefChildOfTheRoot_Typed_Images93.png",
  },
  {
    textfileId: 17,
    subdir: "ChipmunkAndSnake/ChipmunkAndSnake_Engl_Images",
    src: "ChipmunkAndSnake_Engl_Images0.png",
  },
  {
    textfileId: 17,
    subdir: "ChipmunkAndSnake/ChipmunkAndSnake_Engl_Images",
    src: "ChipmunkAndSnake_Engl_Images1.png",
  },
  {
    textfileId: 18,
    subdir: "ChipmunkAndSnake/ChipmunkAndSnake_Hand_Images",
    src: "ChipmunkAndSnake_Hand_Images0.png",
  },
  {
    textfileId: 18,
    subdir: "ChipmunkAndSnake/ChipmunkAndSnake_Hand_Images",
    src: "ChipmunkAndSnake_Hand_Images1.png",
  },
  {
    textfileId: 18,
    subdir: "ChipmunkAndSnake/ChipmunkAndSnake_Hand_Images",
    src: "ChipmunkAndSnake_Hand_Images2.png",
  },
  {
    textfileId: 16,
    subdir: "ChipmunkAndSnake/ChipmunkAndSnake_Typed_Images",
    src: "ChipmunkAndSnake_Typed_Images0.png",
  },
  {
    textfileId: 16,
    subdir: "ChipmunkAndSnake/ChipmunkAndSnake_Typed_Images",
    src: "ChipmunkAndSnake_Typed_Images1.png",
  },
  {
    textfileId: 16,
    subdir: "ChipmunkAndSnake/ChipmunkAndSnake_Typed_Images",
    src: "ChipmunkAndSnake_Typed_Images2.png",
  },
  {
    textfileId: 20,
    subdir: "ContestBetweenColdAndHeat/ContestBetweenColdAndHeat_Engl_Images",
    src: "ContestBetweenColdAndHeat_Engl_Images0.png",
  },
  {
    textfileId: 20,
    subdir: "ContestBetweenColdAndHeat/ContestBetweenColdAndHeat_Engl_Images",
    src: "ContestBetweenColdAndHeat_Engl_Images1.png",
  },
  {
    textfileId: 19,
    subdir: "ContestBetweenColdAndHeat/ContestBetweenColdAndHeat_Hand_Images",
    src: "ContestBetweenColdAndHeat_Hand_Images0.png",
  },
  {
    textfileId: 19,
    subdir: "ContestBetweenColdAndHeat/ContestBetweenColdAndHeat_Hand_Images",
    src: "ContestBetweenColdAndHeat_Hand_Images1.png",
  },
  {
    textfileId: 19,
    subdir: "ContestBetweenColdAndHeat/ContestBetweenColdAndHeat_Hand_Images",
    src: "ContestBetweenColdAndHeat_Hand_Images2.png",
  },
  {
    textfileId: 19,
    subdir: "ContestBetweenColdAndHeat/ContestBetweenColdAndHeat_Hand_Images",
    src: "ContestBetweenColdAndHeat_Hand_Images3.png",
  },
  {
    textfileId: 21,
    subdir: "ContestBetweenColdAndHeat/ContestBetweenColdAndHeat_Typed_Images",
    src: "ContestBetweenColdAndHeat_Typed_Images0.png",
  },
  {
    textfileId: 21,
    subdir: "ContestBetweenColdAndHeat/ContestBetweenColdAndHeat_Typed_Images",
    src: "ContestBetweenColdAndHeat_Typed_Images1.png",
  },
  {
    textfileId: 21,
    subdir: "ContestBetweenColdAndHeat/ContestBetweenColdAndHeat_Typed_Images",
    src: "ContestBetweenColdAndHeat_Typed_Images2.png",
  },
  {
    textfileId: 22,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Engl_Images",
    src: "CoyoteAndBadger_Engl_Images0.png",
  },
  {
    textfileId: 23,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Hand_Images",
    src: "CoyoteAndBadger_Hand_Images0.png",
  },
  {
    textfileId: 23,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Hand_Images",
    src: "CoyoteAndBadger_Hand_Images1.png",
  },
  {
    textfileId: 23,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Hand_Images",
    src: "CoyoteAndBadger_Hand_Images2.png",
  },
  {
    textfileId: 23,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Hand_Images",
    src: "CoyoteAndBadger_Hand_Images3.png",
  },
  {
    textfileId: 23,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Hand_Images",
    src: "CoyoteAndBadger_Hand_Images4.png",
  },
  {
    textfileId: 23,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Hand_Images",
    src: "CoyoteAndBadger_Hand_Images5.png",
  },
  {
    textfileId: 23,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Hand_Images",
    src: "CoyoteAndBadger_Hand_Images6.png",
  },
  {
    textfileId: 24,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Typed_Images",
    src: "CoyoteAndBadger_Typed_Images0.png",
  },
  {
    textfileId: 24,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Typed_Images",
    src: "CoyoteAndBadger_Typed_Images1.png",
  },
  {
    textfileId: 24,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Typed_Images",
    src: "CoyoteAndBadger_Typed_Images2.png",
  },
  {
    textfileId: 24,
    subdir: "CoyoteAndBadger/CoyoteAndBadger_Typed_Images",
    src: "CoyoteAndBadger_Typed_Images3.png",
  },
  {
    textfileId: 25,
    subdir: "CoyoteAndFoxGambleWithFish/CoyoteAndFoxGambleWithFish_Engl_Images",
    src: "CoyoteAndFoxGambleWithFish_Engl_Images0.png",
  },
  {
    textfileId: 26,
    subdir:
      "CoyoteAndFoxGambleWithFish/CoyoteAndFoxGambleWithFish_Typed_Images",
    src: "CoyoteAndFoxGambleWithFish_Typed_Images0.png",
  },
  {
    textfileId: 26,
    subdir:
      "CoyoteAndFoxGambleWithFish/CoyoteAndFoxGambleWithFish_Typed_Images",
    src: "CoyoteAndFoxGambleWithFish_Typed_Images1.png",
  },
  {
    textfileId: 26,
    subdir:
      "CoyoteAndFoxGambleWithFish/CoyoteAndFoxGambleWithFish_Typed_Images",
    src: "CoyoteAndFoxGambleWithFish_Typed_Images2.png",
  },
  {
    textfileId: 26,
    subdir:
      "CoyoteAndFoxGambleWithFish/CoyoteAndFoxGambleWithFish_Typed_Images",
    src: "CoyoteAndFoxGambleWithFish_Typed_Images3.png",
  },
  {
    textfileId: 26,
    subdir:
      "CoyoteAndFoxGambleWithFish/CoyoteAndFoxGambleWithFish_Typed_Images",
    src: "CoyoteAndFoxGambleWithFish_Typed_Images4.png",
  },
  {
    textfileId: 26,
    subdir:
      "CoyoteAndFoxGambleWithFish/CoyoteAndFoxGambleWithFish_Typed_Images",
    src: "CoyoteAndFoxGambleWithFish_Typed_Images5.png",
  },
  {
    textfileId: 26,
    subdir:
      "CoyoteAndFoxGambleWithFish/CoyoteAndFoxGambleWithFish_Typed_Images",
    src: "CoyoteAndFoxGambleWithFish_Typed_Images6.png",
  },
  {
    textfileId: 27,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Engl_Images",
    src: "CoyoteAndNighthawkChangeCoats_Engl_Images0.png",
  },
  {
    textfileId: 27,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Engl_Images",
    src: "CoyoteAndNighthawkChangeCoats_Engl_Images1.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images0.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images1.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images10.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images11.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images12.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images13.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images14.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images15.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images16.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images17.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images18.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images19.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images2.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images20.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images3.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images4.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images5.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images6.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images7.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images8.png",
  },
  {
    textfileId: 28,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Hand_Images",
    src: "CoyoteAndNighthawkChangeCoats_Hand_Images9.png",
  },
  {
    textfileId: 29,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Typed_Images",
    src: "CoyoteAndNighthawkChangeCoats_Typed_Images1.png",
  },
  {
    textfileId: 29,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Typed_Images",
    src: "CoyoteAndNighthawkChangeCoats_Typed_Images2.png",
  },
  {
    textfileId: 29,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Typed_Images",
    src: "CoyoteAndNighthawkChangeCoats_Typed_Images3.png",
  },
  {
    textfileId: 29,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Typed_Images",
    src: "CoyoteAndNighthawkChangeCoats_Typed_Images4.png",
  },
  {
    textfileId: 29,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Typed_Images",
    src: "CoyoteAndNighthawkChangeCoats_Typed_Images5.png",
  },
  {
    textfileId: 29,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Typed_Images",
    src: "CoyoteAndNighthawkChangeCoats_Typed_Images6.png",
  },
  {
    textfileId: 29,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Typed_Images",
    src: "CoyoteAndNighthawkChangeCoats_Typed_Images7.png",
  },
  {
    textfileId: 29,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Typed_Images",
    src: "CoyoteAndNighthawkChangeCoats_Typed_Images8.png",
  },
  {
    textfileId: 29,
    subdir:
      "CoyoteAndNighthawkChangeCoats/CoyoteAndNighthawkChangeCoats_Typed_Images",
    src: "CoyoteAndNighthawkChangeCoats_Typed_Images9.png",
  },
  {
    textfileId: 30,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Engl_Images",
    src: "CoyoteDevoursHisOwnChildren_Engl_Images0.png",
  },
  {
    textfileId: 30,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Engl_Images",
    src: "CoyoteDevoursHisOwnChildren_Engl_Images1.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images0.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images1.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images10.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images11.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images12.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images13.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images14.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images15.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images16.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images17.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images18.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images19.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images2.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images20.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images21.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images3.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images4.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images5.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images6.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images7.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images8.png",
  },
  {
    textfileId: 31,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Hand_Images",
    src: "CoyoteDevoursHisOwnChildren_Hand_Images9.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images0.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images1.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images10.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images11.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images12.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images2.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images3.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images4.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images5.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images6.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images7.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images8.png",
  },
  {
    textfileId: 32,
    subdir:
      "CoyoteDevoursHisOwnChildren/CoyoteDevoursHisOwnChildren_Typed_Images",
    src: "CoyoteDevoursHisOwnChildren_Typed_Images9.png",
  },
  {
    textfileId: 33,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images0.png",
  },
  {
    textfileId: 33,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images1.png",
  },
  {
    textfileId: 33,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images2.png",
  },
  {
    textfileId: 33,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images3.png",
  },
  {
    textfileId: 33,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images4.png",
  },
  {
    textfileId: 33,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Engl_Images5.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images0.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images1.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images10.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images11.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images12.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images13.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images14.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images15.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images16.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images17.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images18.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images19.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images2.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images20.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images21.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images22.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images23.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images24.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images25.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images26.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images27.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images28.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images29.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images3.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images30.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images31.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images32.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images33.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images34.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images35.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images36.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images37.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images38.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images39.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images4.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images40.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images41.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images42.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images43.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images44.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images45.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images46.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images47.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images48.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images49.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images5.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images50.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images6.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images7.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images8.png",
  },
  {
    textfileId: 34,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Hand_Images9.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images0.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images1.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images10.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images11.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images12.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images13.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images14.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images15.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images16.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images17.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images18.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images19.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images2.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images20.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images21.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images3.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images4.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images5.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images6.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images7.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images8.png",
  },
  {
    textfileId: 35,
    subdir:
      "CoyoteHuntsWithCraneAndReleasesSalmon/CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images",
    src: "CoyoteHuntsWithCraneAndReleasesSalmon_Typed_Images9.png",
  },
  {
    textfileId: 36,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Engl_Images",
    src: "CoyoteImitatesMagpie_Engl_Images0.png",
  },
  {
    textfileId: 36,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Engl_Images",
    src: "CoyoteImitatesMagpie_Engl_Images1.png",
  },
  {
    textfileId: 37,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Hand_Images",
    src: "CoyoteImitatesMagpie_Hand_Images0.png",
  },
  {
    textfileId: 37,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Hand_Images",
    src: "CoyoteImitatesMagpie_Hand_Images1.png",
  },
  {
    textfileId: 37,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Hand_Images",
    src: "CoyoteImitatesMagpie_Hand_Images2.png",
  },
  {
    textfileId: 37,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Hand_Images",
    src: "CoyoteImitatesMagpie_Hand_Images3.png",
  },
  {
    textfileId: 37,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Hand_Images",
    src: "CoyoteImitatesMagpie_Hand_Images4.png",
  },
  {
    textfileId: 37,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Hand_Images",
    src: "CoyoteImitatesMagpie_Hand_Images5.png",
  },
  {
    textfileId: 37,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Hand_Images",
    src: "CoyoteImitatesMagpie_Hand_Images6.png",
  },
  {
    textfileId: 37,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Hand_Images",
    src: "CoyoteImitatesMagpie_Hand_Images7.png",
  },
  {
    textfileId: 38,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Typed_Images",
    src: "CoyoteImitatesMagpie_Typed_Images0.png",
  },
  {
    textfileId: 38,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Typed_Images",
    src: "CoyoteImitatesMagpie_Typed_Images1.png",
  },
  {
    textfileId: 38,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Typed_Images",
    src: "CoyoteImitatesMagpie_Typed_Images2.png",
  },
  {
    textfileId: 38,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Typed_Images",
    src: "CoyoteImitatesMagpie_Typed_Images3.png",
  },
  {
    textfileId: 38,
    subdir: "CoyoteImitatesMagpie/CoyoteImitatesMagpie_Typed_Images",
    src: "CoyoteImitatesMagpie_Typed_Images4.png",
  },
  {
    textfileId: 39,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Engl_Images",
    src: "CoyoteKillsCricketWithElkFat_Engl_Images0.png",
  },
  {
    textfileId: 39,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Engl_Images",
    src: "CoyoteKillsCricketWithElkFat_Engl_Images1.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images0.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images1.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images10.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images11.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images12.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images13.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images14.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images15.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images16.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images17.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images18.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images19.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images2.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images20.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images21.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images3.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images4.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images5.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images6.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images7.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images8.png",
  },
  {
    textfileId: 40,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Hand_Images",
    src: "CoyoteKillsCricketWithElkFat_Hand_Images9.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images0.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images1.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images10.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images11.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images2.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images3.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images4.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images5.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images6.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images7.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images8.png",
  },
  {
    textfileId: 41,
    subdir:
      "CoyoteKillsCricketWithElkFat/CoyoteKillsCricketWithElkFat_Typed_Images",
    src: "CoyoteKillsCricketWithElkFat_Typed_Images9.png",
  },
  {
    textfileId: 42,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Engl_Images",
    src: "CoyoteLosesHisEyes_Engl_Images0.png",
  },
  {
    textfileId: 42,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Engl_Images",
    src: "CoyoteLosesHisEyes_Engl_Images1.png",
  },
  {
    textfileId: 42,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Engl_Images",
    src: "CoyoteLosesHisEyes_Engl_Images2.png",
  },
  {
    textfileId: 42,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Engl_Images",
    src: "CoyoteLosesHisEyes_Engl_Images3.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images0.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images1.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images10.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images11.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images12.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images13.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images14.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images15.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images16.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images17.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images18.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images19.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images2.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images20.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images21.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images22.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images23.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images24.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images25.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images3.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images4.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images5.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images6.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images7.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images8.png",
  },
  {
    textfileId: 43,
    subdir: "CoyoteLosesHisEyes/CoyoteLosesHisEyes_Typed_Images",
    src: "CoyoteLosesHisEyes_Typed_Images9.png",
  },
  {
    textfileId: 44,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Engl_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Engl_Images0.png",
  },
  {
    textfileId: 44,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Engl_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Engl_Images1.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images0.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images1.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images10.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images11.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images12.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images13.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images14.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images2.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images3.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images4.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images5.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images6.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images7.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images8.png",
  },
  {
    textfileId: 45,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Hand_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Hand_Images9.png",
  },
  {
    textfileId: 46,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Typed_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Typed_Images0.png",
  },
  {
    textfileId: 46,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Typed_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Typed_Images1.png",
  },
  {
    textfileId: 46,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Typed_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Typed_Images2.png",
  },
  {
    textfileId: 46,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Typed_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Typed_Images3.png",
  },
  {
    textfileId: 46,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Typed_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Typed_Images4.png",
  },
  {
    textfileId: 46,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Typed_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Typed_Images5.png",
  },
  {
    textfileId: 46,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Typed_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Typed_Images6.png",
  },
  {
    textfileId: 46,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Typed_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Typed_Images7.png",
  },
  {
    textfileId: 46,
    subdir:
      "CoyoteMarriesSquirrelSisterOfGoose/CoyoteMarriesSquirrelSisterOfGoose_Typed_Images",
    src: "CoyoteMarriesSquirrelSisterOfGoose_Typed_Images8.png",
  },
  {
    textfileId: 47,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Engl_Images",
    src: "CoyoteOverpowersSun_Engl_Images0.png",
  },
  {
    textfileId: 47,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Engl_Images",
    src: "CoyoteOverpowersSun_Engl_Images1.png",
  },
  {
    textfileId: 47,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Engl_Images",
    src: "CoyoteOverpowersSun_Engl_Images2.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images0.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images1.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images10.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images11.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images12.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images13.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images14.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images15.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images16.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images17.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images18.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images19.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images2.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images20.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images21.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images22.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images23.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images24.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images25.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images26.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images27.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images28.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images29.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images3.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images30.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images31.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images32.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images33.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images34.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images35.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images36.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images37.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images38.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images39.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images4.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images40.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images41.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images5.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images6.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images7.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images8.png",
  },
  {
    textfileId: 48,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Hand_Images",
    src: "CoyoteOverpowersSun_Hand_Images9.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images0.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images1.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images10.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images11.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images12.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images13.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images14.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images2.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images3.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images4.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images5.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images6.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images7.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images8.png",
  },
  {
    textfileId: 49,
    subdir: "CoyoteOverpowersSun/CoyoteOverpowersSun_Typed_Images",
    src: "CoyoteOverpowersSun_Typed_Images9.png",
  },
  {
    textfileId: 50,
    subdir: "CoyoteSnaresTheWind/CoyoteSnaresTheWind_Engl_Images",
    src: "CoyoteSnaresTheWind_Engl_Images0.png",
  },
  {
    textfileId: 51,
    subdir: "CoyoteSnaresTheWind/CoyoteSnaresTheWind_Hand_Images",
    src: "CoyoteSnaresTheWind_Hand_Images0.png",
  },
  {
    textfileId: 51,
    subdir: "CoyoteSnaresTheWind/CoyoteSnaresTheWind_Hand_Images",
    src: "CoyoteSnaresTheWind_Hand_Images1.png",
  },
  {
    textfileId: 51,
    subdir: "CoyoteSnaresTheWind/CoyoteSnaresTheWind_Hand_Images",
    src: "CoyoteSnaresTheWind_Hand_Images2.png",
  },
  {
    textfileId: 51,
    subdir: "CoyoteSnaresTheWind/CoyoteSnaresTheWind_Hand_Images",
    src: "CoyoteSnaresTheWind_Hand_Images3.png",
  },
  {
    textfileId: 51,
    subdir: "CoyoteSnaresTheWind/CoyoteSnaresTheWind_Hand_Images",
    src: "CoyoteSnaresTheWind_Hand_Images4.png",
  },
  {
    textfileId: 51,
    subdir: "CoyoteSnaresTheWind/CoyoteSnaresTheWind_Hand_Images",
    src: "CoyoteSnaresTheWind_Hand_Images5.png",
  },
  {
    textfileId: 52,
    subdir: "CoyoteSnaresTheWind/CoyoteSnaresTheWind_Typed_Images",
    src: "CoyoteSnaresTheWind_Typed_Images0.png",
  },
  {
    textfileId: 52,
    subdir: "CoyoteSnaresTheWind/CoyoteSnaresTheWind_Typed_Images",
    src: "CoyoteSnaresTheWind_Typed_Images1.png",
  },
  {
    textfileId: 52,
    subdir: "CoyoteSnaresTheWind/CoyoteSnaresTheWind_Typed_Images",
    src: "CoyoteSnaresTheWind_Typed_Images2.png",
  },
  {
    textfileId: 53,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Engl_Images",
    src: "CoyoteStealsHisDaughterInLaw_Engl_Images0.png",
  },
  {
    textfileId: 53,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Engl_Images",
    src: "CoyoteStealsHisDaughterInLaw_Engl_Images1.png",
  },
  {
    textfileId: 53,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Engl_Images",
    src: "CoyoteStealsHisDaughterInLaw_Engl_Images2.png",
  },
  {
    textfileId: 53,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Engl_Images",
    src: "CoyoteStealsHisDaughterInLaw_Engl_Images3.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images0.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images1.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images10.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images11.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images12.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images13.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images14.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images15.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images16.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images17.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images18.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images19.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images2.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images20.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images21.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images22.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images23.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images24.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images25.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images26.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images27.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images28.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images29.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images3.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images30.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images31.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images32.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images33.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images34.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images35.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images4.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images5.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images6.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images7.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images8.png",
  },
  {
    textfileId: 54,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Hand_Images",
    src: "CoyoteStealsHisDaughterInLaw_Hand_Images9.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images0.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images1.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images10.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images11.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images12.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images2.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images3.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images4.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images5.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images6.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images7.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images8.png",
  },
  {
    textfileId: 55,
    subdir:
      "CoyoteStealsHisDaughterInLaw/CoyoteStealsHisDaughterInLaw_Typed_Images",
    src: "CoyoteStealsHisDaughterInLaw_Typed_Images9.png",
  },
  {
    textfileId: 56,
    subdir: "CricketRidesCoyote/CricketRidesCoyote_Engl_Images",
    src: "CricketRidesCoyote_Engl_Images.png",
  },
  {
    textfileId: 57,
    subdir: "CricketRidesCoyote/CricketRidesCoyote_Hand_Images",
    src: "CricketRidesCoyote_Hand_Images1.png",
  },
  {
    textfileId: 57,
    subdir: "CricketRidesCoyote/CricketRidesCoyote_Hand_Images",
    src: "CricketRidesCoyote_Hand_Images2.png",
  },
  {
    textfileId: 57,
    subdir: "CricketRidesCoyote/CricketRidesCoyote_Hand_Images",
    src: "CricketRidesCoyote_Hand_Images3.png",
  },
  {
    textfileId: 57,
    subdir: "CricketRidesCoyote/CricketRidesCoyote_Hand_Images",
    src: "CricketRidesCoyote_Hand_Images4.png",
  },
  {
    textfileId: 57,
    subdir: "CricketRidesCoyote/CricketRidesCoyote_Hand_Images",
    src: "CricketRidesCoyote_Hand_Images5.png",
  },
  {
    textfileId: 57,
    subdir: "CricketRidesCoyote/CricketRidesCoyote_Hand_Images",
    src: "CricketRidesCoyote_Hand_Images6.png",
  },
  {
    textfileId: 58,
    subdir: "CricketRidesCoyote/CricketRidesCoyote_Typed_Images",
    src: "CricketRidesCoyote_Typed_Images1.png",
  },
  {
    textfileId: 58,
    subdir: "CricketRidesCoyote/CricketRidesCoyote_Typed_Images",
    src: "CricketRidesCoyote_Typed_Images2.png",
  },
  {
    textfileId: 58,
    subdir: "CricketRidesCoyote/CricketRidesCoyote_Typed_Images",
    src: "CricketRidesCoyote_Typed_Images3.png",
  },
  {
    textfileId: 59,
    subdir: "DogGoesForFire/DogGoesForFire_Engl_Images",
    src: "DogGoesForFire_Engl_Images0.png",
  },
  {
    textfileId: 59,
    subdir: "DogGoesForFire/DogGoesForFire_Engl_Images",
    src: "DogGoesForFire_Engl_Images1.png",
  },
  {
    textfileId: 60,
    subdir: "DogGoesForFire/DogGoesForFire_Hand_Images",
    src: "DogGoesForFire_Hand_Images0.png",
  },
  {
    textfileId: 60,
    subdir: "DogGoesForFire/DogGoesForFire_Hand_Images",
    src: "DogGoesForFire_Hand_Images1.png",
  },
  {
    textfileId: 61,
    subdir: "DogGoesForFire/DogGoesForFire_Typed_Images",
    src: "DogGoesForFire_Typed_Images0.png",
  },
  {
    textfileId: 61,
    subdir: "DogGoesForFire/DogGoesForFire_Typed_Images",
    src: "DogGoesForFire_Typed_Images1.png",
  },

  {
    textfileId: 62,
    subdir: "DogHusband/DogHusband_Engl_Images",
    src: "DogHusband_Engl_Images0.png",
  },
  {
    textfileId: 62,
    subdir: "DogHusband/DogHusband_Engl_Images",
    src: "DogHusband_Engl_Images1.png",
  },
  {
    textfileId: 62,
    subdir: "DogHusband/DogHusband_Engl_Images",
    src: "DogHusband_Engl_Images2.png",
  },
  {
    textfileId: 62,
    subdir: "DogHusband/DogHusband_Engl_Images",
    src: "DogHusband_Engl_Images3.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images0.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images1.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images10.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images11.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images2.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images3.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images4.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images5.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images6.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images7.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images8.png",
  },
  {
    textfileId: 63,
    subdir: "DogHusband/DogHusband_Typed_Images",
    src: "DogHusband_Typed_Images9.png",
  },
  {
    textfileId: 64,
    subdir: "ElkAndSnowshoe/ElkAndSnowshoe_Engl_Images",
    src: "ElkAndSnowshoe_Engl_Images0.png",
  },
  {
    textfileId: 65,
    subdir: "ElkAndSnowshoe/ElkAndSnowshoe_Hand_Images",
    src: "ElkAndSnowshoe_Hand_Images0.png",
  },
  {
    textfileId: 65,
    subdir: "ElkAndSnowshoe/ElkAndSnowshoe_Hand_Images",
    src: "ElkAndSnowshoe_Hand_Images1.png",
  },
  {
    textfileId: 65,
    subdir: "ElkAndSnowshoe/ElkAndSnowshoe_Hand_Images",
    src: "ElkAndSnowshoe_Hand_Images2.png",
  },
  {
    textfileId: 65,
    subdir: "ElkAndSnowshoe/ElkAndSnowshoe_Hand_Images",
    src: "ElkAndSnowshoe_Hand_Images3.png",
  },
  {
    textfileId: 65,
    subdir: "ElkAndSnowshoe/ElkAndSnowshoe_Hand_Images",
    src: "ElkAndSnowshoe_Hand_Images4.png",
  },
  {
    textfileId: 66,
    subdir: "ElkAndSnowshoe/ElkAndSnowshoe_Typed_Images",
    src: "ElkAndSnowshoe_Typed_Images0.png",
  },
  {
    textfileId: 66,
    subdir: "ElkAndSnowshoe/ElkAndSnowshoe_Typed_Images",
    src: "ElkAndSnowshoe_Typed_Images1.png",
  },
  {
    textfileId: 66,
    subdir: "ElkAndSnowshoe/ElkAndSnowshoe_Typed_Images",
    src: "ElkAndSnowshoe_Typed_Images2.png",
  },
  {
    textfileId: 66,
    subdir: "ElkAndSnowshoe/ElkAndSnowshoe_Typed_Images",
    src: "ElkAndSnowshoe_Typed_Images3.png",
  },
  {
    textfileId: 69,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Engl_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Engl_Images0.png",
  },
  {
    textfileId: 69,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Engl_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Engl_Images1.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images0.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images1.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images10.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images11.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images12.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images2.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images3.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images4.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images5.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images6.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images7.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images8.png",
  },
  {
    textfileId: 67,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Hand_Images9.png",
  },
  {
    textfileId: 68,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images0.png",
  },
  {
    textfileId: 68,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images1.png",
  },
  {
    textfileId: 68,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images2.png",
  },
  {
    textfileId: 68,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images3.png",
  },
  {
    textfileId: 68,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images4.png",
  },
  {
    textfileId: 68,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images5.png",
  },
  {
    textfileId: 68,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images6.png",
  },
  {
    textfileId: 68,
    subdir:
      "FlatheadChiefSendsHisDaughterToChiefWaxane/FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images",
    src: "FlatheadChiefSendsHisDaughterToChiefWaxane_Typed_Images7.png",
  },
  {
    textfileId: 70,
    subdir: "GrizzlyAndHisBrothersInLaw/GrizzlyAndHisBrothersInLaw_Engl_Images",
    src: "GrizzlyAndHisBrothersInLaw_Engl_Images0.png",
  },
  {
    textfileId: 71,
    subdir: "GrizzlyAndHisBrothersInLaw/GrizzlyAndHisBrothersInLaw_Hand_Images",
    src: "GrizzlyAndHisBrothersInLaw_Hand_Images0.png",
  },
  {
    textfileId: 71,
    subdir: "GrizzlyAndHisBrothersInLaw/GrizzlyAndHisBrothersInLaw_Hand_Images",
    src: "GrizzlyAndHisBrothersInLaw_Hand_Images1.png",
  },
  {
    textfileId: 71,
    subdir: "GrizzlyAndHisBrothersInLaw/GrizzlyAndHisBrothersInLaw_Hand_Images",
    src: "GrizzlyAndHisBrothersInLaw_Hand_Images2.png",
  },
  {
    textfileId: 71,
    subdir: "GrizzlyAndHisBrothersInLaw/GrizzlyAndHisBrothersInLaw_Hand_Images",
    src: "GrizzlyAndHisBrothersInLaw_Hand_Images3.png",
  },
  {
    textfileId: 71,
    subdir: "GrizzlyAndHisBrothersInLaw/GrizzlyAndHisBrothersInLaw_Hand_Images",
    src: "GrizzlyAndHisBrothersInLaw_Hand_Images4.png",
  },
  {
    textfileId: 72,
    subdir:
      "GrizzlyAndHisBrothersInLaw/GrizzlyAndHisBrothersInLaw_Typed_Images",
    src: "GrizzlyAndHisBrothersInLaw_Typed_Images0.png",
  },
  {
    textfileId: 72,
    subdir:
      "GrizzlyAndHisBrothersInLaw/GrizzlyAndHisBrothersInLaw_Typed_Images",
    src: "GrizzlyAndHisBrothersInLaw_Typed_Images1.png",
  },
  {
    textfileId: 72,
    subdir:
      "GrizzlyAndHisBrothersInLaw/GrizzlyAndHisBrothersInLaw_Typed_Images",
    src: "GrizzlyAndHisBrothersInLaw_Typed_Images2.png",
  },
  {
    textfileId: 73,
    subdir: "LittleBeaver/LittleBeaver_Engl_Images",
    src: "LittleBeaver_Engl_Images0.png",
  },
  {
    textfileId: 73,
    subdir: "LittleBeaver/LittleBeaver_Engl_Images",
    src: "LittleBeaver_Engl_Images1.png",
  },
  {
    textfileId: 73,
    subdir: "LittleBeaver/LittleBeaver_Engl_Images",
    src: "LittleBeaver_Engl_Images2.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images0.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images1.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images10.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images11.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images12.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images13.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images14.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images15.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images16.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images17.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images18.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images19.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images2.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images20.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images21.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images22.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images23.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images24.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images25.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images26.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images27.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images3.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images4.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images5.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images6.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images7.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images8.png",
  },
  {
    textfileId: 74,
    subdir: "LittleBeaver/LittleBeaver_Hand_Images",
    src: "LittleBeaver_Hand_Images9.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image0.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image1.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image10.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image11.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image12.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image13.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image2.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image3.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image4.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image5.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image6.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image7.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image8.png",
  },
  {
    textfileId: 75,
    subdir: "LittleBeaver/LittleBeaver_Typed_Images",
    src: "LittleBeaver_Typed_Image9.png",
  },
  {
    textfileId: 76,
    subdir: "LittleMosquito/LittleMosquito_Engl_Images",
    src: "LittleMosquito_Engl_Images1.png",
  },
  {
    textfileId: 76,
    subdir: "LittleMosquito/LittleMosquito_Engl_Images",
    src: "LittleMosquito_Engl_Images2.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images1.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images10.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images11.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images12.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images13.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images2.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images3.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images4.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images5.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images6.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images7.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images8.png",
  },
  {
    textfileId: 77,
    subdir: "LittleMosquito/LittleMosquito_Hand_Images",
    src: "LittleMosquito_Hand_Images9.png",
  },
  {
    textfileId: 78,
    subdir: "LittleMosquito/LittleMosquito_Typed_Images",
    src: "LittleMosquito_Typed_Images1.png",
  },
  {
    textfileId: 78,
    subdir: "LittleMosquito/LittleMosquito_Typed_Images",
    src: "LittleMosquito_Typed_Images2.png",
  },
  {
    textfileId: 78,
    subdir: "LittleMosquito/LittleMosquito_Typed_Images",
    src: "LittleMosquito_Typed_Images3.png",
  },
  {
    textfileId: 78,
    subdir: "LittleMosquito/LittleMosquito_Typed_Images",
    src: "LittleMosquito_Typed_Images4.png",
  },
  {
    textfileId: 78,
    subdir: "LittleMosquito/LittleMosquito_Typed_Images",
    src: "LittleMosquito_Typed_Images5.png",
  },
  {
    textfileId: 79,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Engl_Images",
    src: "ManCaughtInFireCorral_Engl_Images0.png",
  },
  {
    textfileId: 79,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Engl_Images",
    src: "ManCaughtInFireCorral_Engl_Images1.png",
  },
  {
    textfileId: 80,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Hand_Images",
    src: "ManCaughtInFireCorral_Hand_Images0.png",
  },
  {
    textfileId: 80,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Hand_Images",
    src: "ManCaughtInFireCorral_Hand_Images1.png",
  },
  {
    textfileId: 80,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Hand_Images",
    src: "ManCaughtInFireCorral_Hand_Images2.png",
  },
  {
    textfileId: 80,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Hand_Images",
    src: "ManCaughtInFireCorral_Hand_Images3.png",
  },
  {
    textfileId: 80,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Hand_Images",
    src: "ManCaughtInFireCorral_Hand_Images4.png",
  },
  {
    textfileId: 80,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Hand_Images",
    src: "ManCaughtInFireCorral_Hand_Images5.png",
  },
  {
    textfileId: 81,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Typed_Images",
    src: "ManCaughtInFireCorral_Typed_Images0.png",
  },
  {
    textfileId: 81,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Typed_Images",
    src: "ManCaughtInFireCorral_Typed_Images1.png",
  },
  {
    textfileId: 81,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Typed_Images",
    src: "ManCaughtInFireCorral_Typed_Images2.png",
  },
  {
    textfileId: 81,
    subdir: "ManCaughtInFireCorral/ManCaughtInFireCorral_Typed_Images",
    src: "ManCaughtInFireCorral_Typed_Images3.png",
  },
  {
    textfileId: 82,
    subdir: "MuskratTrespasses/MuskratTrespasses_Engl_Images",
    src: "MuskratTrespasses_Engl_Images0.png",
  },
  {
    textfileId: 82,
    subdir: "MuskratTrespasses/MuskratTrespasses_Engl_Images",
    src: "MuskratTrespasses_Engl_Images1.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images0.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images1.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images10.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images11.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images12.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images13.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images14.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images15.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images16.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images17.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images2.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images3.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images4.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images5.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images6.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images7.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images8.png",
  },
  {
    textfileId: 83,
    subdir: "MuskratTrespasses/MuskratTrespasses_Hand_Images",
    src: "MuskratTrespasses_Hand_Images9.png",
  },
  {
    textfileId: 84,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Engl_Images",
    src: "OriginOfIndianTribes_Engl_Images0.png",
  },
  {
    textfileId: 84,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Engl_Images",
    src: "OriginOfIndianTribes_Engl_Images1.png",
  },
  {
    textfileId: 84,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Engl_Images",
    src: "OriginOfIndianTribes_Engl_Images2.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images0.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images1.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images10.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images11.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images12.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images13.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images14.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images15.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images16.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images17.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images18.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images19.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images2.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images20.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images21.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images22.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images23.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images24.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images25.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images26.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images27.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images28.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images29.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images3.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images4.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images5.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images6.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images7.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images8.png",
  },
  {
    textfileId: 85,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Hand_Images",
    src: "OriginOfIndianTribes_Hand_Images9.png",
  },
  {
    textfileId: 86,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Typed_Images",
    src: "OriginOfIndianTribes_Typed_Images0.png",
  },
  {
    textfileId: 86,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Typed_Images",
    src: "OriginOfIndianTribes_Typed_Images1.png",
  },
  {
    textfileId: 86,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Typed_Images",
    src: "OriginOfIndianTribes_Typed_Images2.png",
  },
  {
    textfileId: 86,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Typed_Images",
    src: "OriginOfIndianTribes_Typed_Images3.png",
  },
  {
    textfileId: 86,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Typed_Images",
    src: "OriginOfIndianTribes_Typed_Images4.png",
  },
  {
    textfileId: 86,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Typed_Images",
    src: "OriginOfIndianTribes_Typed_Images5.png",
  },
  {
    textfileId: 86,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Typed_Images",
    src: "OriginOfIndianTribes_Typed_Images6.png",
  },
  {
    textfileId: 86,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Typed_Images",
    src: "OriginOfIndianTribes_Typed_Images7.png",
  },
  {
    textfileId: 86,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Typed_Images",
    src: "OriginOfIndianTribes_Typed_Images8.png",
  },
  {
    textfileId: 86,
    subdir: "OriginOfIndianTribes/OriginOfIndianTribes_Typed_Images",
    src: "OriginOfIndianTribes_Typed_Images9.png",
  },
  {
    textfileId: 87,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Engl_Images",
    src: "RabbitAndJackRabbit_Engl_Images0.png",
  },
  {
    textfileId: 88,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Hand_Images",
    src: "RabbitAndJackRabbit_Hand_Images0.png",
  },
  {
    textfileId: 88,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Hand_Images",
    src: "RabbitAndJackRabbit_Hand_Images1.png",
  },
  {
    textfileId: 88,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Hand_Images",
    src: "RabbitAndJackRabbit_Hand_Images2.png",
  },
  {
    textfileId: 88,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Hand_Images",
    src: "RabbitAndJackRabbit_Hand_Images3.png",
  },
  {
    textfileId: 88,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Hand_Images",
    src: "RabbitAndJackRabbit_Hand_Images4.png",
  },
  {
    textfileId: 88,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Hand_Images",
    src: "RabbitAndJackRabbit_Hand_Images5.png",
  },
  {
    textfileId: 88,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Hand_Images",
    src: "RabbitAndJackRabbit_Hand_Images6.png",
  },
  {
    textfileId: 88,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Hand_Images",
    src: "RabbitAndJackRabbit_Hand_Images7.png",
  },
  {
    textfileId: 89,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Typed_Images",
    src: "RabbitAndJackRabbit_Typed_Images0.png",
  },
  {
    textfileId: 89,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Typed_Images",
    src: "RabbitAndJackRabbit_Typed_Images1.png",
  },
  {
    textfileId: 89,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Typed_Images",
    src: "RabbitAndJackRabbit_Typed_Images2.png",
  },
  {
    textfileId: 89,
    subdir: "RabbitAndJackRabbit/RabbitAndJackRabbit_Typed_Images",
    src: "RabbitAndJackRabbit_Typed_Images3.png",
  },
  {
    textfileId: 90,
    subdir: "SkunkAndFisher/SkunkAndFisher_Engl_Images",
    src: "SkunkAndFisher_Engl_Images0.png",
  },
  {
    textfileId: 90,
    subdir: "SkunkAndFisher/SkunkAndFisher_Engl_Images",
    src: "SkunkAndFisher_Engl_Images1.png",
  },
  {
    textfileId: 90,
    subdir: "SkunkAndFisher/SkunkAndFisher_Engl_Images",
    src: "SkunkAndFisher_Engl_Images2.png",
  },
  {
    textfileId: 90,
    subdir: "SkunkAndFisher/SkunkAndFisher_Engl_Images",
    src: "SkunkAndFisher_Engl_Images3.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images100.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images101.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images102.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images103.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images104.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images105.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images106.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images107.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images108.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images109.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images110.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images111.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images112.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images113.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images114.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images115.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images116.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images117.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images118.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images119.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images120.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images121.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images122.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images123.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images124.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images125.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images126.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images127.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images128.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images129.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images130.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images131.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images132.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images133.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images134.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images135.png",
  },
  {
    textfileId: 91,
    subdir: "SkunkAndFisher/SkunkAndFisher_Hand_Images",
    src: "SkunkAndFisher_Hand_Images136.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images0.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images1.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images10.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images11.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images12.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images13.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images14.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images15.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images16.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images17.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images18.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images19.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images2.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images20.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images3.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images4.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images5.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images6.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images7.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images8.png",
  },
  {
    textfileId: 92,
    subdir: "SkunkAndFisher/SkunkAndFisher_Typed_Images",
    src: "SkunkAndFisher_Typed_Images9.png",
  },
  {
    textfileId: 93,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Engl_Images",
    src: "StoryOfLynx__Dorthy_Engl_Images0.png",
  },
  {
    textfileId: 93,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Engl_Images",
    src: "StoryOfLynx__Dorthy_Engl_Images1.png",
  },
  {
    textfileId: 93,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Engl_Images",
    src: "StoryOfLynx__Dorthy_Engl_Images2.png",
  },
  {
    textfileId: 93,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Engl_Images",
    src: "StoryOfLynx__Dorthy_Engl_Images3.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images0.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images1.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images10.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images11.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images12.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images13.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images14.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images15.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images16.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images2.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images3.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images4.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images5.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images6.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images7.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images8.png",
  },
  {
    textfileId: 94,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Hand_Images",
    src: "StoryOfLynx__Dorthy_Hand_Images9.png",
  },
  {
    textfileId: 95,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Typed_Images",
    src: "StoryOfLynx__Dorthy_Typed_Images0.png",
  },
  {
    textfileId: 95,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Typed_Images",
    src: "StoryOfLynx__Dorthy_Typed_Images1.png",
  },
  {
    textfileId: 95,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Typed_Images",
    src: "StoryOfLynx__Dorthy_Typed_Images2.png",
  },
  {
    textfileId: 95,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Typed_Images",
    src: "StoryOfLynx__Dorthy_Typed_Images3.png",
  },
  {
    textfileId: 95,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Typed_Images",
    src: "StoryOfLynx__Dorthy_Typed_Images4.png",
  },
  {
    textfileId: 95,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Typed_Images",
    src: "StoryOfLynx__Dorthy_Typed_Images5.png",
  },
  {
    textfileId: 95,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Typed_Images",
    src: "StoryOfLynx__Dorthy_Typed_Images6.png",
  },
  {
    textfileId: 95,
    subdir: "StoryOfLynx/StoryOfLynx__Dorthy_Typed_Images",
    src: "StoryOfLynx__Dorthy_Typed_Images7.png",
  },
  {
    textfileId: 96,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Engl_Images",
    src: "StoryOfLynx__Tom_Engl_Images0.png",
  },
  {
    textfileId: 96,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Engl_Images",
    src: "StoryOfLynx__Tom_Engl_Images1.png",
  },
  {
    textfileId: 96,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Engl_Images",
    src: "StoryOfLynx__Tom_Engl_Images2.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images0.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images1.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images10.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images11.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images12.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images13.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images14.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images15.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images16.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images17.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images18.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images19.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images2.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images20.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images21.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images22.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images23.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images24.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images25.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images26.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images27.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images28.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images29.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images3.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images30.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images31.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images32.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images4.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images5.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images6.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images7.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images8.png",
  },
  {
    textfileId: 97,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Hand_Images",
    src: "StoryOfLynx__Tom_Hand_Images9.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images0.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images1.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images10.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images11.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images12.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images13.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images14.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images15.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images16.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images2.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images3.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images4.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images5.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images6.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images7.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images8.png",
  },
  {
    textfileId: 98,
    subdir: "StoryOfLynx/StoryOfLynx__Tom_Typed_Images",
    src: "StoryOfLynx__Tom_Typed_Images9.png",
  },
  {
    textfileId: 99,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Engl_Images",
    src: "TheCoeurDAleneAttacked_Engl_Images0.png",
  },
  {
    textfileId: 99,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Engl_Images",
    src: "TheCoeurDAleneAttacked_Engl_Images1.png",
  },
  {
    textfileId: 99,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Engl_Images",
    src: "TheCoeurDAleneAttacked_Engl_Images2.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images0.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images1.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images10.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images11.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images12.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images2.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images3.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images4.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images5.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images6.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images7.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images8.png",
  },
  {
    textfileId: 101,
    subdir: "TheCoeurDAleneAttacked/TheCoeurDAleneAttacked_Typed_Images",
    src: "TheCoeurDAleneAttacked_Typed_Images9.png",
  },
  {
    textfileId: 102,
    subdir:
      "TheCoeurDAleneFightTheKutenai/TheCoeurDAleneFightTheKutenai_Engl_Images",
    src: "TheCoeurDAleneFightTheKutenai_Engl_Images0.png",
  },
  {
    textfileId: 103,
    subdir:
      "TheCoeurDAleneFightTheKutenai/TheCoeurDAleneFightTheKutenai_Hand_Images",
    src: "TheCoeurDAleneFightTheKutenai_Hand_Imagess0.png",
  },
  {
    textfileId: 103,
    subdir:
      "TheCoeurDAleneFightTheKutenai/TheCoeurDAleneFightTheKutenai_Hand_Images",
    src: "TheCoeurDAleneFightTheKutenai_Hand_Imagess1.png",
  },
  {
    textfileId: 103,
    subdir:
      "TheCoeurDAleneFightTheKutenai/TheCoeurDAleneFightTheKutenai_Hand_Images",
    src: "TheCoeurDAleneFightTheKutenai_Hand_Imagess2.png",
  },
  {
    textfileId: 103,
    subdir:
      "TheCoeurDAleneFightTheKutenai/TheCoeurDAleneFightTheKutenai_Hand_Images",
    src: "TheCoeurDAleneFightTheKutenai_Hand_Imagess3.png",
  },
  {
    textfileId: 104,
    subdir:
      "TheCoeurDAleneFightTheKutenai/TheCoeurDAleneFightTheKutenai_Typed_Images",
    src: "TheCoeurDAleneFightTheKutenai_Typed_Images0.png",
  },
  {
    textfileId: 104,
    subdir:
      "TheCoeurDAleneFightTheKutenai/TheCoeurDAleneFightTheKutenai_Typed_Images",
    src: "TheCoeurDAleneFightTheKutenai_Typed_Images1.png",
  },
  {
    textfileId: 104,
    subdir:
      "TheCoeurDAleneFightTheKutenai/TheCoeurDAleneFightTheKutenai_Typed_Images",
    src: "TheCoeurDAleneFightTheKutenai_Typed_Images2.png",
  },
  {
    textfileId: 105,
    subdir: "TheDwarf/TheDwarf_Engl_Images",
    src: "TheDwarf_Engl_Images0.png",
  },
  {
    textfileId: 106,
    subdir: "TheDwarf/TheDwarf_Typed_Images",
    src: "TheDwarf_Typed_Images0.png",
  },
  {
    textfileId: 106,
    subdir: "TheDwarf/TheDwarf_Typed_Images",
    src: "TheDwarf_Typed_Images1.png",
  },
  {
    textfileId: 106,
    subdir: "TheDwarf/TheDwarf_Typed_Images",
    src: "TheDwarf_Typed_Images2.png",
  },
  {
    textfileId: 107,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Engl_Images",
    src: "TheGirlsWhoStoleDentalia_Engl_Images0.png",
  },
  {
    textfileId: 107,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Engl_Images",
    src: "TheGirlsWhoStoleDentalia_Engl_Images1.png",
  },
  {
    textfileId: 107,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Engl_Images",
    src: "TheGirlsWhoStoleDentalia_Engl_Images2.png",
  },
  {
    textfileId: 107,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Engl_Images",
    src: "TheGirlsWhoStoleDentalia_Engl_Images3.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images100.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images101.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images102.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images103.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images104.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images105.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images106.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images107.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images108.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images109.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images110.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images111.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images112.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images113.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images114.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images115.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images116.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images117.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images118.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images119.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images120.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images121.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images122.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images123.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images124.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images125.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images126.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images127.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images128.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images129.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images130.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images131.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images132.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images133.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images134.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images135.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images136.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images137.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images138.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images139.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images140.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images141.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images142.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images143.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images144.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images145.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images146.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images147.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images148.png",
  },
  {
    textfileId: 108,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Hand_Images",
    src: "TheGirlsWhoStoleDentalia_Hand_Images149.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images0.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images1.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images10.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images11.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images12.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images13.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images14.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images15.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images16.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images17.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images18.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images19.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images2.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images20.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images21.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images22.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images23.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images3.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images4.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images5.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images6.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images7.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images8.png",
  },
  {
    textfileId: 109,
    subdir: "TheGirlsWhoStoleDentalia/TheGirlsWhoStoleDentalia_Typed_Images",
    src: "TheGirlsWhoStoleDentalia_Typed_Images9.png",
  },

  {
    textfileId: 110,
    subdir: "ThePracticalJoker/ThePracticalJoker_Engl_Images",
    src: "ThePracticalJoker_Engl_Images0.png",
  },
  {
    textfileId: 111,
    subdir: "ThePracticalJoker/ThePracticalJoker_Hand_Images",
    src: "ThePracticalJoker_Hand_Images0.png",
  },
  {
    textfileId: 111,
    subdir: "ThePracticalJoker/ThePracticalJoker_Hand_Images",
    src: "ThePracticalJoker_Hand_Images1.png",
  },
  {
    textfileId: 111,
    subdir: "ThePracticalJoker/ThePracticalJoker_Hand_Images",
    src: "ThePracticalJoker_Hand_Images2.png",
  },
  {
    textfileId: 111,
    subdir: "ThePracticalJoker/ThePracticalJoker_Hand_Images",
    src: "ThePracticalJoker_Hand_Images3.png",
  },
  {
    textfileId: 112,
    subdir: "ThePracticalJoker/ThePracticalJoker_Typed_Images",
    src: "ThePracticalJoker_Typed_Images0.png",
  },
  {
    textfileId: 112,
    subdir: "ThePracticalJoker/ThePracticalJoker_Typed_Images",
    src: "ThePracticalJoker_Typed_Images1.png",
  },
  {
    textfileId: 112,
    subdir: "ThePracticalJoker/ThePracticalJoker_Typed_Images",
    src: "ThePracticalJoker_Typed_Images2.png",
  },
  {
    textfileId: 113,
    subdir: "Thunder/Thunder_Engl_Images",
    src: "Thunder_Engl_Images0.png",
  },
  {
    textfileId: 113,
    subdir: "Thunder/Thunder_Engl_Images",
    src: "Thunder_Engl_Images1.png",
  },
  {
    textfileId: 113,
    subdir: "Thunder/Thunder_Engl_Images",
    src: "Thunder_Engl_Images2.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images0.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images1.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images10.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images11.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images12.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images13.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images14.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images15.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images2.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images3.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images4.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images5.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images6.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images7.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images8.png",
  },
  {
    textfileId: 114,
    subdir: "Thunder/Thunder_Hand_Images",
    src: "Thunder_Hand_Images9.png",
  },
  {
    textfileId: 115,
    subdir: "Thunder/Thunder_Typed_Images",
    src: "Thunder_Typed_Images0.png",
  },
  {
    textfileId: 115,
    subdir: "Thunder/Thunder_Typed_Images",
    src: "Thunder_Typed_Images1.png",
  },
  {
    textfileId: 115,
    subdir: "Thunder/Thunder_Typed_Images",
    src: "Thunder_Typed_Images2.png",
  },
  {
    textfileId: 115,
    subdir: "Thunder/Thunder_Typed_Images",
    src: "Thunder_Typed_Images3.png",
  },
  {
    textfileId: 115,
    subdir: "Thunder/Thunder_Typed_Images",
    src: "Thunder_Typed_Images4.png",
  },
  {
    textfileId: 115,
    subdir: "Thunder/Thunder_Typed_Images",
    src: "Thunder_Typed_Images5.png",
  },
  {
    textfileId: 115,
    subdir: "Thunder/Thunder_Typed_Images",
    src: "Thunder_Typed_Images6.png",
  },
  {
    textfileId: 115,
    subdir: "Thunder/Thunder_Typed_Images",
    src: "Thunder_Typed_Images7.png",
  },
  {
    textfileId: 115,
    subdir: "Thunder/Thunder_Typed_Images",
    src: "Thunder_Typed_Images8.png",
  },
  {
    textfileId: 115,
    subdir: "Thunder/Thunder_Typed_Images",
    src: "Thunder_Typed_Images9.png",
  },
  {
    textfileId: 116,
    subdir: "ToadSavesChildren/ToadSavesChildren_Engl_Images",
    src: "ToadSavesChildren_Engl_Images0.png",
  },
  {
    textfileId: 116,
    subdir: "ToadSavesChildren/ToadSavesChildren_Engl_Images",
    src: "ToadSavesChildren_Engl_Images1.png",
  },
  {
    textfileId: 117,
    subdir: "ToadSavesChildren/ToadSavesChildren_Hand_Images",
    src: "ToadSavesChildren_Hand_Images0.png",
  },
  {
    textfileId: 117,
    subdir: "ToadSavesChildren/ToadSavesChildren_Hand_Images",
    src: "ToadSavesChildren_Hand_Images1.png",
  },
  {
    textfileId: 117,
    subdir: "ToadSavesChildren/ToadSavesChildren_Hand_Images",
    src: "ToadSavesChildren_Hand_Images2.png",
  },
  {
    textfileId: 117,
    subdir: "ToadSavesChildren/ToadSavesChildren_Hand_Images",
    src: "ToadSavesChildren_Hand_Images3.png",
  },
  {
    textfileId: 117,
    subdir: "ToadSavesChildren/ToadSavesChildren_Hand_Images",
    src: "ToadSavesChildren_Hand_Images4.png",
  },
  {
    textfileId: 117,
    subdir: "ToadSavesChildren/ToadSavesChildren_Hand_Images",
    src: "ToadSavesChildren_Hand_Images5.png",
  },
  {
    textfileId: 118,
    subdir: "ToadSavesChildren/ToadSavesChildren_Typed_Images",
    src: "ToadSavesChildren_Typed_Images0.png",
  },
  {
    textfileId: 118,
    subdir: "ToadSavesChildren/ToadSavesChildren_Typed_Images",
    src: "ToadSavesChildren_Typed_Images1.png",
  },
  {
    textfileId: 118,
    subdir: "ToadSavesChildren/ToadSavesChildren_Typed_Images",
    src: "ToadSavesChildren_Typed_Images2.png",
  },
  {
    textfileId: 118,
    subdir: "ToadSavesChildren/ToadSavesChildren_Typed_Images",
    src: "ToadSavesChildren_Typed_Images3.png",
  },
  {
    textfileId: 118,
    subdir: "ToadSavesChildren/ToadSavesChildren_Typed_Images",
    src: "ToadSavesChildren_Typed_Images4.png",
  },
  {
    textfileId: 118,
    subdir: "ToadSavesChildren/ToadSavesChildren_Typed_Images",
    src: "ToadSavesChildren_Typed_Images5.png",
  },
  {
    textfileId: 118,
    subdir: "ToadSavesChildren/ToadSavesChildren_Typed_Images",
    src: "ToadSavesChildren_Typed_Images6.png",
  },
  {
    textfileId: 119,
    subdir: "TurtlesWarParty/TurtlesWarParty_Engl_Images",
    src: "TurtlesWarParty_Engl_Images0.png",
  },
  {
    textfileId: 119,
    subdir: "TurtlesWarParty/TurtlesWarParty_Engl_Images",
    src: "TurtlesWarParty_Engl_Images1.png",
  },
  {
    textfileId: 119,
    subdir: "TurtlesWarParty/TurtlesWarParty_Engl_Images",
    src: "TurtlesWarParty_Engl_Images2.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images0.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images1.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images10.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images11.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images12.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images13.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images14.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images15.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images16.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images17.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images18.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images19.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images2.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images20.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images3.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images4.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images5.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images6.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images7.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images8.png",
  },
  {
    textfileId: 120,
    subdir: "TurtlesWarParty/TurtlesWarParty_Hand_Images",
    src: "TurtlesWarParty_Hand_Images9.png",
  },
  {
    textfileId: 121,
    subdir: "TurtlesWarParty/TurtlesWarParty_Typed_Images",
    src: "TurtlesWarParty_Typed_Images0.png",
  },
  {
    textfileId: 121,
    subdir: "TurtlesWarParty/TurtlesWarParty_Typed_Images",
    src: "TurtlesWarParty_Typed_Images1.png",
  },
  {
    textfileId: 121,
    subdir: "TurtlesWarParty/TurtlesWarParty_Typed_Images",
    src: "TurtlesWarParty_Typed_Images2.png",
  },
  {
    textfileId: 121,
    subdir: "TurtlesWarParty/TurtlesWarParty_Typed_Images",
    src: "TurtlesWarParty_Typed_Images3.png",
  },
  {
    textfileId: 121,
    subdir: "TurtlesWarParty/TurtlesWarParty_Typed_Images",
    src: "TurtlesWarParty_Typed_Images4.png",
  },
  {
    textfileId: 121,
    subdir: "TurtlesWarParty/TurtlesWarParty_Typed_Images",
    src: "TurtlesWarParty_Typed_Images5.png",
  },
  {
    textfileId: 121,
    subdir: "TurtlesWarParty/TurtlesWarParty_Typed_Images",
    src: "TurtlesWarParty_Typed_Images6.png",
  },
  {
    textfileId: 121,
    subdir: "TurtlesWarParty/TurtlesWarParty_Typed_Images",
    src: "TurtlesWarParty_Typed_Images7.png",
  },
  {
    textfileId: 121,
    subdir: "TurtlesWarParty/TurtlesWarParty_Typed_Images",
    src: "TurtlesWarParty_Typed_Images8.png",
  },
  {
    textfileId: 122,
    subdir: "TwoHeadedSnakes/TwoHeadedSnakes_Engl_Images",
    src: "TwoHeadedSnakes_Engl_Images0.png",
  },
  {
    textfileId: 123,
    subdir: "TwoHeadedSnakes/TwoHeadedSnakes_Hand_Images",
    src: "TwoHeadedSnakes_Hand_Images0.png",
  },
  {
    textfileId: 123,
    subdir: "TwoHeadedSnakes/TwoHeadedSnakes_Hand_Images",
    src: "TwoHeadedSnakes_Hand_Images1.png",
  },
  {
    textfileId: 124,
    subdir: "TwoHeadedSnakes/TwoHeadedSnakes_Typed_Images",
    src: "TwoHeadedSnakes_Typed_Images0.png",
  },
  {
    textfileId: 124,
    subdir: "TwoHeadedSnakes/TwoHeadedSnakes_Typed_Images",
    src: "TwoHeadedSnakes_Typed_Images1.png",
  },
  {
    textfileId: 125,
    subdir:
      "TwoWomenOvercomeNezPerceMan/TwoWomenOvercomeNezPerceMan_Engl_Images",
    src: "TwoWomenOvercomeNezPerceMan_Engl_Images0.png",
  },
  {
    textfileId: 126,
    subdir:
      "TwoWomenOvercomeNezPerceMan/TwoWomenOvercomeNezPerceMan_Hand_Images",
    src: "TwoWomenOvercomeNezPerceMan_Hand_Images0.png",
  },
  {
    textfileId: 126,
    subdir:
      "TwoWomenOvercomeNezPerceMan/TwoWomenOvercomeNezPerceMan_Hand_Images",
    src: "TwoWomenOvercomeNezPerceMan_Hand_Images1.png",
  },
  {
    textfileId: 127,
    subdir:
      "TwoWomenOvercomeNezPerceMan/TwoWomenOvercomeNezPerceMan_Typed_Images",
    src: "TwoWomenOvercomeNezPerceMan_Typed_Images0.png",
  },
  {
    textfileId: 127,
    subdir:
      "TwoWomenOvercomeNezPerceMan/TwoWomenOvercomeNezPerceMan_Typed_Images",
    src: "TwoWomenOvercomeNezPerceMan_Typed_Images1.png",
  },
  {
    textfileId: 128,
    subdir:
      "WarBetweenBlackfootAndTheCoeurDAlene/WarBetweenBlackfootAndTheCoeurDAlene_Engl_Images",
    src: "WarBetweenBlackfootAndTheCoeurDAlene_Engl_Images0.png",
  },
  {
    textfileId: 128,
    subdir:
      "WarBetweenBlackfootAndTheCoeurDAlene/WarBetweenBlackfootAndTheCoeurDAlene_Engl_Images",
    src: "WarBetweenBlackfootAndTheCoeurDAlene_Engl_Images1.png",
  },
  {
    textfileId: 129,
    subdir:
      "WarBetweenBlackfootAndTheCoeurDAlene/WarBetweenBlackfootAndTheCoeurDAlene_Typed_Images",
    src: "WarBetweenBlackfootAndTheCoeurDAlene_Typed_Images0.png",
  },
  {
    textfileId: 129,
    subdir:
      "WarBetweenBlackfootAndTheCoeurDAlene/WarBetweenBlackfootAndTheCoeurDAlene_Typed_Images",
    src: "WarBetweenBlackfootAndTheCoeurDAlene_Typed_Images1.png",
  },
  {
    textfileId: 129,
    subdir:
      "WarBetweenBlackfootAndTheCoeurDAlene/WarBetweenBlackfootAndTheCoeurDAlene_Typed_Images",
    src: "WarBetweenBlackfootAndTheCoeurDAlene_Typed_Images2.png",
  },
  {
    textfileId: 129,
    subdir:
      "WarBetweenBlackfootAndTheCoeurDAlene/WarBetweenBlackfootAndTheCoeurDAlene_Typed_Images",
    src: "WarBetweenBlackfootAndTheCoeurDAlene_Typed_Images3.png",
  },
  {
    textfileId: 130,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Engl_Images",
    src: "WarBetweenLandAndWaterPeople_Engl_Images0.png",
  },
  {
    textfileId: 130,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Engl_Images",
    src: "WarBetweenLandAndWaterPeople_Engl_Images1.png",
  },
  {
    textfileId: 130,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Engl_Images",
    src: "WarBetweenLandAndWaterPeople_Engl_Images2.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images0.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images1.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images10.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images11.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images12.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images13.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images14.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images15.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images16.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images17.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images2.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images3.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images4.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images5.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images6.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images7.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images8.png",
  },
  {
    textfileId: 131,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Hand_Images",
    src: "WarBetweenLandAndWaterPeople_Hand_Images9.png",
  },
  {
    textfileId: 132,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Typed_Images",
    src: "WarBetweenLandAndWaterPeople_Typed_Images0.png",
  },
  {
    textfileId: 132,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Typed_Images",
    src: "WarBetweenLandAndWaterPeople_Typed_Images1.png",
  },
  {
    textfileId: 132,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Typed_Images",
    src: "WarBetweenLandAndWaterPeople_Typed_Images2.png",
  },
  {
    textfileId: 132,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Typed_Images",
    src: "WarBetweenLandAndWaterPeople_Typed_Images3.png",
  },
  {
    textfileId: 132,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Typed_Images",
    src: "WarBetweenLandAndWaterPeople_Typed_Images4.png",
  },
  {
    textfileId: 132,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Typed_Images",
    src: "WarBetweenLandAndWaterPeople_Typed_Images5.png",
  },
  {
    textfileId: 132,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Typed_Images",
    src: "WarBetweenLandAndWaterPeople_Typed_Images6.png",
  },
  {
    textfileId: 132,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Typed_Images",
    src: "WarBetweenLandAndWaterPeople_Typed_Images7.png",
  },
  {
    textfileId: 132,
    subdir:
      "WarBetweenLandAndWaterPeople/WarBetweenLandAndWaterPeople_Typed_Images",
    src: "WarBetweenLandAndWaterPeople_Typed_Images8.png",
  },
  {
    textfileId: 133,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Engl_Images",
    src: "WaterbirdContestsForWomen_Engl_Images0.png",
  },
  {
    textfileId: 133,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Engl_Images",
    src: "WaterbirdContestsForWomen_Engl_Images1.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images0.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images1.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images10.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images11.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images12.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images13.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images14.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images2.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images3.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images4.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images5.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images6.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images7.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images8.png",
  },
  {
    textfileId: 134,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Hand_Images",
    src: "WaterbirdContestsForWomen_Hand_Images9.png",
  },
  {
    textfileId: 135,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Typed_Images",
    src: "WaterbirdContestsForWomen_Typed_Images0.png",
  },
  {
    textfileId: 135,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Typed_Images",
    src: "WaterbirdContestsForWomen_Typed_Images1.png",
  },
  {
    textfileId: 135,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Typed_Images",
    src: "WaterbirdContestsForWomen_Typed_Images2.png",
  },
  {
    textfileId: 135,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Typed_Images",
    src: "WaterbirdContestsForWomen_Typed_Images3.png",
  },
  {
    textfileId: 135,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Typed_Images",
    src: "WaterbirdContestsForWomen_Typed_Images4.png",
  },
  {
    textfileId: 135,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Typed_Images",
    src: "WaterbirdContestsForWomen_Typed_Images5.png",
  },
  {
    textfileId: 135,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Typed_Images",
    src: "WaterbirdContestsForWomen_Typed_Images6.png",
  },
  {
    textfileId: 135,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Typed_Images",
    src: "WaterbirdContestsForWomen_Typed_Images7.png",
  },
  {
    textfileId: 135,
    subdir: "WaterbirdContestsForWomen/WaterbirdContestsForWomen_Typed_Images",
    src: "WaterbirdContestsForWomen_Typed_Images8.png",
  },
  {
    textfileId: 136,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Engl_Images",
    src: "WaterMonsterWoman_Engl_Images0.png",
  },
  {
    textfileId: 136,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Engl_Images",
    src: "WaterMonsterWoman_Engl_Images1.png",
  },
  {
    textfileId: 136,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Engl_Images",
    src: "WaterMonsterWoman_Engl_Images2.png",
  },
  {
    textfileId: 137,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Typed_Images",
    src: "WaterMonsterWoman_Typed_Images0.png",
  },
  {
    textfileId: 137,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Typed_Images",
    src: "WaterMonsterWoman_Typed_Images1.png",
  },
  {
    textfileId: 137,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Typed_Images",
    src: "WaterMonsterWoman_Typed_Images10.png",
  },
  {
    textfileId: 137,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Typed_Images",
    src: "WaterMonsterWoman_Typed_Images2.png",
  },
  {
    textfileId: 137,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Typed_Images",
    src: "WaterMonsterWoman_Typed_Images3.png",
  },
  {
    textfileId: 137,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Typed_Images",
    src: "WaterMonsterWoman_Typed_Images4.png",
  },
  {
    textfileId: 137,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Typed_Images",
    src: "WaterMonsterWoman_Typed_Images5.png",
  },
  {
    textfileId: 137,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Typed_Images",
    src: "WaterMonsterWoman_Typed_Images6.png",
  },
  {
    textfileId: 137,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Typed_Images",
    src: "WaterMonsterWoman_Typed_Images7.png",
  },
  {
    textfileId: 137,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Typed_Images",
    src: "WaterMonsterWoman_Typed_Images8.png",
  },
  {
    textfileId: 137,
    subdir: "WaterMonsterWoman/WaterMonsterWoman_Typed_Images",
    src: "WaterMonsterWoman_Typed_Images9.png",
  },
  {
    textfileId: 138,
    subdir:
      "WomanSavedByLooseSaddleCinch/WomanSavedByLooseSaddleCinch_Engl_Images",
    src: "WomanSavedByLooseSaddleCinch_Engl_Images0.png",
  },
  {
    textfileId: 138,
    subdir:
      "WomanSavedByLooseSaddleCinch/WomanSavedByLooseSaddleCinch_Engl_Images",
    src: "WomanSavedByLooseSaddleCinch_Engl_Images1.png",
  },
  {
    textfileId: 139,
    subdir:
      "WomanSavedByLooseSaddleCinch/WomanSavedByLooseSaddleCinch_Typed_Images",
    src: "WomanSavedByLooseSaddleCinch_Typed_Images0.png",
  },
  {
    textfileId: 139,
    subdir:
      "WomanSavedByLooseSaddleCinch/WomanSavedByLooseSaddleCinch_Typed_Images",
    src: "WomanSavedByLooseSaddleCinch_Typed_Images1.png",
  },
  {
    textfileId: 139,
    subdir:
      "WomanSavedByLooseSaddleCinch/WomanSavedByLooseSaddleCinch_Typed_Images",
    src: "WomanSavedByLooseSaddleCinch_Typed_Images2.png",
  },
  {
    textfileId: 139,
    subdir:
      "WomanSavedByLooseSaddleCinch/WomanSavedByLooseSaddleCinch_Typed_Images",
    src: "WomanSavedByLooseSaddleCinch_Typed_Images3.png",
  },
  {
    textfileId: 139,
    subdir:
      "WomanSavedByLooseSaddleCinch/WomanSavedByLooseSaddleCinch_Typed_Images",
    src: "WomanSavedByLooseSaddleCinch_Typed_Images4.png",
  },
  {
    textfileId: 139,
    subdir:
      "WomanSavedByLooseSaddleCinch/WomanSavedByLooseSaddleCinch_Typed_Images",
    src: "WomanSavedByLooseSaddleCinch_Typed_Images5.png",
  },
];

const elicitationsets = [
  {
    id: 1,
    title: "He is clubbing him on the neck",
    language: "English",
    speaker: "Clarence Sloat",
  },
  {
    id: 2,
    title: "He is clubbing him on the neck",
    language: "Coeur d'Alene",
    speaker: "Lawrence Nicodemus",
    transcription: "'itsanqhttsinms",
  },
  {
    id: 3,
    title: "He is being clubbed on the neck",
    language: "English",
    speaker: "Clarence Sloat",
  },
  {
    id: 4,
    title: "He is being clubbed on the neck",
    language: "Coeur d'Alene",
    speaker: "Lawrence Nicodemus",
    transcription: "",
  },
  {
    id: 5,
    title: "I am clubbing him on the neck",
    language: "English",
    speaker: "Clarence Sloat",
  },
  {
    id: 6,
    title: "I am clubbing him on the neck",
    language: "Coeur d'Alene",
    speaker: "Lawrence Nicodemus",
    transcription: "hi'tsanqhttsinm",
  },
  {
    id: 7,
    title: "I am being clubbed on the neck",
    language: "English",
    speaker: "Clarence Sloat",
  },
  {
    id: 8,
    title: "I am being clubbed on the neck",
    language: "Coeur d'Alene",
    speaker: "Lawrence Nicodemus",
    transcription: "chi'tsanqhttsinm",
  },
  {
    id: 9,
    title: "You are being clubbed on the neck",
    language: "English",
    speaker: "Clarence Sloat",
  },
  {
    id: 10,
    title: "You are being clubbed on the neck",
    language: "Coeur d'Alene",
    speaker: "Lawrence Nicodemus",
    transcription: "ku'ytsanqhttsinm",
  },
];
const audiosets = [
  {
    id: 1,
    title: "Cricket Rides Coyote - in Coeur d'Alene",
    speaker: "Lawrence Nicodemus",
    textId: 21,
  },
  {
    id: 2,
    title: "Cricket Rides Coyote - in English",
    speaker: "Lawrence Nicodemus",
    textId: 21,
  },
  {
    id: 3,
    title: "Little Mosquito Part 1 - in Coeur d'Alene",
    speaker: "Lawrence Nicodemus (unconfirmed)",
    textId: 28,
  },
  {
    id: 4,
    title: "Little Mosquito Part 2 - in Coeur d'Alene",
    speaker: "Lawrence Nicodemus (unconfirmed)",
    textId: 28,
  },
  {
    id: 5,
    title: "Rabbit and Jackrabbit Part 1 - in Coeur d'Alene",
    speaker: "Lawrence Nicodemus",
    textId: 32,
  },
  {
    id: 6,
    title:
      "Rabbit and Jackrabbit Part 2 - begins in Coeur d'Alene, ends in English",
    speaker: "Lawrence Nicodemus",
    textId: 32,
  },
  {
    id: 7,
    title: "When Deer Kills Children - song, in Coeur d'Alene",
    speaker: "Unconfirmed",
    textId: "",
  },
  {
    id: 8,
    title: "Lord's Prayer, Angel's Salutation - in Coeur d'Alene",
    speaker: "Unconfirmed",
    textId: "",
  },
];
const elicitationfiles = [
  {
    id: 1,
    src: "1835_027_CoeurdAlene_2_bNoiseReduced_8.wav",
    title: "He is clubbing him on the neck - English",
    type: "audio/wav",
    direct: "yes",
    elicitationId: 1,
  },
  {
    id: 2,
    src: "1835_027_CoeurdAlene_2_bNoiseReduced_9.wav",
    type: "audio/wav",
    direct: "yes",
    elicitationId: 2,
  },
  {
    id: 3,
    src: "1835_027_CoeurdAlene_2_bNoiseReduced_10.wav",
    type: "audio/wav",
    direct: "yes",
    elicitationId: 3,
  },
  {
    id: 4,
    src: "1835_027_CoeurdAlene_2_bNoiseReduced_11.wav",
    type: "audio/wav",
    direct: "yes",
    elicitationId: 4,
  },
  {
    id: 5,
    src: "1835_027_CoeurdAlene_2_bNoiseReduced_12.wav",
    type: "audio/wav",
    direct: "yes",
    elicitationId: 5,
  },
  {
    id: 6,
    src: "1835_027_CoeurdAlene_2_bNoiseReduced_13.wav",
    type: "audio/wav",
    direct: "yes",
    elicitationId: 6,
  },
  {
    id: 7,
    src: "1835_027_CoeurdAlene_2_bNoiseReduced_14.wav",
    type: "audio/wav",
    direct: "yes",
    elicitationId: 7,
  },
  {
    id: 8,
    src: "1835_027_CoeurdAlene_2_bNoiseReduced_15.wav",
    type: "audio/wav",
    direct: "yes",
    elicitationId: 8,
  },
  {
    id: 9,
    src: "1835_027_CoeurdAlene_2_bNoiseReduced_16.wav",
    type: "audio/wav",
    direct: "yes",
    elicitationId: 9,
  },
  {
    id: 10,
    src: "1835_027_CoeurdAlene_2_bNoiseReduced_17.wav",
    type: "audio/wav",
    direct: "yes",
    elicitationId: 10,
  },
];
const audiofiles = [
  {
    id: 1,
    subdir: "CricketRidesCoyote",
    src: "CricketRidesCoyote_Crd.mp3",
    type: "audio/mp3",
    direct: "yes",
    audiosetId: 1,
  },
  {
    id: 2,
    subdir: "CricketRidesCoyote",
    src: "CricketRidesCoyote_Crd.wav",
    type: "audio/wav",
    direct: "yes",
    audiosetId: 1,
  },
  {
    id: 3,
    subdir: "CricketRidesCoyote",
    src: "CricketRidesCoyote_Engl.mp3",
    type: "audio/mp3",
    direct: "yes",
    audiosetId: 2,
  },
  {
    id: 4,
    subdir: "CricketRidesCoyote",
    src: "CricketRidesCoyote_Engl.wav",
    type: "audio/wav",
    direct: "yes",
    audiosetId: 2,
  },
  {
    id: 5,
    subdir: "LittleMosquito",
    src: "LittleMosquito1_Crd.mp3",
    type: "audio/mp3",
    direct: "yes",
    audiosetId: 4,
  },
  {
    id: 6,
    subdir: "LittleMosquito",
    src: "LittleMosquito1_Crd.wav",
    type: "audio/wav",
    direct: "yes",
    audiosetId: 4,
  },
  {
    id: 7,
    subdir: "LittleMosquito",
    src: "LittleMosquito2_Crd.mp3",
    type: "audio/mp3",
    direct: "yes",
    audiosetId: 3,
  },
  {
    id: 8,
    subdir: "LittleMosquito",
    src: "LittleMosquito2_Crd.wav",
    type: "audio/wav",
    direct: "yes",
    audiosetId: 3,
  },
  {
    id: 9,
    subdir: "RabbitAndJackRabbit",
    src: "RabbitAndJackRabbit_Crd.mp3",
    type: "audio/mp3",
    direct: "yes",
    audiosetId: 5,
  },
  {
    id: 10,
    subdir: "RabbitAndJackRabbit",
    src: "RabbitAndJackRabbit_Crd.wav",
    type: "audio/wav",
    direct: "yes",
    audiosetId: 5,
  },
  {
    id: 11,
    subdir: "RabbitAndJackRabbit",
    src: "RabbitAndJackRabbit_Engl.mp3",
    type: "audio/mp3",
    direct: "yes",
    audiosetId: 6,
  },
  {
    id: 12,
    subdir: "RabbitAndJackRabbit",
    src: "RabbitAndJackRabbit_Engl.wav",
    type: "audio/wav",
    direct: "yes",
    audiosetId: 6,
  },
  {
    id: 13,
    subdir: "WhenDeerKillsChildren",
    src: "WhenDeerKillsChildren.mp3",
    type: "audio/mp3",
    direct: "yes",
    audiosetId: 7,
  },
  {
    id: 14,
    subdir: "WhenDeerKillsChildren",
    src: "WhenDeerKillsChildren.wav",
    type: "audio/wav",
    direct: "yes",
    audiosetId: 7,
  },
  {
    id: 15,
    subdir: "LordsPrayer",
    src: "LordsPrayer.mp3",
    type: "audio/mp3",
    direct: "yes",
    audiosetId: 8,
  },
  {
    id: 16,
    subdir: "LordsPrayer",
    src: "LordsPrayer.wav",
    type: "audio/wav",
    direct: "yes",
    audiosetId: 8,
  },
];
const bibliography = [
  {
    id: 1,
    author: "Barthmaier, Paul T.",
    year: "1996",
    title:
      "A Dictionary of Coeur d'Alene Salish from Gladys Reichard's file slips",
    reference: "University of Montana M.A. Thesis.",
    link: "https://scholarworks.umt.edu/etd/8274/",
    linktext: "here",
  },
  {
    id: 2,
    author: "Bischoff, Shannon T.",
    year: "2011",
    title:
      "Lexical affixes, incorporation, and conflation: The case of Coeur d'Alene",
    reference: "Studia Linguistica 65.1:1-32.",
    link: "",
  },
  {
    id: 3,
    author: "Bischoff, Shannon T.",
    year: "2011",
    title: "Formal notes on Coeur d'Alene clause structure",
    reference: "Newcastle: Cambridge Scholars Press.",
    link: "",
  },
  {
    id: 4,
    author: "Bischoff, Shannon T.",
    year: "2007",
    title:
      "Functional Forms-Formal Functions: An account of Coeur d'Alene clause structure",
    reference: "PhD dissertation University of Arizona.",
    link: "",
  },
  {
    id: 5,
    author: "Bischoff, Shannon T.",
    year: "2006",
    title:
      "Basic clause structure in Coeur d'Alene A preliminary working paper",
    reference:
      "In MIT Working Papers on Endangered and Less Familiar Languages Volume on Salish, (eds) Shannon T. Bischoff, Lynnika Buttler, Peter Norquist, and Daniel Siddiqi. Cambridge MIT Press.",
    link: "",
  },
  {
    id: 6,
    author: "Bischoff, Shannon T.",
    year: "2006",
    title:
      "The left periphery in Coeur d'Alene Evidence from the Reichard Manuscripts",
    reference:
      "In Proceedings of WSCLA 10 UBCWPL 17, (eds) Solveiga Armoskaite and James J. Thompson. 43-55.",
    link: "",
  },
  {
    id: 7,
    author: "Bischoff, Shannon T.",
    year: "2001",
    title:
      "Lynx : a morphological analysis and translation of Dorothy Nicodemus' Coeur d'Alene narrative",
    reference: "University of Montana M.A. thesis.",
    link: "http://scholarworks.umt.edu/cgi/viewcontent.cgi?article=9310&context=etd",
    linktext: "here",
  },
  {
    id: 8,
    author: "Bischoff, Shannon T., Ivy Doak, Amy V. Fountain and John Ivens",
    year: "2013",
    title: "Creating grass roots digital Coeur d'Alene resources:  the COLRC",
    reference: "Northwest Journal of Linguistics. 7. 1-23.",
    link: "http://www.sfu.ca/nwjl/Articles/V007_N04/BischoffEtAlGrassrootsResources.pdf",
    linktext: "here",
  },
  {
    id: 9,
    author: "Bischoff, Shannon T,. and Amy V. Fountain",
    year: "2013",
    title:
      "Grass-roots development of web-based language archives: the Coeur d'Alene Archive",
    reference:
      "In Shannon Bischoff, Debbie Cole, Amy Fountain, and Mizuki Miyashita (eds) The Persistence of Language: Constructing and Confronting the Past and Present in the Voices of Jane H. Hill. 175-202. Cambridge: John Benjamins",
    link: "",
  },
  {
    id: 10,
    author: "Boas, Franz, and Teit, James",
    year: "1985",
    title: "Coeur d'Alene, Flathead and Okanogan Indians.",
    reference:
      "Ye Galleon Press: Fairfield, Washington. Reprint of the Annual report of the Bureau of American Ethnology to the Secretary of the Smithsonian Institution volume 45 (1927-28) pages 23-396",
    link: "http://archive.org/stream/annualreportofbu45smit#page/36/mode/2up",
    linktext: "here",
  },
  {
    id: 11,
    author: "Brinkman, Raymond",
    year: "2003",
    title:
      "Etsmeystkhw khwe snwiyepmshtsn 'you know how to talk like a whiteman'",
    reference: "Ph.D. Dissertaion. University of Chicago.",
    link: "",
  },
  {
    id: 12,
    author: "Czaykowska-Higgins, Ewa",
    year: "1993",
    title: "Cyclicity and stress in Moses Columbia Salish",
    reference: "Natural Language and Linguistic Theory 11. 197-278.",
    link: "",
  },
  {
    id: 13,
    author: "Diomedi, Alexander S.J.",
    year: "1894",
    title: "Sketches of Modern Indian Life",
    reference: "",
    link: "https://archive.org/details/cihm_14111",
    linktext: "here",
  },
  {
    id: 14,
    author: "Doak, Ivy G.",
    year: "2004",
    title: "Notes on Reduplication in Coeur d'Alene",
    reference:
      "In Studies in Salish Linguistics in Honor of M. Dale Kinkade, eds.  D. Gerdts and L. Matthewson. 118-131. Missoula, Montana: University of Montana Press.",
    link: "",
  },
  {
    id: 15,
    author: "Doak, Ivy G.",
    year: "1998",
    title:
      "Doing fieldwork with endangered languages: The case of Coeur d'Alene",
    reference:
      "Paper presented at the University of North Texas Linguistic Colloquium. Denton, TX.",
    link: "",
  },
  {
    id: 16,
    author: "Doak, Ivy G.",
    year: "1997",
    title: "Coeur d'Alene grammatical relations",
    reference: "Ph.D. Dissertation. University of Texas at Austin.",
    link: "",
  },
  {
    id: 17,
    author: "Doak, Ivy G.",
    year: "1996",
    title: "Coeur d'Alene imperative constructions",
    reference: "Papers for the 31st ICSNL. Vancouver.",
    link: "http://lingserver.arts.ubc.ca/linguistics/sites/default/files/1996_Doak.pdf",
    linktext: "here",
  },
  {
    id: 18,
    author: "Doak, Ivy G.",
    year: "1993",
    title: "Discourse use of the Coeur d'Alene -st(u)- transitivizer",
    reference:
      "American Indian linguistics and ethnography in honor of Laurence C. Thompson, A. Mattina and T. Montler, eds.  UMOPL 10.  Missoula.",
    link: "",
  },
  {
    id: 19,
    author: "Doak, Ivy G.",
    year: "1992",
    title: "Another look at Coeur d'Alene Harmony",
    reference: "International Journal of American Linguistics 58.1:1-35.",
    link: "",
  },
  {
    id: 20,
    author: "Doak, Ivy G.",
    year: "1991",
    title: "Coeur d'Alene rhetorical structure",
    reference: "In Texas Linguistic Forum: Discourse 33. 43-70.",
    link: "",
  },
  {
    id: 21,
    author: "Doak, Ivy G.",
    year: "1990",
    title:
      "Truncation, -&#237; suffixation, and extended vowel length in Coeur d'Alene",
    reference:
      " Papers for the 25th International Conference on Salish and Neighbouring Languages. University of British Columbia, Vancouver.",
    link: "http://lingserver.arts.ubc.ca/linguistics/sites/default/files/1990_Doak.pdf",
    linktext: "here",
  },
  {
    id: 22,
    author: "Doak, Ivy G.",
    year: "1987",
    title: "Coeur d'Alene vowel harmony",
    reference:
      "Papers from the 22nd International Conference on Salish and Neighboring Languages. University of Victoria.  Victoria, BC.",
    link: "",
  },
  {
    id: 23,
    author: "Doak, Ivy G.",
    year: "1986",
    title: "Coeur d'Alene schwa",
    reference: "Papers presented at LASSO, Scottsdale, AZ.",
    link: "",
  },
  {
    id: 24,
    author: "Doak, Ivy and Anthony Mattina",
    year: "1997",
    title: "Okanagan -lx, Coeur d'Alene -ils, and Cognate Forms",
    reference: "Okanagan -lx, Coeur d'Alene -ils, and Cognate Forms",
    link: "",
  },
  {
    id: 25,
    author: "Doak, Ivy and Timothy Montler",
    year: "2000",
    title: "Orthography, lexicography and language change",
    reference:
      "In Proceedings of the fourth FEL Conference, Nicholas Ostler and Blair Rudes, eds. Charlotte, NC: Foundation for Endangered Languages.",
    link: "http://montler.net/papers/OrthographyFEL22000.pdf",
    linktext: "here",
  },
  {
    id: 26,
    author: "Doak, Ivy and Margaret Stensgar",
    year: "2008",
    title: "Coyote and the birds:  A traditional Coeur d'Alene story",
    reference:
      "In One people's stories: A collection of Salishan myths and legends, eds. M. T. Thompson and S. M. Egesdal. 210-213. The Smithsonian Series of Studies in Native American Literatures. Lincoln, NE: University of Nebraska Press.",
    link: "",
  },
  {
    id: 27,
    author:
      "Ewing, Shirley, Bonnie Grossen, Leo Little Thunder, Gladys Amanda Reichard",
    year: "1978",
    title:
      "Skitswish tales of the ancient Coeur d'Alene Indians: a supplemental reading program for teaching decoding",
    reference: "Desmet, Idaho : Coeur D'Alene Indian Tribal School.",
    link: "",
  },
  {
    id: 28,
    author: "Falk, Julia S.",
    year: "1999",
    title:
      "Women, Language, and Linguistics: Three American Stories from the First Half of the Twentieth Century.",
    reference: "Routledge: London.",
    link: "",
  },
  {
    id: 29,
    author: "Falk, Julia S.",
    year: "1997",
    title:
      "Territoriality, relationships, and reputation: The case of Gladys A. Reichard.",
    reference: "Southwest Journal of Linguistics 16.1/2.",
    link: "",
  },
  {
    id: 30,
    author: "Fitzgerald, Susan",
    year: "1997",
    title: "Historical aspects of Coeur d'Alene harmony",
    reference: "International Journal of American Linguistics. 63.3.362-384.",
    link: "",
  },
  {
    id: 31,
    author: "Frey, Rodney",
    year: "2001",
    title:
      "Landscape Traveled by Coyote and Crane: The World of the Schits'umsh",
    reference: "Seattle: University of Washington Press.",
    link: "",
  },
  {
    id: 32,
    author: "Gazzoli, Father G.,  S. J.",
    year: "1876",
    title:
      "Prayers and hymns translated into the Skitswich language by Father G. Gazzoli, S.J., of the Coeur D'alene Mission, Idaho",
    reference: "Hubert Howe Bancroft Collection.",
    link: "",
  },
  {
    id: 33,
    author: "Gibbons, Carolyn Fox",
    year: "1999",
    title: "An edition of Coyote steals son's wife; Gladys Amanda Reichard",
    reference: "University of Montana M.A. thesis",
    link: "",
  },
  {
    id: 34,
    author: "Greene, Rebecca J.",
    year: "2004",
    title: "Edition of Snchitsu'umshtsn:  volume I: a root dictionary",
    reference: "University of Montana M.A. thesis.",
    link: "http://scholarworks.umt.edu/cgi/viewcontent.cgi?article=9132&context=etd",
    linktext: "here",
  },
  {
    id: 35,
    author: "Harris, Barbara P.",
    year: "1974",
    title:
      "Aspect and the pronominal system of Coeur d'Alene: A re-analysis of Reichard's material",
    reference:
      "International Conference on Salish and Neighbouring Languages 9. 60-80.",
    link: "http://lingserver.arts.ubc.ca/linguistics/sites/default/files/1974_Harris.pdf",
    linktext: "here",
  },
  {
    id: 36,
    author: "Hayter, Amy L.",
    year: "1997",
    title: "An Edition of Dorothy Nicodemus's Coyote Cuts Sun's Heart",
    reference: "The University of Montana M.A. thesis.",
    link: "http://scholarworks.umt.edu/cgi/viewcontent.cgi?article=9133&context=etd",
    linktext: "here",
  },
  {
    id: 37,
    author: "Hayes, Matthew S.",
    year: "1999",
    title:
      "An edition of three Coeur d'Alene texts: Calling one's kind, Hunting one's kind, and Boy takes food",
    reference: "University of Montana M.A. thesis.",
    link: "http://scholarworks.umt.edu/cgi/viewcontent.cgi?article=9137&context=etd",
    linktext: "here",
  },
  {
    id: 38,
    author: "Hoard, James E.",
    year: "1978",
    title: "Syllabication in northwest Indian languages",
    reference:
      "Syllables and segments, A. Bell and J.B. Hooper, eds. North-Holland Publishing Co.",
    link: "",
  },
  {
    id: 39,
    author: "Hulden, Mans and Shannon T. Bischoff.",
    year: "2009",
    title:
      "A simple formalism for capturing reduplication in finite-state morphology",
    reference:
      "Frontiers in Artificial Intelligence and Applications 191:207-215.",
    link: "",
  },
  {
    id: 40,
    author: "Hulden, Mans and Shannon T. Bischoff",
    year: "2008",
    title: "Annotating reduplication infinite-state morphology",
    reference:
      "Finite-State Methods and Natural Language Processing 2008 proceedings. EU Joint Research Commission Ispara Italy.",
    link: "http://dingo.sbs.arizona.edu/~mhulden/hulden_reduplication_2008.pdf",
    linktext: "here",
  },
  {
    id: 41,
    author: "Johnson, Robert E.",
    year: "1975",
    title: "The role of phonetic detail in Coeur d'Alene phonology",
    reference: "Washington State University doctoral dissertation.",
    link: "",
  },
  {
    id: 42,
    author: "Kinkade, M. Dale",
    year: "1990",
    title: "Prehistory of Salishan languages",
    reference: "Papers for the 25th ICSNL.  Vancouver.",
    link: "",
  },
  {
    id: 43,
    author: "Kinkade, M. Dale",
    year: "1967",
    title: "Uvular pharyngeal resonants in Interior Salish",
    reference: "International Journal of American Linguistics 33:228-234.",
    link: "",
  },
  {
    id: 44,
    author: "Kinkade, M. Dale and Clarence Sloat",
    year: "1972",
    title: "Proto-Eastern Interior Salish vowels",
    reference: "International Journal of American Linguistics 38:26-48.",
    link: "",
  },
  {
    id: 45,
    author: "Kroeber, Paul D.",
    year: "1999",
    title: "The Salish Language Family: Reconstructing Syntax",
    reference: "U of Nebraska Press.",
    link: "",
  },
  {
    id: 46,
    author: "Kuipers, Aert",
    year: "2003",
    title: "Salish Etymologycal Dictionary",
    reference:
      "University of Montana Occasional Papers in Linguistics No. 16. Missoula: UM Linguistics Laboratory.",
    link: "",
  },
  {
    id: 47,
    author: "Kuipers, Aert.",
    year: "1981",
    title: "On reconstructing the Proto-Salish sound system",
    reference: "International Journal of American Linguistics 47:323-35.",
    link: "",
  },
  {
    id: 48,
    author: "Louie, M. A.",
    year: "1996",
    title:
      "Visionary leadership from a Native American perspective: a leadership profile of the Coeur d'Alene Indian Tribe",
    reference: "Spokane: Gonzaga University dissertation.",
    link: "",
  },
  {
    id: 49,
    author: "Lyon, John M.",
    year: "2010",
    title:
      "Lawrence Nicodemus's Snchitsu'umshtsn File Card Collection in Dictionary Format",
    reference: "Northwest Journal of Linguistics. 4. 1-110.",
    link: "",
  },
  {
    id: 50,
    author: "Lyon, John M.",
    year: "2005",
    title: "An edition of Snchitsu'umshtsn:  volume II: a root dictionary",
    reference: "University of Montana M.A. Thesis.",
    link: "",
  },
  {
    id: 51,
    author: "Lyon, John and Rebecca Greene-Wood, eds.",
    year: "2007",
    title: "Lawrence Nicodemus's Coeur d'Alene dictionary in root format",
    reference: "UMOPL",
    link: "",
  },
  {
    id: 52,
    author: "Mattina, Anthony",
    year: "1979",
    title:
      "Pharyngeal movement in Colville and related phenomena in the Interior Salishan languages",
    reference: "International Journal of American Linguistics 45:1.",
    link: "",
  },
  {
    id: 53,
    author: "Nelson, Jon",
    year: "1999",
    title:
      "Coeur d'Alene oral narrative: Editions of Coyote imitates Magpie, Man caught in fire corral and War between Blackfoot and Coeur d'Alene",
    reference: "University of Montana M.A. thesis.",
    link: "http://scholarworks.umt.edu/cgi/viewcontent.cgi?article=9311&context=etd",
    linktext: "here",
  },
  {
    id: 54,
    author: "New, A. J.",
    year: "2013",
    title:
      "Cooperation in the Wilds of the Idaho Territory: Interaction Between the Jesuits and Coeur D'Alene Indians at the Cataldo Mission, 1848-1878.",
    reference: "Lewiston: University of Idaho master's thesis.",
    link: "",
  },
  {
    id: 55,
    author: "Nicodemus, Lawrence",
    year: "1975",
    title: "Snchitsu'umshtsn: The Coeur d'Alene language",
    reference:
      "pokane: University Press.  In two volumes: I The grammar and Coeur d'Alene-English dictionary; II English- Coeur d'Alene dictionary.",
    link: "",
  },
  {
    id: 56,
    author: "Nicodemus, Lawrence",
    year: "1975",
    title: "Snchitsu'umshtsn: The Coeur d'Alene language.  A modern course.",
    reference: "Coeur d'Alene Tribe.",
    link: "",
  },
  {
    id: 57,
    author: "Nicodemus, Lawrence",
    year: "1973",
    title: "The Coeur d'Alene language project",
    reference: "ICSL 8. Eugene, Oregon.",
    link: "",
  },
  {
    id: 58,
    author: "Nicodemus, Lawrence (Performer)",
    year: "1935",
    title:
      "Audio recording of select Coeur d'Alene myths: Collection Title: 85-550-F.",
    reference:
      "Idaho, Coeur d'Alene.  Gladys Reichard. Indiana University Bloomington Archive of Traditional Music.",
    link: "",
  },
  {
    id: 59,
    author:
      "Nicodemus, Lawrence, Wanda Matt, Reva Hess, Gary Sobbing, Jill Maria Wagner, and Dianne Allen",
    year: "2000",
    title: "Snchitsu'umshtsn: Coeur d'Alene reference book Volume 1",
    reference: "Coeur d'Alene Tribe.",
    link: "",
  },
  {
    id: 60,
    author:
      "Nicodemus, Lawrence, Wanda Matt, Reva Hess, Gary Sobbing, Jill Maria Wagner, and Dianne Allen",
    year: "2000",
    title: "Snchitsu'umshtsn: Coeur d'Alene reference book Volume 2",
    reference: "Coeur d'Alene Tribe.",
    link: "",
  },
  {
    id: 61,
    author:
      "Nicodemus, Lawrence, Wanda Matt, Reva Hess, Gary Sobbing, Jill Maria Wagner, and Dianne Allen",
    year: "2000",
    title: "Snchitsu'umshtsn: Coeur d'Alene workbook I. 3rd edition",
    reference: "Coeur d'Alene Tribe.",
    link: "",
  },
  {
    id: 62,
    author:
      "Nicodemus, Lawrence, Wanda Matt, Reva Hess, Gary Sobbing, Jill Maria Wagner, and Dianne Allen",
    year: "2000",
    title: "Snchitsu'umshtsn: Coeur d'Alene workbook II. 3rd edition",
    reference: "Coeur d'Alene Tribe.",
    link: "",
  },
  {
    id: 63,
    author: "Occhi, Debra J., Gary B. Palmer, and Roy H. Ogawa",
    year: "1993",
    title:
      "Like hair, or trees: Semantic analysis of the Coeur d'Alene prefix ne' 'amisdt'.",
    reference:
      "Revision of paper presented to the  SSILA Summer Meeting, Columbus, OH.",
    link: "http://escholarship.org/uc/item/28x669mq",
    linktext: "here",
  },
  {
    id: 64,
    author: "Ogawa, Roy H and Gary Palmer",
    year: "1998",
    title: "Language semantics of three Coeur d'Alene prefixes as 'on",
    reference:
      "In Issues in Cognitive Linguistics: 1993 Proceedings of the International Cognitive Linguistics Conference Volume 12. L. De Stadler and C. Eyrich, eds. 165-224. Walter de Gruyter.",
    link: "",
  },
  {
    id: 65,
    author: "Palmer, Gary B",
    year: "2001",
    title:
      "Indian Pioneers: The settlement of Ni'lukhwalqw (Upper Hangman Creek, Idaho) by the Snchitsu'umsh (Coeur d'Alene Indians)",
    reference: "Oregon Historical Quarterly 102.1.22-47",
    link: "",
  },
  {
    id: 66,
    author: "Palmer, Gary B.",
    year: "1998",
    title:
      "Coeur d'Alene. In Handbook of North American Indians, Volume 12, Plateau",
    reference:
      "Deward E. Walker, Jr. ed. 312-326. Washington DC: Smithsonian Institution.",
    link: "",
  },
  {
    id: 67,
    author: "Palmer, Gary B.",
    year: "1990",
    title:
      " 'Where are the muskrats?' The semantic structure of Coeur d'Alene place names",
    reference: "AL 32:263-294",
    link: "",
  },
  {
    id: 68,
    author: "Palmer, Gary B.",
    year: "1989",
    title: "The gobbler",
    reference: "The World and I 4.3. 652-659.",
    link: "",
  },
  {
    id: 69,
    author: "Palmer, Gary B.",
    year: "1988",
    title:
      "The language and culture approach in the Coeur d'Alene Language Preservation Project",
    reference: "Human Organization 47.4. 307-317.",
    link: "",
  },
  {
    id: 70,
    author: "Palmer, Gary B.",
    year: "1981",
    title: "Indian Pioneers: Coeur d'Alene mission farming from 1842 to 1876",
    reference:
      "In Papers in Anthropology, Special Issue on Comparative Frontiers. Stephen I. Thompson, ed. 65-87.",
    link: "",
  },
  {
    id: 71,
    author: "Palmer, Gary B.",
    year: "1981",
    title:
      "Light shining on the mountain. A thumbnail biography of Louis Victor.",
    reference: "Idaho Humanities Forum. Spring. 2,12.",
    link: "",
  },
  {
    id: 72,
    author: "Palmer, Gary B, Lavinia Felsman, Lawrence Nicodemus",
    year: "1985",
    title: "Workbooks in the Coeur d'Alene Indian language",
    reference:
      "Las Vegas: University of Nevada; Plummer, ID: CDA Tribal Headquarters.",
    link: "",
  },
  {
    id: 73,
    author: "Palmer, Gary B., Dale M. Kinkade and Nancy Turner",
    year: "2003",
    title: "The Grammar of Snchitsu'umshtsn (Coeur d'Alene) Plant Names",
    reference: "Journal of Ethnobiology 23.1. 65-100.",
    link: "",
  },
  {
    id: 74,
    author: "Palmer, Gary B. and Lawrence Nicodemus",
    year: "1987",
    title: "Khwi' Khwe Hntmikhw'lumukhw: This is My Land",
    reference: "Department of Education, Coeur d'Alene Tribe of Idaho, DeSmet.",
    link: "",
  },
  {
    id: 75,
    author: "Palmer, Gary B. and Lawrence Nicodemus",
    year: "1982",
    title:
      " Marking surfaces in Coeur d'Alene and universals in anatomical nomenclature",
    reference: "Working papers for the 17th ICSNL, 295-330.  Portland.",
    link: "http://lingserver.arts.ubc.ca/linguistics/sites/default/files/1982_Palmer_Nicodemus.pdf",
    linktext: "here",
  },
  {
    id: 76,
    author: "Palmer, Gary B. and Lawrence Nicodemus",
    year: "1985",
    title:
      "Coeur d'Alene exceptions to proposed universals of anatomical nomenclature",
    reference: "American Ethnologist",
    link: "",
  },
  {
    id: 77,
    author: "Palmer, Gary B., Lawrence Nicodemus and Thomas E. Connolly",
    year: "1987",
    title: "Khwi' Khwe GuL Schitsu'umsh: These Are the Coeur d'Alene People",
    reference:
      "Department of Education, Coeur d'Alene Tribe of Idaho, DeSmet. with Lawrence Nicodemus and Tom Connolly, S. J. [personal names].",
    link: "",
  },
  {
    id: 78,
    author: "Palmer, Gary B. and Thomas E. Connolly",
    year: "1983",
    title: "Coeur d'Alene Indian land-use values",
    reference:
      "Wealth and Trust: A Lesson from the American West. Special Issue.  Sun Valley",
    link: "",
  },
  {
    id: 79,
    author: "Palmer, Gary B., Thomas E. Connolly, Armando M DaSilva",
    year: "1987",
    title:
      "Khwi' khwe gul schitsu'umsh = These are the Coeur d'Alene people: a book of Coeur d'Alene personal names",
    reference:
      "Plummer, ID: Coeur d'Alene Tribal Headquarters; Las Vegas, Nev.: Dept. of Anthropology, University of Nevada",
    link: "",
  },
  {
    id: 80,
    author: "Pilling. James C",
    year: "1893",
    title: "Bibliography of the Salishan Languages",
    reference:
      "(Smithsonian Institute) Washington: Government Printing office.",
    link: "https://archive.org/details/cihm_15902",
    linktext: "here",
  },
  {
    id: 81,
    author: "Point, Nicolas and Joseph P. Donnelly (tr.)",
    year: "1967",
    title:
      "Wilderness kingdom, Indian life in the Rocky Mountains: 1840-1847; the journals & paintings of Nicolas Point",
    reference: "New York:  Holt, Rinehart and Winston",
    link: "",
  },
  {
    id: 82,
    author: "Reichard, Gladys A.",
    year: "1958-1961",
    title: "A comparison of five Salish languages",
    reference: "International Journal of American Linguistics 24, 25, 26.",
    link: "",
  },
  {
    id: 83,
    author: "Reichard, Gladys A.",
    year: "1940",
    title: "Composition and symbolism of Coeur d'Alene verb-stems",
    reference: "International Journal of American Linguistics 11:47-63.",
    link: "",
  },
  {
    id: 84,
    author: "Reichard, Gladys A.",
    year: "1939",
    title: "Stem-list of the Coeur d'Alene language",
    reference: "International Journal of American Linguistics 10:92-108.",
    link: "",
  },
  {
    id: 85,
    author: "Reichard, Gladys A.",
    year: "1938",
    title: "Coeur d'Alene",
    reference:
      "Franz Boas, ed., Handbook of American Indian languages. New York:  J. J. Augustin, Inc.  Part 3:515-707.",
    link: "http://archive.org/stream/rosettaproject_tqw_morsyn-2#page/n529/mode/2up",
    linktext: "here",
  },
  {
    id: 86,
    author: "Reichard, Gladys Amanda with Adele Froelich",
    year: "1947",
    title: "An analysis of Coeur d'Alene Indian myths",
    reference:
      "Philadelphia:  Memoirs of the American Folk-lore Society, v. 41.",
    link: "http://archive.org/stream/analysisofcoeurd41reic#page/n5/mode/2up",
    linktext: "here",
  },
  {
    id: 87,
    author: "Seltice, J.",
    year: "1990",
    title:
      "Saga of the Coeur D'Alene Indians: An Account of Chief Joseph Seltice (Vol. 990)",
    reference: "Ye Galleon Press.",
    link: "",
  },
  {
    id: 88,
    author: "Sloat, Clarence",
    year: "1980",
    title: "Vowel alternations in Coeur d'Alene",
    reference: "International Journal of American Linguistics 46:1.",
    link: "",
  },
  {
    id: 89,
    author: "Sloat, Clarence",
    year: "1972",
    title: "Vowel harmony in Coeur d'Alene",
    reference: "International Journal of American Linguistics 38:234-39.",
    link: "",
  },
  {
    id: 90,
    author: "Sloat, Clarence",
    year: "1971",
    title: "Some phonological processes of Coeur d'Alene",
    reference:
      "International Conference on Salish and Neighbouring Languages. 6.",
    link: "",
  },
  {
    id: 91,
    author: "Sloat, Clarence",
    year: "1971",
    title: "The phonetics and phonology of Coeur d'Alene /r/",
    reference:
      "Sacramento Anthropological Society Paper II. Studies in Northwest Indian languages, ed. by James E. Hoard and Thomas M. Hess, pp 123-137.  Sacramento.",
    link: "",
  },
  {
    id: 92,
    author: "Sloat, Clarence",
    year: "1970",
    title: "Some phonological similarity of /r/ and /R/ in Coeur d'Alene",
    reference:
      "International Conference on Salish and Neighbouring Languages. 5.",
    link: "http://lingserver.arts.ubc.ca/linguistics/sites/default/files/1970_SloatC.pdf",
    linktext: "here",
  },
  {
    id: 93,
    author: "Sloat, Clarence",
    year: "1968",
    title: "A skeleton key to Reichard's Coeur d'Alene transcriptions",
    reference: "Anthropological Linguistics 10:5.",
    link: "",
  },
  {
    id: 94,
    author: "Sloat, Clarence",
    year: "1967",
    title: "A plea for conformity and some amendments to Reichard",
    reference:
      "International Conference on Salish and Neighbouring Languages. 2.",
    link: "http://lingserver.arts.ubc.ca/linguistics/sites/default/files/1967_Sloat.pdf",
    linktext: "here",
  },
  {
    id: 95,
    author: "Sloat, Clarence",
    year: "1966",
    title: "Phonological redundancy rules in Coeur d'Alene",
    reference: "University of Washington PhD dissertation.",
    link: "",
  },
  {
    id: 96,
    author: "Sobbing, Gary and Audra Vincent",
    year: "2000",
    title:
      "Technology, Literacy and Orality: the Case of the Coeur d'Alene Language",
    reference:
      "Proceedings of the Foundation for Endangered Languages Conference 29. Charlotte, North Carolina, 21-24 September.",
    link: "",
  },
  {
    id: 97,
    author: "Teit, J.",
    year: "1917",
    title: "Coeur d'Alene Tales",
    reference:
      "In F. Boas, ed. Folk-Tales of Salishan and Sahaptin Tribes 119-128. New York: American Folk-Lore Society.",
    link: "http://archive.org/stream/folktalesofsalis00boas#page/119/mode/1up",
    linktext: "here",
  },
  {
    id: 98,
    author: "Thompson, Laurence C.",
    year: "1985",
    title:
      "Control in Salish grammar, in Relational Typology, edited by Frans Plank",
    reference:
      "Trends in Linguistics.  Studies and monographs 28.391-428.  Mouton.",
    link: "",
  },
  {
    id: 99,
    author: "Thompson, Laurence C.",
    year: "1979",
    title: "Salishan and the northwest",
    reference:
      "In The Languages of Native America, ed. Campbell and Mithun. Austin: University of Texas Press.",
    link: "",
  },
  {
    id: 100,
    author: "Thompson, Laurence C.",
    year: "1976",
    title: "The Northwest",
    reference:
      "Native Languages of the Americas Vol. I, ed. Thomas A. Sebeok. New York: Plenum Press.",
    link: "",
  },
  {
    id: 101,
    author: "Van Eijk, Jan P.",
    year: "2008",
    title: "A bibliography of Salish linguistics",
    reference: "Northwest Journal of Linguistics 2.3. 1-128.",
    link: "http://www.sfu.ca/nwjl/Articles/V002_N03/VanEijkSalishBiblio.pdf",
    linktext: "here",
  },
  {
    id: 102,
    author: "Vincent, Audra",
    year: "2014",
    title: "Coeur d'Alene Aspect",
    reference: "MA Thesis. University of British Columbia.",
    link: "",
  },
  {
    id: 103,
    author: "Vincent, Audra",
    year: "2009",
    title:
      "What are Native tribes in the Northwest doing to revive their languages?",
    reference: "McNair Scholars Journal 8. 347-373.  University of Washington.",
    link: "",
  },
  {
    id: 104,
    author: "Wagner, Jill Maria",
    year: "1997",
    title: "Language, Power, and Ethnicity on the Coeur d'Alene Reservation",
    reference: "Ph.D. Dissertation. Washington State University.",
    link: "",
  },
  {
    id: 105,
    author: "Woodworth-Ney, L. E.",
    year: "1996",
    title:
      "Tribal sovereignty betrayed: the conquest of the Coeur d'Alene Indian reservation, 1840-1905",
    reference: "Pullum: Washington State University dissertation.",
    link: "",
  },
];

const spelling = [
  {
    id: 1,
    reichard: "a",
    nicodemus: "a",
    salish: "a",
    english: "f<b>a</b>ther",
    note: "",
  },
  {
    id: 2,
    reichard: "á",
    nicodemus: "<u>a</u>",
    salish: "á",
    english: "f<b>a</b>ther",
    note: "underlines or accents indicate the vowel is stressed",
  },
  {
    id: 3,
    reichard: "b",
    nicodemus: "b",
    salish: "b",
    english: "<b>b</b>at",
    note: "",
  },
  {
    id: 4,
    reichard: "tc",
    nicodemus: "ch",
    salish: "č",
    english: "<b>ch</b>ur<b>ch</b>",
    note: "",
  },
  {
    id: 5,
    reichard: "tc'",
    nicodemus: "ch'",
    salish: "č'",
    english: "no example",
    note: "",
  },
  {
    id: 6,
    reichard: "ts",
    nicodemus: "ts",
    salish: "c",
    english: "<b>ts</b>i<b>ts</b>i fly",
    note: "",
  },
  {
    id: 7,
    reichard: "ts'",
    nicodemus: "ts'",
    salish: "c'",
    english: "no example",
    note: "",
  },
  {
    id: 8,
    reichard: "d",
    nicodemus: "d",
    salish: "d",
    english: "<b>d</b>og",
    note: "",
  },
  {
    id: 9,
    reichard: "ä",
    nicodemus: "e",
    salish: "ɛ, e",
    english: "<b>e</b>gg",
    note: "",
  },
  {
    id: 10,
    reichard: "ä́",
    nicodemus: "<u>e</u>",
    salish: "ɛ́, é",
    english: "<b>e</b>gg",
    note: "underlines or accents indicate the vowel is stressed",
  },
  {
    id: 11,
    reichard: "E,ι, ụ",
    nicodemus: "no form",
    salish: "ə",
    english: "sof<b>a</b>",
    note: "",
  },
  {
    id: 12,
    reichard: "gw",
    nicodemus: "gw",
    salish: "gʷ",
    english: "lin<b>gu</b>ini",
    note: "",
  },
  {
    id: 13,
    reichard: "h",
    nicodemus: "h",
    salish: "h",
    english: "<b>h</b>ello",
    note: "",
  },
  {
    id: 14,
    reichard: "i",
    nicodemus: "i",
    salish: "i",
    english: "mach<b>i</b>ne",
    note: "",
  },
  {
    id: 15,
    reichard: "í",
    nicodemus: "<u>i</u>",
    salish: "í",
    english: "mach<b>i</b>ne",
    note: "underlines or accents indicate the vowel is stressed",
  },
  {
    id: 16,
    reichard: "dj",
    nicodemus: "j",
    salish: "ǰ",
    english: "<b>j</b>ar",
    note: "",
  },
  {
    id: 17,
    reichard: "kʷ",
    nicodemus: "kw",
    salish: "kʷ",
    english: "<b>qu</b>een",
    note: "",
  },
  {
    id: 18,
    reichard: "k'ʷ",
    nicodemus: "k'w",
    salish: "k'ʷ",
    english: "no example",
    note: "",
  },
  {
    id: 19,
    reichard: "no form",
    nicodemus: "kh",
    salish: "no form",
    english: "no example",
    note: "",
  },
  {
    id: 20,
    reichard: "xʷ",
    nicodemus: "khw",
    salish: "xʷ",
    english: "no example",
    note: "The symbol 'x' may be used in the Reichard and Salishan systems to write the sound /xʷ/ when it occurs before /u/.",
  },
  {
    id: 21,
    reichard: "q",
    nicodemus: "q",
    salish: "q",
    english: "no example",
    note: "",
  },
  {
    id: 22,
    reichard: "q'",
    nicodemus: "q'",
    salish: "q'",
    english: "no example",
    note: "",
  },
  {
    id: 23,
    reichard: "qʷ",
    nicodemus: "qw",
    salish: "qʷ",
    english: "no example",
    note: "",
  },
  {
    id: 24,
    reichard: "q'ʷ",
    nicodemus: "q'w",
    salish: "q'ʷ",
    english: "no example",
    note: "",
  },
  {
    id: 25,
    reichard: "x̣",
    nicodemus: "qh,",
    salish: "x̣",
    english: "no example",
    note: "",
  },
  {
    id: 26,
    reichard: "x̣ʷ",
    nicodemus: "qhw",
    salish: "x̣ʷ",
    english: "no example",
    note: "",
  },
  {
    id: 27,
    reichard: "l",
    nicodemus: "l",
    salish: "l",
    english: "<b>l</b>ike",
    note: "",
  },
  {
    id: 28,
    reichard: "l'",
    nicodemus: "'l",
    salish: "l'",
    english: "no example",
    note: "",
  },
  {
    id: 29,
    reichard: "ɫ",
    nicodemus: "ɫ",
    salish: "ɫ",
    english: "no example",
    note: "",
  },
  {
    id: 30,
    reichard: "m",
    nicodemus: "m",
    salish: "m",
    english: "<b>m</b>o<b>m</b>",
    note: "",
  },
  {
    id: 31,
    reichard: "m'",
    nicodemus: "'m",
    salish: "m'",
    english: "no example",
    note: "",
  },
  {
    id: 32,
    reichard: "n",
    nicodemus: "n",
    salish: "n",
    english: "now",
    note: "",
  },
  {
    id: 33,
    reichard: "n'",
    nicodemus: "'n",
    salish: "n'",
    english: "no example",
    note: "",
  },
  {
    id: 34,
    reichard: "ɔ",
    nicodemus: "o",
    salish: "ɔ, o",
    english: "l<b>a</b>w",
    note: "",
  },
  {
    id: 35,
    reichard: "ɔ́",
    nicodemus: "<u>o</u>",
    salish: "ɔ́, ó",
    english: "l<b>a</b>w",
    note: "underlines or accents indicate the vowel is stressed",
  },
  {
    id: 36,
    reichard: "p",
    nicodemus: "p",
    salish: "p",
    english: "<b>p</b>at",
    note: "",
  },
  {
    id: 37,
    reichard: "p'",
    nicodemus: "p'",
    salish: "p'",
    english: "no example",
    note: "",
  },
  {
    id: 38,
    reichard: "r",
    nicodemus: "r",
    salish: "r",
    english: "fa<b>r</b>",
    note: "",
  },
  {
    id: 39,
    reichard: "r'",
    nicodemus: "'r",
    salish: "r'",
    english: "no example",
    note: "",
  },
  {
    id: 40,
    reichard: "R",
    nicodemus: "(",
    salish: "ʕ",
    english: "no example",
    note: "Nicodemus 1975a,b uses both '(' and ')' occasionally to write the pharyngeals.",
  },
  {
    id: 41,
    reichard: "R'",
    nicodemus: "'(",
    salish: "ʕ'",
    english: "no example",
    note: "Nicodemus 1975a,b uses both '(' and ')' occasionally to write the pharyngeals.",
  },
  {
    id: 42,
    reichard: "ṛʷ",
    nicodemus: "(w",
    salish: "ʕʷ",
    english: "no example",
    note: "Nicodemus 1975a,b uses both '(' and ')' occasionally to write the pharyngeals.",
  },
  {
    id: 43,
    reichard: "ṛ'ʷ",
    nicodemus: "'(w",
    salish: "ʕ'ʷ",
    english: "no example",
    note: "Nicodemus 1975a,b uses both '(' and ')' occasionally to write the pharyngeals.",
  },
  {
    id: 44,
    reichard: "s",
    nicodemus: "s",
    salish: "s",
    english: "<b>s</b>un",
    note: "",
  },
  {
    id: 45,
    reichard: "c",
    nicodemus: "sh",
    salish: "š",
    english: "<b>sh</b>ell",
    note: "",
  },
  {
    id: 46,
    reichard: "t",
    nicodemus: "t",
    salish: "t",
    english: "<b>t</b>ar",
    note: "",
  },
  {
    id: 47,
    reichard: "t'",
    nicodemus: "t'",
    salish: "t'",
    english: "no example",
    note: "",
  },
  {
    id: 48,
    reichard: "u",
    nicodemus: "u",
    salish: "u",
    english: "J<b>u</b>piter",
    note: "",
  },
  {
    id: 49,
    reichard: "ú",
    nicodemus: "<u>u</u>",
    salish: "ú",
    english: "J<b>u</b>piter",
    note: "underlines or accents indicate the vowel is stressed",
  },
  {
    id: 50,
    reichard: "w",
    nicodemus: "w",
    salish: "w",
    english: "<b>w</b>agon",
    note: "",
  },
  {
    id: 51,
    reichard: "w'",
    nicodemus: "'w",
    salish: "w'",
    english: "no example",
    note: "",
  },
  {
    id: 52,
    reichard: "y",
    nicodemus: "y",
    salish: "y",
    english: "<b>y</b>ard",
    note: "",
  },
  {
    id: 53,
    reichard: "y'",
    nicodemus: "'y",
    salish: "y'",
    english: "no example",
    note: "",
  },
  {
    id: 54,
    reichard: "'",
    nicodemus: "'",
    salish: "ʔ",
    english: "uh - oh",
    note: "",
  },
];

const consonants = [
  {
    id: 1,
    orthography: "N",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "none",
    labial: "p",
    alveolar: "t",
    uvular: "q",
    glottal: "'",
  },
  {
    id: 2,
    orthography: "S",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "none",
    labial: "p",
    alveolar: "t",
    uvular: "q",
    glottal: "ʔ",
  },
  {
    id: 3,
    orthography: "R",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "none",
    labial: "p",
    alveolar: "t",
    uvular: "q",
    glottal: "'",
  },
  {
    id: 4,
    orthography: "N",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "glottal",
    labial: "p'",
    alveolar: "t'",
    uvular: "q'",
  },
  {
    id: 5,
    orthography: "S",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "glottal",
    labial: "p'",
    alveolar: "t'",
    uvular: "q'",
  },
  {
    id: 6,
    orthography: "R",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "glottal",
    labial: "p'",
    alveolar: "t'",
    uvular: "q'",
  },
  {
    id: 7,
    orthography: "N",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "labial",
    velar: "kw",
    uvular: "qw",
  },
  {
    id: 8,
    orthography: "S",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "labial",
    velar: "kʷ",
    uvular: "qʷ",
  },
  {
    id: 9,
    orthography: "R",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "labial",
    velar: "kʷ",
    uvular: "qʷ",
  },
  {
    id: 10,
    orthography: "N",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "both",
    velar: "k'w",
    uvular: "q'w",
  },
  {
    id: 11,
    orthography: "S",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "both",
    velar: "k'ʷ",
    uvular: "q'ʷ",
  },
  {
    id: 12,
    orthography: "R",
    type: "consonant",
    voice: "VL",
    manner: "stop",
    secondary: "both",
    velar: "k'ʷ",
    uvular: "q'ʷ",
  },
  {
    id: 13,
    orthography: "N",
    type: "consonant",
    voice: "VL",
    manner: "affricate",
    secondary: "none",
    alveopalatal: "ts",
    palatal: "ch",
  },
  {
    id: 14,
    orthography: "S",
    type: "consonant",
    voice: "VL",
    manner: "affricate",
    secondary: "none",
    alveopalatal: "c",
    palatal: "č",
  },
  {
    id: 15,
    orthography: "R",
    type: "consonant",
    voice: "VL",
    manner: "affricate",
    secondary: "none",
    alveopalatal: "ts",
    palatal: "tc",
  },
  {
    id: 16,
    orthography: "N",
    type: "consonant",
    voice: "VL",
    manner: "affricate",
    secondary: "glottal",
    alveopalatal: "ts'",
    palatal: "ch'",
  },
  {
    id: 17,
    orthography: "S",
    type: "consonant",
    voice: "VL",
    manner: "affricate",
    secondary: "glottal",
    alveopalatal: "c'",
    palatal: "č'",
  },
  {
    id: 18,
    orthography: "R",
    type: "consonant",
    voice: "VL",
    manner: "affricate",
    secondary: "glottal",
    alveopalatal: "ts'",
    palatal: "tc'",
  },
  {
    id: 19,
    orthography: "N",
    type: "consonant",
    voice: "V",
    manner: "stop",
    secondary: "none",
    labial: "b",
    alveolar: "d",
  },
  {
    id: 20,
    orthography: "S",
    type: "consonant",
    voice: "V",
    manner: "stop",
    secondary: "none",
    labial: "b",
    alveolar: "d",
  },
  {
    id: 21,
    orthography: "R",
    type: "consonant",
    voice: "V",
    manner: "stop",
    secondary: "none",
    labial: "b",
    alveolar: "d",
  },
  {
    id: 22,
    orthography: "N",
    type: "consonant",
    voice: "V",
    manner: "stop",
    secondary: "labial",
    velar: "gw",
  },
  {
    id: 23,
    orthography: "S",
    type: "consonant",
    voice: "V",
    manner: "stop",
    secondary: "labial",
    velar: "gʷ",
  },
  {
    id: 24,
    orthography: "R",
    type: "consonant",
    voice: "V",
    manner: "stop",
    secondary: "labial",
    velar: "gw",
  },
  {
    id: 25,
    orthography: "N",
    type: "consonant",
    voice: "V",
    manner: "affricate",
    secondary: "none",
    palatal: "j",
  },
  {
    id: 26,
    orthography: "S",
    type: "consonant",
    voice: "V",
    manner: "affricate",
    secondary: "none",
    palatal: "ǰ",
  },
  {
    id: 27,
    orthography: "R",
    type: "consonant",
    voice: "V",
    manner: "affricate",
    secondary: "none",
    palatal: "dj",
  },
  {
    id: 28,
    orthography: "N",
    type: "consonant",
    voice: "VL",
    manner: "fricative",
    secondary: "none",
    alveolar: "s",
    lateral: "∤",
    palatal: "sh",
    uvular: "qh",
    glottal: "h",
  },
  {
    id: 29,
    orthography: "S",
    type: "consonant",
    voice: "VL",
    manner: "fricative",
    secondary: "none",
    alveolar: "s",
    lateral: "ɫ",
    palatal: "š",
    uvular: "x̣",
    glottal: "h",
  },
  {
    id: 30,
    orthography: "R",
    type: "consonant",
    voice: "VL",
    manner: "fricative",
    secondary: "none",
    alveolar: "s",
    lateral: "ɫ",
    palatal: "c",
    uvular: "x̣",
    glottal: "h",
  },
  {
    id: 31,
    orthography: "N",
    type: "consonant",
    voice: "VL",
    manner: "fricative",
    secondary: "labial",
    velar: "khw",
    uvular: "qhw",
  },
  {
    id: 32,
    orthography: "S",
    type: "consonant",
    voice: "VL",
    manner: "fricative",
    secondary: "labial",
    velar: "xʷ",
    uvular: "x̣ʷ",
  },
  {
    id: 33,
    orthography: "R",
    type: "consonant",
    voice: "VL",
    manner: "fricative",
    secondary: "labial",
    velar: "xʷ",
    uvular: "x̣ʷ",
  },
  {
    id: 34,
    orthography: "N",
    type: "consonant",
    voice: "RN",
    manner: "nasal",
    secondary: "none",
    labial: "m",
    alveolar: "n",
  },
  {
    id: 35,
    orthography: "S",
    type: "consonant",
    voice: "RN",
    manner: "nasal",
    secondary: "none",
    labial: "m",
    alveolar: "n",
  },
  {
    id: 36,
    orthography: "R",
    type: "consonant",
    voice: "RN",
    manner: "nasal",
    secondary: "none",
    labial: "m",
    alveolar: "n",
  },
  {
    id: 37,
    orthography: "N",
    type: "consonant",
    voice: "RN",
    manner: "nasal",
    secondary: "glottal",
    labial: "'m",
    alveolar: "'n",
  },
  {
    id: 38,
    orthography: "S",
    type: "consonant",
    voice: "RN",
    manner: "nasal",
    secondary: "glottal",
    labial: "m'",
    alveolar: "n'",
  },
  {
    id: 39,
    orthography: "R",
    type: "consonant",
    voice: "RN",
    manner: "nasal",
    secondary: "glottal",
    labial: "m'",
    alveolar: "n'",
  },
  {
    id: 40,
    orthography: "N",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "none",
    alveopalatal: "r",
    lateral: "l",
    palatal: "y",
    velar: "w",
    pharyngeal: "(",
  },
  {
    id: 41,
    orthography: "S",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "none",
    alveopalatal: "r",
    lateral: "l",
    palatal: "y",
    velar: "w",
    pharyngeal: "ʕ",
  },
  {
    id: 42,
    orthography: "R",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "none",
    alveopalatal: "r",
    lateral: "l",
    palatal: "y",
    velar: "w",
    pharyngeal: "R",
  },
  {
    id: 43,
    orthography: "N",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "glottal",
    alveopalatal: "'r",
    lateral: "'l",
    palatal: "'y",
    velar: "'w",
    pharyngeal: "'(",
  },
  {
    id: 44,
    orthography: "S",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "none",
    alveopalatal: "r'",
    lateral: "l'",
    palatal: "y'",
    velar: "w'",
    pharyngeal: "ʕ'",
  },
  {
    id: 45,
    orthography: "R",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "none",
    alveopalatal: "r'",
    lateral: "l'",
    palatal: "y'",
    velar: "w'",
    pharyngeal: "R'",
  },
  {
    id: 46,
    orthography: "N",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "labial",
    pharyngeal: "(w",
  },
  {
    id: 47,
    orthography: "S",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "labial",
    pharyngeal: "ʕʷ",
  },
  {
    id: 48,
    orthography: "R",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "labial",
    pharyngeal: "ṛʷ",
  },
  {
    id: 49,
    orthography: "N",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "both",
    pharyngeal: "'(w",
  },
  {
    id: 50,
    orthography: "S",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "both",
    pharyngeal: "ʕ'ʷ",
  },
  {
    id: 51,
    orthography: "R",
    type: "consonant",
    voice: "RN",
    manner: "approximant",
    secondary: "both",
    pharyngeal: "ṛ'ʷ",
  },
];

const vowels = [
  {
    id: 1,
    orthography: "N",
    height: "high",
    front: "i",
    central: "",
    back: "u",
  },
  {
    id: 2,
    orthography: "S",
    height: "high",
    front: "i",
    central: "",
    back: "u",
  },
  {
    id: 3,
    orthography: "R",
    height: "high",
    front: "i",
    central: "",
    back: "u",
  },
  {
    id: 4,
    orthography: "N",
    height: "mid",
    front: "e",
    central: "",
    back: "o",
  },
  {
    id: 5,
    orthography: "S",
    height: "mid",
    front: "ɛ, e",
    central: "ə",
    back: "ɔ, o",
  },
  {
    id: 6,
    orthography: "R",
    height: "mid",
    front: "ä",
    central: "E,ι, ụ",
    back: "ɔ",
  },
  {
    id: 7,
    orthography: "N",
    height: "low",
    front: "",
    central: "a",
    back: "",
  },
  {
    id: 8,
    orthography: "S",
    height: "low",
    front: "",
    central: "a",
    back: "",
  },
  {
    id: 9,
    orthography: "R",
    height: "low",
    front: "",
    central: "a",
    back: "",
  },
];

const users = [
  {
    first: "Lawrence",
    last: "Nicodemus",
    username: "original",
    email: "colrc@gmail.com",
    password: "colrc@gmail.com",
  },
  {
    first: "Update",
    last: "Data",
    username: "update",
    email: "update@gmail.com",
    password: "update@gmail.com",
  },
  {
    first: "Owner",
    last: "Data",
    username: "owner",
    email: "owner@gmail.com",
    password: "owner@gmail.com",
  },
  {
    first: "View",
    last: "Data",
    username: "view",
    email: "view@gmail.com",
    password: "view@gmail.com",
  },
];

const roles = [
  {
    role_code: "admin",
    role_value: "Admin",
  },
  {
    role_code: "update",
    role_value: "Update",
  },
  {
    role_code: "view",
    role_value: "View",
  },
];

const user_roles = [
  {
    user: 1,
    role: 1,
  },
  {
    user: 2,
    role: 2,
  },
  {
    user: 3,
    role: 3,
  },
  {
    user: 1,
    role: 2,
  },
  {
    user: 1,
    role: 3,
  },
];

const active = [
  {
    value: "Y",
  },
  {
    value: "N",
  },
];

const affix_types = [
  {
    value: "directional",
  },
  {
    value: "locative",
  },
  {
    value: "lexical prefix",
  },
  {
    value: "lexical suffix",
  },
];

const stem_categories = [
  {
    value: "verbs",
  },
  {
    value: "nouns",
  },
  {
    value: "other",
  },
];

module.exports = {
  spelling: spelling,
  bibliography: bibliography,
  vowels: vowels,
  consonants: consonants,
  texts: texts,
  textfiles: textfiles,
  textimages: textimages,
  audiosets: audiosets,
  audiofiles: audiofiles,
  elicitationsets: elicitationsets,
  elicitationfiles: elicitationfiles,
  users: users,
  roles: roles,
  user_roles: user_roles,
  active: active,
  affix_types: affix_types,
  stem_categories: stem_categories,
};
