import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    url: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    shortUrl: {
      type: mongoose.SchemaTypes.String,
      unique: true,
    },
    code: {
      type: mongoose.SchemaTypes.String,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 7,
    },
  },
  {
    versionKey: false,
  }
);

const Url = mongoose.model("url", urlSchema);
export default Url;
