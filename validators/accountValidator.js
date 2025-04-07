import z from "zod";

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

export class AccountValidator {
  static validate(accountInfo) {
    const result = AccountSchema.safeParse(accountInfo);

    if (!result.success) {
      const errors = result.error.errors.map((error) => error.message);

      return { success: false, errors };
    }

    return { success: true };
  }
}
