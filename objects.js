/**
 * Created by: Greg Bunyea
 * Modified by: Hao Li
 */

let template = {
    "name": "",
    "text": "",
    "buttons": [
        {
            "id": "b1",
            "image": "",
            "description": "",
            "answer": true,
            "feedback": "",
            "whereTo": ""
        },
        {
            "id": "b2",
            "image": "",
            "description": "",
            "answer": false,
            "feedback": "",
            "whereTo": ""
        },
        {
            "id": "b3",
            "image": "",
            "description": "",
            "answer": false,
            "feedback": "",
            "whereTo": ""
        },
        {
            "id": "b4",
            "image": "",
            "description": "",
            "answer": false,
            "feedback": "",
            "whereTo": ""
        }
    ]
}

let introductionScripts = [
    {
        "name": "intro",
        "text": "Today we will learn how different knife sharpeners work. We will learn two techniques, Honing and Grinding. ",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "Continue",
                "answer": true,
                "feedback": "",
                "whereTo": ""
            }
        ]
    },
    {
        "name": "intro",
        "text": "You will be learning in teams of two. One will learn Honing, the other Grinding. Then you will teach each other.",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "Continue",
                "answer": true,
                "feedback": "",
                "whereTo": ""
            }
        ]
    },
    {
        "name": "intro",
        "text": "Before you teach each other, you will have a chance to check your own understanding. After that you will take a quiz on both techniques.",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "Continue",
                "answer": true,
                "feedback": "",
                "whereTo": ""
            }
        ]
    },
    {
        "name": "intro",
        "text": "Ready?",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "BEGIN!",
                "answer": true,
                "feedback": "",
                "whereTo": ""
            }
        ]
    }
]

