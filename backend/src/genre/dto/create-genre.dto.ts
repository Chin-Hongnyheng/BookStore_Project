import { IsString } from 'class-validator'
export class CreateGenreDto{
    @IsString()
    name: string;
    // could provide action, comedy from client
}