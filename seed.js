const allModels = require("./models")
const DBConn = allModels.DBConn || require("./db") // This can be either or
const Playlists = allModels.Playlists
const Songs = allModels.Songs

// Simple seed script which will add dummy data to our database
// Will initialize the database with three lists:
// List #1 - contains 1 song
// List #2 - contains 2 songs
// List #3 - contains 3 songs
async function seed() {
    await DBConn.sync({ force: true })
    // List #1
    const list1 = await Playlists.create({
        title: "Relaxation",
        description: "Ambients",
    })
    await Songs.create({
        title: "Sweden",
        artist: "C418",
        duration: 300,
        playlistId: list1.id,
    })

    // List #2
    const list2 = await Playlists.create({
        title: "Gym Workout",
        description: "Motivational",
    })
    await Songs.create({
        title: "Believer",
        artist: "Imagine Dragons",
        duration: 204,
        playlistId: list2.id,
    })
    await Songs.create({
        title: "Eye of the Tiger",
        artist: "Survivor",
        duration: 243,
        playlistId: list2.id,
    })

    // List #3
    const list3 = await Playlists.create({
        title: "Study Session",
        description: "Lo-Fi",
    })
    await Songs.create({
        title: "Open",
        artist: "Rhye",
        duration: 217,
        playlistId: list3.id,
    })
    await Songs.create({
        title: "Dive",
        artist: "Tycho",
        duration: 499,
        playlistId: list3.id,
    })
    await Songs.create({
        title: "Weightless",
        artist: "Marconi Union",
        duration: 488,
        playlistId: list3.id,
    })

    console.log("SEEDED!")
    DBConn.close()
}

seed()