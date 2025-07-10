export interface UserRequest {
  email: string;
  username: string;
  password: string;
  entrepriseId?: number; // optionnel si tu veux l’associer plus tard
}
