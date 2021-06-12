export class CreateCampingDto {
  name: string;
  description: string;
  place: string;
  date: Date;
  numnberOfDays: number; //9adeh men nhar
  numberMaxOfParticipants: number;
  price: number;
  organiser_id: number;
}
