export class Affiliation {
  organisation: string;
  position: string;
  website: string;
}


export class Person {
  id: any;
  name: string;
  email: string;
  intro_bio: string;
  preferred_contact: string;
  roles: string[];
  experience: string[];
  regions: string[];
  followed: boolean;
  affiliations: Affiliation[];
  annotation: any;
}
