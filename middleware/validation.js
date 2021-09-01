const Joi = require("joi").extend(require("@joi/date"));

module.exports = (req, res, next) => {
  const schema = Joi.object({
    receiver_name: Joi.string().required(),
    receiver_date: Joi.date().format("MM-DD-YYYY"),
    receiver_email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    relation: Joi.string(),
  });

  const result = schema.validate(req.body);
  if (result.error != null) {
    res.status(400).send(result.error.details[0].message);
  } else {
    next();
  }
};
