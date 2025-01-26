// utils/stringHandlers.ts

export class StringUtils {
    // Função para obter o primeiro nome de uma string
    static getFirstName(name: string): string {
      const firstName = name.split(' ')[0]; // Divide o nome pelo espaço e pega a primeira parte
      return firstName;
    }
  }
  