let questions = [
    {
        "name": "grinding01",
        "text": "What shape is the grinder?",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "V",
                "answer": true,
                "feedback": "Correct! The pointed shape of this cross-section will grind the knife into a symmetrical point.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "U",
                "answer": false,
                "feedback": "Incorrect. This shape is not pointed so grinding in this shape will result in a round knife that will not cut.",
                "whereTo": ""
            },
            {
                "id": "b3",
                "image": "",
                "description": "|_|",
                "answer": false,
                "feedback": "Incorrect. This shape is not pointed so grinding in this shape will result in a flat knife that will not cut.",
                "whereTo": ""
            },
            {
                "id": "b4",
                "image": "",
                "description": "N",
                "answer": false,
                "feedback": "",
                "whereTo": "Not quite. This shape is pointed, but it's asymmetrical and will unevenly grind your knife."
            }
        ]
    },

    {
        "name": "grinding02",
        "text": "What does a grinder do to sharpen a knife?",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "It bends the point back in line",
                "answer": false,
                "feedback": "Incorrect. A grinder does not bend anything.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "It removes material to make a point",
                "answer": true,
                "feedback": "Correct! Grinders grind the knife down until a new point is formed higher up the knife.",
                "whereTo": ""
            },
            {
                "id": "b3",
                "image": "",
                "description": "It adds material to create a point",
                "answer": false,
                "feedback": "Incorrect. No material is added during any sharpening process described here.",
                "whereTo": ""
            },
            {
                "id": "b4",
                "image": "",
                "description": "It heats the material back into a point with friction",
                "answer": false,
                "feedback": "",
                "whereTo": "Incorrect. While technically some heat would be created from friction, even newly forged knives are not sharpened with heat."
            }
        ]
    },
    {
        "name": "grinding03",
        "text": "Why does a grinder produce particles?",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "It shaves off some materials in the sharpening process",
                "answer": true,
                "feedback": "Correct! Particles left on the knife were once part of the knife, having just been shaved off by the grinder.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "The grinder uses particles to sharpen like sandpaper, and some come off in the process",
                "answer": false,
                "feedback": "Incorrect. While the grinder would have a particle-like surface, the knife would have to be rough enough to smoothen the grinder.",
                "whereTo": ""
            },
            {
                "id": "b3",
                "image": "",
                "description": "The particles are tiny ball bearings that help the knife glide through the grinder",
                "answer": false,
                "feedback": "Incorrect. This would make the grinder have less friction with the knife resulting in no sharpening.",
                "whereTo": ""
            }
        ]
    },
    {
        "name": "grinding04",
        "text": "A grinder works most like a…",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "Pasta Roller",
                "answer": false,
                "feedback": "Incorrect. A pasta roller flattens things and does not remove materials.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "Pencil Sharpener",
                "answer": true,
                "feedback": "Correct! A pencil sharpener slowly works away material from the pencil to create a new point, just like a grinder.",
                "whereTo": ""
            },
            {
                "id": "b3",
                "image": "",
                "description": "Comb",
                "answer": false,
                "feedback": "Incorrect. A comb untangles or aligns things, and does not remove materials.",
                "whereTo": ""
            },
            {
                "id": "b4",
                "image": "",
                "description": "Knife",
                "answer": false,
                "feedback": "Incorrect. A knife does remove materials, but sharpens by removing large chunks. A grinder is more gradual.",
                "whereTo": ""
            }
        ]
    },
    {
        "name": "honing01",
        "text": "The sharpening steel will sharpen a knife with what point shape?",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "Bent",
                "answer": true,
                "feedback": "Correct! A sharpening steel unbends bent knife points back into shape.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "Flat",
                "answer": false,
                "feedback": "Incorrect. A flat knife wouldn’t have a point at all.",
                "whereTo": ""
            },
            {
                "id": "b3",
                "image": "",
                "description": "Round",
                "answer": false,
                "feedback": "Incorrect. A round point wouldn't have a point at all.",
                "whereTo": ""
            },
            {
                "id": "b4",
                "image": "",
                "description": "Pointed",
                "answer": false,
                "feedback": "",
                "whereTo": "Incorrect. If the point is intact, it would not need sharpening."
            }
        ]
    },
    {
        "name": "honing02",
        "text": "Why doesn’t a steel produce particles?",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "Particles get caught in the middle of the steel rod",
                "answer": false,
                "feedback": "Incorrect. The steel rod is solid so there is no where for particles to get trapped.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "The steel doesn’t shave off any materials",
                "answer": true,
                "feedback": "Correct! Sharpening steels reshape the bent points of a knife.",
                "whereTo": ""
            },
            {
                "id": "b3",
                "image": "",
                "description": "The steel incorporates the particles into the knife",
                "answer": false,
                "feedback": "Incorrect. No sharpening processes described involve material being added to a knife.",
                "whereTo": ""
            },
            {
                "id": "b4",
                "image": "",
                "description": "Particles fall off the rod because it is round",
                "answer": false,
                "feedback": "Incorrect. Some particles would still have clung to the knife if any were made which would have been seen when the knife is wiped off.",
                "whereTo": ""
            }
        ]
    },

    {
        "name": "honing03",
        "text": "A steel works by…",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "Removing a bent knife tip",
                "answer": true,
                "feedback": "Incorrect. The steel does not remove material from the knife.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "Removing material from the knife to make a sharp point",
                "answer": false,
                "feedback": "Incorrect. The steel does not remove material from the knife.",
                "whereTo": ""
            },
            {
                "id": "b3",
                "image": "",
                "description": "Unbending a bent knife tip",
                "answer": true,
                "feedback": "Correct! A sharpening steel realigns the tip by bending the knife point.",
                "whereTo": ""
            },
            {
                "id": "b4",
                "image": "",
                "description": "Making a new point",
                "answer": false,
                "feedback": "Incorrect. The steel does not make a new point, it only realigns an existing point.",
                "whereTo": ""
            }
        ]
    },
    {
        "name": "honing04",
        "text": "Imagine you were to hold a knife perpendicular to the steel and try to use it to sharpen. Which of the following is true?",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "The friction would sharpen the knife",
                "answer": false,
                "feedback": "Incorrect. Friction would more likely aid in making the knife more dull in this case.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "The knife would break",
                "answer": false,
                "feedback": "Incorrect. The knife would likely get more dull, but is not likely to break unless tremendous force is placed.",
                "whereTo": ""
            },
            {
                "id": "b3",
                "image": "",
                "description": "The knife would leave a cut in the steel rod.",
                "answer": false,
                "feedback": "Incorrect. If the knife is dull enough to need sharpening, it is not likely to make a mark on a steel rod.",
                "whereTo": ""
            },
            {
                "id": "b4",
                "image": "",
                "description": "The point would not be bent back into alignment",
                "answer": true,
                "feedback": "Correct! The gliding action works like a comb, realigning the blade.",
                "whereTo": ""
            }
        ]
    },

    {
        "name": "hg01",
        "text": "You have a rectangular piece of metal with no point and would like to turn it into a knife. Which method of sharpening should you choose?",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "Grinding",
                "answer": true,
                "feedback": "Correct. This block needs to be ground down to have a point.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "Honing",
                "answer": false,
                "feedback": "Incorrect. Honing requires there to be a point that is misaligned, this block does not have a point.",
                "whereTo": ""
            }
        ]
    },
    {
        "name": "gh02",
        "text": "Your favorite knife isn’t cutting as well as it used to. Which method of sharpening should you try first?",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "Grinding",
                "answer": false,
                "feedback": "Incorrect. If you only ever grind your knife, it will eventually consume the knife in the same way that a pencil always gets smaller when sharpened.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "Honing",
                "answer": true,
                "feedback": "Correct! Honing your knife helps preserve the knife, as grinding will slowly remove material until the is no knife left!",
                "whereTo": ""
            }
        ]
    },


    {
        "name": "hg03",
        "text": "You tried honing your favorite knife, but it doesn’t seem to have helped. What does this mean about your knife?",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "The knife cannot be grinded down but can get sharper some other way",
                "answer": false,
                "feedback": "Incorrect. All knives can be sharpened with grinding.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "The knife can never be sharpened and should be thrown away",
                "answer": false,
                "feedback": "Incorrect. All knives can be sharpened with grinding.",
                "whereTo": ""
            },
            {
                "id": "b3",
                "image": "",
                "description": "The knife can be honed if you try again",
                "answer": false,
                "feedback": "Incorrect. If you honed properly the first time, no further honing would help realign the point.",
                "whereTo": ""
            },
            {
                "id": "b4",
                "image": "",
                "description": "The knife has no point at all and needs grinding to make a new point",
                "answer": true,
                "feedback": "Correct! If honing doesn't work that means there's no bent-tip at all, grinding will create a new tip.",
                "whereTo": ""
            }
        ]
    },
    {
        "name": "hg04",
        "text": "What would happen if you put a knife that needed honing into a grinder?",
        "buttons": [
            {
                "id": "b1",
                "image": "",
                "description": "The bent point would eventually be removed until a new point is formed",
                "answer": true,
                "feedback": "Incorrect. Grinding does not realign points.",
                "whereTo": ""
            },
            {
                "id": "b2",
                "image": "",
                "description": "The bent point would eventually be pushed back into alignment",
                "answer": false,
                "feedback": "Correct! Grinding removes materials from a knife which can be a bent tip or no tip at all.",
                "whereTo": ""
            },
            {
                "id": "b3",
                "image": "",
                "description": "Nothing would happen, the point would remain bent",
                "answer": false,
                "feedback": "Incorrect. Grinding will remove material to create a new point.",
                "whereTo": ""
            },
            {
                "id": "b4",
                "image": "",
                "description": "The knife could break the grinder because the point is cutting into the edge of the grinder",
                "answer": false,
                "feedback": "Incorrect. The knife would not be likely to do that as it is being chipped away by the grinder",
                "whereTo": ""
            }
        ]
    }
]