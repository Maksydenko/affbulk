import { InputType } from './inputType.enum';

export interface IElDrawer {
  column: number;
  id: number;
  label: string;
  options: string[];
  row: number;
  type: InputType;
}
