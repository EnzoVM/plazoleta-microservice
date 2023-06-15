// order.pin.validator.ts
let storedPin: string | undefined // Almacenamiento en memoria compartido

export class PinValidator {
  public sendPin(pin: string) {
    storedPin = pin
  }

  public validatePin(pin: string): boolean {
    if (storedPin && storedPin === pin) {
      // El código PIN es válido
      return true
    } else {
      // El código PIN no coincide o no se ha configurado
      return false
    }
  }
}
