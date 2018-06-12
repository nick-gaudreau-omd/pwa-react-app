export interface IBodyProps {
  title:string;
  input1:string;
  input2:string;
  inputChangeHandler?: (e:any) => void;
  onSubmitHandler?: () => void;
}