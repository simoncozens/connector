import { Person } from './person';

export class Message {
  id: any;
  sender: Person;
  recipient: Person;
  status: string;
  content: string;
  created_at: string; //XXX?
}