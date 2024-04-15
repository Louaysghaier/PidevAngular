export enum RoleName {
    NORMAL = 'NORMAL',
    ADMIN = 'ADMIN',
    NUTRITIONIST = 'NUTRITIONIST',
    COACH = 'COACH',
    THERAPIST = 'THERAPIST',
    
}

export class Role {
    id?: number;
    name!: RoleName;


}