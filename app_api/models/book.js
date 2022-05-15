const mongoose = require("mongoose");
// const subSchema = new mongoose.Schema(
//     {
//         main: {
//             type: String,
//             required: true
//         },

//         offer: {
//             type: String,
//             required: true
//         }
//     }
// )
const bookSchema = new mongoose.Schema(
    {
        img: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        offer: {
            type: String,
            required: true
        }

    }

);
mongoose.model("book", bookSchema);
