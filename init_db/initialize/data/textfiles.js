const textfiles = [
    {
      "id": 1,
      "textId": 1,
      "subdir": "BoyTakesFood",
      "src": "BoyTakesFood_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 2,
      "textId": 1,
      "subdir": "BoyTakesFood",
      "src": "BoyTakesFood_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 3,
      "textId": 1,
      "subdir": "BoyTakesFood",
      "src": "BoyTakesFood_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 4,
      "textId": 2,
      "subdir": "CallingOnesKind",
      "src": "CallingOnesKind__Dorthy_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 5,
      "textId": 2,
      "subdir": "CallingOnesKind",
      "src": "CallingOnesKind__Dorthy_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 6,
      "textId": 3,
      "subdir": "CallingOnesKind",
      "src": "CallingOnesKind__Tom_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 7,
      "textId": 3,
      "subdir": "CallingOnesKind",
      "src": "CallingOnesKind__Tom_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 8,
      "textId": 4,
      "subdir": "CallingTheDeer",
      "src": "CallingTheDeer_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 9,
      "textId": 4,
      "subdir": "CallingTheDeer",
      "src": "CallingTheDeer_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 10,
      "textId": 4,
      "subdir": "CallingTheDeer",
      "src": "CallingTheDeer_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 11,
      "textId": 5,
      "subdir": "Catbird",
      "src": "Catbird_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 12,
      "textId": 5,
      "subdir": "Catbird",
      "src": "Catbird_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 13,
      "textId": 5,
      "subdir": "Catbird",
      "src": "Catbird_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 14,
      "textId": 6,
      "subdir": "ChiefChildOfTheRoot",
      "src": "ChiefChildOfTheRoot_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 15,
      "textId": 6,
      "subdir": "ChiefChildOfTheRoot",
      "src": "ChiefChildOfTheRoot_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 16,
      "textId": 7,
      "subdir": "ChipmunkAndSnake",
      "src": "ChipmunkAndSnake_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    }, 
    {
      "id": 17,
      "textId": 7,
      "subdir": "ChipmunkAndSnake",
      "src": "ChipmunkAndSnake_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    }, 
    {
      "id": 18,
      "textId": 7,
      "subdir": "ChipmunkAndSnake",
      "src": "ChipmunkAndSnake_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    }, 
    {
      "id": 19,
      "textId": 8,
      "subdir": "ContestBetweenColdAndHeat",
      "src": "ContestBetweenColdAndHeat_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    }, 
    {
      "id": 20,
      "textId": 8,
      "subdir": "ContestBetweenColdAndHeat",
      "src": "ContestBetweenColdAndHeat_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    }, 
    {
      "id": 21,
      "textId": 8,
      "subdir": "ContestBetweenColdAndHeat",
      "src": "ContestBetweenColdAndHeat_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    }, 
    {
      "id": 22,
      "textId": 9,
      "subdir": "CoyoteAndBadger",
      "src": "CoyoteAndBadger_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 23,
      "textId": 9,
      "subdir": "CoyoteAndBadger",
      "src": "CoyoteAndBadger_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 24,
      "textId": 9,
      "subdir": "CoyoteAndBadger",
      "src": "CoyoteAndBadger_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 25,
      "textId": 10,
      "subdir": "CoyoteAndFoxGambleWithFish",
      "src": "CoyoteAndFoxGambleWithFish_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 26,
      "textId": 10,
      "subdir": "CoyoteAndFoxGambleWithFish",
      "src": "CoyoteAndFoxGambleWithFish_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 27,
      "textId": 11,
      "subdir": "CoyoteAndNighthawkChangeCoats",
      "src": "CoyoteAndNighthawkChangeCoats_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 28,
      "textId": 11,
      "subdir": "CoyoteAndNighthawkChangeCoats",
      "src": "CoyoteAndNighthawkChangeCoats_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 29,
      "textId": 11,
      "subdir": "CoyoteAndNighthawkChangeCoats",
      "src": "CoyoteAndNighthawkChangeCoats_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 30,
      "textId": 12,
      "subdir": "CoyoteDevoursHisOwnChildren",
      "src": "CoyoteDevoursHisOwnChildren_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 31,
      "textId": 12,
      "subdir": "CoyoteDevoursHisOwnChildren",
      "src": "CoyoteDevoursHisOwnChildren_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 32,
      "textId": 12,
      "subdir": "CoyoteDevoursHisOwnChildren",
      "src": "CoyoteDevoursHisOwnChildren_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {  
      "id": 33,
      "textId": 13,
      "subdir": "CoyoteHuntsWithCraneAndReleasesSalmon",
      "src": "CoyoteHuntsWithCraneAndReleasesSalmon_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 34,
      "textId": 13,
      "subdir": "CoyoteHuntsWithCraneAndReleasesSalmon",
      "src": "CoyoteHuntsWithCraneAndReleasesSalmon_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 35,
      "textId": 13,
      "subdir": "CoyoteHuntsWithCraneAndReleasesSalmon",
      "src": "CoyoteHuntsWithCraneAndReleasesSalmon_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 36,
      "textId": 14,
      "subdir": "CoyoteImitatesMagpie",
      "src": "CoyoteImitatesMagpie_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 37,
      "textId": 14,
      "subdir": "CoyoteImitatesMagpie",
      "src": "CoyoteImitatesMagpie_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 38,
      "textId": 14,
      "subdir": "CoyoteImitatesMagpie",
      "src": "CoyoteImitatesMagpie_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    { 
      "id": 39,
      "textId": 15,
      "subdir": "CoyoteKillsCricketWithElkFat",
      "src": "CoyoteKillsCricketWithElkFat_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 40,
      "textId": 15,
      "subdir": "CoyoteKillsCricketWithElkFat",
      "src": "CoyoteKillsCricketWithElkFat_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 41,
      "textId": 15,
      "subdir": "CoyoteKillsCricketWithElkFat",
      "src": "CoyoteKillsCricketWithElkFat_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {   
      "id": 42,
      "textId": 16,
      "subdir": "CoyoteLosesHisEyes",
      "src": "CoyoteLosesHisEyes_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 43,
      "textId": 16,
      "subdir": "CoyoteLosesHisEyes",
      "src": "CoyoteLosesHisEyes_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 44,
      "textId": 17,
      "subdir": "CoyoteMarriesSquirrelSisterOfGoose",
      "src": "CoyoteMarriesSquirrelSisterOfGoose_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 45,
      "textId": 17,
      "subdir": "CoyoteMarriesSquirrelSisterOfGoose",
      "src": "CoyoteMarriesSquirrelSisterOfGoose_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 46,
      "textId": 17,
      "subdir": "CoyoteMarriesSquirrelSisterOfGoose",
      "src": "CoyoteMarriesSquirrelSisterOfGoose_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 47,
      "textId": 18,
      "subdir": "CoyoteOverpowersSun",
      "src": "CoyoteOverpowersSun_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 48,
      "textId": 18,
      "subdir": "CoyoteOverpowersSun",
      "src": "CoyoteOverpowersSun_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 49,
      "textId": 18,
      "subdir": "CoyoteOverpowersSun",
      "src": "CoyoteOverpowersSun_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 50,
      "textId": 19,
      "subdir": "CoyoteSnaresTheWind",
      "src": "CoyoteSnaresTheWind_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 51,
      "textId": 19,
      "subdir": "CoyoteSnaresTheWind",
      "src": "CoyoteSnaresTheWind_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 52,
      "textId": 19,
      "subdir": "CoyoteSnaresTheWind",
      "src": "CoyoteSnaresTheWind_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {  
      "id": 53,
      "textId": 20,
      "subdir": "CoyoteStealsHisDaughterInLaw",
      "src": "CoyoteStealsHisDaughterInLaw_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 54,
      "textId": 20,
      "subdir": "CoyoteStealsHisDaughterInLaw",
      "src": "CoyoteStealsHisDaughterInLaw_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 55,
      "textId": 20,
      "subdir": "CoyoteStealsHisDaughterInLaw",
      "src": "CoyoteStealsHisDaughterInLaw_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 56,
      "textId": 21,
      "subdir": "CricketRidesCoyote",
      "src": "CricketRidesCoyote_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 57,
      "textId": 21,
      "subdir": "CricketRidesCoyote",
      "src": "CricketRidesCoyote_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 58,
      "textId": 21,
      "subdir": "CricketRidesCoyote",
      "src": "CricketRidesCoyote_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 59,
      "textId": 22,
      "subdir": "DogGoesForFire",
      "src": "DogGoesForFire_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 60,
      "textId": 22,
      "subdir": "DogGoesForFire",
      "src": "DogGoesForFire_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 61,
      "textId": 22,
      "subdir": "DogGoesForFire",
      "src": "DogGoesForFire_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 62,
      "textId": 23,
      "subdir": "DogHusband",
      "src": "DogHusband_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 63,
      "textId": 23,
      "subdir": "DogHusband",
      "src": "DogHusband_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {  
      "id": 64,
      "textId": 24,
      "subdir": "ElkAndSnowshoe",
      "src": "ElkAndSnowshoe_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 65,
      "textId": 24,
      "subdir": "ElkAndSnowshoe",
      "src": "ElkAndSnowshoe_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 66,
      "textId": 24,
      "subdir": "ElkAndSnowshoe",
      "src": "ElkAndSnowshoe_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 67,
      "textId": 25,
      "subdir": "FlatheadChiefSendsHisDaughterToChiefWaxane",
      "src": "FlatheadChiefSendsHisDaugherToChiefWaxane_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 68,
      "textId": 25,
      "subdir": "FlatheadChiefSendsHisDaughterToChiefWaxane",
      "src": "FlatheadChiefSendsHisDaugherToChiefWaxane_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 69,
      "textId": 25,
      "subdir": "FlatheadChiefSendsHisDaughterToChiefWaxane",
      "src": "FlatheadChiefSendsHisDaughterToChiefWaxane_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 70,
      "textId": 26,
      "subdir": "GrizzlyAndHisBrothersInLaw",
      "src": "GrizzlyAndHisBrothersInLaw_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 71,
      "textId": 26,
      "src": "GrizzlyAndHisBrothersInLaw_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 72,
      "textId": 26,
      "subdir": "GrizzlyAndHisBrothersInLaw",
      "src": "GrizzlyAndHisBrothersInLaw_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 73,
      "textId": 27,
      "subdir": "LittleBeaver",
      "src": "LittleBeaver_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 74,
      "textId": 27,
      "subdir": "LittleBeaver",
      "src": "LittleBeaver_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 75,
      "textId": 27,
      "subdir": "LittleBeaver",
      "src": "LittleBeaver_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 76,
      "textId": 28,
      "subdir": "LittleMosquito",
      "src": "LittleMosquito_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 77,
      "textId": 28,
      "subdir": "LittleMosquito",
      "src": "LittleMosquito_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 78,
      "textId": 28,
      "subdir": "LittleMosquito",
      "src": "LittleMosquito_Typed.pdf ",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 79,
      "textId": 29,
      "subdir": "ManCaughtInFireCorral",
      "src": "ManCaughtInFireCorral_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 80,
      "textId": 29,
      "subdir": "ManCaughtInFireCorral",
      "src": "ManCaughtInFireCorral_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 81,
      "textId": 29,
      "subdir": "ManCaughtInFireCorral",
      "src": "ManCaughtInFireCorral_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 82,
      "textId": 30,
      "subdir": "MuskratTrespasses",
      "src": "MuskratTrespasses_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 83,
      "textId": 30,
      "subdir": "MuskratTrespasses",
      "src": "MuskratTrespasses_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 84,
      "textId": 31,
      "subdir": "OriginOfIndianTribes",
      "src": "OriginOfIndianTribes_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 85,
      "textId": 31,
      "subdir": "OriginOfIndianTribes",
      "src": "OriginOfIndianTribes_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 86,
      "textId": 31,
      "subdir": "OriginOfIndianTribes",
      "src": "OriginOfIndianTribes_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 87,
      "textId": 32,
      "subdir": "RabbitAndJackRabbit",
      "src": "RabbitAndJackRabbit_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 88,
      "textId": 32,
      "subdir": "RabbitAndJackRabbit",
      "src": "RabbitAndJackRabbit_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 89,
      "textId": 32,
      "subdir": "RabbitAndJackRabbit",
      "src": "RabbitAndJackRabbit_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 90,
      "textId": 33,
      "subdir": "SkunkAndFisher",
      "src": "SkunkAndFisher_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 91,
      "textId": 33,
      "subdir": "SkunkAndFisher",
      "src": "SkunkAndFisher_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 92,
      "textId": 33,
      "subdir": "SkunkAndFisher",
      "src": "SkunkAndFisher_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {  
      "id": 93,
      "textId": 35,
      "subdir": "StoryOfLynx",
      "src": "StoryOfLynx__Dorthy_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 94,
      "textId": 35,
      "subdir": "StoryOfLynx",
      "src": "StoryOfLynx__Dorthy_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 95,
      "textId": 35,
      "subdir": "StoryOfLynx",
      "src": "StoryOfLynx__Dorthy_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 96,
      "textId": 34,
      "subdir": "StoryOfLynx",
      "src": "StoryOfLynx__Tom_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 97,
      "textId": 34,
      "subdir": "StoryOfLynx",
      "src": "StoryOfLynx__Tom_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 98,
      "textId": 34,
      "subdir": "StoryOfLynx",
      "src": "StoryOfLynx__Tom_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {        
      "id": 99,
      "textId": 36,
      "subdir": "TheCoeurDAleneAttacked",
      "src": "TheCoeurDAleneAttacked_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 100,
      "textId": 36,
      "subdir": "TheCoeurDAleneAttacked",
      "src": "TheCoeurDAleneAttacked_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 101,
      "textId": 36,
      "subdir": "TheCoeurDAleneAttacked",
      "src": "TheCoeurDAleneAttacked_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 102,
      "textId": 37,
      "subdir": "TheCouerDAleneFightTheKutenai",
      "src": "TheCoeurDAleneFightTheKutenai_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 103,
      "textId": 37,
      "subdir": "TheCouerDAleneFightTheKutenai",
      "src": "TheCoeurDAleneFightTheKutenai_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 104,
      "textId": 37,
      "subdir": "TheCouerDAleneFightTheKutenai",
      "src": "TheCoeurDAleneFightTheKutenai_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 105,
      "textId": 38,
      "subdir": "TheDwarf",
      "src": "TheDwarf_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 106,
      "textId": 38,
      "subdir": "TheDwarf",
      "src": "TheDwarf_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 107,
      "textId": 39,
      "subdir": "TheGirlsWhoStoleDentalia",
      "src": "TheGirlsWhoStoleDentalia_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 108,
      "textId": 39,
      "subdir": "TheGirlsWhoStoleDentalia",
      "src": "TheGirlsWhoStoleDentalia_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 109,
      "textId": 39,
      "subdir": "TheGirlsWhoStoleDentalia",
      "src": "TheGirlsWhoStoleDentalia_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 110,
      "textId": 40,
      "subdir": "ThePracticalJoker",
      "src": "ThePracticalJoker_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 111,
      "textId": 40,
      "subdir": "ThePracticalJoker",
      "src": "ThePracticalJoker_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 112,
      "textId": 40,
      "subdir": "ThePracticalJoker",
      "src": "ThePracticalJoker_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 113,
      "textId": 41,
      "subdir": "Thunder",
      "src": "Thunder_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 114,
      "textId": 41,
      "subdir": "Thunder",
      "src": "Thunder_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 115,
      "textId": 41,
      "subdir": "Thunder",
      "src": "Thunder_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {        
      "id": 116,
      "textId": 42,
      "subdir": "ToadSavesChildren",
      "src": "ToadSavesChildren_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 117,
      "textId": 42,
      "subdir": "ToadSavesChildren",
      "src": "ToadSavesChildren_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 118,
      "textId": 42,
      "subdir": "ToadSavesChildren",
      "src": "ToadSavesChildren_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 119,
      "textId": 43,
      "subdir": "TurtlesWarParty",
      "src": "TurtlesWarParty_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 120,
      "textId": 43,
      "subdir": "TurtlesWarParty",
      "src": "TurtlesWarParty_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 121,
      "textId": 43,
      "subdir": "TurtlesWarParty",
      "src": "TurtlesWarParty_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 122,
      "textId": 44,
      "subdir": "TwoHeadedSnakes",
      "src": "TwoHeadedSnakes_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 123,
      "textId": 44,
      "subdir": "TwoHeadedSnakes",
      "src": "TwoHeadedSnakes_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 124,
      "textId": 44,
      "subdir": "TwoHeadedSnakes",
      "src": "TwoHeadedSnakes_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {           
      "id": 125,
      "textId": 45,
      "subdir": "TwoWomenOvercomeNezPerceMan",
      "src": "TwoWomenOvercomeNezPerceMan_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 126,
      "textId": 45,
      "subdir": "TwoWomenOvercomeNezPerceMan",
      "src": "TwoWomenOvercomeNezPerceMan_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 127,
      "textId": 45,
      "subdir": "TwoWomenOvercomeNezPerceMan",
      "src": "TwoWomenOvercomeNezPerceMan_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 128,
      "textId": 46,
      "subdir": "WarBetweenBlackfootAndTheCoeurDAlene",
      "src": "WarBetweenBlackfootAndTheCoeurDAlene_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 129,
      "textId": 46,
      "subdir": "WarBetweenBlackfootAndTheCoeurDAlene",
      "src": "WarBetweenBlackfootAndTheCoeurDAlene_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {       
      "id": 130,
      "textId": 47,
      "subdir": "WarBetweenLandAndWaterPeople",
      "src": "WarBetweenLandAndWaterPeople_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 131,
      "textId": 47,
      "subdir": "WarBetweenLandAndWaterPeople",
      "src": "WarBetweenLandAndWaterPeople_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 132,
      "textId": 47,
      "subdir": "WarBetweenLandAndWaterPeople",
      "src": "WarBetweenLandAndWater_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 133,
      "textId": 48,
      "subdir": "WaterbirdContestsForWomen",
      "src": "WaterbirdContestsForWomen_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 134,
      "textId": 48,
      "subdir": "WaterbirdContestsForWomen",
      "src": "WaterbirdContestsForWomen_Hand.pdf",
      "resType": "Handwritten Fieldnotes",
      "msType": "Handwritten",
      "fileType": "pdf"
    },
    {
      "id": 135,
      "textId": 48,
      "subdir": "WaterbirdContestsForWomen",
      "src": "WaterbirdContestsForWomen_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 136,
      "textId": 49,
      "subdir": "WaterMonsterWoman",
      "src": "WaterMonsterWoman_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 137,
      "textId": 49,
      "subdir": "WaterMonsterWoman",
      "src": "WaterMonsterWoman_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    },
    {
      "id": 138,
      "textId": 50,
      "subdir": "WomanSavedByLooseSaddleCinch",
      "src": "WomanSavedByLooseSaddleCinch_Engl.pdf",
      "resType": "English Translation",
      "msType": "English",
      "fileType": "pdf"
    },
    {
      "id": 139,
      "textId": 50,
      "subdir": "WomanSavedByLooseSaddleCinch",
      "src": "WomanSavedByLooseSaddleCinch_Typed.pdf",
      "resType": "Typed Manuscript",
      "msType": "Typed",
      "fileType": "pdf"
    }
  ]
module.exports = {
  textfiles: textfiles
};