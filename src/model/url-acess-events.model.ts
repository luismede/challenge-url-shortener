import mongoose from "mongoose";

const urlAcessEventsSchema = new mongoose.Schema(
  {
    code: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    ipHash: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    userAgent: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const UrlAcessEvents = mongoose.model("url_acess_events", urlAcessEventsSchema);
export default UrlAcessEvents;
