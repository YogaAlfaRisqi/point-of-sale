const Joi = require("joi");

const loginSchema = Joi.object({
  identifier: Joi.string()
    .required()
    .custom((value, helpers) => {
      // Jika tidak cocok format email, tapi valid sebagai username, tetap lolos
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;

      if (!emailRegex.test(value) && !usernameRegex.test(value)) {
        return helpers.error("any.invalid");
      }

      return value;
    }, "identifier validation")
    .messages({
      "string.empty": "Email atau username tidak boleh kosong",
      "any.invalid": "Masukkan email atau username yang valid",
      "any.required": "Field identifier wajib diisi",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password tidak boleh kosong",
    "string.min": "Password minimal 6 karakter",
  }),
});

const registerSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username wajib diisi",
    "string.empty": "Username tidak boleh kosong",
  }),
  name: Joi.string().required().messages({
    "any.required": "Nama wajib diisi",
    "string.empty": "Nama tidak boleh kosong",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email wajib diisi",
    "string.email": "Format email tidak valid",
    "string.empty": "Email tidak boleh kosong",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password wajib diisi",
    "string.empty": "Password tidak boleh kosong",
    "string.min": "Password minimal 6 karakter",
  }),
});

module.exports = { loginSchema, registerSchema };
