import z, { string } from "zod";

// Creamos un objeto que vamos a usar tanto en el login, como cuando queramos crear usarios nuevos
const AccountSchema = z
  .object({
    id: z.string().uuid({ message: "Se requiere un UUID válido" }).optional(),
    username: z
      .string({ message: "El nombre es obligatorio" })
      .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
      .optional(),
    email: z
      .string({ message: "El email es obligatorio" })
      .email({ message: "El email no es válido" }),
    passwd: z
      .string({ message: "La contraseña es obligatoria" })
      .min(5, { message: "La contraseña debe tener más de 5 caracteres" }),
    description: z
      .string()
      .max(255, {
        message: "La descripción no puede superar los 255 caracteres",
      })
      .optional(),
  })
  .strict();

const requiredString = (fieldName, minLen = 1) =>
  z
    .string({ message: `${fieldName} es obligatorio` })
    .nonempty({ message: `${fieldName} no puede estar vacío` })
    .min(minLen, {
      message: `${fieldName} no puede ser menor a ${minLen} caracteres`,
    });

const AccountSchemaFull = z
  .object({
    id: z.string().uuid({ message: "Se requiere un UUID válido" }).optional(),
    username: requiredString("El nombre", 2),
    surname: requiredString("Los apellidos", 5),
    email: requiredString("El email").email({
      message: "El email no es válido",
    }),
    passwd: requiredString("La contraseña", 5),
    department: requiredString("El departamento", 2),
    rol: z.enum(["user", "admin"]).catch("user"),
    birthdate: requiredString("La fecha de nacimiento")
      .refine((str) => !isNaN(Date.parse(str)), {
        message: "La fecha no tiene un formato válido (aaaa-mm-dd)",
      })
      .transform((str) => new Date(str))
      .refine(
        (date) => {
          const today = new Date();
          const ageDiff = today.getFullYear() - date.getFullYear();
          const hasBirthdayPassedThisYear =
            today.getMonth() > date.getMonth() ||
            (today.getMonth() === date.getMonth() &&
              today.getDate() >= date.getDate());
          const age = hasBirthdayPassedThisYear ? ageDiff : ageDiff - 1;
          return age >= 18;
        },
        {
          message: "El empleado no puede ser menor de edad",
        }
      ),
    description: string()
      .max(255, {
        message: "La descripción no puede superar los 255 caracteres",
      })
      .optional(),
  })
  .strict();

const AccountSchemaUpdate = z
  .object({
    id: z.string().uuid({ message: "Se requiere un UUID válido" }).optional(),
    username: requiredString("El nombre", 2),
    surname: requiredString("Los apellidos", 5),
    email: requiredString("El email").email({
      message: "El email no es válido",
    }),
    passwd: requiredString("La contraseña", 5).optional(),
    department: requiredString("El departamento", 2),
    rol: z.enum(["user", "admin"]).catch("user"),
    birthdate: requiredString("La fecha de nacimiento")
      .refine((str) => !isNaN(Date.parse(str)), {
        message: "La fecha no tiene un formato válido (aaaa-mm-dd)",
      })
      .transform((str) => new Date(str))
      .refine(
        (date) => {
          const today = new Date();
          const ageDiff = today.getFullYear() - date.getFullYear();
          const hasBirthdayPassedThisYear =
            today.getMonth() > date.getMonth() ||
            (today.getMonth() === date.getMonth() &&
              today.getDate() >= date.getDate());
          const age = hasBirthdayPassedThisYear ? ageDiff : ageDiff - 1;
          return age >= 18;
        },
        {
          message: "El empleado no puede ser menor de edad",
        }
      ),
    description: string()
      .max(255, {
        message: "La descripción no puede superar los 255 caracteres",
      })
      .optional(),
    active: z.boolean().default(true),
  })
  .strict();

export class AccountValidator {
  static validate(accountInfo) {
    const result = AccountSchema.safeParse(accountInfo);

    if (!result.success) {
      const errors = result.error.errors.map((error) => error.message);

      return { success: false, errors };
    }

    return { success: true };
  }

  static validateFull(accountInfo) {
    const result = AccountSchemaFull.safeParse(accountInfo);

    if (!result.success) {
      const errors = result.error.errors.map((error) => ({
        field: error.path[0],
        error: error.message,
      }));

      return { success: false, errors };
    }

    return { success: true };
  }

  static validateUpdate(accountInfo) {
    const result = AccountSchemaUpdate.safeParse(accountInfo);

    if (!result.success) {
      const errors = result.error.errors.map((error) => ({
        field: error.path[0],
        error: error.message,
      }));

      return { success: false, errors };
    }

    return { success: true };
  }
}
